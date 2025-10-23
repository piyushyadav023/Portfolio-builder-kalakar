import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Tilt = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);
  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

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
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/20 w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl"
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
      </motion.div>
    </div>
  );
};

const SocialIcon = ({ icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-700 hover:text-indigo-600 transition-transform hover:scale-110"
  >
    {icon}
  </a>
);

const getThumbnail = (project) => {
  if (project.thumbnailUrl) return project.thumbnailUrl;
  if (project.videoUrl?.includes("youtube.com/watch?v=")) {
    const id = project.videoUrl.split("v=")[1].split("&")[0];
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  if (project.videoUrl?.includes("drive.google.com/file/d/")) {
    const id = project.videoUrl.split("/d/")[1]?.split("/")[0];
    return `https://drive.google.com/thumbnail?id=${id}`;
  }
  return "https://placehold.co/600x400?text=Project";
};

const TemplateUltra3D = ({ userData }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-200 text-gray-800 font-[Poppins] overflow-x-hidden">
      {/* soft gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(186,230,253,0.5) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(199,210,254,0.5) 0%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />

      {/* Profile Card */}
      <section className="flex flex-col items-center text-center pt-16 pb-20">
        <Tilt>
          <motion.div
            className="p-6 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-xl max-w-sm mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={
                userData.profileImageUrl ||
                "https://placehold.co/120x120/EEE/AAA?text=User"
              }
              alt="profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-white/70 shadow-md mx-auto"
            />
            <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent font-[Bebas Neue] tracking-wide">
              {userData.name}
            </h1>
            <h2 className="text-sm text-gray-600 mt-1 italic">{userData.tagline}</h2>
            <div className="flex justify-center gap-4 mt-3">
              {userData.socials?.youtube && (
                <SocialIcon
                  url={userData.socials.youtube}
                  icon={<i className="ri-youtube-fill text-xl"></i>}
                />
              )}
              {userData.socials?.instagram && (
                <SocialIcon
                  url={userData.socials.instagram}
                  icon={<i className="ri-instagram-fill text-xl"></i>}
                />
              )}
              {userData.socials?.linkedin && (
                <SocialIcon
                  url={userData.socials.linkedin}
                  icon={<i className="ri-linkedin-fill text-xl"></i>}
                />
              )}
            </div>
          </motion.div>
        </Tilt>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 text-center shadow-md mb-16">
        <h2 className="text-2xl font-bold text-indigo-600 mb-3 font-[Bebas Neue]">
          About Me
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">{userData.bio}</p>
      </section>

      {/* Toolkit */}
      {(userData.editingTools?.length > 0 || userData.aiTools?.length > 0) && (
        <section className="max-w-5xl mx-auto mb-20 text-center">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6 font-[Bebas Neue]">
            My Toolkit
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[...(userData.editingTools || []), ...(userData.aiTools || [])].map(
              (tool, i) => (
                <motion.div
                  key={i}
                  className="px-4 py-2 rounded-full text-sm text-white font-semibold shadow-md cursor-pointer bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-indigo-500 hover:to-sky-500 transition-all"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [0, -5, 0],
                    boxShadow: [
                      "0 0 6px rgba(59,130,246,0.3)",
                      "0 0 10px rgba(79,70,229,0.4)",
                      "0 0 6px rgba(59,130,246,0.3)",
                    ],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  {tool}
                </motion.div>
              )
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-8 font-[Bebas Neue]">
          My Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.projects?.length > 0 ? (
            userData.projects.map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
                onClick={() => setSelectedVideo(project.videoUrl)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getThumbnail(project)}
                    alt={project.title}
                    className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 bg-white/70 p-10 rounded-2xl border border-white/30 sm:col-span-2 lg:col-span-3">
              <p>No projects added yet.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} {userData.name} | Crafted with 💙 by Kalakar Guild
      </footer>
    </div>
  );
};

export default TemplateUltra3D;
