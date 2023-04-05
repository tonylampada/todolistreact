import './App.css';
import TodoList from "./TodoList";
import TodoList2 from "./TodoList2";
import StoragePoc from "./StoragePoc";
import ImageDisplay from "./ImageDisplay";
import PubSubPoc from './PubSubPoc';
import Home from './Home';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <p>This is my toy project to learn react and firebase. See it on <a href="https://github.com/tonylampada/todolistreact">github</a>.</p>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/todo-list">Todo List</Link></li>
            <li><Link to="/todo-list2">Todo List 2</Link></li>
            <li><Link to="/storage-poc">Storage POC (save files to firebase storage)</Link></li>
            <li><Link to="/image-display">Image Display (display images from firebase storage)</Link></li>
            <li><Link to="/pubsub-poc">Pub-Sub POC</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/todo-list" Component={TodoList} />
          <Route path="/todo-list2" Component={TodoList2} />
          <Route path="/storage-poc" Component={StoragePoc} />
          <Route path="/image-display" Component={ImageDisplay} />
          <Route path="/pubsub-poc" Component={PubSubPoc} />
        </Routes>
      </div>
    </BrowserRouter>
  );

};

export default App;
