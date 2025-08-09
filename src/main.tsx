import { createRoot } from "react-dom/client";
import "./index.css";
import { Widget } from "./src/components/widget";

let root: ReturnType<typeof createRoot> | null = null;

type WidgetConfig = {
  openRouterKey: string;
};

let globalConfig: WidgetConfig | null = null;

export function mountApp(selector = "#app", config?: WidgetConfig) {
  const container = document.querySelector(selector);
  if (!container) {
    console.error("Container not found for selector:", selector);
    return;
  }
  globalConfig = config || null;

  root = createRoot(container);
  root.render(<Widget openRouterKey={globalConfig?.openRouterKey || ""} />);
}
