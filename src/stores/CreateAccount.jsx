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
      setTimeout(() => navigate("/login"), 1500); // Redirect to login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-primary-600">
          Create Account
        </h1>

        <div>
          <input
            type="email"
            placeholder="type user"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="type user123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          onClick={handleCreateAccount}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition duration-200"
        >
          Create Account
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
