
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/Dashboard/Admin/AdminDashboard";
import DashboardHost from "./components/Dashboard/Host/DashboardHost";
import Layout from "./components/Layout/Layout";
import { getUserProfile } from "./store/Auth/Action";
import { getAllTours, loadFavorites } from "./store/Tour/Action";
import { connectWebSocket } from "./config/WebSocketService";
import { addNewMessage } from "./store/Message/Action";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MainApp />
    </SnackbarProvider>
  );
}

function MainApp() {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { auth, tour,message } = useSelector((store) => store);
  const { enqueueSnackbar } = useSnackbar(); // Hook để hiển thị thông báo
  const [wsConnection, setWsConnection] = useState(null);


  // Lấy thông tin người dùng
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      dispatch(loadFavorites());
      console.log('load favorites of user: ', tour.favorites)
    }
  }, [dispatch, jwt, enqueueSnackbar]);

  // Lấy danh sách tours
  useEffect(() => {
    dispatch(getAllTours());

  }, [dispatch, enqueueSnackbar]);

  // // ket noi socket
  // useEffect(() => {
  //   if (auth.user && !wsConnection) {
  //     const stompClient = connectWebSocket();
  
  //     stompClient.connect(
  //       {},
  //       () => {
  //         console.log("WebSocket connected");
  //         if (message?.currentSessionId) {
  //           stompClient.subscribe(`/topic/messages/${message?.currentSessionId}`, (message) => {
  //             const messageBody = JSON.parse(message.body);
  //             dispatch(addNewMessage(messageBody));
  //           });
  //         }
  //         setWsConnection(stompClient);
  //       },
  //       (error) => {
  //         console.error("WebSocket connection error:", error);
  //       }
  //     );
  //   }
  
  //   return () => {
  //     if (wsConnection) {
  //       wsConnection.disconnect(() => {
  //         console.log("WebSocket disconnected");
  //       });
  //     }
  //   };
  // }, [auth.user, wsConnection, dispatch, message?.currentSessionId]);

  return (
    <div className="app">
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path="/dashboard/*" element={<DashboardHost />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
