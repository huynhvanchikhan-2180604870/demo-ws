import React from 'react'
import { ServiceCard } from './ServiceCard'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';


const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Dự Báo Thời Tiết",
    desc: "Nhận thông tin thời tiết chi tiết để chuẩn bị tốt nhất cho chuyến đi của bạn.",
  },

  {
    imgUrl: guideImg,
    title: "Hướng Dẫn Viên Tốt Nhất",
    desc: "Tận hưởng chuyến du lịch cùng hướng dẫn viên chuyên nghiệp và tận tâm.",
  },

  {
    imgUrl: customizationImg,
    title: "Tùy Chỉnh Tour",
    desc: "Thiết kế chuyến đi theo ý thích, phù hợp với lịch trình và ngân sách của bạn.",
  },
];

export const Services = () => {
  return <>
    {
        servicesData.map((item, index) =>(
            <Col lg='3' key={index}>
                <ServiceCard item={item}/>
            </Col>
        ))
    }
  </>
}
