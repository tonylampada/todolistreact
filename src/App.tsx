import React, { useState, useEffect } from "react";
import './App.css';
import { db } from "./firebase";
import Input from "./Input";
import TodoList from "./TodoList";
import { Todo } from "./types";

const App = () => {
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

  return (
    <div>
      <h1>My Todo App</h1>
      <Input />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
