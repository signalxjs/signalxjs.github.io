# SignalX docs — shared agent guide

> ⚠️ **BRANCH FIRST — never work on `main`.** Before touching ANY file, create a
> worktree (`pnpm wt new <N-short-slug>`) and do everything from
> `<repo>/branches/<N-short-slug>`. This applies to every change, however small —
> editing or committing in the primary checkout (`<repo>/main`) causes conflicts
> for parallel sessions. Check yourself before every commit:
> `git branch --show-current` must print your worktree's branch name — if it
> prints `main` or nothing (detached HEAD), stop.
> Already edited files in `main` by mistake? Move the work, don't commit it:
> `git stash -u` → `pnpm wt new <N-short-slug>` →
> `cd <repo>/branches/<N-short-slug>` → `git stash pop`.

Canonical guidance for **any** AI agent working in this repo (Claude Code, GitHub
Copilot CLI, work agents, …). Tool-specific notes live in `CLAUDE.md`; it defers
here for everything shared — when it conflicts with this file, the tool-specific
file wins for that tool only.

This repo follows the sigx standard agent setup from
[`signalxjs/repo-template`](https://github.com/signalxjs/repo-template) (this file
+ `scripts/worktree.mjs` + `CLAUDE.md`). The section
**"Keeping the docs in sync with the source repos"** below is what's special about
*this* repo — it is the docs **site**, so most of its work is reflecting changes
that originate elsewhere.

