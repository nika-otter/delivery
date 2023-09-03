// src/components/Login.js

import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password }); // Change the URL to match your login API endpoint
      const userData = response.data;

      // Assuming your API returns user data upon successful login
      // You can store this user data in your Redux store or local state as needed
      console.log("User logged in:", userData);

      // Reset the form and clear any previous errors
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.response.data.error);

      // Display the error to the user
      setError(error.response.data.error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
