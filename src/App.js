import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import Listings from "./views/Listings";
import Register from "./views/Register";
import Profile from "./views/Profile";
import SecSettings from "./views/SecSettings";
import CreatePost from "./views/CreatePost";
import BookingComponent from "./views/Booking";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Listings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/security" element={<SecSettings />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/booking/:id" element={<BookingComponent />} />
      </Routes>
    </div>
  );
}

export default App;
