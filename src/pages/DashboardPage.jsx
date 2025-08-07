/* --- File: src/pages/DashboardPage.jsx (Final Version with Dynamic Link) --- */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebase/config.js';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

// Icon component
const Icon = ({ path, className = "w-6 h-6 mr-2" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
    </svg>
);

const DashboardPage = () => {
    const { currentUser } = useAuth();
    const [portfolioData, setPortfolioData] = useState(null);
    const [username, setUsername] = useState(''); // State to store the username
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState('');
    const [copied, setCopied] = useState(false); // State to track if link is copied

    // Firestore se user ka data real-time mein fetch karna
    useEffect(() => {
        if (!currentUser) return;
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setUsername(data.username || ''); // Set the username from the main doc
                const portfolio = data.portfolioData || {};
                
                if (!portfolio.projects) {
                    portfolio.projects = [];
                }
                setPortfolioData(portfolio);
            } else {
                console.log("User document does not exist!");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    // Function to copy link to clipboard
    const copyToClipboard = () => {
        // --- DYNAMIC URL LOGIC ---
        const url = `${window.location.origin}/${username}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    // Form mein kiye gaye changes ko state mein update karna
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData(prev => ({ ...prev, [name]: value }));
    };

    // Project-specific changes ko handle karna
    const handleProjectChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProjects = [...portfolioData.projects];
        updatedProjects[index] = { ...updatedProjects[index], [name]: value };
        setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
    };

    // Naya project add karna
    const addProject = () => {
        const newProject = { title: '', description: '', videoUrl: '' };
        setPortfolioData(prev => ({
            ...prev,
            projects: [...(prev.projects || []), newProject]
        }));
    };

    // Project ko remove karna
    const removeProject = (index) => {
        const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
        setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
    };

    // Changes ko Firestore mein save karna
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        if (!currentUser) return;
        setSaving(true);
        setNotification('');
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                portfolioData: portfolioData
            });
            setNotification('Your changes have been saved successfully!');
        } catch (error) {
            console.error("Error saving changes: ", error);
            setNotification('Failed to save changes. Please try again.');
        } finally {
            setSaving(false);
            setTimeout(() => setNotification(''), 3000);
        }
    };

    if (loading) {
        return <div className="text-center p-10 font-semibold">Loading your dashboard...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Editor</h1>
                        <p className="mt-2 text-gray-600">Edit your details and save to build your portfolio.</p>
                    </div>
                    {/* --- NEW: Public Link Display --- */}
                    {username && (
                        <div className="flex-shrink-0">
                            <label className="block text-sm font-medium text-gray-700">Your Public Link</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <a href={`/${username}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md bg-gray-50 border border-gray-300 text-indigo-600 sm:text-sm truncate">
                                    {`${window.location.origin}/${username}`}
                                </a>
                                <button
                                    type="button"
                                    onClick={copyToClipboard}
                                    className="relative -ml-px inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <Icon path="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" className="h-5 w-5 text-gray-500" />
                                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                {notification && (
                    <div className={`mt-6 p-4 rounded-md ${notification.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {notification}
                    </div>
                )}

                <form onSubmit={handleSaveChanges} className="mt-8 bg-white p-8 rounded-lg shadow-md space-y-12">
                    {/* --- Basic Info Section --- */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                            <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            Basic Information
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div className="sm:col-span-2">
                                <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                                <input type="url" name="profileImageUrl" id="profileImageUrl" placeholder="https://example.com/your-photo.jpg" value={portfolioData?.profileImageUrl || ''} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" name="name" id="name" value={portfolioData?.name || ''} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline / Profession</label>
                                <input type="text" name="tagline" id="tagline" placeholder="e.g., Freelance Video Editor" value={portfolioData?.tagline || ''} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">About / Bio</label>
                                <textarea id="bio" name="bio" rows="4" value={portfolioData?.bio || ''} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* --- Projects Section --- */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                            <Icon path="M9 17V7h2v10H9zm4 0V7h2v10h-2zm4 0V7h2v10h-2zM4 21h16V5H4v16z" />
                            Your Projects
                        </h2>
                        <div className="mt-4 space-y-8">
                            {portfolioData?.projects?.map((project, index) => (
                                <div key={index} className="border border-gray-200 p-6 rounded-lg relative">
                                    <h3 className="font-medium text-lg">Project {index + 1}</h3>
                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Project Title</label>
                                            <input type="text" name="title" value={project.title} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Video URL (YouTube, Google Drive, etc.)</label>
                                            <input type="url" name="videoUrl" value={project.videoUrl} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea name="description" rows="3" value={project.description} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => removeProject(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                                        <Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addProject} className="mt-6 flex items-center px-4 py-2 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Icon path="M12 6v6m0 0v6m0-6h6m-6 0H6" className="w-5 h-5 mr-2" />
                            Add New Project
                        </button>
                    </div>

                    {/* --- Save Button --- */}
                    <div className="pt-5 border-t border-gray-200">
                        <div className="flex justify-end">
                            <button type="submit" disabled={saving} className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                                {saving ? 'Saving...' : 'Save All Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DashboardPage;
