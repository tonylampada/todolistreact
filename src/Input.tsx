import React, { useState } from "react";
import { db } from "./firebase";
import { Todo } from "./types";

const Input = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
      };
      db.collection("todos").doc(newTodo.id).set(newTodo);
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

export default Input;
