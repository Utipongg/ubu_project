"use client";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Get the user and logout function from context

  const handleLogout = () => {
    logout(); // Log the user out when clicking on the "Logout" button
    toast.success("Successfully logged out!");
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Logo and Menu */}
        <div className="flex items-center space-x-4">
          <a className='flex text-black text-xl font-bold' href='/'>
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mx-2" />
            OnReal
          </a>
          {/* Menu for larger screens */}
          <ul className="hidden md:flex space-x-4">
            <li><a href="/" className="text-gray-600 hover:text-black ease-in-out duration-200">หน้าแรก</a></li>
            <li><a href="/course" className="text-gray-600 hover:text-black ease-in-out duration-200">คอร์สเรียนทั้งหมด</a></li>
          </ul>
        </div>

        {/* Right side: Conditionally render based on user authentication */}
        <div className="hidden md:flex space-x-4">
          {!user ? (
            // Show Login and Register if user is not authenticated
            <>
              <a href="/login" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Login</a>
              <a href="/register" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Register</a>
            </>
          ) : (
            // Show Profile and Logout if user is authenticated
            <>
              <a href="/dashboard" className="text-gray-600 hover:text-black py-1 ease-in-out duration-200 text-center align-middle">{user.username}</a>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </>
          )}
        </div>

        {/* Hamburger menu button for mobile */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-3 p-4 bg-gray-200 rounded-lg mt-4">
            <li><a href="/" className="block text-gray-600 text-center px-3 py-2 bg-gray-300 rounded-lg hover:text-black">หน้าแรก</a></li>
            <li><a href="/course" className="block text-gray-600 text-center px-3 py-2 bg-gray-300 rounded-lg hover:text-black">คอร์สเรียนทั้งหมด</a></li>
            {!user ? (
              <>
                <li><a href="/register" className="block bg-green-500 text-white w-full text-center px-3 py-1 rounded hover:bg-green-600">Register</a></li>
                <li><a href="/login" className="block bg-blue-500 text-white w-full text-center px-3 py-1 rounded hover:bg-blue-600">Login</a></li>
              </>
            ) : (
              <>
                <li><a href="/dashboard" className="block text-gray-600 text-center px-3 py-2 bg-gray-300 rounded-lg hover:text-black">{user.username}</a></li>
                <li><button onClick={handleLogout} className="block bg-red-500 text-white w-full text-center px-3 py-1 rounded hover:bg-red-600">Logout</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
