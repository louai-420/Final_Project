import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/home";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import Orders from "./Components/Orders";
import Products from "./Components/ProductList";
import Logout from "./Components/Logout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/productList" element={<Products />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
