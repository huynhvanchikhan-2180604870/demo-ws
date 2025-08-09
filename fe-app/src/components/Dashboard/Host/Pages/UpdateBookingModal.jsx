import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const UpdateBookingModal = ({
  open,
  handleClose,
  booking,
  updateBooking,
  refundBooking,
}) => {
  const handleStatusChange = (event) => {
    updateBooking(booking.bookingId, event.target.value);
  };

  const handleRefund = () => {
    refundBooking(booking.bookingId);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          width: 400,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cập nhật Đơn Đặt Tour
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Select value={booking.bookingStatus} onChange={handleStatusChange}>
            <MenuItem value="PROCCESS">Đang chờ duyệt</MenuItem>
            <MenuItem value="APPROVED">Đã duyệt</MenuItem>
            <MenuItem value="CANCELED">Đã hủy</MenuItem>
            <MenuItem value="ONGOING">Đang tiến hành</MenuItem>
            <MenuItem value="SUCCESS">Đã hoàn thành</MenuItem>
          </Select>
        </FormControl>
        {booking.bookingStatus === "CANCELLED" &&
          booking.refundStatus !== "REFUNDED" && (
            <Button
              onClick={handleRefund}
              color="success"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Hoàn Tiền
            </Button>
          )}
        <Button
          onClick={handleClose}
          color="error"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateBookingModal;
