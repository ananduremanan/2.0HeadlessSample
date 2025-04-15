"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/component-lib/toast";
import { ColorContext } from "./context/ColorContext";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [textPrimary, setTextPrimary] = useState("text-black");
  const [bgPrimary, setBgPrimary] = useState("bg-black");
  const [textSecondary, setTextSecondary] = useState("text-white");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ColorContext.Provider
          value={{
            textPrimary,
            setTextPrimary,
            bgPrimary,
            setBgPrimary,
            textSecondary,
            setTextSecondary,
          }}
        >
          <Toaster position="top-center" />
          {children}
        </ColorContext.Provider>
      </body>
    </html>
  );
}
