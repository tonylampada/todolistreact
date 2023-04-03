import React from "react";
import { db } from "./firebase";
import { Todo } from "./types";

type Props = {
  todos: Todo[];
};

const TodoList = ({ todos }: Props) => {
  const handleDelete = (id: string) => {
    db.collection("todos").doc(id).delete();
  };

  return (
    <>
      {todos.map((todo) => (
      <div key={todo.id} className="todo-item">
        <p>{todo.text}</p>
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
      </div>
      ))}
    </>
  );
};

export default TodoList;
