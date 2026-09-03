import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NOTICES = [
  "Benefit payments for September are scheduled for the 15th.",
  "Regional offices are closed on federal holidays.",
  "Apply online to avoid a wait at the counter.",
];

export default function Home() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState(0);

  // A rotating notice with no way to pause or stop it.
  useEffect(() => {
    const timer = setInterval(() => setNotice((n) => (n + 1) % NOTICES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h1>Support for workers between jobs</h1>
      <img src={`${import.meta.env.BASE_URL}hero.svg`} className="hero" />

      <div className="notice-strip">{NOTICES[notice]}</div>

      <h3>What we do</h3>
      <p className="muted-text">
        The Bureau administers unemployment insurance, job training grants, and the workforce
        reemployment program for residents of all fifty states.
      </p>

      <div className="card-row">
        <div className="card" onClick={() => navigate("/apply")}>
          <strong>Apply for benefits</strong>
          <p>Start a new claim or continue a saved application.</p>
        </div>
        <div className="card" onClick={() => navigate("/statistics")}>
          <strong>Program statistics</strong>
          <p>Claims filed and paid, by region and month.</p>
        </div>
      </div>

      <p>
        To read the eligibility rules, <a href="/complyant-demo-site/apply">click here</a>.
      </p>
    </>
  );
}
