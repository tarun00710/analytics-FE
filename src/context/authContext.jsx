import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContextProvider = createContext();

const AuthContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async ({ email, password }) => {
    const response = await axios.post("https://analytics-dashboard-be.vercel.app/api/auth/login", {
      email,
      password,
    });
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContextProvider.Provider value={{ login, logout, token }}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export const useAuth = () => useContext(AuthContextProvider);

export default AuthContext;
