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
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../../../config/api";
import "./revenue.css";

// Register ChartJS elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const HostTourStats = () => {
  const [toursData, setToursData] = useState([]);
  const [selectedTour, setSelectedTour] = useState("");
  const [tourOptions, setTourOptions] = useState([]);
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // Fetching tours function
  useEffect(() => {
    const fetchTours = async () => {
      if (auth?.user?.id) {
        try {
          const tourResponse = await axios.get(
            `${API_BASE_URL}/api/v2/tours/gets/${auth.user.id}`,
            {
              headers: { Authorization: `Bearer ${jwt}` },
            }
          );
          setTourOptions(tourResponse.data); // Adjust according to your API response structure
        } catch (error) {
          console.error("Failed to load tours: ", error);
        }
      }
    };

    fetchTours();
  }, [auth?.user?.id, jwt]);

  // Fetching statistics function
  const fetchStats = async () => {
    if (auth?.user?.id && selectedTour) {
      try {
        const params = {
          tourId: selectedTour,
        };

        // Log request details to check parameters
        console.log("Requesting stats with params: ", params);

        const response = await axios.get(
          `${API_BASE_URL}/api/v2/tours/host/${auth.user.id}/tour-registrations`,
          {
            params,
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        const toursDataArray = Object.entries(response.data).map(
          ([period, entries]) => ({
            period,
            registrations: entries.reduce(
              (acc, entry) => acc + entry.registrations,
              0
            ),
          })
        );
        setToursData(toursDataArray);
      } catch (error) {
        console.error("Error fetching tour registration stats", error);
        alert("Failed to fetch stats: " + error.message);
      }
    }
  };

  // Trigger statistics loading based on dependencies
  useEffect(() => {
    fetchStats();
  }, [auth?.user?.id, jwt, selectedTour]);

  return (
    <div className="border border-1 rounded rounded-4 w-100 contaie">
      <h4 className="text-center mb-4 mt-2">
        Biểu đồ thống kê lượt đăng ký tours
      </h4>
      <div className="text-center">
        <select
          className=""
          onChange={(e) => setSelectedTour(e.target.value)}
          value={selectedTour}
        >
          <option value="" className="text-center">
            Select a Tour
          </option>
          {tourOptions.map((option) => (
            <option key={option.id} value={option.id} className="text-center">
              {option.title}
            </option>
          ))}
        </select>
      </div>
      {toursData.length > 0 ? (
        <div className="chart">
          <Bar
            data={{
              labels: toursData.map((data) => data.period),
              datasets: [
                {
                  label: "Registrations",
                  data: toursData.map((data) => data.registrations),
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    // This ensures the Y-axis ticks are integers
                    stepSize: 1,
                    callback: function (value) {
                      return Number.isInteger(value) ? value : null; // Display only integers
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center mt-5 mb-4">No tour data available</p>
      )}
    </div>
  );
};

export default HostTourStats;
