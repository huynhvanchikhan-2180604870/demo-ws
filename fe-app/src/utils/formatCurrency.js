// utils/formatCurrency.js
export const formatCurrency = (value, type = "comma") => {
  if (!value || isNaN(value)) {
    // Nếu giá trị không hợp lệ, trả về "0" hoặc thông báo mặc định
    return type === "million" ? "0 triệu" : "0";
  }

  if (type === "million") {
    return `${(value / 1000000).toFixed(1)} triệu`;
  }

  return value.toLocaleString("vi-VN");
};

