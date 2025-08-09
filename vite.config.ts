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
          entry: "src/main.tsx",
          name: "ChatWidget",
          fileName: "embeddable-chat-widget",
          formats: ["iife"],
        },
      },
      define: {
        "process.env": {},
      },
    };
  }
});
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   build: {
//     lib: {
//       entry: "src/main.tsx",
//       name: "EmbeddableChatWidget",
//       fileName: "embeddable-chat-widget",
//       formats: ["iife"],
//     },
//   },
//   define: {
//     "process.env": {},
//   },
// });
