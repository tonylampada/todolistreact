import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { Todo } from "./types";
import Input2 from "./Input2";

function TodoList2() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("todos").get();
      const newTodos = data.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));
      setTodos(newTodos);
    };
    fetchData();
  }, []);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now().toString(), text };
    setTodos([...todos, newTodo]);
    db.collection("todos").doc(newTodo.id).set(newTodo);
  };

  function handleDelete(id: string) {
    db.collection("todos").doc(id).delete();
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <Input2 onAddTodo={handleAddTodo}/>
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <p>{todo.text}</p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default TodoList2;
