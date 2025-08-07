// --- File: src/pages/SignupPage.js ---
// User registration ka functional form.

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config'; // db ko import karein
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; // Firestore functions

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            return setError('Please fill in all fields.');
        }
        setLoading(true);
        setError('');
        try {
            // 1. Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Create a user document in Firestore
            // Hum user ki portfolio details yahan store karenge
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username: username.toLowerCase(), // username ko lowercase mein save karein
                email: email,
                createdAt: new Date(),
                isPaid: false, // Shuruaat mein payment status false hoga
                portfolioData: { // Basic portfolio structure
                    name: username,
                    tagline: 'Your Profession',
                    bio: 'A little bit about yourself.',
                    profileImageUrl: null,
                    socialLinks: {},
                    projects: []
                }
            });

            setLoading(false);
            navigate('/dashboard'); // Signup ke baad seedha dashboard par
        } catch (err) {
            setLoading(false);
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    {error && <p className="text-center bg-red-100 text-red-700 p-3 rounded-md">{error}</p>}
                    <div className="rounded-md shadow-sm -space-y-px">
                         <div>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Choose a Username (e.g., piyushyadav)"
                            />
                        </div>
                        <div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                        >
                            {loading ? 'Creating Account...' : 'Sign up'}
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;