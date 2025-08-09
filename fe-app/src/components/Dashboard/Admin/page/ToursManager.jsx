import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../../../config/api";
import { getTours } from "../../../../store/Admin/Action";

// Màu sắc trạng thái tour
const statusColors = {
  CREATED: blue[500],
  APPROVED: green[500],
  CANCELLED: red[500],
};

// Dịch trạng thái sang tiếng Việt
const translate = {
  CREATED: "Mới tạo",
  APPROVED: "Đã duyệt",
  CANCELLED: "Đã hủy",
};

const ToursManager = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalTours, setTotalTours] = useState(0);
  const [cancelReason, setCancelReason] = useState("");
  const { admin } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  const handleStatusChange = async (tourId, newStatus) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const request = {
        id: selectedTour.id,
        status: newStatus,
      };
      console.log("request: ", request);
      await axios.post(`${API_BASE_URL}/api/v2/admin/tours-status`, request, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      // Dispatch action to update tour in the Redux store
      dispatch(getTours()); // This can be optimized further by updating the status in Redux directly
      closeModal();
    } catch (error) {
      console.error("Error updating tour status", error);
    }
  };

  const openModal = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTour(null);
    setIsModalOpen(false);
  };

  const handleCancelReasonChange = (e) => {
    setCancelReason(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu tiên khi thay đổi số hàng mỗi trang
  };

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        style={{ borderRadius: "10px", padding: "20px" }}
      >
        <h2 className="text-center">Danh Sách Tour</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên Tour</TableCell>
              <TableCell align="center">Ngày Khởi Hành</TableCell>
              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin?.tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell align="center">{tour.id}</TableCell>
                <TableCell align="center">{tour.title}</TableCell>
                <TableCell align="center">{tour.departureDate}</TableCell>
                <TableCell
                  align="center"
                  style={{ backgroundColor: statusColors[tour.status] }}
                >
                  {translate[tour.status]}
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" onClick={() => openModal(tour)}>
                    Xem Chi Tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={admin?.tours?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Dialog chi tiết tour */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>{selectedTour?.title}</DialogTitle>
        <DialogContent>
          <h4>Hình Ảnh:</h4>
          <div>
            {selectedTour?.images?.map((image, index) => (
              <img
                key={index}
                src={image} // Đảm bảo rằng `image` chứa URL hoặc đường dẫn hình ảnh hợp lệ
                alt={`Tour Image ${index}`}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
          <h4>Itinerary:</h4>
          <ul>
            {selectedTour?.itinerary?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h4>Mô tả:</h4>
          <p>{selectedTour?.description}</p>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={selectedTour?.status || ""}
                  onChange={(e) =>
                    handleStatusChange(selectedTour.id, e.target.value)
                  }
                  label="Trạng thái"
                >
                  <MenuItem value="CREATED">Mới Tạo</MenuItem>
                  <MenuItem value="APPROVED">Đã Duyệt</MenuItem>
                  <MenuItem value="CANCELLED">Đã Hủy</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {selectedTour?.status === "CANCELLED" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Lý do hủy"
                  value={cancelReason}
                  onChange={handleCancelReasonChange}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ToursManager;
