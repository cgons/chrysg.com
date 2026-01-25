import MatIcon from "@/lib/components/MatIcon";
import { isEmptyObject } from "@/lib/utils";

import { FormFieldErrors } from "../types";

type Props = {
  handleReturnToForm: (restoreForm?: boolean) => void;
  formErrors: FormFieldErrors;
};

export default function EmailFailedContent({
  handleReturnToForm,
  formErrors,
}: Props) {
  return (
    <div className="text-center">
      <p className="relative mb-1 text-xl font-bold text-red-500">
        <MatIcon iconName="error" className="align-text-bottom" /> Unable to
        Send Email
      </p>
      <p className="mb-4 italic">
        The system is having some trouble sending your email.
        <br />
        Please try again if you can.
      </p>

      <div className="h-3"></div>

      {!isEmptyObject(formErrors) && (
        <div className="text-secondary font-semibold">
          <p className="mb-2 text-center font-medium! italic">
            Issues we found:
          </p>
          {Object.entries(formErrors).map(([field, message]) => (
            <p key={field} className="">
              <span className="capitalize">{field}</span> &mdash;{" "}
              {message as string}
            </p>
          ))}
        </div>
      )}

      <div className="h-5"></div>

      <button
        className="text-link"
        onClick={() => {
          handleReturnToForm(true);
        }}
      >
        <MatIcon
          iconName="arrow_left_alt"
          className="top-[3px] align-text-bottom"
        />
        Back to Email Form
      </button>
    </div>
  );
}
