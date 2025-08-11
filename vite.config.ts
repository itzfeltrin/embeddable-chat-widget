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
          entry: "src/index.tsx",
          name: "ChatWidget",
          formats: ["es", "cjs", "iife"],
          fileName: (format) =>
            format === "iife"
              ? "embeddable-chat-widget.iife.js"
              : `embeddable-chat-widget.${format}.js`,
        },
      },
      define: {
        "process.env": {},
      },
      rollupOptions: {
        external: (id: string, { format }) => {
          if (format === "iife") {
            return false; // bundle React for IIFE
          }
          return ["react", "react-dom"].includes(id);
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
