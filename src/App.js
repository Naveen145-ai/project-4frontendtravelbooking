import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <div>
              <Header cartItems={cartItems} />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




/* import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin"; // Import AdminLogin Page

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} /> 
        <Route path="/admin" element={<AdminPage />} />
        
        
        <Route
          path="/*"
          element={
            <div>
              <Header cartItems={cartItems} />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route 
                  path="/product/:id" 
                  element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} 
                />
                <Route 
                  path="/cart" 
                  element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
                />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;*/