import React from 'react';
import { Link } from 'react-router-dom';

const VideoBackground = () => {
    const videoId = '0sk0QKUiSB8'; 
    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0&playlist=${videoId}`;

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div
                className="absolute"
                style={{
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '56.25vw',
                    minHeight: '100vh',
                    minWidth: '177.77vh',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={videoSrc}
                    title="Background Video Player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media;"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
        </div>
    );
};

const FeatureIcon = ({ children }) => (
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white">
        {children}
    </div>
);

const HomePage = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* --- UPDATED: Header no longer contains the Navbar --- */}
            <header className="relative flex items-center justify-center h-screen overflow-hidden">
                <VideoBackground />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        <span className="block">Your Work, Your Story.</span>
                        <span className="block text-white mt-2">Build a Stunning Portfolio.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200">
                        Showcase your best work to the world. With our easy-to-use editor, you can create a beautiful portfolio website in just minutes.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-200 hover:text-black shadow-lg transform transition-transform duration-200 hover:scale-105"
                        >
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- Baaki saare sections pehle jaise hi rahenge --- */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Designs That Make Your Work Shine</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                            Choose from a variety of professional templates.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="/Design.png" alt="Template 1" className="w-full h-48 object-cover"/>
                            <div className="p-6"><h3 className="text-lg font-semibold">Modern Layout</h3></div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="/Design.png" alt="Template 2" className="w-full h-48 object-cover"/>
                            <div className="p-6"><h3 className="text-lg font-semibold">Minimalist Design</h3></div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src="/Design.png" alt="Template 3" className="w-full h-48 object-cover"/>
                            <div className="p-6"><h3 className="text-lg font-semibold">Bold & Creative</h3></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Ready in 3 Simple Steps</h2>
                    <div className="mt-12 grid gap-10 md:grid-cols-3">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold">1</div>
                            <h3 className="text-lg font-medium mt-4">Choose a Template</h3>
                            <p className="mt-2 text-base text-gray-500">Select a design that matches your personal style.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold">2</div>
                            <h3 className="text-lg font-medium mt-4">Add Your Content</h3>
                            <p className="mt-2 text-base text-gray-500">Easily add your details, bio, and project links.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold">3</div>
                            <h3 className="text-lg font-medium mt-4">Publish Your Portfolio</h3>
                            <p className="mt-2 text-base text-gray-500">Go live with a single click and share your work with the world.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything You Need to Succeed
                        </p>
                    </div>
                    <div className="mt-12">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <FeatureIcon><svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></FeatureIcon>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy-to-Use Editor</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">No coding required. Easily edit and update your portfolio anytime.</dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <FeatureIcon><svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg></FeatureIcon>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fully Responsive</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">Your portfolio will look stunning on mobile, tablet, and desktop devices.</dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <FeatureIcon><svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></FeatureIcon>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Loading Speed</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">Built with modern technology for instant loading times, so you never keep a visitor waiting.</dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <FeatureIcon><svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg></FeatureIcon>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Video & Link Support</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">Easily embed your video links from YouTube or Google Drive.</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
            <section className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to showcase your best work?</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        Create your free account today and make your mark in the professional world.
                    </p>
                    <Link
                        to="/signup"
                        className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
                    >
                        Create Your Portfolio
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;