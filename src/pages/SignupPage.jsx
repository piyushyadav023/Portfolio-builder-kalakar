import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthLogoSignup = () => (
  <Link to="/" className="flex items-center justify-center space-x-3 mb-6">
    <img
      src="/logo.png"
      alt="Kalakar Builder Logo"
      className="h-8 w-auto"
      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x32/10B981/FFFFFF?text=Logo'; }}
    />
    <span className="text-2xl font-bold text-white">Kalakar Builder</span>
  </Link>
);

const EyeIconSignup = ({ show }) => (
  show ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .847 0 1.67.127 2.456.36m6.444 3.24A10.01 10.01 0 0121.542 12c-1.274 4.057-5.064 7-9.542 7a10.023 10.023 0 01-2.23-.304M3.73 3.73l16.54 16.54" />
    </svg>
  )
);

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      return setError('Please fill in all fields.');
    }
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: username.toLowerCase(),
        email: email,
        createdAt: new Date(),
        isPaid: false,
        portfolioData: {
          name: username,
          tagline: 'Your Profession',
          bio: 'A little bit about yourself.',
          profileImageUrl: null,
          socials: {},
          editingTools: [],
          aiTools: [],
          projects: []
        }
      });
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message.replace('Firebase: ', ''));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-3xl"></div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md space-y-8 bg-black/80 p-10 rounded-2xl shadow-lg border border-white/10">
        <AuthLogoSignup />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create Your Account</h2>
        <p className="mt-2 text-center text-sm text-gray-300">Get started with your free portfolio.</p>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && <p className="text-center bg-red-500/20 text-red-300 p-3 rounded-md text-sm border border-red-500/30">{error}</p>}
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300">Username</label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                className="mt-1 block w-full px-3 py-3 bg-black/70 border border-white/10 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm"
                placeholder="Choose a unique username"
              />
            </div>
            <div>
              <label htmlFor="email-address-signup" className="text-sm font-medium text-gray-300">Email Address</label>
              <input
                id="email-address-signup"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="mt-1 block w-full px-3 py-3 bg-black/70 border border-white/10 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password-signup" className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  id="password-signup"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  className="mt-1 block w-full px-3 py-3 bg-black/70 border border-white/10 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                >
                  <EyeIconSignup show={showPassword} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gradient-to-r from-green-400 to-teal-500 hover:scale-105 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-400 hover:text-teal-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
