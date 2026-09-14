import { useState, type FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";
import { GET_USERS } from "../App";

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export function NewUserForm() {
  const [name, setName] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    if (!name) return;

    await createUser({
      variables: { name },
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USERS });

        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [...users, createUser],
          },
        });
      },
    });
  }

  return (
    <form onSubmit={handleCreateUser}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
