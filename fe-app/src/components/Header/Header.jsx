import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Container, Row } from "reactstrap";
import "../../App.css";
import logo from "../../assets/images/logo.png";
import { logout } from "../../store/Auth/Action";
import "./header.css";

const Header = () => {
  const nav_links = [
    { path: "/home", display: "Trang chủ" },
    { path: "/news", display: "Blog" },
    { path: "/tours", display: "Tours" },
  ];

  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const headerRef = useRef(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("logout");
    handleClose();
    dispatch(logout());
  };

  const subMenuUser = [
    {
      title: "Trang cá nhân",
      url: "/profile",
      icon: <ManageAccountsIcon />,
    },
    {
      title: "Lịch sử đơn hàng",
      url: "/orders",
      icon: <ScheduleIcon />,
    },
    {
      title: "Tours yêu thích",
      url: "/favorite",
      icon: <FavoriteIcon />,
    },
  ];

  const subMenuHost = [
    {
      title: "Trang cá nhân",
      url: "/profile",
      icon: <ManageAccountsIcon />,
    },
    {
      title: "Lịch sử đơn hàng",
      url: "/orders",
      icon: <ScheduleIcon />,
    },
    {
      title: "Tours yêu thích",
      url: "/favorite",
      icon: <FavoriteIcon />,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <AdminPanelSettingsIcon />,
    },
  ];

  const handleNavigate = (url) => {
    navigate(url);
    handleClose();
  };

  useEffect(() => {
    const hasHostRole = auth?.user?.roles?.some(
      (role) => role.name === "ROLE_HOST"
    );

    if (hasHostRole) {
      setRoleName("ROLE_HOST");
    } else {
      setRoleName("ROLE_USER");
    }
  }, [roleName, auth.user]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to ensure this runs once on mount

  return (
    <React.Fragment>
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav_wrapper d-flex align-items-center justify-content-between">
              <div className="logo">
                <a href="/home">
                  <img src={logo} alt="logo" />
                </a>
              </div>
              <div className="navigation">
                <ul className="menu d-flex align-items-center gap-5">
                  {nav_links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="nav__right d-flex align-items-center gap-4">
                {auth?.user ? (
                  <div className="nav__btns d-flex align-items-center gap-4 ">
                    <Button
                      className="btn secondary__btn border-1"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      {auth?.user?.username}
                      <ExpandMoreIcon />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      sx={{ margin: "10px 0px" }}
                    >
                      {roleName === "ROLE_USER"
                        ? subMenuUser.map((item, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => handleNavigate(item.url)}
                              sx={{
                                width: "max-content",
                                borderRadius: "8px",
                                padding: "18px",
                                backgroundColor: "#fff",
                                "&:hover": {
                                  backgroundColor: "#f0f0f0",
                                },
                              }}
                            >
                              {item.icon}
                              <span className="me-2"></span>
                              {item.title}
                            </MenuItem>
                          ))
                        : subMenuHost.map((item, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => handleNavigate(item.url)}
                              sx={{
                                width: "max-content",
                                borderRadius: "8px",
                                padding: "18px",
                                backgroundColor: "#fff",
                                "&:hover": {
                                  backgroundColor: "#f0f0f0",
                                },
                              }}
                            >
                              {item.icon}
                              <span className="me-2"></span>
                              {item.title}
                            </MenuItem>
                          ))}
                    </Menu>

                    <Button
                      onClick={handleLogout}
                      className="btn primary__btn mb-2"
                      style={{ width: "max-content" }}
                    >
                      Đăng xuất
                    </Button>
                  </div>
                ) : (
                  <div className="nav__btns d-flex align-items-center gap-4">
                    <Button className="btn secondary__btn">
                      <Link to="/login">Đăng nhập</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Đăng ký</Link>
                    </Button>
                  </div>
                )}
              </div>
              <span className="mobile__menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </Row>
        </Container>
      </header>
    </React.Fragment>
  );
};

export default Header;
