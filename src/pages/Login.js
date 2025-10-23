import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://54.221.83.251:4000/api/v1/login", { email, phone });

      console.log("API Response:", response.data);

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      } else {
        setError(response.data.message || "Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      setError("Login failed. Please check your details.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
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
      </div>
    </div>
  );
};

// CSS Styles
const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    backgroundImage: "url('/images/products/login.jpg')", // Background image
    backgroundSize: "cover", // Cover full background
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat" // No repeating
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
  }
};

export default Login;
