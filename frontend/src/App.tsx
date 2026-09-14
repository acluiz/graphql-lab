import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

type User = {
  id: string;
  name: string;
};

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

  return (
    <>
      {loading && <p>Loading</p>}

      {!loading && (
        <ul>
          {data?.users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
