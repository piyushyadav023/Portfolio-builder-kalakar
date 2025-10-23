import React, { useState } from 'react';

/* --- Helper Components (Copied from your file) --- */

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

const ProjectCard = ({ project, onCardClick }) => {
  const getThumbnail = () => {
    if (project.thumbnailUrl) return project.thumbnailUrl;
    if (project.videoUrl?.includes("youtube.com/watch?v=")) {
      const videoId = project.videoUrl.split("v=")[1].split("&")[0];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    if (project.videoUrl?.includes("drive.google.com/file/d/")) {
      const fileId = project.videoUrl.split("/d/")[1]?.split("/")[0];
      return `https://drive.google.com/thumbnail?id=${fileId}`;
    }
    return `https://placehold.co/600x400/1F2937/FFFFFF?text=Video`;
  };
  return (
    <div
      onClick={() => onCardClick(project.videoUrl)}
      className="relative group rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-xl cursor-pointer bg-white transition transform hover:-translate-y-1"
    >
      <img src={getThumbnail()} alt={project.title} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
        <div className="w-14 h-14 flex items-center justify-center bg-pink-500 rounded-full shadow-lg hover:scale-110 transition">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.5 5.5a1 1 0 011.555-.832l6 4a1 1 0 010 1.664l-6 4A1 1 0 016.5 13.5v-8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 border-t border-gray-200">
        <h3 className="text-base font-semibold text-gray-800">{project.title || "Untitled Project"}</h3>
      </div>
    </div>
  );
};

const SocialButton = ({ type, url }) => {
  const styles = {
    youtube: "bg-red-500",
    instagram: "bg-gradient-to-r from-pink-500 to-yellow-400",
    twitter: "bg-sky-400",
    linkedin: "bg-blue-600",
  };
  const icons = {
    youtube: "▶ YouTube",
    instagram: "📸 Instagram",
    twitter: "🐦 Twitter",
    linkedin: "in LinkedIn",
  };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${styles[type]} text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow hover:scale-105 transition`}>
      {icons[type]}
    </a>
  );
};

const ProfileSection = ({ name, bio, profileImageUrl, username, socials, editingTools, aiTools }) => {
  return (
    <div className="relative text-center flex flex-col items-center p-10 bg-white rounded-3xl shadow-xl border border-gray-200">
      <div className="relative border-4 border-pink-300 rounded-2xl shadow-lg overflow-hidden w-40 h-40">
        <img className="w-full h-full object-cover" src={profileImageUrl || "https://placehold.co/200x200/EEE/333?text=User"} alt={name || "User"} />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mt-6 relative">
        {name || "Your Name"}
        <span className="block w-20 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-2"></span>
      </h1>
      <p className="text-gray-500 text-sm mt-1">@{username || "username"}</p>
      <p className="mt-4 text-gray-700 text-base leading-relaxed max-w-xl">{bio || "This is the user bio section."}</p>
      <div className="flex gap-2 mt-6 flex-wrap justify-center">
        {socials?.youtube && <SocialButton type="youtube" url={socials.youtube} />}
        {socials?.instagram && <SocialButton type="instagram" url={socials.instagram} />}
        {socials?.twitter && <SocialButton type="twitter" url={socials.twitter} />}
        {socials?.linkedin && <SocialButton type="linkedin" url={socials.linkedin} />}
      </div>
      {editingTools?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Editing Tools</h3>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {editingTools.map((tool) => (
              <span key={tool} className="bg-pink-50 text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-pink-200">{tool}</span>
            ))}
          </div>
        </div>
      )}
      {aiTools?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">AI Tools</h3>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {aiTools.map((tool) => (
              <span key={tool} className="bg-purple-50 text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-purple-200">{tool}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


/* --- Main Classic Template Component --- */
const TemplateClassic = ({ userData }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        <ProfileSection
          name={userData.name}
          bio={userData.bio}
          profileImageUrl={userData.profileImageUrl}
          username={userData.username}
          socials={userData.socials}
          editingTools={userData.editingTools}
          aiTools={userData.aiTools}
        />

        <section>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            My Work
          </h2>
          {userData.projects && userData.projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {userData.projects.map((project, index) => (
                <ProjectCard key={index} project={project} onCardClick={setSelectedVideo} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 bg-gray-50 p-12 rounded-2xl border border-gray-200">
              <p>This user hasn't added any projects yet.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default TemplateClassic;