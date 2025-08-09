import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

export const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          "Chuyến đi thật tuyệt vời! Mọi thứ đều được tổ chức chu đáo và điểm
          đến đẹp ngoài sức tưởng tượng. Tôi chắc chắn sẽ quay lại!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="Avatar" />
          <div>
            <h6 className="mb-0 mt-3">John Doe</h6>
            <p>Khách Hàng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          "Hành trình này là một trải nghiệm không thể quên. Hướng dẫn viên rất
          thân thiện, chuyên nghiệp, và luôn sẵn sàng hỗ trợ."
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="Avatar" />
          <div>
            <h6 className="mb-0 mt-3">Lia Franklin</h6>
            <p>Khách Hàng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          "Dịch vụ tuyệt vời, từ việc đặt tour đến trải nghiệm thực tế. Tôi rất
          ấn tượng với sự tận tâm và chuyên nghiệp của đội ngũ."
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="Avatar" />
          <div>
            <h6 className="mb-0 mt-3">John Doe</h6>
            <p>Khách Hàng</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};
