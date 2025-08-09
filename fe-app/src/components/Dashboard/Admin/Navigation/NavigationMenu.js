import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";

export const navigationMenu = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    path: "/admin",
    subMenu: [
      { title: "Trang chủ", path: "/admin" },
      {
        title: "Thống kê doanh thu",
        path: "/admin/revenue",
      },
    ], // No sub-menu for Dashboard
  },
  {
    title: "Quản lý tours",
    icon: <ExploreIcon />,
    path: "/admin/tours",
    subMenu: [
      { title: "Quản lý đặt tour", path: "/admin/bookings" },
      {
        title: "Kiểm duyệt tours",
        path: "/admin/tours",
      },
      { title: "Quản lý danh mục tours", path: "/admin/categories" },
    ], // Sub-menu for Tours
  },
  {
    title: "Quản lý thông báo",
    icon: <ExploreIcon />,
    path: "/admin/notifications",
    subMenu: [
      { title: "Khuyến mãi", path: "/admin/notifications/promotions" },
      {
        title: "Thông báo",
        path: "/admin/notifications",
      },
    ], // Sub-menu for Tours
  },
  {
    title: "Quản lý người dùng",
    icon: <CircleNotificationsIcon />,
    path: "/admin/user",
    subMenu: [
      { title: "Quản lý thông người dùng", path: "/admin/users" },
      { title: "Duyệt đăng ký NCC", path: "/admin/host-register" },
    ], // Sub-menu for Supports
  },
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
    subMenu: [{ title: "Trở về trang chủ", path: "/home" }], // No sub-menu for Back to Home
  },
];
