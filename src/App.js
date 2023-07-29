import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Listings from './views/Listings';
import Register from './views/Register';
import CreatePost from './views/CreatePost';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Listings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
