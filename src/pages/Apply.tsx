import { useState } from "react";

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [ssn, setSsn] = useState("");

  const nameMissing = submitted && name.trim() === "";
  const ssnMissing = submitted && ssn.trim() === "";

  return (
    <>
      <h1>Apply for benefits</h1>
      <p>Complete every field. Your claim is reviewed within ten business days.</p>

      <form
        className="claim-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="field">
          <span>Full name</span>
          <input
            id="applicant"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={nameMissing ? { borderColor: "#d00" } : undefined}
          />
        </div>

        <div className="field">
          <span>Social Security number</span>
          <input
            id="applicant"
            type="text"
            value={ssn}
            onChange={(event) => setSsn(event.target.value)}
            // A "mask" that keeps focus in the field until nine digits are
            // typed. Tab and Shift+Tab are swallowed, so a keyboard user
            // cannot leave it: a keyboard trap.
            onKeyDown={(event) => {
              if (event.key === "Tab" && ssn.replace(/\D/g, "").length < 9) event.preventDefault();
            }}
            style={ssnMissing ? { borderColor: "#d00" } : undefined}
          />
        </div>

        <div className="field">
          <span>Date of last employment</span>
          <input type="date" />
        </div>

        <div className="field">
          <span>Weekly wage before separation</span>
          <input type="number" tabIndex={1} />
        </div>

        <div className="field">
          <span>Reason for separation</span>
          <select tabIndex={2}>
            <option>Layoff</option>
            <option>Reduction in hours</option>
            <option>Contract ended</option>
          </select>
        </div>

        <div className="actions">
          <button type="submit">Submit claim</button>
          <button type="button" className="icon-button" onClick={() => window.print()}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
