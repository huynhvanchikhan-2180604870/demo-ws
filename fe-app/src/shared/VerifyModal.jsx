import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "reactstrap";
import { verify } from "../store/Auth/Action";
import "./verify-modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "17em",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "20px",
  
};

const VerifyModal = ({ open, handleClose, email, password }) => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Lưu mã OTP
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Trong VerifyModal, khi mã OTP hợp lệ
  const handleVerificationSuccess = () => {
    handleClose(); // Đóng modal
    navigate("/home"); // Điều hướng đến trang home
  };
  // Xử lý thay đổi ô input OTP
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      // Chỉ cho phép nhập số
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      //       // Tự động chuyển qua ô tiếp theo khi nhập
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Gửi mã OTP để xác thực
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join(""); // Hợp nhất mã OTP thành chuỗi

    if (code.length === 4) {
      dispatch(verify(email, password, code));
      handleVerificationSuccess();
    } else {
      alert("Please enter the complete 4-digit code.");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "50%", maxWidth: "21em",color:"black" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="content">
              <p align="center">Enter your OTP Code</p>
              <div className="inp">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    maxLength={1}
                    className="input"
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              </div>
              <button type="submit">Verify</button>
            </div>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default VerifyModal;
