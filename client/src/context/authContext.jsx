import axios from "axios";
import { createContext, useEffect, useState } from "react";
  
export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("blog_user")) || null
  );
  
  const login = async (inputs) => { 
    const res = await axios.post("/api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/api/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem('blog_user');


  };

  useEffect(() => {
    localStorage.setItem("blog_user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};