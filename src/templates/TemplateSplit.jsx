import React, { useState } from 'react';

// --- Helper: VideoModal (Classic se copy kiya) ---
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
      <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl overflow-hidden border-4 border-gray-200" onClick={(e) => e.stopPropagation()}>
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

// --- Helper: Social Icons (Modern se copy kiya) ---
const SocialIcon = ({ type, url }) => {
  const icons = {
    youtube: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>,
    instagram: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
    twitter: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>,
    linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition">
      {icons[type]}
    </a>
  );
};

// --- Helper: getThumbnail (Classic se copy kiya) ---
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
  return `https://placehold.co/600x400/F3F4F6/9CA3AF?text=Video`;
};


// --- Main Split Template Component ---
const TemplateSplit = ({ userData }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="min-h-screen font-sans">
      <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />

      {/* Main container: Mobile (column) | Desktop (row) */}
      <div className="flex flex-col md:flex-row md:h-screen">
        
        {/* --- Left Pane (Profile) --- */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left md:h-screen md:sticky md:top-0">
          <div className="max-w-md">
            <img
              src={userData.profileImageUrl || "https://placehold.co/160x160/E0E7FF/4F46E5?text=User"}
              alt={userData.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg mx-auto md:mx-0"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6">{userData.name}</h1>
            <h2 className="text-2xl text-indigo-600 mt-2">{userData.tagline}</h2>
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">{userData.bio}</p>
            
            <div className="flex gap-6 mt-8 justify-center md:justify-start">
              {userData.socials?.youtube && <SocialIcon type="youtube" url={userData.socials.youtube} />}
              {userData.socials?.instagram && <SocialIcon type="instagram" url={userData.socials.instagram} />}
              {userData.socials?.twitter && <SocialIcon type="twitter" url={userData.socials.twitter} />}
              {userData.socials?.linkedin && <SocialIcon type="linkedin" url={userData.socials.linkedin} />}
            </div>

            {/* Tools */}
            {(userData.editingTools?.length > 0 || userData.aiTools?.length > 0) && (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Toolkit</h3>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {userData.editingTools?.map(tool => (
                    <span key={tool} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{tool}</span>
                  ))}
                  {userData.aiTools?.map(tool => (
                    <span key={tool} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{tool}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- Right Pane (Projects) --- */}
        {/* Note: On desktop, left pane is sticky, so this right pane will scroll naturally */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">My Work</h2>
          
          <div className="space-y-12">
            {userData.projects && userData.projects.length > 0 ? (
              userData.projects.map((project, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(project.videoUrl)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-xl border border-gray-100">
                    <img
                      src={getThumbnail(project)}
                      alt={project.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play Button (Always Visible) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition">
                      <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition">
                        <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.5 5.5a1 1 0 011.555-.832l6 4a1 1 0 010 1.664l-6 4A1 1 0 016.5 13.5v-8z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-4">{project.title}</h3>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 bg-gray-50 p-12 rounded-lg border border-gray-200">
                <p>This user hasn't added any projects yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSplit;