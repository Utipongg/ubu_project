// pages/login.js
"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData.username, formData.password);
  };

  return (
    <>
    <ToastContainer />
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Username
                  </label>
                  <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your username" />
              </div>

              <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                  </label>
                  <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter your password" />
              </div>

              <div className="flex items-center justify-between">
                  <button
                      type="submit"
                      className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                      Login
                  </button>
              </div>
          </form>
      </div></>
  );
};

export default LoginForm;
