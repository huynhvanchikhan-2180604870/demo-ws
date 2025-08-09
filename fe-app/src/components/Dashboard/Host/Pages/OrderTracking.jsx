import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { amber, blue, green, grey, red, yellow } from "@mui/material/colors";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../../../config/api";
import { getOrder } from "../../../../store/Host/Action";
import UpdateBookingModal from "./UpdateBookingModal"; // Import modal cập nhật

// Màu sắc trạng thái đặt tour
const statusColors = {
  PROCCESS: amber[500],
  APPROVED: green[500],
  CANCELED: red[500],
  CREATED: blue[500],
  ONGOING: yellow[500],
  SUCCESS: grey[400],
};

// Dịch trạng thái sang tiếng Việt
const translate = {
  PROCCESS: "Đang chờ duyệt",
  ONGOING: "Đang tiến hành",
  APPROVED: "Đã duyệt",
  CANCELED: "Đã hủy",
  CREATED: "Đã đăng ký",
  SUCCESS: "Đã hoàn thành",
  PAIED: "Đã thanh toán",
  UNPAID: "Chưa thanh toán",
  REFUNDED: "Đã hoàn tiền",
  "NOT REFUNDED": "Chưa hoàn tiền",
};

// Hàm định dạng ngày
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và thêm số 0 nếu cần
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng và thêm số 0 nếu cần
  const year = date.getFullYear(); // Lấy năm
  return `${day}-${month}-${year}`; // Trả về định dạng dd-mm-yyyy
};

// Component OrderTracking
const OrderTracking = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0); // Trạng thái cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số hàng mỗi trang

  const dispatch = useDispatch();
  const { host } = useSelector((state) => state);

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalOpen(false);
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const updateStatus = {
        id: selectedBooking.id,
        status: newStatus,
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/v2/tours/update-status`,
        updateStatus,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Lỗi không cập nhật trạng thái đơn hàng:", error);
      enqueueSnackbar("Cập nhật trang thái thất bại, vui lòng thử lại.", {
        variant: "error",
      });
    }
    console.log("BookingID and Status: ", selectedBooking.id, newStatus);
    closeModal();
  };

  const refundBooking = (bookingId) => {
    closeModal();
  };

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu tiên khi thay đổi số hàng mỗi trang
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          border: "1px solid #FFCFB3",
          borderRadius: "14px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
        <h1
          className="mt-2 text-center"
          style={{
            fontFamily: "Island Moments, cursive",
            fontSize: "50px",
            color: "#FFCFB3",
            fontWeight: "700",
          }}
        >
          Quản lý đơn hàng
        </h1>
        <hr />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                ID
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Tên Tour
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Ngày Đặt
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Tổng Giá
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Phương Thức Thanh Toán
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Trạng Thái Thanh Toán
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Trạng Thái Đặt Tour
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Số Vé Đặt
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Trạng Thái Hoàn Tiền
              </TableCell>
              <TableCell className="text-center" style={{ fontWeight: "700" }}>
                Thao Tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {host?.orders
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} className="text-center">
                  <TableCell className="text-center">{row.id}</TableCell>
                  <TableCell className="text-center">{row.tourName}</TableCell>
                  <TableCell className="text-center">
                    {formatDate(row.bookingDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {`${row.totalPrice.toLocaleString()} VND`}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.paymentMethod}
                  </TableCell>
                  <TableCell className="text-center">
                    {translate[row.paymentStatus]}
                  </TableCell>
                  <TableCell
                    className="text-center"
                    style={{
                      backgroundColor: statusColors[row?.bookingStatus],
                      color: "#fff",
                      borderRadius: "14px",
                      padding: "10px",
                    }}
                  >
                    {translate[row?.bookingStatus]}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.ticketsTotal}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.bookingStatus === "CANCELED"
                      ? translate[row?.refundStatus || "NOT REFUNDED"]
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openModal(row)}
                    >
                      Cập nhật
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={host?.orders?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {selectedBooking && (
        <UpdateBookingModal
          open={isModalOpen}
          handleClose={closeModal}
          booking={selectedBooking}
          updateBooking={updateBookingStatus}
          refundBooking={refundBooking}
        />
      )}
    </div>
  );
};

export default OrderTracking;
