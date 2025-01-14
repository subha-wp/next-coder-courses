"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Users,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/app/auth/actions";

const navigation = [
  { name: "Overview", href: "/admin-dashboard", icon: BarChart },
  { name: "Users", href: "/admin-dashboard/users", icon: Users },
  { name: "Courses", href: "/admin-dashboard/courses", icon: BookOpen },
  { name: "Live Sessions", href: "/admin-dashboard/sessions", icon: Calendar },
  { name: "Settings", href: "/admin-dashboard/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="flex h-16 items-center justify-center border-b">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-6 w-6",
                  isActive
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <button
          onClick={() => logout()}
          className="flex w-full items-center px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut className="mr-3 h-6 w-6" />
          Logout
        </button>
      </div>
    </div>
  );
}
