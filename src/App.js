import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Listings from './views/Listings';
import Register from './views/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Listings />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
