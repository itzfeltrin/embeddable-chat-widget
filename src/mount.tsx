import "./index.css";
import { createRoot } from "react-dom/client";
import { Widget } from "./components/widget";

export function mount(config: WidgetConfig) {
  const container = document.querySelector(config.selector);
  if (!container) {
    console.error("Container not found for selector:", config.selector);
    return;
  }

  if (config.colorPalette) {
    Object.entries(config.colorPalette).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-brand-${key}`, value);
    });
  }

  const root = createRoot(container);
  root.render(<Widget openRouterKey={config.openRouterKey} />);
}
