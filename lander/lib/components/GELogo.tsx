"use client";

import Image from "next/image";

export default function GELogo() {
  return (
    <Image
      src="/imgs/ge-logo-black.svg"
      alt="GE Vernova Logo"
      width={192}
      height={48}
      onMouseEnter={(e) =>
        ((e.target as HTMLImageElement).src = "/imgs/ge-logo-evergreen.svg")
      }
      onMouseOut={(e) =>
        ((e.target as HTMLImageElement).src = "/imgs/ge-logo-black.svg")
      }
    />
  );
}
