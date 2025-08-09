import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import experienceImg from "../assets/images/experience.png";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import { FeaturedTours } from "../components/FeaturedTours/FeaturedTours";
import { MasonryImagesGallery } from "../components/ImageGallery/MasonryImagesGallery";
import { Testimonial } from "../components/Testimonial/Testimonial";
import { Services } from "../services/Services";
import { Newsletter } from "../shared/Newsletter";
import { SearchBar } from "../shared/SearchBar";
import Subtitle from "../shared/Subtitle";
import { getAllTours } from "../store/Tour/Action";
import "../styles/home.css";
const Home = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = (searchParams) => {
    dispatch(
      getAllTours({
        page: 0,
        size: 10,
        destination: searchParams.destination,
        departureDate: searchParams.departureDate,
        category: searchParams.category,
      })
    );
    navigate();
  };
  return (
    <>
      {/* ========hero section start======= */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Hành trang trước khi đi"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Du lịch mở ra cánh cửa để tạo nên những{" "}
                  <span className="highlight">kỷ niệm</span>
                </h1>
                <p>
                  <strong>Khám phá và trải nghiệm:</strong> Du lịch không chỉ là
                  việc di chuyển từ nơi này sang nơi khác mà còn là cách để khám
                  phá những nền văn hóa mới, phong cảnh tuyệt đẹp, và con người
                  thú vị.
                </p>
                <p>
                  <strong>Tạo kết nối cảm xúc:</strong> Những kỷ niệm từ các
                  chuyến đi thường là những điều quý giá, giúp tạo nên câu
                  chuyện và cảm xúc mà chúng ta lưu giữ suốt đời.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" muted autoPlay loop />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>

            <SearchBar onSearch={handleSearch} />
          </Row>
        </Container>
      </section>
      {/* ========hero section end======= */}

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="service__subtitle">Những Gì Chúng Tôi Cung Cấp</h5>
              <h2 className="service__title">
                Chúng Tôi Mang Đến Dịch Vụ Tốt Nhất
              </h2>
            </Col>
            <Services />
          </Row>
        </Container>
      </section>

      {/* =============feature tour section start=============== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Khám phá"} />
              <h2 className="feature__tour-title">
                Các Tour Nổi Bật Của Chúng Tôi
              </h2>
            </Col>
            <FeaturedTours />
          </Row>
        </Container>
      </section>
      {/* =============feature tour section end=============== */}

      {/* ===============experience section start=============== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Trải nghiệm"} />
                <h2>
                  Với tất cả kinh nghiệm của chúng tôi{" "}
                  <strong>Chúng tôi sẽ phục vụ bạn</strong>
                </h2>
                <p>
                  <strong>Khám phá thế giới theo cách của bạn.</strong>
                  <br /> Chúng tôi đồng hành cùng bạn trong mọi hành trình, mang
                  đến những trải nghiệm đáng nhớ và dịch vụ hoàn hảo.
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Chuyến Đi Thành Công</h6>
                </div>

                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Khách Hàng Hài Lòng</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Năm Kinh Nghiệm</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ===============experience section end=============== */}

      {/* ================gallery section start================ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Thư Viện Hình Ảnh"} />
              <h2 className="gallery__title">
                Khám phá vẻ đẹp của các điểm đến qua những <br /> hình ảnh tuyệt
                đẹp trong thư viện của chúng tôi.
              </h2>
            </Col>

            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ================gallery section end================ */}
      {/* ================testimonial section start================ */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Khách Hàng Yêu Thích"} />
              <h2 className="testimonial__title">
                Hãy xem khách hàng yêu thích điều gì ở các tour và dịch vụ của
                chúng tôi.
              </h2>
            </Col>

            <Col lg="12">
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ================testimonial section end================ */}
      <Newsletter />
    </>
  );
};

export default Home;
