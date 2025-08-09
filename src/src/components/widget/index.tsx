import { useState } from "react";
import { Bubble } from "./bubble";
import { Chat } from "./chat";

export function Widget() {
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 right-0 bg-white flex flex-col p-8 items-end gap-8">
      {open && <Chat />}
      <Bubble open={open} onToggle={onToggle} />
    </div>
  );
}
