import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios"; // Dùng axios để gửi yêu cầu HTTP
import React, { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { API_BASE_URL } from "../../../../config/api";

const RevenueStats = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState("Day"); // Mặc định là "Ngày"
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const jwt = localStorage.getItem("jwt");

  // Gửi yêu cầu đến API để lấy thống kê doanh thu
  const fetchRevenueStats = async () => {
    setLoading(true);
    try {
      console.log("Fetching data with params:", {
        timePeriod,
        startDate,
        endDate,
      });
      const response = await axios.get(
        `${API_BASE_URL}/api/v2/admin/revenue/stats`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            timePeriod,
            startDate: startDate ? new Date(startDate).toISOString() : null,
            endDate: endDate ? new Date(endDate).toISOString() : null,
          },
        }
      );
      console.log("Stats:", response.data);
      setRevenueData(response.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchRevenueStats();
  }, [timePeriod, startDate, endDate]); // Fetch data khi thời gian chọn thay đổi

  // Xử lý sự thay đổi của thời gian (ngày, tháng, quý, năm)
  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  // Biểu đồ tròn (Pie Chart)
  const chartData = revenueData.map((item) => ({
    name: item.timePeriod,
    value: item.totalRevenue || 0, // Đảm bảo giá trị 'totalRevenue' hợp lệ
  }));


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Màu sắc cho các phần trong biểu đồ

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Thống kê doanh thu và số lượt đặt tour
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Chọn khoảng thời gian</InputLabel>
        <Select
          value={timePeriod}
          onChange={handleTimePeriodChange}
          label="Chọn khoảng thời gian"
        >
          <MenuItem value="Day">Ngày</MenuItem>
          <MenuItem value="Month">Tháng</MenuItem>
          <MenuItem value="Quarter">Quý</MenuItem>
          <MenuItem value="Year">Năm</MenuItem>
        </Select>
      </FormControl>

      {/* Tùy chọn lọc theo ngày (cho các lựa chọn Quý và Năm) */}
      {(timePeriod === "Quarter" || timePeriod === "Year") && (
        <>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Typography variant="body1">Từ ngày:</Typography>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px" }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Typography variant="body1">Đến ngày:</Typography>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px" }}
            />
          </FormControl>
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={fetchRevenueStats}
        sx={{ marginBottom: 2 }}
      >
        Xem thống kê
      </Button>

      {/* Hiển thị Biểu đồ tròn */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="70%"
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default RevenueStats;
