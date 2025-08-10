import { clsx } from "../../utils";
import { ChatIcon } from "../icons/chat";

type Props = {
  open: boolean;
  onToggle(): void;
};

export function Bubble({ open, onToggle }: Props) {
  return (
    <button
      className="w-12 h-12 bg-linear-to-r from-grape-400 to-grape-500 rounded-full cursor-pointer flex items-center justify-center shadow-md hover:bg-grape-600 hover:scale-105 transition-all"
      onClick={onToggle}
    >
      <ChatIcon
        className={clsx("size-6 text-white fill-none", open && "fill-white")}
      />
    </button>
  );
}
