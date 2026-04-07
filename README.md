# Seed UI — Five Presentation Layers for Agents

You built an agent that produces structured data. It’s hard to read. This renders that data into five distinct, human-usable interfaces. A stateless presentation service that returns clean HTML. Deployable anywhere that runs Cloudflare Workers.

---

## Why this exists
Agent interfaces often lock you into a single layout. You shouldn’t rebuild your frontend each time your agent outputs a new data type. Seed UI sits between your agent and the user: it accepts plain JSON and returns semantic HTML. Nothing more.

## What makes this different
- It does not own your data. It is stateless by design—each request stands alone.
- Minimal client footprint. A single Cloudflare Worker file (~300 lines) with zero dependencies.
- You don't extend it. You fork it. Change anything; never wait for upstream.
- Compatible with any agent outputting JSON, not just Cocapn.

## Live Demo
Test it now with any JSON payload:
[https://the-fleet.casey-digennaro.workers.dev/seed-ui](https://the-fleet.casey-digennaro.workers.dev/seed-ui)

Append `?layer=` to see your data render instantly.

---

## Quick Start
1. **Fork** this repository.
2. **Deploy** using `npx wrangler deploy` (requires a free Cloudflare account).
3. **Tweak** the layer templates in `src/index.ts` to match your data and style.

## How it Works
Seed UI is a single Cloudflare Worker. It accepts JSON and a `layer` parameter via HTTP request, runs the matching template function, and returns semantic HTML. Every request is independent.

## Presentation Layers
Five purpose-built templates for common agent outputs:
- **Spreadsheet**: Tabular data and structured lists.
- **Messenger**: Conversational threads and dialogue.
- **Feed**: Chronological event or log streams.
- **Matrix**: Relationship grids and cross-references.
- **Research Lab**: Experimental or exploratory workspaces.

## Features
- Zero dependencies. Pure TypeScript, HTML, and CSS.
- Fork-first philosophy. You own your presentation layer completely.
- Semantic, accessible markup. Style it without fighting overrides.
- Theme selection via URL parameter (`?theme=dark`).
- Content Security Policy (CSP) headers pre-configured.
- Optional Cloudflare KV binding for stateful features (disabled by default).

## One Limitation
This is a stateless renderer. It does not store, persist, or manage user data between requests. For session-based features, you must bring your own state layer (e.g., Cloudflare KV).

---

MIT License • Superinstance & Lucineer (DiGennaro et al.)

---

<div align="right">
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> • 
  <a href="https://cocapn.ai">Cocapn</a>
</div>