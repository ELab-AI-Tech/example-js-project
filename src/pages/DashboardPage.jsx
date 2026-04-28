import { orders } from "../data/orders";
import { users } from "../data/users";
import { computeOrderTotal } from "../services/cart";

export default function DashboardPage() {
  const totals = orders.map((o) => computeOrderTotal(o));
  const grossSales = totals.reduce((a, t) => a + t.finalPrice, 0);
  const credited = orders.reduce((a, o) => a + o.creditedAmount, 0);
  const fulfilled = orders.filter((o) => o.status === "fulfilled").length;

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="muted">Overview of the orders book. (Demo target for Failure mode 5 — add CSV export here.)</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <div className="card">
          <div className="muted">Gross sales</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>${grossSales.toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="muted">Credited back</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>${credited.toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="muted">Fulfilled orders</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {fulfilled} / {orders.length}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 600 }}>Orders export</div>
            <div className="muted">No export available yet — that's the demo.</div>
          </div>
          <button disabled>Export CSV</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Customers</div>
        <div className="muted">{users.length} total</div>
      </div>
    </section>
  );
}
