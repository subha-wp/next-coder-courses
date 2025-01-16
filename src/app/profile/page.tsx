import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { UpdateProfileForm } from "./UpdateProfileForm";
import { UpdatePasswordForm } from "./UpdatePasswordForm";
import { MobileNav } from "@/components/MobileNav";

export default async function ProfilePage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4 mb-12">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        <div className="grid gap-6">
          <UpdateProfileForm user={user} />
          <UpdatePasswordForm />
        </div>
      </div>
      <MobileNav />
    </>
  );
}
