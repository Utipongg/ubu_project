// components/RegisterForm.js
"use client"
import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const postapi = async () => {
    try {
      const response = await axios.post('https://esanapi.utipong.info/auth/users/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage('User registered successfully!');
      setErrorMessage('');
      toast.success('Registration successful', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log('Registration successful', response.data);
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSuccessMessage('');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      toast.warn('Password must be at least 8 characters.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSuccessMessage('');
    } else if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      toast.warn('Passwords do not match.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSuccessMessage('');
    } else {
      postapi();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
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
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
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
              minLength="8" // Set the minimum length on the input field
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password (min. 8 characters)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
            />
          </div>

          {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out duration-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
