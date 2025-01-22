export async function sendNotification({
  title,
  message,
  userIds,
}: {
  title: string;
  message: string;
  userIds?: string[];
}) {
  try {
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        message,
        userIds,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send notification");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}
