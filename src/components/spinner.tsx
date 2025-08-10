import { clsx } from "../utils";

export function Spinner({ className }: { className: string }) {
  return (
    <svg className={clsx("spinner", className)} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" />
    </svg>
  );
}
