import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";

function ReportTourModal({ open, handleClose, tourId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialReportState = {
    descriptionMismatch: false,
    scheduleMismatch: false,
    overpricing: false,
    guideAttitude: false,
    guideOther: false,
    other: false,
    otherReason: "",
  };

  const jwt = localStorage.getItem("jwt");

  const [report, setReport] = useState(initialReportState);

  const handleChange = (event) => {
    setReport({ ...report, [event.target.name]: event.target.checked });
  };

  const handleInputChange = (event) => {
    setReport({ ...report, otherReason: event.target.value });
  };

  const handleReset = () => {
    setReport(initialReportState);
    handleClose();
  };

  const handleSubmit = async () => {
    // Kiểm tra nếu không có lý do nào được chọn
    const noReasonSelected =
      !report.descriptionMismatch &&
      !report.scheduleMismatch &&
      !report.overpricing &&
      !report.guideAttitude &&
      !report.guideOther &&
      !report.other;

    if (noReasonSelected) {
      enqueueSnackbar("Bạn cần chọn ít nhất một lý do để gửi báo cáo.", {
        variant: "warning",
      });
      return; // Dừng xử lý nếu không có lý do nào được chọn
    }

    try {
      setIsSubmitting(true); // Bắt đầu trạng thái gửi

      // Chuẩn bị dữ liệu báo cáo
      const reportData = {
        tourId: tourId,
        descriptionMismatch: report.descriptionMismatch,
        scheduleMismatch: report.scheduleMismatch,
        overpricing: report.overpricing,
        guideAttitude: report.guideAttitude,
        guideOther: report.guideOther,
        other: report.other,
        otherReason: report.otherReason,
      };
      console.log("report data send to server: ", reportData);

      // Gửi báo cáo tới server
      const response = await axios.post(
        `${API_BASE_URL}/api/v2/reports/create`,
        reportData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Hiển thị thông báo thành công
      enqueueSnackbar("Báo cáo của bạn đã được gửi đến admin hệ thống!", {
        variant: "success",
      });

      console.log("Báo cáo đã gửi thành công:", response.data);
      handleReset();
    } catch (error) {
      console.error("Lỗi khi gửi báo cáo:", error);
      enqueueSnackbar("Gửi báo cáo thất bại, vui lòng thử lại.", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false); // Kết thúc trạng thái gửi
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    border: "none",
    outline: "none",
    borderRadius: "14px",
  };

  return (
    <div className="rounded rounded-4 border border-1">
      <Modal
        className="rounded rounded-4 border border-1"
        open={open}
        onClose={handleReset} // Reset form on close
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Báo cáo tour
          </Typography>
          <hr />
          <FormGroup>
            <Typography variant="subtitle1" gutterBottom>
              1. Dịch vụ tour
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={report.descriptionMismatch}
                  onChange={handleChange}
                  name="descriptionMismatch"
                />
              }
              label="Tour không đúng như mô tả"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={report.scheduleMismatch}
                  onChange={handleChange}
                  name="scheduleMismatch"
                />
              }
              label="Lịch trình tour không giống hợp đồng"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={report.overpricing}
                  onChange={handleChange}
                  name="overpricing"
                />
              }
              label="Kê giá"
            />
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              2. Dịch vụ hướng dẫn viên
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={report.guideAttitude}
                  onChange={handleChange}
                  name="guideAttitude"
                />
              }
              label="Có thái độ không tốt"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={report.guideOther}
                  onChange={handleChange}
                  name="guideOther"
                />
              }
              label="Hướng dẫn viên không chuyên nghiệp"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={report.other}
                  onChange={handleChange}
                  name="other"
                />
              }
              label="Lý do khác"
            />
            {report.other && (
              <TextField
                multiline
                rows={4}
                placeholder="Nhập lý do..."
                variant="outlined"
                value={report.otherReason}
                onChange={handleInputChange}
                fullWidth
                name="otherReason"
              />
            )}
            <hr />
          </FormGroup>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              onClick={handleSubmit}
              variant="outlined"
              sx={{
                borderColor: "black",
                color: "grey",
                fontWeight: "700",
                borderRadius: "13px",
                padding: "10px",
              }}
              disabled={isSubmitting} // Vô hiệu hóa nút khi đang gửi
            >
              {isSubmitting ? "Đang gửi..." : "Gửi báo cáo"}{" "}
              {/* Hiển thị trạng thái chờ */}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ReportTourModal;
