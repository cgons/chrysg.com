import Image from "next/image";

import MatIcon from "@/lib/components/MatIcon";
import mailboxVecImage from "@/public/imgs/mailbox-vec.jpg";

export default function EmailSentContent() {
  return (
    <div className="text-center">
      <p className="relative mb-1 text-xl font-bold">
        Email Sent
        <MatIcon iconName="check_circle" className="top-1 ml-1.5" />
      </p>
      <p className="mb-6">Thanks for taking the time to reach out.</p>
      <p className="mb-6 text-sm">
        <a href="/contact" className="cursor-pointer text-yellow-700">
          <span className="text-link">Compose another email</span>
          <MatIcon iconName="mail" className="top-1.5 ml-1.5" />
        </a>
      </p>
      <p>
        <Image
          src={mailboxVecImage}
          alt="Vector Email and Mailbox"
          className="h-auto sm:max-w-xl"
        />
      </p>
      <p className="">
        <span className="text-dim text-xs">
          <a href="https://www.freepik.com/" target="_blank">
            Designed by Freepik
          </a>
        </span>
      </p>
    </div>
  );
}
