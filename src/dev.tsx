import { mount } from "./main";

document.addEventListener("DOMContentLoaded", () => {
  mount({
    selector: "#root",
    openRouterKey: import.meta.env.VITE_OPENROUTER_KEY,
  });
});
