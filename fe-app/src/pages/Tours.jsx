import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CommonSection from "../shared/CommonSection";
import { Newsletter } from "../shared/Newsletter";
import { SearchBar } from "../shared/SearchBar";
import { TourCard } from "../shared/TourCard";
import { getAllTours } from "../store/Tour/Action";
import "../styles/tour.css";

import queryString from "query-string";

const Tours = () => {
  const { tour } = useSelector((state) => state);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    dispatch(getAllTours({ page: 0, size: 12 }));
  }, []);

  const handlePageChange = (pageNumber) => {
    dispatch(getAllTours({ page: pageNumber, size: 12 }));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = (searchParams) => {
    console.log("searchParams: ", searchParams);
    dispatch(
      getAllTours({
        page: 0,
        size: 12,
        destination: searchParams?.destination,
        departureDate: searchParams?.departureDate,
        category: searchParams?.category,
      })
    );
  };

  return (
    <>
      <CommonSection title={"Tất cả các tours "} />
      <section>
        <Container>
          <Row>
            <Col xs="2"></Col>
            <Col xs="2">
              <SearchBar onSearch={handleSearch} />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {tour?.loading ? (
              <p>Loading...</p>
            ) : tour?.error ? (
              <p>Error: {tour?.error}</p>
            ) : (
              // Lọc ra các tour có trạng thái APPROVED
              tour?.tours
                ?.filter((item) => item.status === "APPROVED") // Lọc theo trạng thái APPROVED
                .map(
                  (item, index) =>
                    item.ticketsRemaining >= 1 && (
                      <Col lg="3" key={item.id} className="mb-4">
                        <TourCard tour={item} />
                      </Col>
                    )
                )
            )}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(tour?.pagination.totalPages).keys()].map(
                  (number) => (
                    <span
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={
                        tour?.pagination.page === number ? "active__page" : ""
                      }
                    >
                      {number + 1}
                    </span>
                  )
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tours;
