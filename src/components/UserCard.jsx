export default function UserCard({ user }) {
  return (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span className="avatar" aria-hidden />
      <div>
        <div style={{ fontWeight: 600 }}>{user.name}</div>
        <div className="muted">{user.email}</div>
        <div className="muted">Joined {user.joinedOn}</div>
      </div>
    </div>
  );
}
