import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { auth } from "../firebase/config";

const Logo = () => (
  <Link to="/" className="flex items-center space-x-3">
    <img
      src="/logo.png"
      alt="Hive Logo"
      className="h-8 w-auto"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/100x32/818CF8/FFFFFF?text=Logo";
      }}
    />
    {/* UPDATED: Text color to dark */}
    <span className="text-2xl font-bold text-gray-900">Hive</span>
  </Link>
);

const Navbar = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    auth.signOut();
    setIsOpen(false);
  };

  // Logic to hide navbar on public profile pages remains the same.
  const rawPath = location?.pathname || "";
  const cleanPath = rawPath.replace(/[:?#].*$/, "").replace(/\/+$/, "").replace(/:+$/, "");
  const parts = cleanPath.split("/").filter(Boolean);
  const reserved = new Set([
    "login", "signup", "dashboard", "admin", "about", "contact",
    "settings", "terms", "privacy", "help", "blog", ""
  ]);
  if (parts.length === 1 && !reserved.has(parts[0].toLowerCase())) {
    return null;
  }
  
  return (
    // UPDATED: Navbar styles for light theme with blur effect and a bottom border
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {currentUser ? (
                <>
                  <Link
                    to="/dashboard"
                    // UPDATED: Text color and hover effect
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    // UPDATED: Text color and hover effect
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    // UPDATED: Text color and hover effect
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    // UPDATED: New gradient to match light theme, white text
                    className="ml-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-md text-sm font-semibold shadow hover:scale-105 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              // UPDATED: Icon color for light theme
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition"
            >
              {/* Hamburger Icon */}
              <svg className={`${isOpen ? "hidden" : "block"} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg className={`${isOpen ? "block" : "hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu (Dropdown) --- */}
      {/* UPDATED: Background for light theme, border color */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white/95 backdrop-blur-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                // UPDATED: Mobile link styles
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                // UPDATED: Mobile button styles
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                // UPDATED: Mobile link styles
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                // UPDATED: Mobile signup link styles
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;