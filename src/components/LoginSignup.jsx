import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { login, signup, token } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const message = await signup(formData);
      console.log(message, "message");

      if (message) {
        setMessage(message);
      } else {
        navigate("/login");
      }
    } else {
      login(formData).catch(console.log);
    }
  };

  const onFormSubmit = () => {
    setIsSignup((prev) => !prev);
    setMessage("");
  };

  return (
    <div className="login_form">
      <form className="login" onSubmit={onSubmitHandler}>
        <h2>{isSignup ? "Create an Account" : "Welcome, User!"}</h2>
        <p>{isSignup ? "Please sign up" : "Please log in"}</p>
        <div className="form_content">
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {message && <p className="error_message">{message}</p>}
          <input type="submit" value={isSignup ? "Sign Up" : "Log In"} />
          <button type="button" onClick={onFormSubmit}>
            {isSignup ? "Go to Login" : "Go to Signup"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
