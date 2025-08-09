import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, Menu, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Container, ListGroup, Row } from "reactstrap";
import Booking from "../components/Booking/Booking";
import Carousel from "../shared/Carousel";
import { Newsletter } from "../shared/Newsletter";
import ReportTourModal from "../shared/ReportTourModal";
import { findTourById, getAllTours, postReview } from "../store/Tour/Action";
import "../styles/tour-details.css";
import calculateAvgRating from "../utils/avgRating";
import BookingRules from "./BookingRules";
import ChatModal from "../shared/ChatModal";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const TourDetails = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openBookingRules, setOpenBookingRules] = useState(true);
  const [showChatModal, setShowChatModal] = useState(false);

  const handleOpenChat = () => setShowChatModal(true);
  const handleCloseChat = () => setShowChatModal(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id } = useParams();
  const { tour } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOpenBookingRules = () => {
    setOpenBookingRules(true);
  };
  const handleCloseBookingRules = () => {
    setOpenBookingRules(false);
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
      tour: id,
    },

    onSubmit: (values) => {
      dispatch(postReview(values));
      console.log("reviews: ", values);
    },
  });

  const handleOpenReportModal = () => {
    setOpenReportModal(true);
  };
  const handleCloseReportModal = () => {
    setOpenReportModal(false);
    setAnchorEl(false);
  };

  const handlePageChange = (pageNumber) => {
    dispatch(getAllTours({ page: pageNumber, size: 10 }));
  };

  // const reviewMsgRef = useParams();
  const [tourRating, setTourRating] = useState(null);

  useEffect(() => {
    dispatch(findTourById(id));
  }, [id]);

  const { totalRating, avgRating } = calculateAvgRating(
    tour?.tourDetails?.reviews
  );

  // const options = {day: 'numeric', month: 'long', year: 'numeric'}

  // const submitHandler = e => {
  //   e.preventDefault()
  //   const reviewText = reviewMsgRef.current?.value

  // }

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <div className="tour__image ">
                  <Carousel data={tour?.tourDetails} />
                </div>
                <div className="tour__info">
                  <span className="info__host">
                    {tour?.tourDetails?.host?.username}
                  </span>
                  {tour?.tourDetails?.featured && (
                    <span className="isFeature">Đặt sắc</span>
                  )}

                  <span className="report">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      className="text-end "
                    >
                      <MoreHorizIcon className="icon__more " />
                    </Button>
                    <Menu
                      id="basic-menu"
                      className="m-auto"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleOpenReportModal}>
                        Báo cáo
                      </MenuItem>
                    </Menu>
                  </span>
                  <h2 className="ms-1">{tour?.tourDetails?.title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}{" "}
                      {totalRating === 0 ? (
                        "Chưa có đánh giá"
                      ) : (
                        <span>({tour?.tourDetails?.reviews?.length})</span>
                      )}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line me-2"></i>{" "}
                      {tour?.tourDetails?.destination}
                    </span>

                    {/* <span>
                      <i className="ri-money-dollar-circle-line me-2"></i>
                      {formatCurrency(tour?.tourDetails?.price || 0, "million")}
                      /người
                    </span> */}

                    <span>
                      <i className="ri-map-pin-time-line me-2"></i>
                      {tour?.tourDetails?.durationDays} ngày
                    </span>

                    <span>
                      <i className="ri-group-line me-2"></i>
                      {tour?.tourDetails?.maxPeople} người (tối đa)
                    </span>

                    <span>
                      <i className="ri-group-line me-2"></i>
                      Còn {tour?.tourDetails?.ticketsRemaining} vé còn lại
                    </span>
                  </div>

                  <h5>
                    <strong>Mô tả chuyến đi</strong>
                  </h5>
                  <div>
                    {tour?.tourDetails?.description
                      ?.split("\n")
                      .map((line, index) => (
                        <p key={index}>
                          {line}
                          <br />
                        </p>
                      ))}
                  </div>

                  <h5 className="mt-5 text-decoration">
                    <strong>Lịch trình chuyến đi</strong> (
                    {tour?.tourDetails?.itinerary?.length})
                  </h5>
                  {tour?.tourDetails?.itinerary?.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
                {/* ==========tour reviews section============ */}
                <div className="tour__reviews mt-2">
                  <h4>
                    <strong>Đánh giá </strong>(
                    {tour?.tourDetails?.reviews?.length} lượt đánh giá)
                  </h4>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((rate) => (
                        <span
                          key={rate}
                          onClick={() => {
                            setTourRating(rate);
                            formik.setFieldValue("rating", rate);
                          }}
                        >
                          {rate}{" "}
                          <i
                            className={`ri-star-s-fill ${
                              tourRating >= rate ? "active" : ""
                            }`}
                          ></i>
                        </span>
                      ))}
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        name="comment"
                        required
                        placeholder="Hãy cho chúng tôi biết suy nghĩ của bạn về chuyến đi này"
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                      />
                      <button
                        className="btn primary__btn text-while"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                  <ListGroup className="user__reviews">
                    {tour?.tourDetails?.reviews?.map((review, index) => (
                      <div className="review__item" key={review.id || index}>
                        <img
                          src="https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-17.jpg"
                          alt=""
                        />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review?.user?.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit", // Two digit day
                                    month: "2-digit", // Two digit month
                                    year: "numeric", // Four digit year
                                  }
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review?.rating}
                              <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review?.comment}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
                {/* ==========tour reviews section end============ */}
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour?.tourDetails} avgRating={avgRating} />
            </Col>
            <Col lg="4">
              <Button
                variant="outlined"
                onClick={handleOpenChat}
                sx={{ position: "fixed", right: 20, bottom: 20, borderRadius:"50%", border:'none' }}
              >
                <QuestionAnswerIcon style={{fontSize: '50px' ,color: '#FFCFB3'}}/>
              </Button>
              <ChatModal open={showChatModal} hostName={tour?.tourDetails?.host?.username} userName={auth?.user?.username} userId={auth?.user?.id} hostId={tour?.tourDetails?.host?.id} handleClose={handleCloseChat} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
      <section>
        <ReportTourModal
          open={openReportModal}
          handleClose={handleCloseReportModal}
          tourId={id}
        />
      </section>
      <section>
        <BookingRules
          open={openBookingRules}
          handleClose={handleCloseBookingRules}
        />
      </section>
    </>
  );
};

export default TourDetails;
