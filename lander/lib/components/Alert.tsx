export interface IAlertDetails {
  message: string;
  alertType: "success" | "error";
  icon?: string;
}

export default function Alert({
  message,
  handleClose,
}: {
  message: string;
  handleClose: () => void;
}) {
  return (
    <div className="text-secondary flex items-center justify-between rounded-lg bg-zinc-100 px-3.5 py-2 text-[13px] font-semibold">
      <span>{message}</span>
      <span
        className="material-symbols-outlined text-dim hover:text-secondary cursor-pointer text-[20px]"
        onClick={handleClose}
      >
        close
      </span>
    </div>
  );
}
