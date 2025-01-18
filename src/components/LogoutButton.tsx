"use client";
import { logout } from "@/app/auth/actions";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import React from "react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className={cn(
        "flex w-full items-center gap-x-3 rounded-md px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
      )}
      title="Logout"
    >
      <LogOut className="h-6 w-6 shrink-0" aria-hidden="true" />
      Logout
    </button>
  );
}
