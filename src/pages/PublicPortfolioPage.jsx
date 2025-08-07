/* --- File: src/pages/PublicPortfolioPage.jsx (Corrected and Final) --- */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config.js';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

// --- Video Modal Component ---
const VideoModal = ({ videoUrl, onClose }) => {
    if (!videoUrl) return null;
    const getEmbedUrl = (url) => {
        let embedUrl = url;
        if (url.includes("youtube.com/watch?v=")) {
            const videoId = url.split('v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (url.includes("drive.google.com/file/d/")) {
            const fileId = url.split('/d/')[1].split('/')[0];
            embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        }
        return embedUrl;
    };
    const embeddableUrl = getEmbedUrl(videoUrl);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-black p-2 rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                    <iframe className="absolute top-0 left-0 w-full h-full" src={embeddableUrl} title="Portfolio Video Player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300">&times;</button>
        </div>
    );
};

// --- Project Card Component ---
const ProjectCard = ({ project, onCardClick }) => {
    const getThumbnail = () => {
        if (project.videoUrl && project.videoUrl.includes('youtube.com/watch?v=')) {
            const videoId = project.videoUrl.split('v=')[1].split('&')[0];
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
        return `https://placehold.co/600x400/94A3B8/FFFFFF?text=Preview`;
    };

    return (
        <div onClick={() => onCardClick(project.videoUrl)} className="cursor-pointer group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative h-48">
                <img className="w-full h-full object-cover" src={getThumbnail()} alt={project.title} />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 truncate">{project.title || 'Untitled Project'}</h3>
                <p className="text-gray-600 text-sm mt-1 truncate">{project.description || 'No description'}</p>
            </div>
        </div>
    );
};

// --- Profile Card Component ---
const ProfileCard = ({ name, tagline, bio, profileImageUrl, username }) => {
    return (
        <div className="w-full lg:w-1/3 lg:pr-8 xl:pr-12">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg lg:sticky top-24">
                <img className="w-32 h-32 mx-auto rounded-full object-cover shadow-md" src={profileImageUrl || 'https://placehold.co/200x200/E2E8F0/4A5568?text=Profile'} alt={name || 'User'} />
                <div className="text-center mt-4">
                    <div className="flex items-center justify-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-900">{name || 'Your Name'}</h1>
                        <div className="flex items-center space-x-1.5">
                            <svg class="w-7 h-7 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-sm font-medium text-gray-500 hidden sm:block">Verified</span>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <p className="text-lg text-indigo-600 font-semibold">{tagline || 'Your Profession'}</p>
                    <p className="text-md text-gray-500 mt-1">@{username || 'username'}</p>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                    <h2 className="text-lg font-semibold text-gray-800">About Me</h2>
                    <p className="mt-2 text-base text-gray-600 leading-relaxed">
                        {bio || 'Yahan user apne baare mein likh sakta hai.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- Main Public Portfolio Page ---
const PublicPortfolioPage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!username) return;
            setLoading(true);
            setError(null);
            try {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where("username", "==", username.toLowerCase()), limit(1));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setError("Is naam ka koi portfolio nahi mila.");
                } else {
                    const userDoc = querySnapshot.docs[0].data();
                    userDoc.portfolioData.username = userDoc.username;
                    setUserData(userDoc.portfolioData);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Portfolio load nahi ho paaya. Kripya dobara koshish karein.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><p className="text-xl">Portfolio Load ho raha hai...</p></div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                <h2 className="text-2xl font-bold text-red-600">Oops!</h2>
                <p className="text-xl text-gray-700 mt-2">{error}</p>
                <a href="/" className="mt-6 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700">Homepage par jaayein</a>
            </div>
        );
    }

    if (!userData) return null;

    return (
        <div className="bg-gray-50 font-sans">
            <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row lg:gap-x-8">
                    <ProfileCard 
                        name={userData.name}
                        tagline={userData.tagline}
                        bio={userData.bio}
                        profileImageUrl={userData.profileImageUrl}
                        username={userData.username}
                    />
                    <div className="w-full lg:w-2/3 mt-10 lg:mt-0">
                        <h2 className="text-3xl font-bold text-gray-800">My Work</h2>
                        {userData.projects && userData.projects.length > 0 ? (
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {userData.projects.map((project, index) => (
                                    <ProjectCard 
                                        key={index} 
                                        project={project} 
                                        onCardClick={setSelectedVideo}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-8 text-center text-gray-500 bg-white p-10 rounded-lg shadow-sm">
                                <p>Is user ne abhi tak koi project add nahi kiya hai.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PublicPortfolioPage;
