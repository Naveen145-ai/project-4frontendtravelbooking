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
import GoogleTranslate from "./components/GoogleTranslate";
import OtpPage from "./pages/OtpPage"; // Correct path

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        {/* These routes are stand-alone (no Header/Translate) */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/verify-otp" element={<OtpPage />} />

        {/* These are routes WITH Header + Translate */}
        <Route path="/home" element={<WithLayout><Home /></WithLayout>} />
        <Route path="/product/:id" element={<WithLayout><ProductDetail cartItems={cartItems} setCartItems={setCartItems} /></WithLayout>} />
        <Route path="/cart" element={<WithLayout><Cart cartItems={cartItems} setCartItems={setCartItems} /></WithLayout>} />
        <Route path="/contact" element={<WithLayout><ContactUs /></WithLayout>} />
        <Route path="/about" element={<WithLayout><AboutUs /></WithLayout>} />
      </Routes>
    </Router>
  );
}

// Layout wrapper to apply Header + Translate
function WithLayout({ children }) {
  const [cartItems] = useState([]);
  return (
    <div>
      <Header cartItems={cartItems} />
      <GoogleTranslate />
      {children}
    </div>
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