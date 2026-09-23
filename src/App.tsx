import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Statistics from "./pages/Statistics";
import Contact from "./pages/Contact";

// The page title never changes between routes. Every screen reports the same
// document title to assistive technology.
export default function App() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="brand">
          <img src={`${import.meta.env.BASE_URL}seal.svg`} width="48" height="48" alt="Bureau of Workforce Programs seal" />
          <span className="brand-name">Bureau of Workforce Programs</span>
        </div>
        <nav className="site-nav">
          <Link to="/">Home</Link>
          <ProgramsMenu />
          <Link to="/apply">Apply</Link>
          <Link to="/statistics">Statistics</Link>
          <Link to="/contact">Contact</Link>
          <HelpButton />
        </nav>
      </header>
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>
          The Bureau of Workforce Programs is a fictional agency. This site exists to demonstrate
          accessibility remediation and contains deliberate defects.
        </p>
        <p className="site-credit">
          Built by{" "}
          <a href="https://gantra.tech" target="_blank" rel="noopener">
            Gantra Technologies
          </a>
        </p>
      </footer>
    </div>
  );
}

// A dropdown menu that opens on click and on Enter. Two deliberate defects:
// the button carries no aria-expanded, so its open state is never exposed, and
// Escape closes the menu but drops focus on the document body instead of
// returning it to the button.
function ProgramsMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        (document.activeElement as HTMLElement | null)?.blur();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="menu">
      <button type="button" className="menu-button" onClick={() => setOpen((v) => !v)}>
        Programs
      </button>
      {open && (
        <ul className="menu-list" role="menu">
          <li role="none">
            <Link role="menuitem" to="/apply" onClick={() => setOpen(false)}>
              Unemployment insurance
            </Link>
          </li>
          <li role="none">
            <Link role="menuitem" to="/statistics" onClick={() => setOpen(false)}>
              Job training grants
            </Link>
          </li>
          <li role="none">
            <Link role="menuitem" to="/contact" onClick={() => setOpen(false)}>
              Reemployment services
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

// A modal dialog with the role and label right and the keyboard handling
// wrong: focus never moves into it when it opens and nothing keeps focus
// inside it. Escape and the Close button both dismiss it.
function HelpButton() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button ref={trigger} type="button" className="help-button" onClick={() => setOpen(true)}>
        Get help
      </button>
      {open && (
        <div className="dialog-backdrop">
          <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="help-title">
            <h2 id="help-title">Get help with your claim</h2>
            <p>Call 1-800-555-0199, weekdays 8 a.m. to 6 p.m. Eastern, or visit a regional office.</p>
            <p>Have your claim number ready. A representative can look up a claim by name and date of birth.</p>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
