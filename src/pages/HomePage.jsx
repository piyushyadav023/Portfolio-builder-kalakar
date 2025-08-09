/* --- File: src/pages/HomePage.jsx (Updated with Background Circles) --- */

import React from 'react';
import { Link } from 'react-router-dom';

// --- NEW: Background Circles Component ---
const BackgroundCircles = () => (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {/* Circle 1 */}
        <div className="absolute left-[-20rem] top-[-10rem] h-[50rem] w-[50rem] rounded-full border border-gray-200/50" />
        {/* Circle 2 */}
        <div className="absolute right-[-25rem] top-[15rem] h-[60rem] w-[60rem] rounded-full border border-gray-200/50" />
    </div>
);

// SVG Icon component
const FeatureIcon = ({ d }) => (
    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-500 text-white">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path>
        </svg>
    </div>
);

const HomePage = () => {
    return (
        // --- UPDATED: Added 'relative' and 'overflow-hidden' for the circles ---
        <div className="bg-white text-gray-800 relative overflow-hidden">
            {/* Add the circles component here */}
            <BackgroundCircles />

            {/* --- Hero Section --- */}
            {/* The content needs to be relative and have a z-index to appear above the circles */}
            <div className="relative z-10 pt-20 pb-20 lg:pt-32 lg:pb-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                        The only portfolio you'll ever need.
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-500">
                        The all-in-one platform for video editors to showcase their work, get feedback and get hired.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/signup"
                            className="inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Create my portfolio
                        </Link>
                        <p className="mt-4 text-sm text-gray-500">Free, no credit card required</p>
                    </div>
                </div>
                {/* Laptop Mockup Image */}
                <div className="mt-12 max-w-5xl mx-auto px-8">
                     <img 
                        src="port.png" 
                        alt="Portfolio example on a laptop" 
                        className="rounded-2xl shadow-2xl ring-1 ring-gray-200"
                    />
                </div>
            </div>
            
            {/* --- Baaki saare sections pehle jaise hi rahenge --- */}
            <div className="relative z-10">
                <div className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm font-semibold text-gray-500 tracking-wider uppercase">
                            Trusted by the best editors
                        </p>
                        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"><p className="text-gray-400 font-bold text-xl">Company A</p></div>
                            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"><p className="text-gray-400 font-bold text-xl">Studio B</p></div>
                            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"><p className="text-gray-400 font-bold text-xl">Creator C</p></div>
                            <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1"><p className="text-gray-400 font-bold text-xl">Agency D</p></div>
                            <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1"><p className="text-gray-400 font-bold text-xl">Production E</p></div>
                        </div>
                    </div>
                </div>
                <div className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need, nothing you don't.
                            </h2>
                        </div>
                        <div className="mt-12">
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                                <div className="relative">
                                    <dt>
                                        <FeatureIcon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Showcase your work</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">A beautiful portfolio that's easy to build and share.</dd>
                                </div>
                                <div className="relative">
                                    <dt>
                                        <FeatureIcon d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Get feedback</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">Share private links with clients for feedback and revisions.</dd>
                                </div>
                                <div className="relative">
                                    <dt>
                                        <FeatureIcon d="M10 21h7a2 2 0 002-2V5a2 2 0 00-2-2h-7a2 2 0 00-2 2v14a2 2 0 002 2zM10 21h-3a2 2 0 01-2-2V5a2 2 0 012-2h3m-1 14l4-4m0 0l-4-4m4 4H3" />
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Get hired</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">Connect with clients and get hired for your next big project.</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="py-20 bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <img className="h-24 w-24 rounded-full mx-auto" src="https://i.postimg.cc/5N5mqqty/IMG-20250718-192207.jpg" alt="Piyush Kumar" />
                        <blockquote className="mt-8">
                            <p className="text-2xl font-medium text-gray-900">
                                "This is the best portfolio platform I've ever used. It's simple, beautiful, and has helped me land multiple clients."
                            </p>
                        </blockquote>
                        <cite className="mt-4 block font-semibold text-gray-900 not-italic">
                            Piyush Kumar
                            <span className="block text-indigo-600">Freelance Video Editor</span>
                        </cite>
                    </div>
                </div>
                <div className="py-20 bg-white">
                    <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Ready to get started?</h2>
                        <p className="mt-4 text-lg text-gray-500">Create your free portfolio today.</p>
                        <Link
                            to="/signup"
                            className="mt-8 inline-block px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Create my portfolio
                        </Link>
                    </div>
                </div>
            </div>
            <footer className="border-t border-gray-200 bg-gray-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Kalakar Builder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
