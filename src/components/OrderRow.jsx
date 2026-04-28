import { computeOrderTotal } from "../services/cart";

export default function OrderRow({ order }) {
  const total = computeOrderTotal(order);
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.placedOn}</td>
      <td>{order.lines.length} item(s)</td>
      <td>
        <span className={`status ${order.status}`}>{order.status}</span>
      </td>
      <td>${total.finalPrice.toFixed(2)}</td>
      <td>{order.creditedAmount > 0 ? `$${order.creditedAmount.toFixed(2)}` : "—"}</td>
    </tr>
  );
}
