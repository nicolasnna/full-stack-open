import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

export const EditAuthor = ({ show }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS);

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading authors...</div>;
  }

  const authors = result.data.allAuthors;

  const submit = async (e) => {
    e.preventDefault();
    updateAuthor({ variables: { name: name, setBornTo: born } });

    console.log("editing author ...");

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthday</h3>
      <form onSubmit={submit}>
        name:
        <select defaultValue={""} onChange={(e) => setName(e.target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born:
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};
