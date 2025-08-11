import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [react(), tailwindcss()],
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
              : `embeddable-chat-widget.${format}.js`,
        },
        rollupOptions: {
          external: (id) => {
            // mark react and react-dom as external, but NOT your source files
            return id === "react" || id === "react-dom";
          },
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
      define: {
        "process.env": {},
      },
    };
  }
});
