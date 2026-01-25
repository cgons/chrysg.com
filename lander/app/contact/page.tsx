import TertiaryButton from "@/lib/components/TertiaryButton";
import CopyButton from "./_components/CopyButton";
import EmailForm from "./_components/form/EmailForm";
import SocialIcons from "@/lib/components/SocialIcons";

export default function Contact() {
  const emailAddress = "mail@chrysg.com";

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-extrabold">Contact</h1>
        <p>
          <SocialIcons />
        </p>
      </div>

      <div className="h-5"></div>

      <p className="text-secondary text-lg font-medium">
        Please use the email address or contact form below to reach out.
      </p>

      <div className="h-10"></div>

      <div className="mb-3 text-center">
        <p className="border-bprimary mx-auto mb-3 pb-3 text-center text-2xl font-extrabold">
          {emailAddress}
        </p>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          <CopyButton copyText={emailAddress} />
          <a href="mailto:mail@chrysg.com">
            <TertiaryButton
              contentText="Open in Email Client"
              iconName="mail"
              className="w-full min-w-[164px]"
            />
          </a>
        </div>
      </div>

      <EmailForm />
    </div>
  );
}
