export default function OrderStatus({ status }) {
  return (
    <span className={`status ${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
