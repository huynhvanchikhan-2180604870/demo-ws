import React, { useEffect } from "react";
import { TourCard } from "../../shared/TourCard";
import "../../shared/tour-card.css";
import { Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllTours } from "../../store/Tour/Action.js";

export const FeaturedTours = () => {
  const { tour } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    dispatch(getAllTours({ page: pageNumber, size: 12 }));
  };

  return (
    <>
      {tour?.tours?.map(
        (item) =>
          item.featured && item.status === "APPROVED" ? ( // Kiểm tra cả featured và status là APPROVED
            <Col lg="3" className="mb-4" key={item.id}>
              <TourCard tour={item} />
            </Col>
          ) : null // Không render gì khi không có điều kiện đúng
      )}
    </>
  );
};
