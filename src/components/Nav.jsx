import { NavLink } from "react-router-dom";

export default function Nav() {
  const cls = ({ isActive }) => (isActive ? "active" : "");
  return (
    <nav className="nav">
      <NavLink to="/dashboard" className={cls}>Dashboard</NavLink>
      <NavLink to="/orders" className={cls}>Orders</NavLink>
      <NavLink to="/users" className={cls}>Users</NavLink>
    </nav>
  );
}
