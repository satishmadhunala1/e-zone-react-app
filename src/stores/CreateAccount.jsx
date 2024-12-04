import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Invalid Credentials! Please provide valid email and password.");
      return;
    }

    if (localStorage.getItem(email)) {
      setError("User already exists!");
    } else {
      localStorage.setItem(email, JSON.stringify({ email, password }));
      setSuccess("Account Created Successfully!");
      setTimeout(() => navigate("/Login"), 1500); // Redirect to login page
    }
  };

  return (
    <div className="create-account-card">
      <h1>Create Account</h1>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
      <button onClick={handleCreateAccount} className="auth-button">
        Create Account
      </button>
      <p className="toggle-text">
        Already have an account?{" "}
        <span onClick={() => navigate("/Login")} className="link-text">
          Login
        </span>
      </p>
    </div>
  );
};

export default CreateAccount;
