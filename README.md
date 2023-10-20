# [Croboost](https://croboost.com)

Croboos is a browser extension and developer tool for remixing websites. Let's make the web fun.

If you're just interested in just trying it out, go to our [Croboost](https://croboost.com).

Continue if you want to use it in real world websites.

## Croboost as a Browser Extension

> **Note:** Croboost is pending approval on the Chrome Extension Store. For now, you can manually integrate it via Developer Mode. We currently only support Chrome and Chromium Browsers (Edge, Arc, Brave, Opera, etc.)

1. [Click to download the project ZIP](https://github.com/emanation-ai/croboost-chrome-extension/archive/refs/heads/master.zip)
2. Unzip `croboost-chrome-extension-master.zip`.
3. Type `chrome://extensions` in your URL address bar
4. Activate Developer Mode
5. Click Load Unpacked
6. Select the `croboost-chrome-extension-master` folder
7. Profit.

## Inspiration

**The Web is boring.**

Monotonous dashboards. Identical interfaces. All apps look the same.

**The Web should be fun.**

Our earliest memories, friends, and identities were made on the web. Deep in IRC chats and custom MySpace CSS and random Wikipedia docs, we found a home–a home in a community of folks who also found the Web fun.

While the Web has matured over the past couple years, there’s an undeniable charm to it’s more hackable and playful past.


## What it does

**Remix the web.** Croboost is a browser extension and developer tool that allows internet users to easily remix, reimagine, and reshare web interfaces.

Imagine being able to hover on any part of the page, ask an AI to change it to your desires, and see your creation live – that’s Croboost.


## How we run backend

- after install packages with ``` npm install  ``` or ``` yarn install ``` run this command:
```
  node index.js
```

## Challenges we ran into

- **Unreliability of LLMs** — GPT-4 hallucinated (made stuff up) multiple times or didn’t know the answer to various questions when testing — we couldn’t build directly on top of OpenAI and needed to connect GPT-4 to other tools. We connected it to a web browser using langchain.js and had it fetch factual information/documentation for tools from websites if it was unsure about the answer.
- **DOM structure is hard** – we had to deal with ways to handle wrapper elements, excessive attributes, and overriding classes
- **Designing the UI** – creating a very intuitive UI, especially for remixing use, is extremely difficult. We eventually landed on a very similar approach to v0.dev’s select tool
- **CSR/CORS + Devtool fun** – creating a secure, safe, and robust developer tool and chrome extension, while ensuring security requirements are met took many arduous hours of crying

## What's next for Umix

We made small demo post on Twitter (X) 12 hours ago and has been **viewed 25,000+ times**.

We already have **80** people on our waitlist (as of 4 am)

**It’s time to make the Web fun. Together, we can remix the web.**
