"use client";

import { usePathname } from "next/navigation";
import React from "react";
import SideBarWrapper from "../components/SideBarWrapper";
import { Suspense } from "react";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLandingPage = pathname.includes("/dashboard/landing");

  return (
    <div className="min-h-screen flex overflow-hidden">
      {isLandingPage && <SideBarWrapper />}
      <Suspense>
        <div className="flex-1 overflow-x-auto">{children}</div>
      </Suspense>
    </div>
  );
}
