# Seed UI — Presentation Primitives for Agents

Build agent interfaces without adopting another framework. Seed UI provides five presentation layers that turn structured data into clean HTML.

---

## Why this exists

When building agents, you often need the same few views: a table, a chat, a feed. Most UI libraries are heavy, locked in, or force a specific stack. Seed UI is a stateless service that returns pure HTML. It's the standard presentation layer for vessels in the Cocapn Fleet.

Send raw data, specify a layer, get HTML back.

---

## What it is

A single Cloudflare Worker with zero dependencies. It accepts HTTP requests containing a `layer` parameter and your data, and returns the corresponding HTML structure.

You can fork and deploy your own copy in minutes. Change the styling, modify the templates, or add new layers—you own the code.

---

## Try it

Live instance: [https://the-fleet.casey-digennaro.workers.dev/ui/seed](https://the-fleet.casey-digennaro.workers.dev/ui/seed)

Test it from your browser by passing `layer` and `data` parameters.

---

## Quick Start

1.  Fork and clone the repository.
2.  Run `npx wrangler deploy` in the project directory.
3.  Modify the layer templates in `src/index.ts` to fit your data and style.

That's it. Your presentation service is live.

---

## Layers

Seed UI renders structured data into five view types:
*   **Spreadsheet**: A sortable, filterable table.
*   **Messenger**: A chronological chat interface.
*   **Feed**: A timeline of events or updates.
*   **Matrix**: A grid for labeled relationships.
*   **Research Lab**: A scratchpad for exploratory work.

The output is semantic HTML with basic, functional CSS. You are expected to customize it.

---

## How it works

1.  Your agent or service sends a request to your Seed UI endpoint.
2.  The request includes a `layer` parameter (e.g., `spreadsheet`) and your data as JSON.
3.  The Worker matches the layer to a template function and renders your data into an HTML string.
4.  You receive the HTML, ready to be embedded or styled.

---

## Notes & Limitations

*   **It's a starting point.** The default HTML and CSS are minimal. You will need to adapt the templates for production styling and interactivity.
*   **Stateless.** Each request is independent. For stateful features like pagination or live updates, you must implement the logic in your agent or bind a KV store (see below).
*   **No client-side JS by default.** The base output is static HTML. You can add JavaScript for enhanced interactivity in your fork.

---

## Optional: Add a KV store

For caching or simple state, bind a Cloudflare KV namespace to the `SEED_KV` environment variable in `wrangler.toml`. The worker's interface includes placeholder methods; implement them based on your vessel's needs.

---

## Contributing

The project follows a fork-first model. Improve your own copy first. If you have a change that would benefit the wider fleet, open a pull request. Discuss features in GitHub Issues.

---

## License

MIT License

Superinstance & Lucineer (DiGennaro et al.)

---

<div align="center">
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> • <a href="https://cocapn.ai">Cocapn</a>
</div>