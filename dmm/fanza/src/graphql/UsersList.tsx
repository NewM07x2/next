"use client"; // クライアントコンポーネントとして明示

import { useQuery } from 'urql';

const QUERY = `
  query {
    users {
      id
      name
    }
  }
`;

export default function UsersList() {
  const [result] = useQuery({ query: QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map((user: { id: string; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}