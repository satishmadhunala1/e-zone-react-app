import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Invalid Credentials! Both fields are required.");
      return;
    }

    const userData = JSON.parse(localStorage.getItem(email));
    if (userData && userData.password === password) {
      setSuccess("Login Successful");
      setTimeout(() => navigate("/"), 1500); // Redirect to the home page
    } else {
      setError("Invalid Credentials or User Not Found");
    }
  };

  return (
    <div className="login-card">
      <h1>Login</h1>
      <div className="form-group">
        <input
          type="email"
          placeholder="type user123"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="type 1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
      <button onClick={handleLogin} className="auth-button">
        Login
      </button>
      <p className="toggle-text">
        New here?{" "}
        <span onClick={() => navigate("/create-account")} className="link-text">
          Create Account
        </span>
      </p>
    </div>
  );
};

export default Login;
