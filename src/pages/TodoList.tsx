import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Todo } from "../types";
import Input from "../components/Input";

// type Props = {
//   todos: Todo[];
// };

function TodoList () {

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = db.collection("todos").onSnapshot((snapshot) => {
      const newTodos: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));
      setTodos(newTodos);
    });
    return unsubscribe;
  }, []);

  function handleDelete(id: string) {
    db.collection("todos").doc(id).delete();
  };

  return (
    <>
      <Input />
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
