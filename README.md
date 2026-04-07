# Seed UI 🪴
You send JSON. You get clean HTML. No rebuilds, no npm install.

Your agent's output can become a spreadsheet, chat, timeline, matrix, or research lab.

**Live demo:** [the-fleet.casey-digennaro.workers.dev/seed-ui](https://the-fleet.casey-digennaro.workers.dev/seed-ui)  
Append `?layer=` to render any JSON.

## Quick Start
1.  Fork this repository.
2.  Deploy with `npx wrangler deploy` (free Cloudflare accounts work).
3.  Tweak the layer templates in `src/index.ts`. Done.

You own every line. No upstream changes will ever break your UI.

## How It Works
This is a single Cloudflare Worker. You send JSON and a layout name. It runs the matching template and returns semantic HTML. Every request is independent. All rendering happens on the edge; pages typically load in under 100ms.

## Key Details
- **5 Layouts:** spreadsheet, messenger, feed, matrix, research lab.
- **Zero Dependencies.** Pure TypeScript, HTML, and CSS.
- **No Required Schema.** Use the JSON you already output.
- **Themes:** Full dark/light mode via URL parameter.
- **Secure:** Built-in Content Security Policy headers.
- **Accessible:** Semantic markup that's easy to restyle.

## One Limitation
JSON payloads are limited to ~1 MB per request, as defined by the Cloudflare Worker runtime. This is a stateless renderer and will not store your data.

Open source, MIT license.
Attribution: Superinstance and Lucineer (DiGennaro et al.)

<div style="text-align:center;padding:16px;color:#64748b;font-size:.8rem"><a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#64748b">The Fleet</a> &middot; <a href="https://cocapn.ai" style="color:#64748b">Cocapn</a></div>