import { mountApp } from "./main";

document.addEventListener("DOMContentLoaded", () => {
  mountApp("#root", { openRouterKey: import.meta.env.VITE_OPENROUTER_KEY });
});
