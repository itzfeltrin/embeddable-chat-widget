import { ChatIcon } from "./icons/chat";

export function Bubble() {
  return (
    <button className="w-12 h-12 fixed bottom-8 right-8 bg-grape-500 rounded-full cursor-pointer flex items-center justify-center shadow-lg hover:bg-grape-600 transition-colors">
      <ChatIcon className="size-6 text-white" />
    </button>
  );
}
