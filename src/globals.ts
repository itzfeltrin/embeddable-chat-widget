import { mountApp } from "./main";

declare global {
  interface Window {
    ChatWidget: {
      mount: (selector?: string, config?: { openRouterKey: string }) => void;
    };
  }
}

window.ChatWidget = {
  mount: mountApp,
};
