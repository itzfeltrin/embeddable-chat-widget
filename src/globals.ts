declare global {
  interface WidgetConfig {
    selector: string;
    openRouterKey: string;
    colorPalette?: {
      50?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
      950?: string;
    };
  }

  interface Window {
    ChatWidget: {
      mount: (config: WidgetConfig) => void;
    };
  }
}

window.ChatWidget = {
  mount: () => {},
};

export {};
