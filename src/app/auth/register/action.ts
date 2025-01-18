/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use server";

import { z } from "zod";
import { lucia } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { hash } from "@node-rs/argon2";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address").optional(),
    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Either email or phone number must be provided",
    path: ["email", "phoneNumber"],
  });

export async function register(formData: FormData) {
  const result = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { name, email, phoneNumber, password } = result.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { phoneNumber: phoneNumber || undefined },
        ],
      },
    });

    if (existingUser) {
      return { error: "Email or phone number already registered" };
    }

    const hashedPassword = await hash(password);
    const user = await prisma.user.create({
      data: {
        name,
        email: email || undefined,
        phoneNumber: phoneNumber || undefined,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An error occurred during registration" };
  }
}
