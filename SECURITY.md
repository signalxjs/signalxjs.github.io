# Security Policy

This repo holds the source for the SignalX documentation site at <https://sigx.dev/>. It is not a published npm package.

## Reporting a vulnerability in the published framework

For issues in the SignalX runtime / packages (e.g. `sigx`, `@sigx/runtime-core`, `@sigx/vite`, `@sigx/live-code`, `@sigx/monaco-editor`), please report through the relevant package repo:

- Core framework: <https://github.com/signalxjs/core/security/advisories/new>
- Live code: <https://github.com/signalxjs/live-code/security/advisories/new>
- Monaco editor: <https://github.com/signalxjs/monaco-editor/security/advisories/new>

## Reporting a vulnerability in the docs site itself

For issues specific to the docs site (XSS in user-supplied snippets, leaking secrets, mis-configured CSP, etc.):

**Please do not open a public GitHub issue.**

Use one of the following private channels:

1. **GitHub Security Advisories** — preferred. Open a private report at
   <https://github.com/signalxjs/docs/security/advisories/new>.
2. **Email** — contact the maintainer directly. See the `author` field in
   [`package.json`](./package.json) and the GitHub profile linked from there.

Please include:

- A description of the issue and its impact.
- Steps to reproduce, ideally a minimal proof of concept.
- Any suggested mitigation, if you have one.

## Response

- We aim to acknowledge new reports within a few business days.
- Once a fix is deployed, a security advisory will be posted on GitHub
  crediting the reporter (unless they prefer to remain anonymous).
