import React, { useState } from 'react';

// --- Helper Components for this Template ---

// (VideoModal unchanged)
const VideoModal = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;
  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes("drive.google.com/file/d/")) {
      const fileId = url.split("/d/")[1]?.split("/")[0];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-black rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl overflow-hidden border-2 border-gray-700" onClick={(e) => e.stopPropagation()}>
        <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src={getEmbedUrl(videoUrl)}
            title="Portfolio Video Player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-5 right-6 text-white text-5xl font-bold hover:text-gray-300">
        &times;
      </button>
    </div>
  );
};

// Social Icon Links (unchanged)
const SocialIcon = ({ type, url }) => {
  const icons = {
    youtube: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>,
    instagram: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
    twitter: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>,
    linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition">
      {icons[type]}
    </a>
  );
};

// --- Main Modern Template Component ---
const TemplateModern = ({ userData }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // --- UPDATED: Poora getThumbnail function classic template se copy kiya ---
  const getThumbnail = (project) => {
    if (project.thumbnailUrl) return project.thumbnailUrl;
    if (project.videoUrl?.includes("youtube.com/watch?v=")) {
      const videoId = project.videoUrl.split("v=")[1].split("&")[0];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    if (project.videoUrl?.includes("drive.google.com/file/d/")) {
      const fileId = project.videoUrl.split("/d/")[1]?.split("/")[0];
      return `https://drive.google.com/thumbnail?id=${fileId}`;
    }
    // Fallback ab classic wale se match karta hai
    return `https://placehold.co/600x400/374151/FFFFFF?text=Video`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />

      <main className="container mx-auto max-w-7xl p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* --- Left Column (Profile) (unchanged) --- */}
          <aside className="md:col-span-4 lg:col-span-3 md:sticky md:top-12 h-fit">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={userData.profileImageUrl || "https://placehold.co/200x200/4F46E5/FFFFFF?text=User"}
                alt={userData.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-700 shadow-lg"
              />
              <h1 className="text-4xl font-bold text-white mt-6 text-center md:text-left">{userData.name}</h1>
              <h2 className="text-xl font-light text-indigo-400 mt-1 text-center md:text-left">{userData.tagline}</h2>
              <p className="mt-6 text-gray-300 text-center md:text-left">{userData.bio}</p>
              
              <div className="flex gap-5 mt-6">
                {userData.socials?.youtube && <SocialIcon type="youtube" url={userData.socials.youtube} />}
                {userData.socials?.instagram && <SocialIcon type="instagram" url={userData.socials.instagram} />}
                {userData.socials?.twitter && <SocialIcon type="twitter" url={userData.socials.twitter} />}
                {userData.socials?.linkedin && <SocialIcon type="linkedin" url={userData.socials.linkedin} />}
              </div>
              
              {userData.editingTools?.length > 0 && (
                <div className="mt-8 text-center md:text-left w-full">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Editing Tools</h3>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                    {userData.editingTools.map(tool => (
                      <span key={tool} className="bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full">{tool}</span>
                    ))}
                  </div>
                </div>
              )}
              {userData.aiTools?.length > 0 && (
                <div className="mt-6 text-center md:text-left w-full">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">AI Tools</h3>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                    {userData.aiTools.map(tool => (
                      <span key={tool} className="bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full">{tool}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* --- Right Column (Projects) --- */}
          <section className="md:col-span-8 lg:col-span-9">
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
              My Work
            </h2>
            <div className="space-y-8">
              {userData.projects && userData.projects.length > 0 ? (
                userData.projects.map((project, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-1 lg:grid-cols-5 gap-6 bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition cursor-pointer"
                    onClick={() => setSelectedVideo(project.videoUrl)}
                  >
                    <div className="lg:col-span-2 relative group">
                      <img 
                        // --- UPDATED: Ab 'project' object pass ho raha hai ---
                        src={getThumbnail(project)} 
                        alt={project.title} 
                        className="w-full h-48 lg:h-full object-cover rounded-lg"
                      />
                      {/* --- UPDATED: Play button se hover effect (opacity-0 group-hover:opacity-100) hata diya --- */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition">
                        <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-full shadow-lg">
                          <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.5 5.5a1 1 0 011.555-.832l6 4a1 1 0 010 1.664l-6 4A1 1 0 016.5 13.5v-8z" clipRule="evenodd" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3">
                      <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-3 text-gray-300">{project.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 bg-gray-800 p-12 rounded-2xl border border-gray-700">
                  <p>This user hasn't added any projects yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TemplateModern;