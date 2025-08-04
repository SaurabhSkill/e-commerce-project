import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in and is an admin
  return userInfo && userInfo.isAdmin ? (
    <Outlet /> // If yes, render the child routes
  ) : (
    <Navigate to="/login" replace /> // If not, redirect to the login page
  );
};

export default AdminRoute;
