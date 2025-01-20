"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, User, GraduationCap, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/auth/actions";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Courses",
      href: "/user/courses",
      icon: BookOpen,
    },
    {
      label: "My Courses",
      href: "/user/my-courses",
      icon: GraduationCap,
    },
    {
      label: "Profile",
      href: "/user/profile",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <nav className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-300 ease-in-out",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <item.icon
                className={cn(
                  "w-6 h-6 transition-transform duration-1000 ease-in-out",
                  isActive ? "animate-bounce" : ""
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300 ease-in-out",
                  isActive ? "font-bold" : "hover:font-semibold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
        <button
          onClick={() => logout()}
          className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-300 ease-in-out text-red-600 hover:text-red-700"
        >
          <LogOut className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-110" />
          <span className="text-xs font-medium transition-all duration-300 ease-in-out hover:font-semibold">
            Logout
          </span>
        </button>
      </nav>
    </div>
  );
}
