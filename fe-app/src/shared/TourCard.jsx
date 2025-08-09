import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { truncateString } from "../utils/truncateString"; // Make sure to import the calculateAvgRating function
import "./tour-card.css";
import calculateAvgRating from "../utils/avgRating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/Tour/Action";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { enqueueSnackbar } from "notistack";

export const TourCard = ({ tour }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.tour.favorites);
  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const isFavorite = favorites?.some((fav) => fav.id === tour.id);
  // Use calculateAvgRating to get the average rating
  const { avgRating } = calculateAvgRating(tour?.reviews || []);
  console.log('tour favorites', favorites)

  const displayTitle = truncateString(tour?.title || "", 40);
  const displayLocation = truncateString(tour?.destination || "", 26);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(tour.id))
        .then(() => {
          enqueueSnackbar(`Đã xóa tour khỏi danh sách yêu thích thành công`, {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(`Xóa tour khỏi yêu thích thất bại: ${error}`, {
            variant: "error",
          });
        });
    } else {
      dispatch(addToFavorites(tour.id))
        .then(() => {
          enqueueSnackbar(`Đã lưu tour vào danh sách yêu thích thành công`, {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(`Lưu tour vào yêu thích thất bại: ${error}`, {
            variant: "error",
          });
        });
    }
  };
  
  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={tour?.images[0]} alt="tour-img" />
          {tour?.featured && <span>Đặt sẵc</span>}
          <div className="favorite-icon-container" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <FavoriteIcon className="favorite-icon" style={{ color: red[500] }} />
            ) : (
              <FavoriteBorderIcon className="favorite-icon" />
            )}
          </div>
        </div>
        <CardBody>
          <div className="card__top d-flex-align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {displayLocation}
            </span>

            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating
                ? `${avgRating} (${tour?.reviews?.length})`
                : "Chưa có đánh giá"}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/tours/${tour?.id}`}>{displayTitle}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {formatCurrency(tour?.price, "million")}
              <span>/người</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tours/${tour?.id}`}>Đặt vé ngay</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
