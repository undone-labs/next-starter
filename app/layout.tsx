import type { Metadata } from "next";
import Script from "next/script";

import { Toaster } from "sonner";

import "@/assets/scss/global.scss";

export const metadata: Metadata = {
  title: "Next Starter",
  description: "Get a Next site up and running fast 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://accounts.google.com/gsi/client" />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
