// src/pages/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect if not authenticated
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl mt-8 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to your Profile!</h1>
      <p className="text-gray-700">This is a protected page, only accessible to authenticated users.</p>
      <p className="text-gray-700 mt-2">Here you can view and manage your account details.</p>
    </div>
  );
};
export default ProfilePage;