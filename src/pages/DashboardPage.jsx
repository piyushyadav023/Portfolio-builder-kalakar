import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebase/config.js';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Trash2, PlusCircle } from 'lucide-react'; // Using Lucide for icons

// Tool lists remain the same
const editingTools = [
    "Adobe Premiere Pro", "Adobe After Effects", "CapCut", "DaVinci Resolve", 
    "Final Cut Pro", "Blender", "iMovie", "Vegas Pro", "VN", "Avid", "Lightworks"
];
const aiTools = [
    "Midjourney", "DALL-E", "RunwayML", "Pika Labs", "Kling AI", 
    "Google VEO", "Sora by OpenAI", "HeyGen"
];

const Icon = ({ path, className = "w-5 h-5 mr-3 text-gray-500 group-hover:text-indigo-600 transition-colors" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
    </svg>
);

// --- UPDATED: Sidebar for Light Theme ---
const Sidebar = ({ user }) => (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold text-white">
                {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
                <p className="font-semibold text-gray-900">{user?.displayName || user?.email}</p>
                <p className="text-sm text-gray-600">Editor</p>
            </div>
        </div>
        <nav className="mt-10">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Editor Tools</p>
            <ul className="mt-4 space-y-2">
                <li>
                    {/* Active Link Style */}
                    <a href="#" className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg group">
                        <Icon path="M4 6h16M4 12h16M4 18h16" className="w-5 h-5 mr-3 text-indigo-600" />
                        <span>Portfolio</span>
                    </a>
                </li>
                <li>
                    {/* Inactive Link Style */}
                    <a href="#" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg group">
                        <Icon path="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        <span>Analytics</span>
                        <span className="ml-auto text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Soon</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
);

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

    // All handler functions (handleInputChange, etc.) remain the same.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData(prev => ({ ...prev, [name]: value }));
    };
    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData(prev => ({
            ...prev,
            socials: { ...prev.socials, [name]: value }
        }));
    };
    const handleCheckboxChange = (e, toolType) => {
        const { name, checked } = e.target;
        setPortfolioData(prev => {
            const existingTools = prev[toolType] || [];
            if (checked) return { ...prev, [toolType]: [...existingTools, name] };
            else return { ...prev, [toolType]: existingTools.filter(tool => tool !== name) };
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
    
    // UPDATED: Loading state for light theme
    if (loading) return <div className="bg-gray-50 min-h-screen flex items-center justify-center text-gray-700 font-semibold">Loading your dashboard...</div>;

    return (
        // UPDATED: Main background to a light gray
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-col lg:flex-row min-h-screen">
                <Sidebar user={currentUser} />

                <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        {/* UPDATED: Text colors */}
                        <h1 className="text-3xl font-bold text-gray-900">Your Editor Profile</h1>
                        <p className="mt-2 text-gray-600">Fill in the details below to update your public portfolio.</p>

                        {/* UPDATED: Notification styles */}
                        {notification && (
                            <div className={`mt-6 p-4 rounded-lg text-sm ${notification.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {notification}
                            </div>
                        )}
                        
                        <form onSubmit={handleSaveChanges} className="mt-8 space-y-8">
                            
                            {/* --- UPDATED: All sections are now white cards with shadows --- */}

                            {/* Public Portfolio Link Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Your Public Portfolio Link</h2>
                                <div className="mt-4 bg-gray-100 border border-gray-300 rounded-md px-4 py-3 text-indigo-600 break-all font-mono">
                                    {`${window.location.origin}/${username}`}
                                </div>
                            </div>

                            {/* Profile Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" name="name" value={portfolioData?.name || ''} onChange={handleInputChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                                        <input type="url" name="profileImageUrl" value={portfolioData?.profileImageUrl || ''} onChange={handleInputChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Tagline / Profession</label>
                                        <input type="text" name="tagline" value={portfolioData?.tagline || ''} onChange={handleInputChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">About / Bio</label>
                                        <textarea name="bio" rows="4" value={portfolioData?.bio || ''} onChange={handleInputChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm"></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Editing & AI Tools Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-900">Editing Tools</h2>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {editingTools.map(tool => (
                                            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
                                                <input type="checkbox" name={tool} checked={portfolioData?.editingTools?.includes(tool) || false} onChange={(e) => handleCheckboxChange(e, 'editingTools')} className="h-4 w-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <span className="text-gray-700">{tool}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-900">AI Tools</h2>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {aiTools.map(tool => (
                                            <label key={tool} className="flex items-center space-x-3 cursor-pointer">
                                                <input type="checkbox" name={tool} checked={portfolioData?.aiTools?.includes(tool) || false} onChange={(e) => handleCheckboxChange(e, 'aiTools')} className="h-4 w-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <span className="text-gray-700">{tool}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Socials Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Socials</h2>
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {['youtube', 'instagram', 'twitter', 'linkedin'].map(social => (
                                        <div key={social}>
                                            <label className="block text-sm font-medium text-gray-700 capitalize">{social}</label>
                                            <input type="url" name={social} placeholder={`https://www.${social}.com/...`} value={portfolioData?.socials?.[social] || ''} onChange={handleSocialChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Projects Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                                    <button type="button" onClick={addProject} className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                        <PlusCircle size={16} /> Add Project
                                    </button>
                                </div>
                                <div className="mt-6 space-y-6">
                                    {portfolioData?.projects?.map((project, index) => (
                                        <div key={index} className="border-t border-gray-200 pt-6 relative group">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Project Title</label>
                                                    <input type="text" name="title" value={project.title || ''} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Video URL</label>
                                                    <input type="url" name="videoUrl" value={project.videoUrl || ''} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea name="description" rows="3" value={project.description || ''} onChange={(e) => handleProjectChange(index, e)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm"></textarea>
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removeProject(index)} className="absolute top-4 right-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 />
                                            </button>
                                        </div>
                                    ))}
                                    {portfolioData?.projects?.length === 0 && (
                                        <p className="text-center text-gray-500 py-4">You haven't added any projects yet.</p>
                                    )}
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end pt-5 sticky bottom-0 bg-gray-100 py-4">
                                <button type="submit" disabled={saving} className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed">
                                    {saving ? 'Saving...' : 'Save All Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;