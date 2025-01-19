// src/app/auth/layout.tsx
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) redirect("/courses");

  return <>{children}</>;
}
