# Embeddable Chat Widget

A lightweight, customizable chat widget built with React, TypeScript, and Vite. Easily embed real-time chat functionality into any website or web application.

## Features

- ⚡️ Fast and modern React + TypeScript codebase
- 🛠️ Easy to embed in any site with a single script tag or npm install
- 🎨 Customizable styles and behavior
- 🔒 Built-in support for secure communication
- 🔌 Extensible with your own backend or chat provider

## Installation

**Via npm:**

```sh
npm install embeddable-chat-widget
```

**Or via yarn:**

```sh
yarn add embeddable-chat-widget
```

## Usage

### As a React Component

```tsx
import { Widget } from "@itzfeltrin/embeddable-chat-widget";

function App() {
  return <Widget openRouterKey="YOUR_API_KEY" />;
}
```

### As a Script Tag

Add this to your HTML:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@itzfeltrin/embeddable-chat-widget@0.0.17/dist/embeddable-chat-widget.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@itzfeltrin/embeddable-chat-widget@0.0.17/dist/embeddable-chat-widget.iife.js"></script>

<script>
  ChatWidget.mount({
    selector: "#root",
    openRouterKey: "YOUR_API_KEY",
    colorPalette: {
      50: "#f2f7fb",
      100: "#d8e9f4",
      200: "#b2d4ea",
      300: "#7fb8dc",
      400: "#4c9bce",
      500: "#0071ba",
      600: "#00609e",
      700: "#004f82",
      800: "#00385d",
      900: "#002137",
      950: "#00101b",
    },
  });
</script>
```

## Configuration

| Prop/Option     | Type   | Description                                                                    |
| --------------- | ------ | ------------------------------------------------------------------------------ |
| `selector`      | string | Element the widget is going to mount onto (required when using the script tag) |
| `openRouterKey` | string | Your API key (required)                                                        |
| `colorPalette`  | object | Color palette (optional — available only via `mount`)                          |

## Development

Clone the repo and install dependencies:

```sh
git clone git@github.com:itzfeltrin/embeddable-chat-widget.git
cd embeddable-chat-widget
pnpm install
```

Start the dev server:

```sh
pnpm dev
```
