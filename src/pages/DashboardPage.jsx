import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebase/config.js';
import { doc, onSnapshot, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
// UPDATED: Naye icons add kiye
import { Trash2, PlusCircle, UploadCloud, Copy, ChevronDown, ChevronUp, Zap } from 'lucide-react'; // Zap icon add kiya
// NEW: Chart library import ki
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Tool lists (unchanged)
const editingTools = [
    "Adobe Premiere Pro", "Adobe After Effects", "CapCut", "DaVinci Resolve", 
    "Final Cut Pro", "Blender", "iMovie", "Vegas Pro", "VN", "Avid", "Lightworks"
];
const aiTools = [
    "Midjourney", "DALL-E", "RunwayML", "Pika Labs", "Kling AI", 
    "Google VEO", "Sora by OpenAI", "HeyGen"
];

// --- NEW: Template Definitions ---
const templateOptions = [
  {
    id: 'classic',
    name: 'Classic Portfolio',
    imageUrl: 'https://placehold.co/400x300/E0E7FF/4F46E5?text=Classic' 
  },
  {
    id: 'modern',
    name: 'Modern Header',
    imageUrl: 'https://placehold.co/400x300/DBEAFE/1D4ED8?text=Modern' 
  },
  {
    id: 'split',
    name: 'Split Screen',
    imageUrl: 'https://placehold.co/400x300/E5E7EB/1F2937?text=Split'
  },
  {
    // --- YEH ADD KAREIN ---
    id: 'ultra3d',
    name: 'Ultra 3D',
    imageUrl: 'https://placehold.co/400x300/111827/6366F1?text=Ultra+3D'
  }
];


const Icon = ({ path, className = "w-5 h-5 mr-3 text-gray-500 group-hover:text-indigo-600 transition-colors" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
    </svg>
);

// --- Analytics Component (Unchanged) ---
const AnalyticsComponent = ({ data }) => {
    
    const chartData = [
        { day: 'Mon', views: 4 },
        { day: 'Tue', views: 2 },
        { day: 'Wed', views: 7 },
        { day: 'Thu', views: 5 },
        { day: 'Fri', views: 10 },
        { day: 'Sat', views: 15 },
        { day: 'Sun', views: 12 },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="mt-2 text-gray-600">Aapke portfolio ki performance.</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Profile Views Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-500">Total Profile Views</h2>
                    <p className="text-5xl font-bold text-indigo-600 mt-4">
                        {data.profileViews}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">Total visits aapke public portfolio link par.</p>
                </div>
                
                {/* Social Link Clicks Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-500">Social Link Clicks</h2>
                    <p className="mt-4 text-gray-700">Coming Soon...</p>
                    <p className="mt-2 text-sm text-gray-500 text-center">Specific link clicks ko track karna complex hai.</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Weekly View Trends (Sample)</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Note: Yeh abhi sample data hai. Real historical data tracking jald hi add hoga.
                </p>
                <div className="mt-6 h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="day" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                            <Line type="monotone" dataKey="views" stroke="#6366F1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};


// --- Sidebar (Unchanged) ---
const Sidebar = ({ user, activeTab, setActiveTab }) => (
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
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('portfolio'); }}
                        className={`flex items-center px-3 py-2 rounded-lg group ${
                            activeTab === 'portfolio' 
                            ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <Icon path="M4 6h16M4 12h16M4 18h16" className={`w-5 h-5 mr-3 ${activeTab === 'portfolio' ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'}`} />
                        <span>Portfolio</span>
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('analytics'); }}
                        className={`flex items-center px-3 py-2 rounded-lg group ${
                            activeTab === 'analytics' 
                            ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <Icon path="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" className={`w-5 h-5 mr-3 ${activeTab === 'analytics' ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'}`} />
                        <span>Analytics</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
);

const DashboardPage = () => {
    const { currentUser } = useAuth();
    const [portfolioData, setPortfolioData] = useState(null);
    const [linkUsername, setLinkUsername] = useState('');
    const [originalUsername, setOriginalUsername] = useState('');
    
    const [activeTab, setActiveTab] = useState('portfolio');
    const [analyticsData, setAnalyticsData] = useState({ profileViews: 0 });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState('');
    const [imageUploading, setImageUploading] = useState(false);

    // --- NEW: isPremium state ---
    const [isPremium, setIsPremium] = useState(false);

    const [copySuccess, setCopySuccess] = useState('');
    const [openProjectIndex, setOpenProjectIndex] = useState(null);

    useEffect(() => {
        if (!currentUser) return;
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setLinkUsername(data.username || '');
                setOriginalUsername(data.username || '');
                
                // --- NEW: 'isPremium' state ko set karna ---
                setIsPremium(data.isPremium || false);
                
                setAnalyticsData({
                    profileViews: data.profileViews || 0
                });

                const portfolio = data.portfolioData || {};
                if (!portfolio.projects) portfolio.projects = [];
                if (!portfolio.editingTools) portfolio.editingTools = [];
                if (!portfolio.aiTools) portfolio.aiTools = [];
                if (!portfolio.socials) portfolio.socials = {};
                // Default template set karna agar nahi hai
                if (!portfolio.templateId) portfolio.templateId = 'classic';
                setPortfolioData(portfolio);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // 'templateId' ko portfolioData mein save karne ke liye
        if (name === 'templateId') {
          setPortfolioData(prev => ({ ...prev, templateId: value }));
        } else {
          setPortfolioData(prev => ({ ...prev, [name]: value }));
        }
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
        const newProject = { title: 'New Project', description: '', videoUrl: '' }; 
        const newProjects = [...(portfolioData.projects || []), newProject];
        setPortfolioData(prev => ({ ...prev, projects: newProjects }));
        setOpenProjectIndex(newProjects.length - 1);
    };

    const removeProject = (index) => {
        const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
        setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
        if (openProjectIndex === index) {
            setOpenProjectIndex(null);
        }
    };

    const handleImageUpload = async (e) => {
        // ... (Image upload logic unchanged) ...
        const file = e.target.files[0];
        if (!file) return;

        setImageUploading(true);
        setNotification('');
        
        const CLOUD_NAME = "dz5x7rlfx";
        const UPLOAD_PRESET = "portfolio_build";
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            
            if (data.secure_url) {
                setPortfolioData(prev => ({ ...prev, profileImageUrl: data.secure_url }));
                setNotification('Profile picture updated!');
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            setNotification('Image upload failed. Please try again.');
        } finally {
            setImageUploading(false);
            setTimeout(() => setNotification(''), 3000);
        }
    };

    // --- UPDATED: handleSaveChanges ---
    // Ab yeh 'isPremium' field ko update nahi karega (kyunki woh manually hota hai)
    // Yeh bas 'portfolioData' (jiske andar templateId hai) aur 'username' ko save karega
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        if (!currentUser) return;
        setSaving(true);
        setNotification('');

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const newUsername = linkUsername.trim().toLowerCase();
            
            if (newUsername.length < 3) {
                setNotification('Username kam se kam 3 characters ka hona chahiye.');
                setSaving(false);
                return;
            }
            if (!/^[a-zA-Z0-9_]+$/.test(newUsername)) {
                setNotification('Username mein sirf letters, numbers, aur underscores (_) ho sakte hain.');
                setSaving(false);
                return;
            }

            // 'updates' object mein sirf portfolioData rakhein
            let updates = { 
                portfolioData: portfolioData 
            };

            // Agar username badla hai, toh use bhi add karein
            if (newUsername !== originalUsername) {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("username", "==", newUsername));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setNotification('Yeh username pehle se liya ja chuka hai. Koi aur try karein.');
                    setSaving(false);
                    return;
                }
                updates.username = newUsername;
            }
            
            // Ab yeh 'updates' object (jismein portfolioData aur username hai) ko save karega
            await updateDoc(userDocRef, updates);

            if (updates.username) {
                setOriginalUsername(updates.username);
            }
            
            setNotification('Aapke changes successfully save ho gaye hain!');
        } catch (error) {
            console.error("Save error: ", error); // Debugging ke liye
            setNotification('Changes save karne mein fail hua. Please try again.');
        } finally {
            setSaving(false);
            setTimeout(() => setNotification(''), 3000);
        }
    };

    const handleCopyLink = () => {
        const fullLink = `${window.location.origin}/${linkUsername.trim().toLowerCase()}`;
        navigator.clipboard.writeText(fullLink).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    if (loading) return <div className="bg-gray-50 min-h-screen flex items-center justify-center text-gray-700 font-semibold">Loading your dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-col lg:flex-row min-h-screen">
                <Sidebar user={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        
                        {notification && (
                            <div className={`mb-6 p-4 rounded-lg text-sm ${notification.includes('successfully') || notification.includes('updated') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {notification}
                            </div>
                        )}

                        {activeTab === 'portfolio' && (
                            <>
                                <h1 className="text-3xl font-bold text-gray-900">Your Editor Profile</h1>
                                <p className="mt-2 text-gray-600">Fill in the details below to update your public portfolio.</p>
                                
                                <form onSubmit={handleSaveChanges} className="mt-8 space-y-8">
                                    
                                    {/* Public Portfolio Link Section (Unchanged) */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-900">Your Public Portfolio Link</h2>
                                        <p className="mt-1 text-sm text-gray-600">Yahaan aap apna unique link set kar sakte hain.</p>
                                        <div className="mt-4 flex items-center bg-gray-100 border border-gray-300 rounded-md text-gray-900 font-mono">
                                            <span className="px-4 py-3 text-gray-500 border-r border-gray-300">{`${window.location.origin.replace('http://', '').replace('https://','_')}/`}</span>
                                            <input 
                                                type="text"
                                                value={linkUsername}
                                                onChange={(e) => setLinkUsername(e.target.value)}
                                                className="flex-1 bg-transparent px-4 py-3 focus:outline-none"
                                                placeholder="your-username"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-xs font-medium text-gray-500">Your full link:</label>
                                            <div className="mt-1 flex gap-2">
                                                <input 
                                                    type="text"
                                                    readOnly
                                                    value={`${window.location.origin}/${linkUsername.trim().toLowerCase()}`}
                                                    className="flex-1 bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-gray-700 font-mono text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleCopyLink}
                                                    className="flex-shrink-0 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-24"
                                                >
                                                    {copySuccess ? copySuccess : <Copy size={16} className="mx-auto"/>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Section (Unchanged) */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
                                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                                <input type="text" name="name" value={portfolioData?.name || ''} onChange={handleInputChange} className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 sm:text-sm" />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                                                <div className="mt-2 flex items-center gap-6">
                                                    <img 
                                                        src={portfolioData?.profileImageUrl || 'https://placehold.co/96x96/E0E7FF/4F46E5?text=Img'} 
                                                        alt="Profile" 
                                                        className="w-24 h-24 rounded-full object-cover bg-gray-200 border border-gray-300" 
                                                    />
                                                    <label className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                        <UploadCloud size={16} />
                                                        <span>{imageUploading ? 'Uploading...' : 'Change Picture'}</span>
                                                        <input 
                                                            type="file" 
                                                            className="hidden" 
                                                            accept="image/png, image/jpeg, image/gif"
                                                            onChange={handleImageUpload}
                                                            disabled={imageUploading}
                                                        />
                                                    </label>
                                                </div>
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

                                    {/* Editing & AI Tools Sections (Unchanged) */}
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

                                    {/* Socials Section (Unchanged) */}
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

                                    {/* Projects Section (Collapsible - Unchanged) */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                                            <button type="button" onClick={addProject} className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                                <PlusCircle size={16} /> Add Project
                                            </button>
                                        </div>
                                        <div className="mt-6 space-y-4">
                                            {portfolioData?.projects?.map((project, index) => {
                                                const isOpen = openProjectIndex === index;
                                                return (
                                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                                        <button
                                                            type="button"
                                                            onClick={() => setOpenProjectIndex(isOpen ? null : index)}
                                                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                                                        >
                                                            <span className="font-semibold text-gray-800">{project.title || "Untitled Project"}</span>
                                                            <div className="flex items-center gap-4">
                                                                <button type="button" onClick={(e) => { e.stopPropagation(); removeProject(index); }} className="text-gray-400 hover:text-red-500">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                                {isOpen ? <ChevronUp size={20} className="text-gray-600" /> : <ChevronDown size={20} className="text-gray-600" />}
                                                            </div>
                                                        </button>
                                                        {isOpen && (
                                                            <div className="p-4 border-t border-gray-200 space-y-4">
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
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            {portfolioData?.projects?.length === 0 && (
                                                <p className="text-center text-gray-500 py-4">You haven't added any projects yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* --- NEW: Template Selector Section (Conditional) --- */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-900">Portfolio Template 🎨</h2>

                                        {/* --- CONDITION 1: PREMIUM USER (Can Select) --- */}
                                        {isPremium === true ? (
                                            <>
                                                <p className="mt-1 text-sm text-gray-600">Apne portfolio ke liye ek naya look chunein.</p>
                                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    {templateOptions.map((template) => (
                                                        <label 
                                                            key={template.id} 
                                                            className={`
                                                                relative border rounded-lg overflow-hidden cursor-pointer
                                                                ${portfolioData?.templateId === template.id ? 'border-indigo-500 border-2' : 'border-gray-300 hover:border-gray-400'}
                                                            `}
                                                        >
                                                            <input 
                                                                type="radio" 
                                                                name="templateId"
                                                                value={template.id}
                                                                checked={portfolioData?.templateId === template.id}
                                                                onChange={handleInputChange} // Uses existing handler
                                                                className="absolute -top-4 -left-4 opacity-0"
                                                            />
                                                            <img 
                                                                src={template.imageUrl} 
                                                                alt={template.name} 
                                                                className="w-full h-32 object-cover" 
                                                            />
                                                            <span className="block text-center text-sm font-medium text-gray-800 p-3">
                                                                {template.name}
                                                            </span>
                                                            {portfolioData?.templateId === template.id && (
                                                                <div className="absolute inset-0 bg-indigo-600 bg-opacity-70 flex items-center justify-center">
                                                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            /* --- CONDITION 2: FREE USER (Upgrade Prompt) --- */
                                            <>
                                                <p className="mt-1 text-sm text-gray-600">Premium unlock karke alag alag templates chunein.</p>
                                                {/* Preview Grid (Non-selectable) */}
                                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 blur-sm opacity-60">
                                                    {templateOptions.map((template) => (
                                                        <div key={template.id} className="border rounded-lg overflow-hidden">
                                                            <img src={template.imageUrl} alt={template.name} className="w-full h-32 object-cover" />
                                                            <span className="block text-center text-sm font-medium text-gray-800 p-3">{template.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Upgrade Button */}
                                                <div className="text-center mt-6">
                                                    <a 
                                                        href="https://payments.cashfree.com/forms/portfolio-pro-bykalakar-id2455555" // <-- YAHAN APNA LINK DAALEIN
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition"
                                                    >
                                                        <Zap size={16} /> Upgrade to Premium
                                                    </a>
                                                </div>
                                            </>
                                        )}
                                    </div>


                                    {/* Save Button (Unchanged) */}
                                    <div className="flex justify-end pt-5 sticky bottom-0 bg-gray-100 py-4">
                                        <button type="submit" disabled={saving || imageUploading} className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed">
                                            {(saving || imageUploading) ? 'Saving...' : 'Save All Changes'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                        
                        {activeTab === 'analytics' && (
                            <AnalyticsComponent data={analyticsData} />
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;