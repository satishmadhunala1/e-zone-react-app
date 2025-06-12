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
      setTimeout(() => navigate("/"), 1500);
    } else {
      setError("Invalid Credentials or User Not Found");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-primary-600">Login</h1>

        <div>
          <input
            type="email"
            placeholder="type user123"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="type 1234"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm">
          New here?{" "}
          <span
            onClick={() => navigate("/create-account")}
            className="text-primary-600 cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
