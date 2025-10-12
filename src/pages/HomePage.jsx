import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Palette, MessageSquare, Rocket, User, CheckCircle, Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
    // FAQ section ke liye state
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const features = [
        {
            icon: <Palette size={32} className="text-indigo-500" />,
            title: "Stunning Templates",
            desc: "Choose from a variety of professional templates.",
            className: "lg:col-span-2", // Bento Grid ke liye
        },
        {
            icon: <MessageSquare size={32} className="text-indigo-500" />,
            title: "Instant Feedback",
            desc: "Share and get feedback in real-time.",
            className: "",
        },
        {
            icon: <Rocket size={32} className="text-indigo-500" />,
            title: "Launch Faster",
            desc: "Go from idea to live portfolio in minutes.",
            className: "",
        },
    ];

    const testimonials = [
        {
            avatar: <User className="w-12 h-12 text-gray-400 mx-auto" />,
            quote: "This is a game-changer! My portfolio looks amazing.",
            author: "Priya Singh",
        },
        {
            avatar: <User className="w-12 h-12 text-gray-400 mx-auto" />,
            quote: "So easy to use and the results are incredibly professional.",
            author: "Rohan Mehra",
        },
        {
            avatar: <User className="w-12 h-12 text-gray-400 mx-auto" />,
            quote: "I landed two new clients within a week of using Kalakar.",
            author: "Aisha Khan",
        },
    ];

    const faqItems = [
        { q: "Is there a free trial available?", a: "Yes, we offer a 14-day free trial on our Pro plan. No credit card required to get started!" },
        { q: "Can I use my own domain name?", a: "Absolutely! Custom domains are supported on our Pro and Enterprise plans." },
        { q: "What happens if I cancel my subscription?", a: "You will have access to your plan's features until the end of your billing cycle. Your portfolios will remain safe." },
        { q: "Do you offer support?", a: "Yes, we offer 24/7 email support for all our users, with priority support for Enterprise clients." }
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen relative overflow-hidden">
            {/* CRAZY: Animated Blobs Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute w-[40rem] h-[40rem] bg-indigo-200 rounded-full opacity-30 -top-40 -left-60 animate-blob"></div>
                <div className="absolute w-[35rem] h-[35rem] bg-purple-200 rounded-full opacity-30 -bottom-20 -right-40 animate-blob animation-delay-2"></div>
                <div className="absolute w-[30rem] h-[30rem] bg-teal-200 rounded-full opacity-30 bottom-20 left-20 animate-blob animation-delay-4"></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pt-20 lg:pt-28 pb-24 text-center">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600">
                    Your Vision, Your Portfolio
                </span>
                <motion.h1 
                    className="mt-6 text-5xl lg:text-7xl font-extrabold tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Create a Portfolio That{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500">
                        Gets You Hired
                    </span>
                </motion.h1>
                <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                    Kalakar is the easiest way to build a professional portfolio that showcases your skills and helps you stand out.
                </p>
                <motion.div 
                    className="mt-8 flex justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Link
                        to="/signup"
                        className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold shadow-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                        Start Building <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </section>
            
            {/* NEW: Showcase Section */}
            <motion.section 
                className="relative z-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="max-w-5xl mx-auto px-6 lg:px-8 -mb-24">
                   <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
                        <img src="/open-sourcet.png" alt="Portfolio Preview" className="rounded-xl w-full h-auto" />
                   </div>
                </div>
            </motion.section>

            {/* CRAZY: Bento Grid Features Section */}
            <motion.section
                id="features"
                className="py-36 bg-white relative z-10 border-t border-gray-100"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold">Everything You Need to Succeed</h2>
                    <p className="mt-2 text-gray-600">Features designed to make you shine</p>
                    <div className="mt-16 grid gap-6 lg:grid-cols-3">
                        {features.map((f, i) => (
                            <div key={i} className={`p-8 bg-gray-50/50 border border-gray-200 rounded-2xl shadow-sm text-left ${f.className}`}>
                                <div className="mb-4">{f.icon}</div>
                                <h3 className="text-xl font-semibold">{f.title}</h3>
                                <p className="mt-2 text-gray-600">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* NEW: Pricing Section */}
            {/* UPDATED: Pricing Section with Details + Coming Soon Text */}
<motion.section 
    id="pricing" 
    className="py-24 relative z-10"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
>
    <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold">Simple, Fair Pricing</h2>
        <p className="mt-2 text-gray-600">Choose the plan that's right for you.</p>
        
        {/* Pricing Plans Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Plan 1 */}
            <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold">Free</h3>
                <p className="mt-4 text-4xl font-bold">₹0<span className="text-lg font-normal text-gray-500">/mo</span></p>
                <ul className="mt-6 space-y-3 text-left">
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/>1 Portfolio</li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/>Basic Templates</li>
                </ul>
            </div>
            {/* Plan 2 - Highlighted */}
            <div className="p-8 bg-white border-2 border-indigo-500 rounded-2xl shadow-2xl relative">
                    <span className="absolute -top-3 px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-semibold">Most Popular</span>
                <h3 className="text-xl font-semibold text-indigo-500">Pro</h3>
                <p className="mt-4 text-4xl font-bold">₹99<span className="text-lg font-normal text-gray-500">/mo</span></p>
                <ul className="mt-6 space-y-3 text-left">
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/>Unlimited Portfolios</li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/>Premium Templates</li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/>Custom Domain</li>
                </ul>
            </div>
                {/* Plan 3 */}
            <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold">Enterprise</h3>
                <p className="mt-4 text-4xl font-bold">Contact Us</p>
                <ul className="mt-6 space-y-3 text-left">
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/>All Pro Features</li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500"/>Priority Support</li>
                </ul>
            </div>
        </div>

        {/* YAHAN PAR NAYA "COMING SOON" TEXT ADD KIYA HAI */}
        <div className="mt-12 text-center">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 animate-pulse">
                Coming Soon!
            </p>
            <p className="mt-2 text-gray-600">Subscriptions are not yet active. We are launching shortly!</p>
        </div>

    </div>
</motion.section>

             {/* NEW: FAQ Section */}
            <motion.section 
                id="faq" 
                className="py-24 bg-white border-t border-gray-100 relative z-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>
                    <div className="mt-12 space-y-4">
                        {faqItems.map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg">
                                <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center p-5 text-left font-semibold">
                                    {item.q}
                                    <span>{activeIndex === index ? <Minus/> : <Plus/>}</span>
                                </button>
                                <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="p-5 pt-0 text-gray-600">{item.a}</p>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <footer className="border-t border-gray-200 py-8 text-center text-gray-500 text-sm relative z-10">
                © {new Date().getFullYear()} Kalakar Builder. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;