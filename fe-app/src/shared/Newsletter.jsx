import React from "react";
import "./newsletter.css";

import { Col, Container, Row } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
export const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>
                <strong>Đăng ký ngay</strong> để nhận thông tin du lịch hữu ích.
              </h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Nhập email của bạn" />
                <button className="btn newsletter__btn">Đăng Ký Ngay</button>
              </div>
              <p>
                Hãy để hành trình khám phá thế giới của bạn trở nên dễ dàng hơn
                với những thông tin du lịch hữu ích, các ưu đãi độc quyền, và
                mẹo vặt hữu ích được gửi trực tiếp đến hộp thư của bạn. Đừng bỏ
                lỡ cơ hội để biến mỗi chuyến đi thành một trải nghiệm đáng nhớ!.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
