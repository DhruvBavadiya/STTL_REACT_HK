import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn,cartLength,setCartlength } = useContext(AuthContext);

  

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userData'); // Clear user data from localStorage
  };

  // useEffect to update isLoggedIn state based on localStorage changes
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    setIsLoggedIn(!!userData); // Update isLoggedIn based on userData presence
  }, []);

  useEffect(()=>{
    setCartlength(cartLength)
  },[])

  return (
    <header className="text-blue-950 body-font bg-gradient-to-r from-gray-600 via-blue-700 to-gray-800 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        {/* Logo and Heading */}
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="flex align-middle items-center text-white">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/1849361008/display_1500/stock-vector-initial-based-hk-kh-logo-template-unique-monogram-alphabet-letters-design-and-vector-1849361008.jpg"
              alt="Harman Kardon Logo"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-3 text-center">
              <span className="text-4xl font-bold text-white text-center" style={{ fontFamily: 'Georgia, serif' }}>Harmon Kardon</span>
            </div>
          </Link>
        </div>
        
        {/* Links */}
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-white text-white">Home</Link>
          <Link to="/all-products" className="mr-5 hover:text-white text-white">Products</Link>
          <Link to="/cart" className="relative mr-5 flex items-center justify-center hover:text-white text-white">
            Cart
            <div>
          {cartLength > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 py-1 ml-1 text-xs ">{cartLength}</span>
            )}
          </div>
          </Link>
          
          <Link to="/contact" className="mr-5 hover:text-white text-white">Contact</Link>
        </nav>
        
        {/* Conditional Rendering of Login/Logout Button */}
        {isLoggedIn ? (
          // Render Logout Button if user is logged in
          <button onClick={handleLogout} className="inline-flex items-center bg-[#F0F0F0] border-0 py-2 px-6 focus:outline-none hover:bg-[#F1F6F9] hover:text-black rounded text-black text-base mt-4 md:mt-0">
            Logout
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        ) : (
          // Render Login/SignUp Button if user is not logged in
          <Link to='/login' className="inline-flex items-center bg-[#F0F0F0] border-0 py-2 px-6 focus:outline-none hover:bg-[#F1F6F9] hover:text-black rounded text-black text-base mt-4 md:mt-0">
            Login/SignUp
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
