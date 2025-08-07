import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Nayi AuthContext file se import karein
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import PublicPortfolioPage from './pages/PublicPortfolioPage.jsx';

// Components
import Navbar from './components/Navbar.jsx';

const Loader = () => <div className="flex justify-center items-center h-screen"><div className="text-xl">Loading...</div></div>;

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}

function AppContent() {
    const { loading, currentUser } = useAuth();

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={!currentUser ? <SignupPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/:username" element={<PublicPortfolioPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;