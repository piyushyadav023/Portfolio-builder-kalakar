/* --- Redesigned: PublicPortfolioPage.jsx (Fixed with Tools + Social + Verified + Drive Thumbnail) --- */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config.js";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

/* --- Video Modal --- */
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
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
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
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white text-5xl font-bold hover:text-gray-300"
      >
        &times;
      </button>
    </div>
  );
};

/* --- Project Card --- */
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
      className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-1 transition"
    >
      <img
        src={getThumbnail()}
        alt={project.title}
        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 flex items-center justify-center transition">
        <svg
          className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3">
        <h3 className="text-sm font-semibold text-white truncate">
          {project.title || "Untitled Project"}
        </h3>
      </div>
    </div>
  );
};

/* --- Social Icon Button --- */
const SocialButton = ({ type, url }) => {
  const colors = {
    youtube: "bg-red-600",
    instagram: "bg-gradient-to-r from-pink-500 to-yellow-500",
    twitter: "bg-sky-500",
    linkedin: "bg-blue-700",
  };
  const icons = {
    youtube: "▶ YouTube",
    instagram: "📸 Instagram",
    twitter: "🐦 Twitter",
    linkedin: "in LinkedIn",
  };
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${colors[type]} text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md hover:opacity-90 transition`}
    >
      {icons[type]}
    </a>
  );
};

/* --- Profile Section --- */
const ProfileSection = ({ name, bio, profileImageUrl, username, socials, editingTools, aiTools }) => {
  return (
    <div className="text-center flex flex-col items-center p-6 bg-gradient-to-b from-gray-800/60 to-gray-900 rounded-2xl shadow-xl">
      <img
        className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
        src={
          profileImageUrl ||
          "https://placehold.co/200x200/374151/4F46E5?text=User"
        }
        alt={name || "User"}
      />
      <h1 className="text-2xl font-bold text-white mt-4 flex items-center gap-2">
        {name || "Your Name"}
        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293A1 1 0 105.293 10.707l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Verified
        </span>
      </h1>
      <p className="text-gray-400 text-sm">@{username || "username"}</p>
      <p className="mt-3 text-gray-300 text-base leading-relaxed max-w-md">
        {bio || "This is the user bio section."}
      </p>

      {/* --- Socials --- */}
      <div className="flex gap-2 mt-6 flex-wrap justify-center">
        {socials?.youtube && <SocialButton type="youtube" url={socials.youtube} />}
        {socials?.instagram && <SocialButton type="instagram" url={socials.instagram} />}
        {socials?.twitter && <SocialButton type="twitter" url={socials.twitter} />}
        {socials?.linkedin && <SocialButton type="linkedin" url={socials.linkedin} />}
      </div>

      {/* --- Tools Section --- */}
      <div className="mt-8 border-t border-gray-700 pt-6 w-full">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Editing Tools
        </h3>
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {editingTools?.map((tool) => (
            <span
              key={tool}
              className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 w-full">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          AI Tools
        </h3>
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {aiTools?.map((tool) => (
            <span
              key={tool}
              className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- Main Public Portfolio Page --- */
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
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("username", "==", username.toLowerCase()),
          limit(1)
        );
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
    return (
      <div className="bg-gray-900 flex items-center justify-center h-screen">
        <p className="text-xl text-white animate-pulse">Loading Portfolio...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-gray-900 flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold text-red-500">Oops!</h2>
        <p className="text-xl text-gray-300 mt-2">{error}</p>
        <a
          href="/"
          className="mt-6 bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-600"
        >
          Go to Homepage
        </a>
      </div>
    );
  }
  if (!userData) return null;

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans relative">
      <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProfileSection
          name={userData.name}
          bio={userData.bio}
          profileImageUrl={userData.profileImageUrl}
          username={userData.username}
          socials={userData.socials}
          editingTools={userData.editingTools}
          aiTools={userData.aiTools}
        />

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-white text-center">My Work</h2>
          {userData.projects && userData.projects.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        </section>
      </main>
    </div>
  );
};

export default PublicPortfolioPage;
