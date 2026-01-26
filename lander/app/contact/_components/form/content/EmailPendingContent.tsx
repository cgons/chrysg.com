import Image from "next/image";

import MatIcon from "@/lib/components/MatIcon";
import vecSendEmailImage from "@/public/imgs/vec-send-email.jpg";

export default function EmailPendingContent() {
  return (
    <div className="text-center">
      <p className="text-secondary mb-2 font-semibold">
        Sending Email
        <MatIcon
          iconName="progress_activity"
          className="text-dim top-1 ml-1.5 animate-spin"
        />
      </p>
      <p className="text-secondary text-sm font-medium italic">
        This will only take a few seconds...
      </p>
      <Image
        src={vecSendEmailImage}
        alt="Vector Sending Email"
        className="max-w-xl"
      />
    </div>
  );
}
