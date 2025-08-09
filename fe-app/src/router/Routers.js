import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "../components/Dashboard/Admin/AdminDashboard";
import BookingsList from "../components/Dashboard/Admin/page/BookingsList.jsx";
import ToursManager from "../components/Dashboard/Admin/page/ToursManager";
import UserManager from "../components/Dashboard/Admin/page/UserManager.jsx";
import DashboardHost from "../components/Dashboard/Host/DashboardHost";
import OrderTracking from "../components/Dashboard/Host/Pages/OrderTracking";
import Revenue from "../components/Dashboard/Host/Pages/Revenue";
import TourHost from "../components/Dashboard/Host/Pages/TourHost";
import OrderHistory from "../pages/OrderHistory";
import Profile from "../pages/Profile";
import RegisterHost from "../pages/RegisterHost";
import ThankYou from "../pages/ThankYou";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SeachResult from "./../pages/SearchResult";
import TourDetails from "./../pages/TourDetails";
import Tours from "./../pages/Tours";
import RegisterHostsList from "../components/Dashboard/Admin/page/RegisterHostsList.jsx";
import MessageManger from "../components/Dashboard/Host/Pages/MessageManger.jsx";
import Favorities from "../pages/Favorities.jsx";
import PromotionsManager from "../components/Dashboard/Admin/page/PromotionsManager.jsx";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-host" element={<RegisterHost />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/tours/search" element={<SeachResult />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorite" element={<Favorities />} />
        <Route path="/dashboard" element={<DashboardHost />} />
        <Route path="/dashboard/tours" element={<TourHost />} />
        <Route path="/dashboard/support" element={<DashboardHost />} />
        <Route path="/dashboard/revenue" element={<Revenue />} />
        <Route path="/dashboard/orders_tracking" element={<OrderTracking />} />
        <Route path="/dashboard/sessions" element={<MessageManger />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/tours" element={<ToursManager />} />
        <Route path="/admin/bookings" element={<BookingsList />} />
        <Route path="/admin/users" element={<UserManager />} />
        <Route path="/admin/host-register" element={<RegisterHostsList />} />
        <Route path="/admin/notifications/promotions" element={<PromotionsManager />} />
      </Routes>
    </div>
  );
};

export default Routers;
