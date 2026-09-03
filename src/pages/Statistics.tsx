const ROWS = [
  ["Northeast", "48,210", "41,905", "86.9%"],
  ["Southeast", "62,884", "55,102", "87.6%"],
  ["Midwest", "39,417", "35,880", "91.0%"],
  ["Southwest", "27,305", "23,114", "84.7%"],
  ["West", "71,992", "63,450", "88.1%"],
];

export default function Statistics() {
  return (
    <>
      <h1>Program statistics</h1>
      <p>Claims filed and paid in the last quarter, by region.</p>

      <table className="stats">
        <tbody>
          <tr>
            <td>Region</td>
            <td>Claims filed</td>
            <td>Claims paid</td>
            <td>Paid rate</td>
          </tr>
          {ROWS.map(([region, filed, paid, rate]) => (
            <tr key={region}>
              <td>{region}</td>
              <td>{filed}</td>
              <td>{paid}</td>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Download the full dataset: <a href="/complyant-demo-site/statistics"></a>
      </p>
    </>
  );
}
