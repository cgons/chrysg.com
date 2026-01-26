import Image from "next/image";
import Link from "next/link";

import GELogo from "@/lib/components/GELogo";
import NameInfo from "@/lib/components/NameInfo";
import PillButton from "@/lib/components/PillButton";
import SocialIcons from "@/lib/components/SocialIcons";
import vectorPowerLines from "@/public/imgs/vector-power-lines.svg";

import { cursive } from "./fonts";

export default function Home() {
  return (
    <div className="">
      {/* -- Name & Job Title Info -- */}
      <div>
        <NameInfo />

        <div className="h-10"></div>

        <div>
          <p
            className={`${cursive.className} text-dim mb-3 text-lg font-medium`}
          >
            &mdash; Previously at &mdash;
          </p>
          <p className="mb-2">
            <a href="https://www.gevernova.com/">
              <GELogo />
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <p className="mb-3">
            <a
              href="https://www.ge.com/digital/applications/distributed-energy-resources-management-system-derms"
              className="text-secondary hover:text-ge-evergreen relative top-[2px] inline-block font-bold"
            >
              <span className="">GridOS DERMS Architecture Team</span>
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-1.5 sm:flex-row">
          <a
            href="https://www.gevernova.com/software/products/gridos"
            target="_blank"
            className="font-medium"
          >
            <span className="primary-link">Learn more about GridOS</span>
            <span className="material-symbols-outlined align-bottom">
              chevron_right
            </span>
          </a>
          <a
            href="https://www.ge.com/digital/applications/distributed-energy-resources-management-system-derms"
            target="_blank"
            className="font-medium"
          >
            <span className="primary-link">Learn more about DERMS</span>
            <span className="material-symbols-outlined align-bottom">
              chevron_right
            </span>
          </a>
        </div>
      </div>

      <div className="h-10"></div>

      {/* -- Email Button -- */}
      <div className="mb-5">
        <p className="mb-5 flex items-center">
          <Link href="/contact" className="mr-5">
            <PillButton size="medium">
              <span className="relative bottom-px">Connect via Email</span>
              <span className="material-symbols-outlined relative top-[5px] ml-2">
                mail
              </span>
            </PillButton>
          </Link>

          <SocialIcons />
        </p>
      </div>

      <div className="h-5"></div>

      {/* -- Power Line Vector Artwork -- */}
      <div className="mb-5 text-center">
        <Image src={vectorPowerLines} alt="Vector Power Lines" />
      </div>
    </div>
  );
}
