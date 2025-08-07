/* --- File: src/components/Navbar.jsx (Final Responsive Version) --- */
/* Is file ke poore code ko naye code se replace kar dein. */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { auth } from '../firebase/config';

// Logo Component
const Logo = () => {
    return (
        <Link to="/" className="flex items-center space-x-3">
            <img 
                src="/logo.png" 
                alt="Kalakar Builder Logo" 
                className="h-10 w-auto"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x32/6366F1/FFFFFF?text=Logo'; }}
            />
            <span className="text-2xl font-bold text-gray-800">Kalakar Builder</span>
        </Link>
    );
};


const Navbar = () => {
    const { currentUser } = useAuth();
    // --- NEW: State to manage mobile menu open/close ---
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        auth.signOut();
        setIsOpen(false); // Close menu on logout
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>
                    {/* --- Desktop Menu (pehle jaisa hi) --- */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-2">
                            {currentUser ? (
                                <>
                                    <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
                                    <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</Link>
                                    <Link 
                                        to="/signup" 
                                        className="ml-4 bg-amber-500 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-amber-600 transition-colors shadow-sm"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    {/* --- NEW: Mobile Menu Button (Hamburger Icon) --- */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon for hamburger menu */}
                            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Icon for close menu */}
                            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- NEW: Mobile Menu (Dropdown) --- */}
            {/* Yeh menu tabhi dikhega jab 'isOpen' state true hogi */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                    {currentUser ? (
                        <>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-600 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                            <button onClick={handleLogout} className="w-full text-left text-gray-600 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-600 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                            <Link to="/signup" onClick={() => setIsOpen(false)} className="text-gray-600 hover:bg-gray-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
