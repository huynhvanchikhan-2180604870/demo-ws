import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { checkPaymentStatus } from "../store/Booking/Action";
import "../styles/thank-you.css";
import { uploadToCloudnary } from "../utils/uploadToCloudnary";

const ThankYou = () => {
  const location = useLocation();
  const [appTransId, setAppTransId] = useState("");
  const [qrCloudUrl, setQrCloudUrl] = useState(""); // URL Cloudinary
  const { booking } = useSelector((state) => state);
  // Construct the QR code data string based on the booking data
  const qrValue =
    `- Booking ID: ${booking?.paymentStatus?.bookingId}\n` +
    `- Tour ID: ${booking?.paymentStatus?.tour?.id}\n` +
    `- User ID: ${booking?.paymentStatus?.user?.username}\n` +
    `- Payment Status: ${booking?.paymentStatus?.paymentStatus}`;

  const dispatch = useDispatch();
  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const appTransIdValue = queryParams.get("apptransid");
    setAppTransId(appTransIdValue); // Cập nhật state với giá trị mới
    console.log("App Transaction ID:", appTransIdValue);
    // Bây giờ bạn có thể sử dụng appTransId để làm bất cứ điều gì bạn cần
  }, [location]);

  useEffect(() => {
    if (appTransId && qrValue) {
      const canvas = document.querySelector("canvas");
      const dataUrl = canvas?.toDataURL("image/png"); // Convert QR to PNG format

      if (dataUrl) {
        const uploadQrToCloud = async () => {
          try {
            const cloudUrl = await uploadToCloudnary(dataUrl); // Upload QR code
            setQrCloudUrl(cloudUrl); // Lưu URL từ Cloudinary
            console.log("Uploaded QR URL:", cloudUrl);
            // Dispatch với URL QR code từ Cloudinary
            dispatch(checkPaymentStatus(appTransId, cloudUrl));
          } catch (error) {
            console.error("Error uploading QR code to Cloudinary:", error);
          }
        };

        uploadQrToCloud();
      }
    }
  }, [appTransId]);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">{booking?.paymentStatus?.returnmessage}</h3>
              <Container className="box__checkin w-50">
                <h4 className="mb-3 fw-semibold">Use QR for check-in</h4>
                {qrValue && (
                  <QRCodeCanvas
                    value={qrValue}
                    size={256}
                    level="H" // Error correction level: L, M, Q, H
                    includeMargin={true}
                  />
                )}
              </Container>
              <Button className="btn primary__btn w-25">
                <Link to="/orders">Views Order History</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
