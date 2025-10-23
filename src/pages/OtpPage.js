import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpPage = () => {
  const [otp, setOtp] = useState(""); // Store OTP input
  const [error, setError] = useState(""); // Store error message
  const [success, setSuccess] = useState(""); // Store success message
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://54.221.83.251:4000/api/v1/verify-otp", {
        otp, // Send OTP entered by the user
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after successful OTP verification
      } else {
        setError(response.data.message || "OTP verification failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Verify OTP</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleOtpSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Verify OTP</button>
        </form>
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
    backgroundRepeat: "no-repeat",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  success: {
    color: "green",
    fontSize: "14px",
  },
};

export default OtpPage;
