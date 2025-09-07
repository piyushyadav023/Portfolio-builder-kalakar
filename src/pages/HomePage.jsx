import React from "react";
import { Link } from "react-router-dom";
import { Palette, MessageSquare, Rocket } from "lucide-react";
import { User } from "lucide-react"; // import Lucide React User icon

const HomePage = () => {
    const features = [
  {
    icon: <Palette className="w-10 h-10 text-green-400" />,
    title: "Showcase Work",
    desc: "Create a stunning portfolio in minutes with our templates.",
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-green-400" />,
    title: "Get Feedback",
    desc: "Share links instantly and collect real-time feedback.",
  },
  {
    icon: <Rocket className="w-10 h-10 text-green-400" />,
    title: "Get Hired",
    desc: "Connect with clients and land projects faster.",
  },
];

const testimonials = [
  {
    avatar: <User className="w-12 h-12 text-green-400 mx-auto" />,
    quote: "Amazing platform! Building my portfolio was super easy.",
    author: "Rahul Sharma",
  },
  {
    avatar: <User className="w-12 h-12 text-green-400 mx-auto" />,
    quote: "Clean, modern, and professional results in minutes.",
    author: "Ananya Gupta",
  },
  {
    avatar: <User className="w-12 h-12 text-green-400 mx-auto" />,
    quote: "Helped me land more freelance clients quickly.",
    author: "Arjun Verma",
  },
];

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pt-20 lg:pt-28 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300">
            Built for Creators
          </span>
          <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight">
            World’s Most Powerful{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
              Portfolio Builder
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-lg">
            Showcase your work beautifully, connect with clients, and grow your career with ease.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-black font-semibold shadow-lg hover:scale-105 transition"
            >
              Get Started →
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 rounded-full border border-white/20 text-gray-200 hover:bg-white/10 transition"
            >
              Explore Portfolios
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <img
              src="/public/hero-section.jpeg"
              alt="Portfolio Preview"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-teal-500 opacity-20 blur-2xl rounded-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Why Choose Us?</h2>
          <p className="mt-2 text-gray-400">Tools designed to make your portfolio shine</p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
                <div className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:scale-105 hover:border-green-400 transition">
  <div className="mb-4">{f.icon}</div>
  <h3 className="text-xl font-semibold">{f.title}</h3>
  <p className="mt-2 text-gray-400">{f.desc}</p>
</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
<section id="testimonials" className="py-24 border-t border-white/10 relative z-10 bg-gradient-to-b from-black via-gray-950 to-black">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold">What Our Users Say</h2>
    <p className="mt-2 text-gray-400">Trusted by creators worldwide</p>
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:scale-105 transition"
        >
          <div className="mb-4">{t.avatar}</div> {/* Lucide React User Icon */}
          <p className="italic text-gray-300">“{t.quote}”</p>
          <span className="mt-4 block font-semibold text-white">— {t.author}</span>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm relative z-10">
        © {new Date().getFullYear()} Kalakar Builder. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
