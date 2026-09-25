export default function Contact() {
  return (
    <>
      <h1>Contact the Bureau</h1>
      <p>Call 1-800-555-0199, weekdays 8 a.m. to 6 p.m. Eastern.</p>

      <div className="search">
        <input type="search" placeholder="Search office locations" />
        <button type="submit">Search</button>
      </div>

      <h4>Follow us</h4>
      <div className="social">
        <a href="https://example.com/bwp-updates">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1 4.2 4.2 0 0 0-7.2 3.8A12 12 0 0 1 3 4.6a4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.5 8.5 0 0 1 2 18.6 12 12 0 0 0 8.5 20.5c7.8 0 12-6.4 12-12v-.5A8.6 8.6 0 0 0 22 5.8z" fill="currentColor" />
          </svg>
        </a>
        <a href="https://example.com/bwp-video">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7a31 31 0 0 0 0 10 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 0-10zM9.8 15.2V8.8l5.8 3.2-5.8 3.2z" fill="currentColor" />
          </svg>
        </a>
      </div>

      <img src={`${import.meta.env.BASE_URL}seal.svg`} width="32" height="32" />
      <h4>Regional offices</h4>
      <ul>
        <li>Northeast: 40 Federal Plaza, Suite 900</li>
        <li>Southeast: 1200 Peachtree Street, Floor 4</li>
        <li>West: 450 Golden Gate Avenue, Room 12</li>
      </ul>
    </>
  );
}
