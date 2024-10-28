import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login,token} = useAuth();
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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login(formData)
      .then((res) => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login_form">
      <form className="login" onSubmit={onSubmitHandler}>
        <h2>Welcome, User!</h2>
        <p>Please log in</p>
        <div className="form_content">
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input type="submit" value="Log In" />
          <button>Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
