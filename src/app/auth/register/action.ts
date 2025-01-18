"use server";

import { z } from "zod";
import { lucia } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { hash } from "@node-rs/argon2";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function register(formData: FormData) {
  const result = registerSchema.safeParse({
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { name, phoneNumber, password } = result.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { phoneNumber },
    });

    if (existingUser) {
      return { error: "Phone number already registered" };
    }

    const hashedPassword = await hash(password);
    const user = await prisma.user.create({
      data: {
        name,
        phoneNumber,
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
