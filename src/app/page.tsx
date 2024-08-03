"use client";
import { useEffect, useState } from "react";

import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import { fetchUsers, User } from "../utils/utils";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      const users = await fetchUsers(debouncedSearch);
      setUsers(users);

      setLoading(false);
    };
    loadUsers();
  }, [debouncedSearch]);

  return (
    <div className="tutorial">
      <SearchBar onChange={setSearch} />
      {loading && <div>Loading...</div>}
      {!loading &&
        users.map((user) => {
          return <div key={user.id}>{user.name}</div>;
        })}
    </div>
  );
}
