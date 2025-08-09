import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import OrderCard from "../shared/OrderCard";
import OrderTrackingModal from "../shared/OrderTrackingModal";
import { getOrderHistory } from "../store/Booking/Action";
import "../styles/order-history.css";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { booking } = useSelector((store) => store);
  
  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);
  return (
    <Container>
      <div className="heading text-center">
        <h1 className="">Your List Of Orders</h1>
      </div>

      <Container className="body__order">
        <Row>
          {booking?.orders.map((item, index) => (
            <Col lg="4" key={index}>
              <OrderCard item={item} index={index} />
            </Col>
          ))}
        </Row>
      </Container>
      
    </Container>
  );
};

export default OrderHistory;
