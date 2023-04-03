import './App.css';
import TodoList from "./TodoList";
import TodoList2 from "./TodoList2";
import Home from './Home';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/todo-list">Todo List</Link></li>
            <li><Link to="/todo-list2">Todo List 2</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/todo-list" Component={TodoList} />
          <Route path="/todo-list2" Component={TodoList2} />
        </Routes>
      </div>
    </BrowserRouter>
  );

};

export default App;
