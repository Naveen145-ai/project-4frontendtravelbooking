import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // Admin Password Field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle User Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/register", {
        name,
        email,
        phone,
      });

      if (response.data.success) {
        
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  // Handle Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("http://localhost:5000/api/v1/adminlogin", {
        email,
        phone,
        password, // Send admin password for authentication
      });

      if (response.data.success) {
        navigate("/admin");
      } else {
        setError(response.data.message || "Admin login failed.");
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isAdmin ? "Admin Login" : "User Register"}</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        {isAdmin ? (
          // Admin Login Form
          <form onSubmit={handleAdminLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
           
            <button type="submit" style={styles.button}>Login</button>
          </form>
        ) : (
          // User Registration Form
          <form onSubmit={handleRegister} style={styles.form}>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Register</button>
          </form>
        )}

        {/* Toggle between Admin and User Registration */}
        <p onClick={() => setIsAdmin(!isAdmin)} style={styles.toggle}>
          {isAdmin ? "Switch to User Registration" : "Switch to Admin Login"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    backgroundImage: "url('/images/products/register.jpg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  card: { 
    background: "#fff", 
    padding: "30px", 
    borderRadius: "10px", 
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
    width: "350px", 
    textAlign: "center"
  },
  title: { 
    marginBottom: "20px", 
    fontSize: "24px", 
    color: "#333"
  },
  form: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "15px"
  },
  input: { 
    padding: "12px", 
    fontSize: "16px", 
    width: "100%", 
    borderRadius: "5px", 
    border: "1px solid #ccc"
  },
  button: { 
    padding: "12px", 
    fontSize: "16px", 
    background: "#007BFF", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer", 
    transition: "0.3s"
  },
  buttonHover: { 
    background: "#0056b3" 
  },
  error: { 
    color: "red", 
    fontSize: "14px"
  },
  success: { 
    color: "green", 
    fontSize: "14px"
  },
  toggle: { 
    marginTop: "15px", 
    color: "#007BFF", 
    cursor: "pointer", 
    textDecoration: "underline"
  }
};

export default Register;
