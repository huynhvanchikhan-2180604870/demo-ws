import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // MUI Icon for the dropdown
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material"; // MUI Components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, logout } from "../../../../store/Auth/Action";
import { navigationMenu } from "./NavigationMenu"; // Your custom navigation menu data
// import "./navigation.css";
const Navigation = () => {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null); // Track open menus for submenus

  const handleLogout = () => {
    dispatch(logout(jwt)); // Log out
    navigate("/login");
  };

  const handleMenuItemClick = (path) => {
    navigate(path); // Navigate to the selected menu item
  };

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index); // Toggle the submenu visibility
  };

  useEffect(() => {
    if (jwt !== null) {
      dispatch(getUserProfile(jwt)); // Fetch user profile if jwt exists
    }
  }, [jwt, dispatch]);

  return (
    <div className="sidebar text-start">
      {/* Sidebar Menu */}
      {navigationMenu.map((item, index) => (
        <div key={index}>
          {/* Accordion for collapsible menus */}
          <Accordion
            className="text-start"
            expanded={openMenu === index}
            onChange={() => toggleMenu(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} // Toggle icon
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
              className="text-start"
            >
              <Button
                // fullWidth
                // variant="contained"
                color=""
                sx={{
                  borderRadius: "20px",
                  // padding: "10px 20px",
                  justifyContent: "left",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
                <Typography variant="body1" className="text-start">
                  {" "}{item.title}
                </Typography>
              </Button>
            </AccordionSummary>

            {/* Submenu (only visible when menu is expanded) */}
            <AccordionDetails>
              {item.subMenu?.map((subItem, subIndex) => (
                <Button
                  key={subIndex}
                  variant="text"
                  className="submenu-btn mt-2 mb-2 text-center"
                  // color="primary"
                  onClick={() => handleMenuItemClick(subItem.path)}
                  sx={{
                    padding: "8px 20px",
                    justifyContent: "flex-start",
                    textAlign: "left",
                    background:'white',
                    color:'black',
                    border: "1px solid black",
                    borderRadius: '13px'
                  }}
                >
                  {subItem.title}
                </Button>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
      ))}

      {/* User profile and Logout */}
      <div className="sidebar-footer">
        <Typography variant="h6">Hello, {auth?.user?.username}</Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ borderRadius: "20px" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Navigation;
