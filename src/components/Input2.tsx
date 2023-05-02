import React, { useState } from "react";
// import { Todo } from "../types";

type Props = {
    onAddTodo: (text: string) => void;
};

function Input2({ onAddTodo }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text)
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Input2;
