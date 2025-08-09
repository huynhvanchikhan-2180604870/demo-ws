import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React, { useEffect, useState } from "react";
import "./carousel.css";

const Carousel = ({ data }) => {
  const [silde, setSilde] = useState(0);
  const nextSlide = () => {
    setSilde(silde === data?.images?.length - 1 ? 0 : silde + 1);
  };

  const prevSlide = () => {
    setSilde(silde === 0 ? data?.images?.length - 1 : silde - 1);
  };

  // Automatically move to the next slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 10 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [silde]);
  return (
    <div className="carousel">
      <KeyboardArrowLeftIcon className="arrow arrow-left" onClick={prevSlide} />
      {data?.images?.map((item, index) => {
        return (
          <img
            src={item}
            alt="item"
            key={index}
            className={silde === index ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <KeyboardArrowRightIcon
        className="arrow arrow-right"
        onClick={nextSlide}
      />
      <span className="indicators">
        {data?.images?.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setSilde(index);
              }}
              className={
                silde === index ? "indicator" : "indicator indicator-inactive"
              }
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel;
