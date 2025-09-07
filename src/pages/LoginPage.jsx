import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

const AuthLogo = () => (
  <Link to="/" className="flex items-center justify-center space-x-3 mb-6">
    <img
      src="/logo.png"
      alt="Kalakar Builder Logo"
      className="h-8 w-auto"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/100x32/10B981/FFFFFF?text=Logo";
      }}
    />
    <span className="text-2xl font-bold text-white">Kalakar Builder</span>
  </Link>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-3xl"></div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md bg-black/80 p-10 rounded-2xl shadow-2xl border border-white/10">
        <AuthLogo />
        <h2 className="mt-4 text-center text-3xl font-extrabold text-white">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Sign in to continue to your dashboard
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <p className="text-center bg-red-500/20 text-red-300 p-3 rounded-md text-sm border border-red-500/30">
              {error}
            </p>
          )}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email-address" className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                id="email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 bg-black/70 border border-white/10 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-black/70 border border-white/10 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-md text-black font-semibold bg-gradient-to-r from-green-400 to-teal-500 shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-green-400 hover:text-teal-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
