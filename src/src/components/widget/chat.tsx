import { useState } from "react";
import logo from "../../../assets/logo.jpeg";
import { clsx } from "../../utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  openRouterKey: string;
};

export function Chat({ openRouterKey }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage(message: string) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });
    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.choices[0].message.content },
    ]);
  }

  return (
    <section className="bg-white max-w-screen w-[400px] shadow-md rounded-lg overflow-clip">
      <div className="p-4 bg-grape-400 flex gap-4 items-center">
        <img
          src={logo}
          alt="Chat Widget Logo"
          className="size-8 rounded-full"
        />
        <span className="text-white font-medium">Chat Agent</span>
      </div>
      <div className="p-4 min-h-[300px] flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-2 items-start max-h-[50dvh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={clsx(
                "p-2 rounded-md bg-grape-100",
                message.role === "user" && "bg-white self-end"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem(
              "message"
            ) as HTMLInputElement;
            const message = input.value;
            if (message.trim()) {
              setMessages((prev) => [
                ...prev,
                {
                  role: "user",
                  content: message,
                },
              ]);
              sendMessage(message);
              input.value = "";
            }
          }}
        >
          <input
            name="message"
            type="text"
            placeholder="Send your message"
            className="p-2 shadow-md rounded-sm w-full focus:outline-none focus:ring-grape-500 focus:ring-2 transition-all"
          />
        </form>
      </div>
    </section>
  );
}
