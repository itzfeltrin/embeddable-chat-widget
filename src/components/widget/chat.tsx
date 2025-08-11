import logo from "../../assets/logo.jpeg";
import { clsx } from "../../utils";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { Actions } from "./actions";
import { MessageClient } from "../../models/message/query";
import { useEffect, useRef, useState } from "react";
import { Message, MessageSchema } from "../../models/message/schema";
import { z } from "zod/v4";
import { Spinner } from "../spinner";
import { Airplane } from "../icons/airplane";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { sharedAtom } from "../../models/shared/atom";
import { UserIcon } from "../icons/user";
import { Auth } from "./auth";
import { LogoutIcon } from "../icons/logout";
import { isAuthenticatedAtom, logOutAtom } from "../../models/user/atom";

type Props = {
  openRouterKey: string;
};

const defaultMessages: Message[] = [
  {
    role: "assistant",
    content:
      "👋 Hi! I am your assistant today, ask me anything you'd like to know more about!",
  },
];

export function Chat({ openRouterKey }: Props) {
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useLocalStorageState(
    "startedAt",
    new Date(),
    z.coerce.date()
  );
  const [messages, setMessages] = useLocalStorageState(
    "messages",
    defaultMessages,
    z.array(MessageSchema)
  );
  const [loading, setLoading] = useState(false);
  const [shared] = useAtom(sharedAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const logOut = useSetAtom(logOutAtom);
  const [showAuth, setShowAuth] = useState(false);

  const messageClient = MessageClient(openRouterKey);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  function onReset() {
    setMessages(() => []);
    setStartedAt(() => new Date());
  }

  async function onSubmit(message: string) {
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);
    setInput("");

    try {
      const data = await messageClient.sendMessage(message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.choices[0].message.content },
      ]);
    } catch (ex) {
      console.error(ex);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
    inputRef.current?.focus();
  }, [messages.length]);

  return (
    <section className="bg-white max-w-screen sm:w-[400px] shadow-md rounded-2xl overflow-clip z-40">
      <div className="p-4 bg-linear-to-r from-brand-400 to-brand-500 flex gap-4 items-center">
        <div className="relative">
          <img
            src={logo}
            alt="Chat Widget Logo"
            className="size-8 rounded-full"
            draggable={false}
          />
          <div
            className={clsx(
              "absolute top-0 right-0  text-4xl size-2 bg-gray-300 rounded-full shadow-md transition-colors",
              shared.isOnline && "bg-green-500"
            )}
          />
        </div>
        <span className="flex-1 text-white font-medium">Chat Agent</span>
        <button
          className="cursor-pointer"
          onClick={() => {
            if (isAuthenticated) {
              logOut();
            } else {
              setShowAuth((prev) => !prev);
            }
          }}
        >
          {isAuthenticated ? (
            <LogoutIcon className="size-6 text-white" />
          ) : (
            <UserIcon className="size-6 text-white" />
          )}
        </button>
        <Actions onReset={onReset} />
      </div>
      <div className="p-4 min-h-[300px] flex flex-col gap-4 relative">
        <>
          <span className="text-center text-xs text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(startedAt)}{" "}
            Chat started
          </span>
          <div
            className="flex-1 flex flex-col gap-4 items-start max-h-[50dvh] overflow-y-auto"
            ref={messagesContainerRef}
          >
            {messages.map((message, index) => (
              <p
                key={index}
                className={clsx(
                  "p-2 rounded-md bg-brand-100 max-w-4/5 text-sm text-black",
                  message.role === "user" && "bg-gray-100 self-end"
                )}
              >
                {message.content}
              </p>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim()) return;
              void onSubmit(input);
            }}
          >
            <div className="relative">
              <input
                name="message"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                disabled={loading || shared.isMaintenance}
                placeholder="Send your message"
                className="p-2 pr-8 ring ring-brand-100 rounded-lg w-full focus:outline-none focus:ring-brand-500 focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                ref={inputRef}
              />
              <div className="absolute top-1/2 right-2 -translate-y-1/2">
                {loading ? (
                  <Spinner className="size-4" />
                ) : (
                  <button
                    type="submit"
                    className="cursor-pointer rotate-315 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={shared.isMaintenance || input.trim().length === 0}
                  >
                    <Airplane className="size-4 text-brand-500 stroke-2" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
        {showAuth && (
          <Auth
            onLogin={() => {
              setShowAuth(false);
            }}
          />
        )}
      </div>
      {shared.isMaintenance && (
        <div className="bg-gray-100 p-1 px-4 text-center">
          <p className="text-sm">
            ⚠️ Service is under maintenance — messaging is temporarily disabled.
          </p>
        </div>
      )}
    </section>
  );
}
