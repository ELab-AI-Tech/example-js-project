import UserCard from "../components/UserCard";
import { users } from "../data/users";

export default function UsersPage() {
  return (
    <section>
      <h1>Users</h1>
      <p className="muted">Customer directory. Avatars are placeholders.</p>
      <div>
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </section>
  );
}
