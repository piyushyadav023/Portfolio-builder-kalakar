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
                className="h-8 w-auto"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x32/6366F1/FFFFFF?text=Logo'; }}
            />
            <span className="text-2xl font-bold text-gray-800">Kalakar Builder</span>
        </Link>
    );
};

const Navbar = () => {
    const { currentUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        auth.signOut();
        setIsOpen(false);
    };

    // Navbar ab hamesha white aur sticky rahegi
    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>
                    {/* --- Desktop Menu --- */}
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
                                        className="ml-4 bg-indigo-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
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
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none"
                        >
                            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu (Dropdown) --- */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
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