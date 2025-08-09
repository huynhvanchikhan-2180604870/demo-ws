import React from "react";
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png'

const quick_links = [
  {
    path: "/home",
    display: "Trang chủ",
  },

  {
    path: "/about",
    display: "Khám phá",
  },

  {
    path: "/tours",
    display: "Tours",
  },
];


const quick_links2 = [
  {
    path: "/gallery",
    display: "Thư viện hình ảnh",
  },

  {
    path: "/login",
    display: "Đăng nhập",
  },

  
  {
    path: "/register",
    display: "Đăng ký",
  },
  {
    path: "/register-host",
    display: "Đăng ký làm nhà cung cấp tour",
  },
];


const Footer = () => {
  const years =new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="" />
              <p>
                "Hành trình của bạn bắt đầu tại đây! Chúng tôi cam kết mang đến
                những chuyến đi đáng nhớ, giúp bạn khám phá thế giới với sự
                thoải mái và an tâm tuyệt đối."
              </p>
            </div>

            <div className="social__links d-flex align-items-center gap-4">
              <span>
                <Link to="#">
                  <i className="ri-youtube-line"></i>
                </Link>
              </span>

              <span>
                <Link to="#">
                  <i className="ri-github-fill"></i>
                </Link>
              </span>

              <span>
                <Link to="#">
                  <i className="ri-facebook-circle-line"></i>
                </Link>
              </span>

              <span>
                <Link to="#">
                  <i className="ri-instagram-line"></i>
                </Link>
              </span>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Khám Phá</h5>
            <ListGroup className="footer__quick-links">
              {quick_links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Liên Kết Nhanh</h5>
            <ListGroup className="footer__quick-links">
              {quick_links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Liên Hệ</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  Địa chỉ:
                </h6>

                <p className="mb-0">TP. HỒ CHÍ MINH</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  Email:
                </h6>

                <p className="mb-0">huynhkhan91@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-fill"></i>
                  </span>
                  Điện thoại:
                </h6>

                <p className="mb-0">+84 961800341</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <div className="copyright">
              Bản quyền © {years}, thiết kế và phát triển bởi Huỳnh Văn Chí
              Khan. Mọi quyền được bảo lưu.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
