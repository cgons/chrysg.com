import Header from "@/lib/components/Header";
import "material-symbols/outlined.css";
import type { Metadata } from "next";
import React from "react";

import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chrys Gonsalves - Developer Site and Blog",
  description:
    "Staff Engineer / Architect - Focused on full stack (web) applications and microservices at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link href="/fa/css/fontawesome.min.css" rel="stylesheet" />
        <link href="/fa/css/brands.min.css" rel="stylesheet" />
      </head>
      <body
        className={`antialiased ${inter.className} sans-serif text-primary m-auto max-w-4xl px-10 text-[15px]`}
      >
        <Header />

        {/* --CONTENT -- */}
        {children}

        <footer className="border-t-bprimary m-auto mb-5 max-w-[300px] border-t pt-2 text-center">
          <div className="text-secondary text-xs/5 font-medium">
            <p>
              <i className="fa-brands fa-github text-sm"></i>
              &nbsp;
              <a
                href="https://github.com/cgons/chrysg.com"
                className="secondary-link"
              >
                cgons/chrysg.com
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
