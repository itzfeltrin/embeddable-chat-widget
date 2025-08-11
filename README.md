# Embeddable Chat Widget

A lightweight, customizable chat widget built with React, TypeScript, and Vite. Easily embed real-time chat functionality into any website or web application.

## Features

- ⚡️ Fast and modern React + TypeScript codebase
- 🛠️ Easy to embed in any site with a single script tag or npm install
- 🎨 Customizable styles and behavior

## Installation

**Via npm:**

```sh
npm install embeddable-chat-widget
```

**Or via pnpm:**

```sh
pnpm add embeddable-chat-widget
```

## Usage

### As a React Component

```tsx
import "@itzfeltrin/embeddable-chat-widget/dist/style.css";
import { Widget } from "@itzfeltrin/embeddable-chat-widget";

function App() {
  return <Widget openRouterKey="YOUR_API_KEY" />;
}
```

## Customizing Brand Colors

To customize the brand colors of the chat widget, you can define CSS variables in your stylesheet. Add variables ranging from `--color-brand-50` to `--color-brand-950` to override the default color palette. For example:

```css
:root {
  --color-brand-50: #f2f7fb;
  --color-brand-100: #d8e9f4;
  --color-brand-200: #b2d4ea;
  --color-brand-300: #7fb8dc;
  --color-brand-400: #4c9bce;
  --color-brand-500: #0071ba;
  --color-brand-600: #00609e;
  --color-brand-700: #004f82;
  --color-brand-800: #00385d;
  --color-brand-900: #002137;
  --color-brand-950: #00101b;
}
```

Place these variables in your global CSS to apply your custom brand colors to

### As a Script Tag

Add this to your HTML:

```html
<!-- React and ReactDOM (required for the widget) -->
<script src="https://unpkg.com/react@19.1.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@19.1.1/umd/react-dom.production.min.js"></script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@itzfeltrin/embeddable-chat-widget@latest/dist/embeddable-chat-widget.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@itzfeltrin/embeddable-chat-widget@latest/dist/embeddable-chat-widget.iife.js"></script>

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

## My approach

I think this was a really fun and different task — different in the sense that I’ve never done anything like it as part of an interview process before. It was fun most of the time… except when I couldn’t get the widget to build in external React projects.

One thing that caught my attention right away in the instructions was "Install and use the widget on a sample HTML page." So my first idea was to create the package and make it an IIFE available via a <script> tag — which I did. It was working great until I decided to also export it for EJS so I could use it in another React project. That’s when I ran into a ton of bugs, spent way too much time on them, and somehow broke the script tag version entirely. Right now, the <script> tag works fine if you target version 0.0.17 of the widget.

Regarding the actual code, I didn’t face too many issues to be honest. I used the stack I’m most comfortable with and had a great DX overall. The UI turned out pretty good in the end (IMHO), and I’m happy with it. A lot of the packages I pulled in definitely aren’t necessary for a project this small, but I figured this was the perfect time to show you the tools I like working with.

I ran out of time and wasn’t able to add tests (classic), so that would be the next thing I’d do. I’d also like to add some animations — probably using Framer Motion (yep, another library).

For the LLM, I went with OpenRouter. It’s not an actual LLM, but more like a wrapper around many of them, such as GPT-3.5, which is what I used here. If I had more time, I’d set up my own backend to connect with it so I wouldn’t have to put keys in the frontend. That backend could also handle extras like real authentication, user sessions, conversation history, maybe even a way to store context for returning users.
