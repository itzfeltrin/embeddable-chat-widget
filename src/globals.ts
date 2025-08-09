import { mount } from "./main";

declare global {
  interface WidgetConfig {
    selector: string;
    openRouterKey: string;
  }

  interface Window {
    ChatWidget: {
      mount: (config: WidgetConfig) => void;
    };
  }
}

window.ChatWidget = {
  mount,
};
