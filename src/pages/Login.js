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
      const response = await axios.post("http://localhost:5000/api/v1/login", { email, phone });
  
      console.log("API Response:", response.data); // ✅ Debugging log
  
      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/"); // ✅ Navigate to Home
      } else {
        setError(response.data.message || "Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      setError("Login failed. Please check your details.");
    }
  };
  
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
