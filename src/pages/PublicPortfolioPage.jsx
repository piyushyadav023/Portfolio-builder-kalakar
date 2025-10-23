import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config.js";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  limit, 
  doc, 
  updateDoc, 
  increment 
} from "firebase/firestore";

// --- Sahi templates import (Unchanged) ---
import TemplateClassic from '../templates/TemplateClassic.jsx';
import TemplateModern from '../templates/TemplateModern.jsx';
import TemplateSplit from '../templates/TemplateSplit.jsx';
import TemplateUltra3D from '../templates/TemplateUltra3D.jsx';


// --- Loading aur Error components (Unchanged) ---
const LoadingScreen = () => (
  <div className="bg-white flex items-center justify-center h-screen">
    <p className="text-xl text-gray-600 animate-pulse">Loading Portfolio...</p>
  </div>
);
const ErrorScreen = ({ error }) => (
  <div className="bg-white flex flex-col items-center justify-center h-screen text-center px-4">
    <h2 className="text-2xl font-bold text-red-500">Oops!</h2>
    <p className="text-xl text-gray-600 mt-2">{error}</p>
    <a href="/" className="mt-6 bg-pink-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-600">
      Go to Homepage
    </a>
  </div>
);


/* --- Main Page (Switcher) --- */
const PublicPortfolioPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data fetching logic (unchanged)
  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;
      setLoading(true);
      setError(null);
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username.toLowerCase()), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Is naam ka koi portfolio nahi mila.");
        } else {
          const userDocSnapshot = querySnapshot.docs[0];
          const userId = userDocSnapshot.id;
          const userDoc = userDocSnapshot.data();

          const userDocRef = doc(db, "users", userId);
          updateDoc(userDocRef, {
            profileViews: increment(1)
          }).catch(err => {
            console.warn("View tracking error:", err); 
          });

          userDoc.portfolioData.username = userDoc.username;
          setUserData(userDoc.portfolioData);
        }
      } catch (err) {
        setError("Portfolio load nahi ho paaya. Kripya dobara koshish karein.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [username]);

  
  const renderTemplate = () => {
    if (!userData) return <ErrorScreen error="User data nahi mila." />;

    // --- UPDATED: Default template ab 'split' hai ---
    const templateId = userData.templateId || 'split';

    switch (templateId) {
      case 'classic':
        return <TemplateClassic userData={userData} />;
      case 'modern':
        return <TemplateModern userData={userData} />;
      case 'split':
        return <TemplateSplit userData={userData} />;
      case 'ultra3d': 
        return <TemplateUltra3D userData={userData} />;
      
      // --- UPDATED: Fallback/default bhi ab 'split' hai ---
      default:
        return <TemplateSplit userData={userData} />;
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (!userData) return null;

  return renderTemplate();
};

export default PublicPortfolioPage;