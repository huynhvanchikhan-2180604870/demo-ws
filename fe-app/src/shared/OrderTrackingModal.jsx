import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cancelTour } from "../store/Booking/Action";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDateTime } from "../utils/formatDateTime";
import "./order-tracking-modal.css";

const OrderTrackingModal = ({ open, handleClose, item }) => {
  const dispatch = useDispatch();
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    if (!item) return; // Nếu item không tồn tại, không làm gì cả

    if (item.bookingStatus === "CANCELED") {
      setQrValue("Đơn hàng đã hủy");
    } else {
      const tempQrValue =
        `- Booking ID: ${item.id}\n` +
        `- Tour ID: ${item.tour}\n` +
        `- User ID: ${item.user}\n` +
        `- Payment Status: ${item.paymentStatus}`;
      setQrValue(tempQrValue);
    }
  }, [item]); // Chỉ chạy lại khi item thay đổi

  const handleCancelTour = async () => {
    console.log("Booking id: ", item.id);
    try {
      await dispatch(cancelTour(item.id)); // Đợi dispatch hoàn thành
      enqueueSnackbar("Hủy tour thành công!", { variant: "success" });
      handleClose(); // Đóng modal sau khi hủy
    } catch (error) {
      enqueueSnackbar("Hủy tour thất bại. Vui lòng thử lại!", {
        variant: "error",
      });
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "none",
          boxShadow: 24,
          borderRadius: "13px",
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          sx={{ mt: 2 }}
          className="text-center"
        >
          Thanks for your booked
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="">
          Phương thức thanh toán:{" "}
          <span className="ms-4">{item.paymentMethod}</span>
        </Typography>
        <Box sx={{ my: 2 }}>
          <Typography gutterBottom>
            Số vé đặt: <span className="">{item.numPeople}</span>
          </Typography>
          <Typography gutterBottom>
            Trạng thái: <span className="">{item.bookingStatus}</span>{" "}
          </Typography>
          <Typography gutterBottom>
            Ngày đặt: <span>{formatDateTime(item.bookingDate)}</span>
          </Typography>
          <Typography gutterBottom>
            <b>
              Tổng tiền - <span>{formatCurrency(item?.totalPrice)} vnđ</span>
            </b>
          </Typography>
        </Box>
        <hr />
        <h5 className="text-center">QR checkin</h5>
        <div className="qr__checkin text-center">
          {/* <QRCodeCanvas
            value={qrValue}
            size={256}
            level="H" // Error correction level: L, M, Q, H
            includeMargin={true}
          /> */}

          {item?.qrBase64 && <img src={item?.qrBase64} alt="" />}
        </div>
        <div className="text-center mt-4 btn__download">
          {item?.paymentStatus === "UNPAID" && (
            <>
              <button className="ms-2 text-light" onClick={handleCancelTour}>
                Thanh toán
              </button>
              <button className="ms-2 text-light" onClick={handleCancelTour}>
                Hủy tour
              </button>
            </>
          )}

          {item?.paymentStatus === "PAIED" && (
            <>
              <button>Download</button>
              <button className="ms-2 text-light" onClick={handleCancelTour}>
                Hủy tour
              </button>
            </>
          )}

          {item?.paymentStatus === "NOT REFUNDED" && null}
        </div>
      </Box>
    </Modal>
  );
};

export default OrderTrackingModal;
