import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

// Assuming you have these GIF images in your public folder
const serviceImages = [
  './images/services-images/SEO-Optimization.gif',
  './images/services-images/Web-Design.gif',
  './images/services-images/web-development.gif',
  './images/services-images/web-hosting.gif',
  './images/services-images/Wordpress-shopify.gif',
];

const services = [
  { id: 1, title: 'SEO Optimization', description: 'Boost your online visibility and search rankings.' },
  { id: 2, title: 'Web Design', description: 'Beautiful and responsive web designs.' },
  { id: 3, title: 'Web Development', description: 'Custom websites tailored to your needs.' },
  { id: 4, title: 'Web Hosting', description: 'Reliable hosting for your online presence.' },
  { id: 5, title: 'WordPress & Shopify', description: 'E-commerce solutions with WordPress and Shopify.' },

];

const Service = () => {
  return (
    <Section>
      <Container>
        <Title>Our Services</Title>
        <Subtitle>Innovative solutions for your digital needs</Subtitle>
        <Grid>
          {services.map((service, index) => (
            <Link to={`/services/${service.id}`} key={service.id}>
              <ServiceCard>
                <ImageWrapper>
                  <ServiceImage src={serviceImages[index]} alt={service.title} />
                </ImageWrapper>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  padding: 4rem 0;
  background-color: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 350px; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ServiceTitle = styled.h3`
  font-size: 1.2rem; 
  color: #333;
  margin-bottom: 0.5rem;
  max-height: 3rem; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

export default Service;

