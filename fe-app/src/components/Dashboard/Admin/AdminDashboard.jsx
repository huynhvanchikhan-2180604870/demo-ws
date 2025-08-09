import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../Host/share/style.css";
import Navigation from "./Navigation/Navigation"; // Sidebar Component
import BookingsList from "./page/BookingsList";
import CategoriesManager from "./page/CategoriesManager";
import Dashboard from "./page/Dashboard";
import RevenueStats from "./page/RevenueStats";
import ToursManager from "./page/ToursManager";
import UserManager from "./page/UserManager";
import RegisterHostsList from "./page/RegisterHostsList";
import PromotionsManager from "./page/PromotionsManager";

const AdminDashboard = () => {
  const { auth } = useSelector((state) => state); // Access user data from Redux store
  const navigate = useNavigate();

  // Check for user roles
  useEffect(() => {
    if (auth?.user) {
      const isAdmin = auth.user.roles.some(
        (role) => role.name === "ROLE_ADMIN"
      );
      if (!isAdmin) {
        navigate("/home"); // Redirect if user is not an admin
      }
    }
  }, [auth, navigate]);

  return (
    <div className="admin-dashboard d-flex">
      {/* Sidebar */}
      <div className="sidebar">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/tours" element={<ToursManager />} />
          <Route path="/bookings" element={<BookingsList />} />
          <Route path="/users" element={<UserManager />} />
          <Route path="/categories" element={<CategoriesManager />} />
          <Route path="/revenue" element={<RevenueStats />} />
          <Route path="/host-register" element={<RegisterHostsList />} />
          <Route path="/notifications/promotions" element={<PromotionsManager />} />

        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
