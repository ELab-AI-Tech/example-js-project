import OrderRow from "../components/OrderRow";
import { orders } from "../data/orders";

export default function OrdersPage() {
  return (
    <section>
      <h1>Orders</h1>
      <p className="muted">All transactions. Credited orders show the credited amount.</p>
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Placed</th>
              <th>Lines</th>
              <th>Status</th>
              <th>Total</th>
              <th>Credited</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <OrderRow key={o.id} order={o} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