`@sigx/docs` (deployed at <https://sigx.dev> from `signalxjs/signalxjs.github.io`)
is the documentation site for **all** of SignalX. It's a sigx app built with
SignalX's own static-site generator (`@sigx/ssg`, via `sigx build`). Content is:

- **Per-area pages** under `src/pages/<area>/` — one area per source repo (see the
  map below). MDX with frontmatter; the SSG builds nav from it.
- **The module registry** `src/lib/modules.ts` — the machine-readable list of
  `core` and `lynx` packages (npm name, version, downloads, status). It drives the
  `/core/packages/*` and `/lynx/modules/*` pages; `pnpm gen:modules` scaffolds the
  per-module MDX stubs from it (idempotent — it never overwrites hand-authored
  content).
- **Long-form MDX** under `src/content/` (blog, snippets).

The site is **deployed automatically** on every push to `main`
(`.github/workflows/deploy-docs.yml` → GitHub Pages). There is no separate
release step — merge to `main` *is* publish.

## Development workflow (issue → PR → Copilot review → merge)

**This is mandatory for EVERY agent-driven change — including one-line fixes.
Never commit straight to `main`.** Repo: `signalxjs/signalxjs.github.io`, base
branch `main`. (Human contributors follow `CONTRIBUTING.md`, where an issue is
optional; for agents the issue-first flow below is required.)

1. **Issue first.** If no GitHub issue already tracks the work, create one *before*
   writing code and put the plan in it:
   ```sh
   gh issue create --title "<concise title>" --body "<what & why, plus the plan/checklist>"
   ```
   If you worked in plan mode, the approved plan **is** the issue body. Note the
   number it returns (`#N`).

2. **Worktree, always.** Never work on `main`. `pnpm wt new <N-short-slug>` gives
   an isolated checkout on branch `<N-short-slug>`. Don't substitute
   `git switch -c` in the primary checkout — it occupies `<repo>/main`, which
   parallel sessions share.

3. **Implement & verify.** Make the change, then prove it: `pnpm typecheck`,
   `pnpm test`, and `pnpm build` (a docs build catches broken MDX, dead links to
   collections, and registry/type errors — it's the real gate for a docs site).
   Stage specific files (`git add <path>`), never `git add -A`. No co-author
   trailers.

4. **Open a PR with Copilot as the reviewer.** Reference the issue so it auto-closes
   on merge:
   ```sh
   gh pr create --base main --title "<title>" \
     --body "Closes #N. <short summary of the change>" --reviewer @copilot
   ```
   The PR description becomes the squash commit **body** verbatim, and the PR
   title (with ` (#<pr>)` appended) becomes its subject — see step 6. Write the
   description as the commit body you want on `main`.
   (On an already-open PR: `gh pr edit <pr> --add-reviewer @copilot`.) If your `gh`
   is too old to resolve `@copilot` (error: `'@copilot' not found`), request it via
   the API instead — don't skip it:
   ```sh
   gh api --method POST repos/signalxjs/signalxjs.github.io/pulls/<pr>/requested_reviewers \
     -f 'reviewers[]=copilot-pull-request-reviewer[bot]'
   ```

5. **Wait for Copilot's review, then fix.** Do not merge before it has reviewed.
   Address every actionable comment with follow-up commits and push; re-request
   review if it doesn't re-trigger. Repeat until there's no remaining feedback.

6. **Merge it yourself** once Copilot's feedback is resolved AND CI is green (squash
   — repo rules block merge commits) and clean up:
   ```sh
   pr=123                                     # your PR number (digits only)
   gh pr checks "$pr"                         # all green first
   gh pr merge "$pr" --squash --delete-branch \
     --subject "$(gh pr view "$pr" --json title -q .title) (#$pr)" \
     --body "$(gh pr view "$pr" --json body -q .body)"
   pnpm wt rm <name>
   ```
   Pass `--subject`/`--body` explicitly, exactly as above — GitHub appends
   `Co-authored-by:` trailers to every message it generates itself (in **all**
   squash-message modes, even PR_TITLE/PR_BODY) whenever a branch-commit author
   differs from the merging account; an explicit message is used verbatim, so
   no trailers.
   Merging to `main` triggers the Pages deploy automatically.

## Build, Test, Lint

```bash
pnpm install
pnpm dev          # sigx dev server (Vite picks a free port)
pnpm build        # sigx build → static site in dist/ (run before any PR)
pnpm preview      # serve the built dist/ locally
pnpm test         # vitest run
pnpm test:watch
pnpm typecheck    # tsgo --noEmit
pnpm gen:modules  # scaffold MDX stubs for every module in src/lib/modules.ts (idempotent)
```

> `pnpm gen:modules` needs **Node ≥ 22.18** — it imports `src/lib/modules.ts`
> directly and relies on native TypeScript type-stripping. The repo's `engines`
> also allow Node 20, which runs everything else but will fail this one step.

## Keeping the docs in sync with the source repos

This site documents code that lives in **other** repos. The hard part isn't
fetching a version number — it's knowing **which repo a doc area comes from** and
**what changed**. That knowledge lives here.

### Which repo backs which docs (the source map)

| Docs area (`src/pages/…`) | Source repo | Registry-backed? |
|---|---|---|
| `core/` (`api`, `docs`, `packages`), `vite/` | [`signalxjs/core`](https://github.com/signalxjs/core) | **Yes** — `parent: 'core'` rows in `src/lib/modules.ts` (`sigx`, `@sigx/reactivity`, `@sigx/runtime-core`, `@sigx/runtime-dom`, `@sigx/vite`) |
| `lynx/` (`docs`, `modules`) | [`signalxjs/lynx`](https://github.com/signalxjs/lynx) | **Yes** — `parent: 'lynx'` rows (`@sigx/lynx`, `@sigx/lynx-*`) |
| `server/` (`packages`) — a collection spanning two repos | [`signalxjs/core`](https://github.com/signalxjs/core) (`@sigx/server-renderer`) + [`signalxjs/ssr-islands`](https://github.com/signalxjs/ssr-islands) (`@sigx/ssr-islands`) | **Yes** — `parent: 'server'` rows (`server-renderer`, `ssr-islands`); the two packages are versioned independently |
| `store/` | [`signalxjs/store`](https://github.com/signalxjs/store) | No — hand-written guide/API pages |
| `router/` (`api`, `docs`) | [`signalxjs/router`](https://github.com/signalxjs/router) | No |
| `ssg/` | [`signalxjs/ssg`](https://github.com/signalxjs/ssg) | No |
| `daisyui/` (`api`, `docs`) | [`signalxjs/daisyui`](https://github.com/signalxjs/daisyui) | No |
| `cli/` | [`signalxjs/cli`](https://github.com/signalxjs/cli) | No |
| `devtools/` | [`signalxjs/devtools`](https://github.com/signalxjs/devtools) | No |
| `terminal/` | [`signalxjs/terminal`](https://github.com/signalxjs/terminal) | No |
| `monaco/` | [`signalxjs/monaco-editor`](https://github.com/signalxjs/monaco-editor) | No |
| `blog/` | (this repo) | n/a |

**The npm → repo rule:** the web umbrella package is **`sigx`** (published from
`signalxjs/core`); everything else is **`@sigx/<x>`**, published from
**`signalxjs/<x>`** — *except the two monorepos*: `signalxjs/core` also publishes
`@sigx/reactivity`, `@sigx/runtime-core`, `@sigx/runtime-dom`,
`@sigx/server-renderer`, `@sigx/vite`; and `signalxjs/lynx` publishes all
`@sigx/lynx*`. The authoritative package lists are `src/lib/modules.ts` (core +
lynx) and the `@sigx/*` entries in `package.json` (what the site builds against).

### Refresh playbook — after a source repo releases

1. **Find what's behind.** For a `core`/`lynx` package, compare its `version` in
   `src/lib/modules.ts` to npm's latest (`npm view <pkg> version`). For the others,
   check the source repo's latest release / `CHANGELOG.md`.
2. **Read what changed.** Start from this repo's docs-issue queue — the source
   repo filed an issue here for each user-facing change, linking its source PR
   (see "How a sync gets triggered"). Cross-check the source repo's
   `CHANGELOG.md` (or release notes) for anything else since the version the
   docs currently reflect — new or changed public API, new packages/modules,
   removed features.
3. **Update the docs:**
   - Bump the matching `@sigx/*` / `sigx` range in `package.json` so live-code
     examples build against the new version. (Routine bumps arrive via Dependabot;
     do it by hand when you're writing the docs for a specific release.)
   - For `core`/`lynx`: update `version` (and `downloads`, if tracked) in
     `src/lib/modules.ts`.
   - **New package/module?** Add a registry row (`core`/`lynx`) or a new
     `src/pages/<area>/` section, then run `pnpm gen:modules` to scaffold its stub
     pages, and fill them in.
   - Write/refresh the affected MDX guide & API pages under `src/pages/<area>/`.
4. **Verify:** `pnpm gen:modules` (should produce no surprise changes),
   `pnpm typecheck`, `pnpm test`, `pnpm build`.
5. **PR** per the workflow above — `Closes #N` for every queue issue the
   update covers. Merge to `main` deploys automatically.

### How a sync gets triggered

- **The docs-issue queue (primary).** Every source repo files an issue **here**
  before merging a user-facing change (the sigx standard from
  [`signalxjs/repo-template`](https://github.com/signalxjs/repo-template)),
  titled `<repo>: <what changed>` and linking the source PR. When the source
  repo cuts a release, it comments the release tag on each issue that release
  ships (`Released in <repo> vX.Y.Z.`). Work the queue oldest-first
  (`gh issue list --search "sort:created-asc" --limit 200`):
  - An issue **with** a release comment is ready — follow the playbook for its
    area and close the issue from the docs PR (`Closes #N`).
  - An issue **without** a release comment is merged upstream but not yet
    released — **don't document it yet** (docs track what users can install;
    see the beta-soak note below).
- **On demand** — "update the docs for the `<repo>` `<version>` release." Follow the
  playbook for that one area, closing any queue issues that release covers.
- **Routine dependency bumps** — Dependabot opens `@sigx/*` bump PRs; patch bumps
  auto-merge and redeploy.
- **Scheduled (future)** — a scheduled agent can diff npm `latest` against
  `src/lib/modules.ts` and open a sync PR when an area is behind. Not wired up yet
  (tracked separately).

> Releases follow a **beta-soak-then-promote** model in the source repos (publish
> `beta`, soak, then `npm dist-tag … latest`). Docs track **`latest`**, not the tag
> — don't document a version users can't `npm install` yet.

## Parallel work with git worktrees

```sh
pnpm wt new <name> [--from <branch>]   # worktree at <repo>/branches/<name>: own branch + deps installed
pnpm wt list                           # show all worktrees
pnpm wt rm <name> [--force]            # remove a worktree
```

Layout convention (all sigx repos): the primary checkout lives at `<repo>/main`
and every worktree at `<repo>/branches/<name>`. `pnpm wt new` creates the checkout
there on a new branch `<name>` and runs `pnpm install`. Launch a **separate agent
session from the worktree directory**; sessions stay independent per directory.

## Conventions & working principles

- **Plan first for non-trivial work.** Use the CLI's built-in plan mode.
- **Verify before declaring done.** Run `pnpm build` for content/registry changes — a green build is the evidence; show it.
- **Don't overwrite generated stubs by hand-editing the generator.** `gen:modules` is idempotent; hand-authored MDX is the source of truth and survives re-runs.
- **Minimal, surgical edits.** Don't restructure pages or nav unrelated to your change.
- **Cross-platform paths**: contributors and CI run on Windows, macOS and Linux — prefer Node scripts over shell one-liners for anything committed.
- **Git hygiene**: stage specific files (`git add <path>`), never `git add -A` / `git add .`. Run `pnpm typecheck` before any commit touching `.ts`. No co-author trailers.

## Adopting / updating this setup

The portable parts (`scripts/worktree.mjs`, `CLAUDE.md`, and the standard sections
of this file) come from
[`signalxjs/repo-template`](https://github.com/signalxjs/repo-template). If you
change the shared **workflow/process**, make the change there too so every sigx
repo stays in step — only the "Keeping the docs in sync" section is unique to this
repo.
