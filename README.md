# Bureau of Workforce Programs (demo site)

A fictional agency portal with deliberate accessibility defects. It exists so
Complyant's remediation loop can be demonstrated end to end on a repository we
own: scan the deployed site, trace each defect to a line of source, draft a fix,
approve it, open a pull request, and gate the pull request in CI.

Live: https://gantra-ai.github.io/complyant-demo-site/

## The instrumented build

`plugins/data-src.js` is a Babel plugin wired through `@vitejs/plugin-react`.
It stamps every native JSX element with `data-src="src/pages/Apply.tsx:42"`
(path relative to the repo root, 1-based line). Complyant's scanner reads that
attribute off a rendered element, or its nearest ancestor that has one, and
records the file and line that produced the defect.

This demo ships the attribute in the production build on purpose. A customer
would enable it on staging builds only, for example by making the plugin
conditional on `mode === "staging"` in `vite.config.ts`.

## The deliberate defects

Every defect has a clean single-file fix.

| Where | What is wrong |
|---|---|
| `index.html` | `<html>` has no `lang` |
| `src/App.tsx` | "Programs" menu button has no `aria-expanded`, and Escape closes the menu without returning focus to the button; "Get help" opens a modal dialog that never moves focus into itself and does not keep it there |
| `src/App.tsx` | seal image has no `alt`; the document title never changes between pages |
| `src/pages/Home.tsx` | hero image has no `alt`; rotating notice has no pause; heading jumps h1 to h3; low-contrast paragraph; two `div`s with `onClick` used as buttons; a `role="button"` span with no `tabindex`; a "click here" link |
| `src/pages/Apply.tsx` | five inputs with no label; duplicate `id="applicant"`; positive `tabIndex`; the SSN field swallows Tab until nine digits are typed (a keyboard trap); missing-field error shown by border colour only; print icon button has no name |
| `src/pages/Statistics.tsx` | data table with no header cells; an empty link |
| `src/pages/Contact.tsx` | search input has no label; two icon links with no name; heading jumps h1 to h4 |

## CI gate

`.github/workflows/complyant.yml` calls Complyant's gate on every pull request
and on every push to `main`, and fails the job when the gate reports new
defects. `Jenkinsfile` does the same in one stage for Jenkins.

## Run it

```
bun install
bun run dev
```
