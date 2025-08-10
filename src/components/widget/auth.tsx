import { useSetAtom } from "jotai";
import { FormEvent, useState } from "react";
import { logInAtom } from "../../models/user/atom";

type Props = {
  onLogin(): void;
};

export function Auth({ onLogin }: Props) {
  const logIn = useSetAtom(logInAtom);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    logIn({
      email: form.email,
    });
    onLogin();
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 backdrop-blur-xs bg-[#fff8] grid place-items-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-4/5 p-4 rounded-lg ring ring-white backdrop-blur-sm bg-[#fff4] shadow-sm mx-auto flex flex-col items-stretch gap-4 justify-center"
      >
        <label className="text-sm font-medium text-brand-700" htmlFor="email">
          <span className="block mb-1 text-sm">E-mail</span>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            placeholder="johnmcdoe@gmail.com"
            className="p-2 pr-8 ring ring-brand-300 rounded-lg w-full focus:outline-none focus:ring-brand-500 focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />
        </label>
        <label
          className="text-sm font-medium text-brand-700"
          htmlFor="password"
        >
          <span className="block mb-1 text-sm">Password</span>
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            placeholder="********"
            className="p-2 pr-8 ring ring-brand-300 rounded-lg w-full focus:outline-none focus:ring-brand-500 focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />
        </label>
        <button
          type="submit"
          className="bg-linear-to-r from-brand-400 to-brand-500 p-2 rounded-lg cursor-pointer text-white text-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
}
