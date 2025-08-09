import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";

export const navigationMenu = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    path: "/dashboard/",
    subMenu: [
      { title: "Thống kê Lượt đặt tour", path: "/dashboard" },
      {
        title: "Thống kê doanh thu",
        path: "/dashboard/revenue",
      },
    ], // No sub-menu for Dashboard
  },
  {
    title: "Tours",
    icon: <ExploreIcon />,
    path: "/dashboard/tours",
    subMenu: [
      { title: "Quản lý tour", path: "/dashboard/tours" },
      {
        title: "Duyệt tour cho khách hàng",
        path: "/dashboard/orders_tracking",
      },
    ], // Sub-menu for Tours
  },
  {
    title: "Supports",
    icon: <CircleNotificationsIcon />,
    path: "/dashboard/support",
    subMenu: [
      { title: "Support", path: "/dashboard/sessions" },
      { title: "Contact", path: "/support/contact" },
    ], // Sub-menu for Supports
  },
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
    subMenu: [{ title: "Trở về trang chủ", path: "/home" }], // No sub-menu for Back to Home
  },
];
