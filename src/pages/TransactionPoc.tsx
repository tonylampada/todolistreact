import React, { useState, useEffect } from "react";
import api from "../api/apimock.js"
import { Todo } from "../types";
import {NeverCalledError} from "../utils/force_serial_decorator";



function TransactionPoc() {

  let x = 0

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newTodos = await api.listAllTodos()
      setTodos(newTodos);
    };
    fetchData();
  }, []);


  async function save1(todoId:string){
    const _x = x++
    try{
      console.log(`save1... ${_x}`)
      const response = await api.save1(todoId, _x)
      console.log(`save1 ok ${_x}`)
    } catch (e) {
      console.log(`save1 fail ${_x}`)
    }
  }

  async function save2(todoId:string){
    const _x = x++
    try{
      console.log(`save2... ${_x}`)
      const response = await api.save2(todoId, _x)
      console.log(`save2 ok ${_x}`)
    } catch (e) {
      if (e instanceof NeverCalledError) {
        console.log(`save2 never called ${_x} ${e}`)
      } else {
        console.error(`save2 failed ${_x} ${e}`)
      }
    }
  }

  return (
    <div>
    {todos.map((todo) => (
      <div key={todo.id} className="todo-item">
        <button onClick={() => save1(todo.id)}>save1 {todo.id}</button>
        <button onClick={() => save2(todo.id)}>save2 {todo.id}</button>
      </div>
    ))}
    </div>
  );
}

export default TransactionPoc;
