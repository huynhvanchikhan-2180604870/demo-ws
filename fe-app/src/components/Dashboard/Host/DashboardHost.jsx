import React, { useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Dashboard from "./Pages/Dashboard";
import OrderTracking from "./Pages/OrderTracking";
import Revenue from "./Pages/Revenue";
import TourHost from "./Pages/TourHost";
import "./share/style.css";
import MessageManger from "./Pages/MessageManger";

const DashboardHost = () => {
  const {auth} = useSelector((state) => state); // Access user data from Redux store
  const navigate = useNavigate()
  
  // Check for user roles
  useEffect(() =>{
    if (auth?.user) {
      const isHost = auth.user.roles.some((role) => role.name === "ROLE_HOST");
      // Debugging role check
      console.log("Is host:", isHost);

      if (!isHost) {
        // If not a host, redirect to home page
        console.log("Redirecting to /home because user is not a host");
        navigate("/home");
      }
    }
  }, auth.user)

  

  return (
    <div className="d-flex column-gap-2">
      {/* Sidebar */}
      <div className="">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tours" element={<TourHost />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/orders_tracking" element={<OrderTracking />} />
          <Route path="/sessions" element={<MessageManger />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardHost;
