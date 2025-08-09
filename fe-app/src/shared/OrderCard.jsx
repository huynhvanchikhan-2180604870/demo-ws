import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import "./order-card.css";
import OrderTrackingModal from "./OrderTrackingModal";
const OrderCard = ({ item, index }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="order__card">
        <Card>
          <div className="order__img text-center">
            <h5>Booking #{index}</h5>
          </div>
          <CardBody>
            <div className="text-center mt-2 mb-2">
              <span className="order__tour-title text-center">{item.tour}</span>
            </div>

            <div className="text-center mt-2 mb-2">
              <span className="order__payment">Price: {item.totalPrice}</span>
            </div>

            <h5 className="order__title text-center">
              booked date: {item.bookingDate}
            </h5>

            <h5 className="order__title text-center">
              Status: {item.paymentStatus}
            </h5>

            <div className="card__bottom text-center mt-3">
              <button className="btn booking__btn " onClick={handleOpenModal}>
                Show
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
      <OrderTrackingModal
        open={openModal}
        handleClose={handleCloseModal}
        item={item}
      />
    </>
  );
};

export default OrderCard;
