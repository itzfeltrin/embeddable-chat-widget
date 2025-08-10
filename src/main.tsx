import { createRoot } from "react-dom/client";
import "./index.css";
import { Widget } from "./components/widget";

export function mount(config: WidgetConfig) {
  const container = document.querySelector(config.selector);
  if (!container) {
    console.error("Container not found for selector:", config.selector);
    return;
  }

  const root = createRoot(container);
  root.render(<Widget openRouterKey={config.openRouterKey} />);
}
