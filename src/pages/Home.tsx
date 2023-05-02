import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to my appp</h1>
      <p>Go to the <Link to="/todo-list">Todo List</Link></p>
    </div>
  );
}

export default Home;
