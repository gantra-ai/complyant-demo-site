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
          <img src={`${import.meta.env.BASE_URL}seal.svg`} width="48" height="48" />
          <span className="brand-name">Bureau of Workforce Programs</span>
        </div>
        <nav className="site-nav">
          <Link to="/">Home</Link>
          <Link to="/apply">Apply</Link>
          <Link to="/statistics">Statistics</Link>
          <Link to="/contact">Contact</Link>
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
      </footer>
    </div>
  );
}
