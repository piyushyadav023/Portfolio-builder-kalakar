/* --- File: src/pages/PublicPortfolioPage.jsx (Final Version with All Data) --- */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config.js';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

// --- Video Modal Component (No changes needed) ---
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

// --- Project Card Component (No changes needed) ---
const ProjectCard = ({ project, onCardClick }) => {
    const getThumbnail = () => {
        if (project.thumbnailUrl) {
            return project.thumbnailUrl;
        }
        if (project.videoUrl && project.videoUrl.includes('youtube.com/watch?v=')) {
            const videoId = project.videoUrl.split('v=')[1].split('&')[0];
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
        return `https://placehold.co/600x400/1F2937/4B5563?text=Play+Now`;
    };
    return (
        // --- UPDATED: flex flex-col structure for title below ---
        <div className="flex flex-col gap-y-3">
            <div onClick={() => onCardClick(project.videoUrl)} className="cursor-pointer group block rounded-lg overflow-hidden relative aspect-w-9 aspect-h-16">
                <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={getThumbnail()} alt={project.title} />
                {/* --- UPDATED: Overlay and Play button are now always visible --- */}
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                </div>
            </div>
            {/* --- NEW: Title is now always visible below the thumbnail --- */}
            <div>
                <h3 className="text-sm font-semibold text-white truncate">{project.title || 'Untitled Project'}</h3>
            </div>
        </div>
    );
};
// --- NEW: Social Icon Component ---
const SocialIcon = ({ type, url }) => {
    let iconPath;
    switch (type) {
        case 'youtube': iconPath = "M21.582 6.186a2.016 2.016 0 00-1.423-1.423C18.638 4.5 12 4.5 12 4.5s-6.638 0-8.159.263a2.016 2.016 0 00-1.423 1.423C2 7.708 2 12 2 12s0 4.292.418 5.814a2.016 2.016 0 001.423 1.423C5.362 19.5 12 19.5 12 19.5s6.638 0 8.159-.263a2.016 2.016 0 001.423-1.423C22 16.292 22 12 22 12s0-4.292-.418-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"; break;
        case 'instagram': iconPath = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0 1.802c-3.073 0-3.442.012-4.646.067-2.612.119-3.828 1.342-3.948 3.948-.055 1.204-.067 1.572-.067 4.646s.012 3.442.067 4.646c.12 2.606 1.336 3.828 3.948 3.948 1.204.055 1.572.067 4.646.067s3.442-.012 4.646-.067c2.612-.12 3.828-1.342 3.948-3.948.055-1.204.067-1.572.067-4.646s-.012-3.442-.067-4.646c-.12-2.606-1.336-3.828-3.948-3.948-1.204-.055-1.572-.067-4.646-.067zm0 3.064a5.158 5.158 0 100 10.316 5.158 5.158 0 000-10.316zm0 1.802a3.356 3.356 0 110 6.712 3.356 3.356 0 010-6.712zM16.965 5.59a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"; break;
        case 'twitter': iconPath = "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.923 4.923 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.487 14.307-14.307 0-.218-.005-.436-.013-.652a10.11 10.11 0 002.488-2.548z"; break;
        case 'linkedin': iconPath = "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"; break;
        default: return null;
    }
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={iconPath} /></svg>
        </a>
    );
};

// --- Profile Card Component (Updated) ---
const ProfileCard = ({ name, bio, profileImageUrl, username, socials, editingTools, aiTools }) => {
    return (
        <div className="w-full lg:w-1/3 lg:pr-8 xl:pr-12">
            <div className="p-6 sm:p-8 rounded-2xl lg:sticky top-10">
                <img className="w-24 h-24 mx-auto rounded-full object-cover" src={profileImageUrl || 'https://placehold.co/200x200/374151/4F46E5?text=P'} alt={name || 'User'} />
                <div className="text-center mt-4">
                    <div className="flex items-center justify-center space-x-2">
                        <h1 className="text-2xl font-bold text-white">{name || 'Your Name'}</h1>
                        <div className="flex items-center space-x-1.5">
                            <svg class="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="text-sm font-medium text-gray-400 hidden sm:block">Verified</span>
                        </div>
                    </div>
                    <p className="text-md text-gray-500 mt-1">@{username || 'username'}</p>
                </div>
                <div className="text-center mt-4">
                    <p className="text-base text-gray-300 leading-relaxed">{bio || 'User bio will appear here.'}</p>
                </div>
                {/* --- NEW: Social Links Display --- */}
                <div className="mt-6 flex items-center justify-center space-x-4">
                    {socials?.youtube && <SocialIcon type="youtube" url={socials.youtube} />}
                    {socials?.instagram && <SocialIcon type="instagram" url={socials.instagram} />}
                    {socials?.twitter && <SocialIcon type="twitter" url={socials.twitter} />}
                    {socials?.linkedin && <SocialIcon type="linkedin" url={socials.linkedin} />}
                </div>
                {/* --- NEW: Tools Display --- */}
                <div className="mt-8 border-t border-gray-700 pt-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Editing Tools</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {editingTools?.map(tool => <span key={tool} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tool}</span>)}
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">AI Tools</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {aiTools?.map(tool => <span key={tool} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tool}</span>)}
                    </div>
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
                setError("Portfolio load nahi ho paaya. Kripya dobara koshish karein.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [username]);

    if (loading) {
        return <div className="bg-gray-900 flex items-center justify-center h-screen"><p className="text-xl text-white">Loading Portfolio...</p></div>;
    }
    if (error) {
        return <div className="bg-gray-900 flex flex-col items-center justify-center h-screen text-center px-4"><h2 className="text-2xl font-bold text-red-500">Oops!</h2><p className="text-xl text-gray-300 mt-2">{error}</p><a href="/" className="mt-6 bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-600">Go to Homepage</a></div>;
    }
    if (!userData) return null;

    return (
        <div className="bg-gray-900 text-white font-sans">
            <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row lg:gap-x-8">
                    <ProfileCard 
                        name={userData.name}
                        bio={userData.bio}
                        profileImageUrl={userData.profileImageUrl}
                        username={userData.username}
                        socials={userData.socials}
                        editingTools={userData.editingTools}
                        aiTools={userData.aiTools}
                    />
                    <div className="w-full lg:w-2/3 mt-10 lg:mt-0">
                        <h2 className="text-3xl font-bold text-white">My Work</h2>
                        {userData.projects && userData.projects.length > 0 ? (
                            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                                {userData.projects.map((project, index) => (
                                    <ProjectCard 
                                        key={index} 
                                        project={project} 
                                        onCardClick={setSelectedVideo}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-8 text-center text-gray-500 bg-gray-800 p-10 rounded-lg">
                                <p>This user hasn't added any projects yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PublicPortfolioPage;
