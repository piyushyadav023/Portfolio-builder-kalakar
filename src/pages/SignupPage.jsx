import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react"; // Using Lucide for consistency

const AuthLogoSignup = () => (
  <Link to="/" className="flex items-center justify-center space-x-3 mb-6">
    <img
      src="/logo.png"
      alt="Kalakar Builder Logo"
      className="h-8 w-auto"
      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x32/818CF8/FFFFFF?text=Logo'; }}
    />
    {/* UPDATED: text color */}
    <span className="text-2xl font-bold text-gray-900">Kalakar Builder</span>
  </Link>
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
    // UPDATED: Main background to light theme
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* UPDATED: Animated Blobs Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-[40rem] h-[40rem] bg-indigo-200 rounded-full opacity-30 -top-40 -left-60 animate-blob"></div>
        <div className="absolute w-[35rem] h-[35rem] bg-purple-200 rounded-full opacity-30 -bottom-20 -right-40 animate-blob animation-delay-2"></div>
      </div>

      {/* UPDATED: Auth Card for light theme */}
      <div className="relative z-10 w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
        <AuthLogoSignup />
        {/* UPDATED: Text colors */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your Account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Get started with your free portfolio.</p>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {/* UPDATED: Error message style */}
          {error && <p className="text-center bg-red-100 text-red-700 p-3 rounded-md text-sm border border-red-200">{error}</p>}
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                // UPDATED: Input field styles for light theme
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Choose a unique username"
              />
            </div>
            <div>
              <label htmlFor="email-address-signup" className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email-address-signup"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                // UPDATED: Input field styles
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password-signup" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password-signup"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                   // UPDATED: Input field styles
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  // UPDATED: Eye icon button style
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              // UPDATED: Button gradient and text color
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-95 transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            {/* UPDATED: Link color */}
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