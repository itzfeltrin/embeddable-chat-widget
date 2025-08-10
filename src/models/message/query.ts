import { SendMessageResponseSchema } from "./schema";

export function MessageClient(openRouterKey: string) {
  return {
    async sendMessage(content: string) {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content }],
        }),
      });
      const data = await res.json();
      return SendMessageResponseSchema.parse(data);
    },
  };
}
