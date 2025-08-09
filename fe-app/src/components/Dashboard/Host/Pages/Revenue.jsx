import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { jsPDF } from "jspdf";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../../../config/api";
import { formatCurrency } from "../../../../utils/formatCurrency";
import "./revenue.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Revenue = () => {
  const [date, setDate] = useState("");
  const [chartData, setChartData] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [hasRevenue, setHasRevenue] = useState(false);
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const fetchRevenueData = async () => {
    if (!date) return; // Do not proceed if no date is selected
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const revenueKey = `${monthNames[parseInt(month, 10) - 1]} ${year}`;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v2/tours/revenue/${auth?.user?.id}/${year}/${month}`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      const revenue = response.data[revenueKey]; // Using dynamic revenueKey to fetch revenue
      console.log("response: ", response.data);
      if (revenue !== undefined) {
        setChartData({
          labels: [revenueKey],
          datasets: [
            {
              label: "Doanh thu (VND)",
              data: [revenue],
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
        setTotalRevenue(revenue);
        setHasRevenue(true);
      } else {
        setChartData({});
        setTotalRevenue(0);
        setHasRevenue(false);
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      setChartData({});
      setTotalRevenue(0);
      setHasRevenue(false);
    }
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(
      `Doanh thu tháng này: ${formatCurrency(totalRevenue, "comma")} VND`,
      10,
      10
    );
    doc.save(`${auth.user.id}.pdf`);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet([
      { Tháng: date, "Doanh thu": formatCurrency(totalRevenue, "comma") },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Revenue");
    XLSX.writeFile(wb, `${auth.user.id}_${date}.xlsx`);
  };

  return (
    <div className="border border-1 rounded rounded-4 w-100 contaie">
      <h4 className="text-center mb-4 mt-2">Thống Kê Doanh Thu</h4>
      <div className="text-center">
        <input
          type="month"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ margin: "10px" }}
        />
        <button onClick={fetchRevenueData}> Xem Doanh Thu</button>
      </div>

      {hasRevenue ? (
        <div className="text-center chart">
          <Bar
            data={chartData}
            className=""
            options={{
              scales: { y: { beginAtZero: true } },
              plugins: { legend: { display: true } },
            }}
          />
          <p className="text-center mt-5 mb-4">
            Tổng doanh thu tháng này: {formatCurrency(totalRevenue, "comma")}{" "}
            VND
          </p>
          <button onClick={exportToPDF}>Xuất PDF</button>
          <button onClick={exportToExcel}>Xuất Excel</button>
        </div>
      ) : (
        <p className="text-center mt-5 mb-4">
          Tháng này bạn chưa có tour nào. Hãy tiếp tục cố gắng, đừng ngại thử
          thách mới!
        </p>
      )}
    </div>
  );
};

export default Revenue;
