import { mount } from "./mount";

document.addEventListener("DOMContentLoaded", () => {
  mount({
    selector: "#root",
    openRouterKey: import.meta.env.VITE_OPENROUTER_KEY,
  });
});
