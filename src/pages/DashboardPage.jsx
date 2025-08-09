/* --- File: src/pages/DashboardPage.jsx (Complete Code with All Sections) --- */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebase/config.js';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

// --- Data for Checklists ---
const editingTools = [
    "Adobe Premiere Pro", "Adobe After Effects", "CapCut", "DaVinci Resolve", 
    "Final Cut Pro", "Blender", "iMovie", "Vegas Pro", "VN", "Avid", "Lightworks"
];
const aiTools = [
    "Midjourney", "DALL-E", "RunwayML", "Pika Labs", "Kling AI", 
    "Google VEO", "Sora by OpenAI", "HeyGen"
];

// Icon component
const Icon = ({ path, className = "w-5 h-5 mr-3 text-gray-400 group-hover:text-white" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
    </svg>
);

// Sidebar Component
const Sidebar = ({ user }) => {
    return (
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 bg-gray-800 p-6">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold">
                    {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                    <p className="font-semibold text-white">{user?.displayName || user?.email}</p>
                    <p className="text-sm text-gray-400">Editor</p>
                </div>
            </div>
            <nav className="mt-10">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Editor Tools</p>
                <ul className="mt-4 space-y-2">
                    <li>
                        <a href="#" className="flex items-center px-3 py-2 text-white bg-gray-900 rounded-lg group">
                            <Icon path="M4 6h16M4 12h16M4 18h16" />
                            <span>Portfolio</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg group">
                            <Icon path="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            <span>Analytics</span>
                            <span className="ml-auto text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full">Soon</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

const DashboardPage = () => {
    const { currentUser } = useAuth();
    const [portfolioData, setPortfolioData] = useState(null);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (!currentUser) return;
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setUsername(data.username || '');
                const portfolio = data.portfolioData || {};
                if (!portfolio.projects) portfolio.projects = [];
                if (!portfolio.editingTools) portfolio.editingTools = [];
                if (!portfolio.aiTools) portfolio.aiTools = [];
                if (!portfolio.socials) portfolio.socials = {};
                setPortfolioData(portfolio);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData(prev => ({
            ...prev,
            socials: {
                ...prev.socials,
                [name]: value
            }
        }));
    };

    const handleCheckboxChange = (e, toolType) => {
        const { name, checked } = e.target;
        setPortfolioData(prev => {
            const existingTools = prev[toolType] || [];
            if (checked) {
                return { ...prev, [toolType]: [...existingTools, name] };
            } else {
                return { ...prev, [toolType]: existingTools.filter(tool => tool !== name) };
            }
        });
    };

    const handleProjectChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProjects = [...portfolioData.projects];
        updatedProjects[index] = { ...updatedProjects[index], [name]: value };
        setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
    };

    const addProject = () => {
        const newProject = { title: '', description: '', videoUrl: '' };
        setPortfolioData(prev => ({ ...prev, projects: [...(prev.projects || []), newProject] }));
    };

    const removeProject = (index) => {
        const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
        setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        if (!currentUser) return;
        setSaving(true);
        setNotification('');
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { portfolioData: portfolioData });
            setNotification('Your changes have been saved successfully!');
        } catch (error) {
            setNotification('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
            setTimeout(() => setNotification(''), 3000);
        }
    };

    if (loading) {
        return <div className="bg-gray-900 text-white text-center p-10 font-semibold">Loading your dashboard...</div>;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col lg:flex-row">
            <Sidebar user={currentUser} />
            
            <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold">Your Editor Profile</h1>
                    <p className="mt-2 text-gray-400">Fill in the details below to update your public portfolio.</p>

                    {notification && (
                        <div className={`mt-6 p-4 rounded-md text-sm ${notification.includes('successfully') ? 'bg-green-500 bg-opacity-20 text-green-300' : 'bg-red-500 bg-opacity-20 text-red-300'}`}>
                            {notification}
                        </div>
                    )}

                    <form onSubmit={handleSaveChanges} className="mt-8 space-y-10">
                        {/* Public Link Section */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold">Your Public Portfolio</h2>
                            <div className="mt-4 bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-gray-300">
                                {`${window.location.origin}/${username}`}
                            </div>
                        </div>

                        {/* Profile Section */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold">Profile</h2>
                            <div className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                                    <input type="text" name="name" id="name" value={portfolioData?.name || ''} onChange={handleInputChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-300">Profile Picture URL</label>
                                    <input type="url" name="profileImageUrl" id="profileImageUrl" placeholder="https://example.com/your-photo.jpg" value={portfolioData?.profileImageUrl || ''} onChange={handleInputChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="tagline" className="block text-sm font-medium text-gray-300">Tagline / Profession</label>
                                    <input type="text" name="tagline" id="tagline" placeholder="e.g., Freelance Video Editor" value={portfolioData?.tagline || ''} onChange={handleInputChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300">About / Bio</label>
                                    <textarea id="bio" name="bio" rows="4" value={portfolioData?.bio || ''} onChange={handleInputChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Editing Tools Section */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold">Editing Tools</h2>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {editingTools.map(tool => (
                                    <label key={tool} className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" name={tool} checked={portfolioData?.editingTools?.includes(tool) || false} onChange={(e) => handleCheckboxChange(e, 'editingTools')} className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-indigo-500 focus:ring-indigo-500" />
                                        <span className="text-gray-300">{tool}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* AI Tools Section */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold">AI Tools</h2>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {aiTools.map(tool => (
                                    <label key={tool} className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" name={tool} checked={portfolioData?.aiTools?.includes(tool) || false} onChange={(e) => handleCheckboxChange(e, 'aiTools')} className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-indigo-500 focus:ring-indigo-500" />
                                        <span className="text-gray-300">{tool}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        {/* Socials Section */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold">Socials</h2>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">YouTube</label>
                                    <input type="url" name="youtube" placeholder="https://www.youtube.com/@yourhandle" value={portfolioData?.socials?.youtube || ''} onChange={handleSocialChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">Instagram</label>
                                    <input type="url" name="instagram" placeholder="https://www.instagram.com/yourhandle" value={portfolioData?.socials?.instagram || ''} onChange={handleSocialChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">X.com (Twitter)</label>
                                    <input type="url" name="twitter" placeholder="https://x.com/yourhandle" value={portfolioData?.socials?.twitter || ''} onChange={handleSocialChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">LinkedIn</label>
                                    <input type="url" name="linkedin" placeholder="https://www.linkedin.com/in/yourhandle" value={portfolioData?.socials?.linkedin || ''} onChange={handleSocialChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md" />
                                </div>
                            </div>
                        </div>

                        {/* Projects Section */}
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold">Projects</h2>
                            <div className="mt-4 space-y-8">
                                {portfolioData?.projects?.map((project, index) => (
                                    <div key={index} className="border-t border-gray-700 pt-6 relative">
                                        <h3 className="font-medium text-lg">Project {index + 1}</h3>
                                        <div className="mt-4 space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Project Title</label>
                                                <input type="text" name="title" value={project.title || ''} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Video URL (YouTube, Google Drive, etc.)</label>
                                                <input type="url" name="videoUrl" value={project.videoUrl || ''} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300">Description</label>
                                                <textarea name="description" rows="3" value={project.description || ''} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm"></textarea>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removeProject(index)} className="absolute top-4 right-0 text-gray-500 hover:text-red-400">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addProject} className="mt-6 flex items-center px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700">
                                Add New Project
                            </button>
                        </div>
                        
                        {/* Save Button */}
                        <div className="flex justify-end pt-5">
                            <button type="submit" disabled={saving} className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                                {saving ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
