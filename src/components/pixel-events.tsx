"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Skip tracking for admin routes
    if (pathname.startsWith("/admin-dashboard")) {
      return;
    }

    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("680362603795763");
        ReactPixel.pageView();
      });
  }, [pathname, searchParams]);

  return null;
};
