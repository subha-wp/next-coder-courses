/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { NextResponse } from "next/server";
import { Expo, ExpoPushMessage } from "expo-server-sdk";
import prisma from "@/lib/prisma";

const expo = new Expo();

export async function POST(request: Request) {
  try {
    const {
      title,
      subtitle,
      message,
      imageUrl,
      userIds,
      data = {}, // Additional custom data
    } = await request.json();

    if (!title || !message) {
      return NextResponse.json(
        { error: "Title and message are required" },
        { status: 400 }
      );
    }

    // Get push tokens from database
    let tokens = [];
    if (userIds && userIds.length > 0) {
      // If specific users are targeted
      tokens = await prisma.pushToken.findMany({
        where: {
          userId: {
            in: userIds,
          },
        },
        select: {
          token: true,
        },
      });
    } else {
      // Send to all users
      tokens = await prisma.pushToken.findMany({
        select: {
          token: true,
        },
      });
    }

    // Create messages array
    const messages: ExpoPushMessage[] = [];
    for (let { token } of tokens) {
      if (!Expo.isExpoPushToken(token)) {
        console.error(`Push token ${token} is not a valid Expo push token`);
        continue;
      }

      messages.push({
        to: token,
        sound: "default",
        title,
        subtitle, // iOS only
        body: message,
        data: {
          ...data,
          imageUrl, // Pass image URL in data for custom handling
        },
        // iOS specific
        ios: {
          sound: true,
          _displayInForeground: true,
          attachments: imageUrl
            ? [
                {
                  url: imageUrl,
                  thumbnailClipArea: [0, 0, 1, 1],
                },
              ]
            : undefined,
        },
        // Android specific
        android: {
          sound: true,
          priority: "high",
          channelId: "default",
          imageUrl, // Direct support for image in Android
          vibrate: [0, 250, 250, 250],
          color: "#FF231F7C",
        },
        priority: "high",
      });
    }

    // Send notifications in chunks
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending chunk:", error);
      }
    }

    // Handle receipts
    let receiptIds = tickets
      .filter((ticket) => ticket.id)
      .map((ticket) => ticket.id);

    if (receiptIds.length > 0) {
      let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);

      for (let chunk of receiptIdChunks) {
        try {
          let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

          for (let receiptId in receipts) {
            let { status, details } = receipts[receiptId];
            if (status === "error") {
              console.error(
                `There was an error sending a notification: ${details?.error}`
              );
            }
          }
        } catch (error) {
          console.error("Error getting receipts:", error);
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        ticketsCount: tickets.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
