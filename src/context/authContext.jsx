import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContextProvider = createContext();

const AuthContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const response = await axios.post(
      "https://analytics-dashboard-be.vercel.app/api/auth/login",
      {
        email,
        password,
      }
    );
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const message = await signup(formData);
        if (message) {
          alert(message); // Alert if the user already exists
        } else {
          navigate("/login"); // Navigate to login after successful signup
        }
      } else {
        await login(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const signup = async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { email, password }
      );
      if (response.status === 201) {
        return null; 
      }
      console.log(response,"Respo");
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data.message;
      }
      console.log(error.message);
    }
  };
  

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContextProvider.Provider value={{ login, logout, signup, token }}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export const useAuth = () => useContext(AuthContextProvider);

export default AuthContext;
