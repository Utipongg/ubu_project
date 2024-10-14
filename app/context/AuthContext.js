"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData(token);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);


  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("https://esanapi.utipong.info/auth/users/me/");
      setUser({
        token,
        username: response.data.username, 
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true); 
    try {
      const response = await axios.post("https://esanapi.utipong.info/authjwt/jwt/create/", {
        username,
        password,
      });

      const token = response.data.access; 
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; 


      fetchUserData(token);
      router.push("/dashboard"); 
    } catch (error) {
     
      setError(error.response ? error.response.data.detail : "Login failed");
      console.error("Login error:", error.response ? error.response.data : error.message);
      toast.error(error.response.data.detail, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null); 
    localStorage.removeItem("token"); 
    delete axios.defaults.headers.common["Authorization"]; 
    router.push("/login"); 
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
