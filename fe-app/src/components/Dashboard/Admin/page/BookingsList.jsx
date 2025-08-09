import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { amber, blue, green, grey, red, yellow } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../../../store/Admin/Action";

// Dịch trạng thái sang tiếng Việt
const translateStatus = {
  PROCCESS: "Đang chờ duyệt",
  APPROVED: "Đã duyệt",
  CANCELED: "Đã hủy",
  CREATED: "Đã đăng ký",
  ONGOING: "Đang tiến hành",
  SUCCESS: "Đã hoàn thành",
};

const translatePaymentStatus = {
  PAIED: "Đã thanh toán",
  UNPAID: "Chưa thanh toán",
  REFUNDED: "Đã hoàn tiền",
  "NOT REFUNDED": "Chưa hoàn tiền",
};

// Màu sắc trạng thái
const statusColors = {
  PROCCESS: amber[500],
  APPROVED: green[500],
  CANCELED: red[500],
  CREATED: blue[500],
  ONGOING: yellow[500],
  SUCCESS: grey[400],
};

const paymentStatusColors = {
  PAIED: green[500],
  UNPAID: red[500],
  REFUNDED: blue[500],
  "NOT REFUNDED": amber[500],
};

const BookingsList = () => {
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { admin } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  const orders = Array.isArray(admin?.orders) ? admin.orders : [];

  return (
    <>
      <section className="w-100">
        <Typography variant="h4" gutterBottom>
          Danh sách đặt tour
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="bookings table">
            <TableHead>
              <TableRow>
                <TableCell>ID Đặt Tour</TableCell>
                <TableCell>Tên Khách Hàng</TableCell>
                <TableCell>Tour</TableCell>
                <TableCell>Ngày Đặt</TableCell>
                <TableCell>Trạng Thái</TableCell>
                <TableCell>Trạng Thái Thanh Toán</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.fullname}</TableCell>
                    <TableCell>{booking.tourname}</TableCell>
                    <TableCell>
                      {new Date(booking.bookingDate).toLocaleString()}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: statusColors[booking.bookingStatus],
                        color: "#fff",
                        borderRadius: "14px",
                        padding: "10px",
                      }}
                    >
                      {translateStatus[booking.bookingStatus]}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          paymentStatusColors[booking.paymentStatus],
                        color: "#fff",
                        borderRadius: "14px",
                        padding: "10px",
                      }}
                    >
                      {translatePaymentStatus[booking.paymentStatus]}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Phân trang */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </section>
    </>
  );
};

export default BookingsList;
