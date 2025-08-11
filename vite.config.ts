import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [react(), tailwindcss()],
      build: undefined,
      root: undefined,
    };
  } else {
    return {
      plugins: [react(), tailwindcss()],
      build: {
        lib: {
          entry: "src/index.ts",
          name: "ChatWidget",
          formats: ["es", "cjs", "iife"],
          fileName: (format) =>
            format === "iife"
              ? "embeddable-chat-widget.iife.js"
              : `widget.${format}.js`,
        },
      },
      define: {
        "process.env": {},
      },
      rollupOptions: {
        external: (id: string) => {
          return id === "react" || id === "react-dom";
        },
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    };
  }
});
