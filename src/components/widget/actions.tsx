import { useState } from "react";
import { EllipsisIcon } from "../icons/ellipsis";
import { ResetIcon } from "../icons/reset";
import { useClickAway } from "../../hooks/useClickAway";
import { Switch } from "../switch";
import { useAtom } from "jotai";
import { sharedAtom } from "../../models/shared/atom";

type Props = {
  onReset(): void;
};

export function Actions({ onReset }: Props) {
  const [open, setOpen] = useState(false);
  const [shared, setShared] = useAtom(sharedAtom);

  const onToggle = () => {
    setOpen((prev) => !prev);
  };

  const actionsRef = useClickAway<HTMLDivElement>(() => {
    onToggle();
  });

  return (
    <div className="grid place-items-center relative">
      <button type="button" className="cursor-pointer" onClick={onToggle}>
        <EllipsisIcon className="size-6 text-white" />
      </button>
      {open && (
        <div
          className="bg-white absolute top-full right-0 mt-2 rounded-md shadow-md overflow-clip z-20"
          ref={actionsRef}
        >
          <ul className="list-none">
            <li>
              <label className="flex items-center gap-4 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors text-sm justify-between">
                <span>Online</span>
                <Switch
                  value={shared.isOnline}
                  onToggle={() => {
                    setShared((prev) => ({
                      ...prev,
                      isOnline: !prev.isOnline,
                    }));
                  }}
                />
              </label>
            </li>
            <li>
              <label className="flex items-center gap-4 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors text-sm">
                <span>Maintenance</span>
                <Switch
                  value={shared.isMaintenance}
                  onToggle={() => {
                    setShared((prev) => ({
                      ...prev,
                      isMaintenance: !prev.isMaintenance,
                    }));
                  }}
                />
              </label>
            </li>
            <li>
              <button
                className="flex items-center gap-4 w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors text-sm justify-between"
                onClick={() => {
                  onReset();
                  onToggle();
                }}
              >
                Reset <ResetIcon className="size-4" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
