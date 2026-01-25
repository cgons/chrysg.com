"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import SiteLogo from "./SiteLogo";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="mb-10 flex items-center pt-8">
      <Link href="/">
        <SiteLogo />
      </Link>
      {!isHomePage && (
        <>
          <div className="bg-primary ml-5 h-[73px] w-[1px]"></div>
          <h1 className="ml-3.5 text-2xl font-extrabold sm:text-2xl">
            Chrys Gonsalves
          </h1>
        </>
      )}
    </div>
  );
}
