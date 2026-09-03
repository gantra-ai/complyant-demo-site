/**
 * Babel plugin: stamp `data-src="src/pages/Apply.tsx:42"` on every JSX element
 * whose tag is a native element (lowercase name), never on a component.
 *
 * The path is relative to the repo root, the line is 1-based. That string is
 * what an accessibility scanner reads off a rendered element to trace it back
 * to source. A component tag is skipped because it is not what ends up in the
 * DOM; the native tags inside it are, and they carry their own line.
 */
import { relative } from "node:path";

export default function dataSrc({ types: t }) {
  return {
    name: "data-src",
    visitor: {
      JSXOpeningElement(path, state) {
        const name = path.node.name;
        if (!t.isJSXIdentifier(name) || !/^[a-z]/.test(name.name)) return;
        if (path.node.attributes.some((a) => t.isJSXAttribute(a) && a.name.name === "data-src")) return;
        const file = relative(state.opts.root || process.cwd(), state.filename).split("\\").join("/");
        const line = path.node.loc ? path.node.loc.start.line : 0;
        path.node.attributes.push(
          t.jsxAttribute(t.jsxIdentifier("data-src"), t.stringLiteral(`${file}:${line}`)),
        );
      },
    },
  };
}
