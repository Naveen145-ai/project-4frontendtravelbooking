import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // ✅ Track login state

  console.log("Auth State:", isAuthenticated);  // ✅ Debugging

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Header cartItems={cartItems} />}  {/* ✅ Show Header only when logged in */}

        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/search" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={isAuthenticated ? <ProductDetail cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />} />
          <Route path="/cart" element={isAuthenticated ? <Cart cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isAuthenticated ? <ContactUs /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated ? <AboutUs /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;





/* import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import ProductDetail from './pages/ProductDetail';
import { useState } from 'react';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";



function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
   
      <div className="App">
        <Router>
          <div>
            <Header cartItems={cartItems} />
           

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </div>
        </Router>
      </div>
  
  );
}

export default App; */