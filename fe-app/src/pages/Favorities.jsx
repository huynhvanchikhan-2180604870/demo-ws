import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'reactstrap'; 
import { TourCard } from '../shared/TourCard';
import CommonSection from '../shared/CommonSection';

const Favorities = () => {
  const favorites = useSelector((state) => state.tour.favorites);

  return <>
    <section>
    <CommonSection title={"Các tour bạn yêu thích"} />
    </section>
    <section className="pt-0" style={{ padding: '20px' }}>
      <Container>
        
        <Row>
          {favorites && favorites.length > 0 ? (
            favorites.map((tour) => (
              <Col lg="3" key={tour.id} className="mb-4">
                <TourCard tour={tour} />
              </Col>
            ))
          ) : (
            <Col lg="12" className="text-center">
              <p style={{ marginTop: '20px' }}>
                Bạn chưa có tour yêu thích nào. Hãy thêm một vài tour vào danh sách yêu thích.
              </p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
    </>;
};

export default Favorities;
