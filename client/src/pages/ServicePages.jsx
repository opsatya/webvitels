import React from 'react';
import styled from 'styled-components';
import {Link , useParams} from 'react-router-dom';

const services = {
  '1': {
    title: 'SEO Optimization',
    description: 'Boost your website\'s visibility on search engines',
    details: 'Our SEO optimization service is designed to help your website rank higher on search engines like Google. We use proven strategies such as keyword research, on-page optimization, and quality link building to improve your search engine rankings. Our goal is to drive organic traffic to your website and increase your online visibility.',
  }, 
  '2': {
    title: 'Web Design',
    description: 'Beautiful and engaging website designs',
    details: 'Our web design service focuses on creating visually appealing and functional designs that captivate your audience. We specialize in responsive designs that look great on any device, ensuring your website leaves a lasting impression. From concept to completion, we work closely with you to bring your vision to life.',
  },
  '3': {
    title: 'Web Development',
    description: 'Custom websites tailored to your needs',
    details: 'Our web development service offers cutting-edge solutions for businesses of all sizes. We create responsive, user-friendly websites that not only look great but also perform exceptionally well. Our team of expert developers uses the latest technologies to ensure your website is fast, secure, and scalable.',
  },
  '4': {
    title: 'Web Hosting',
    description: 'Reliable and secure hosting solutions',
    details: 'Our web hosting services ensure your website is always online, secure, and performing at its best. We offer scalable hosting plans tailored to your needs, with 24/7 support and guaranteed uptime. From small business sites to high-traffic platforms, we have the hosting solutions you need.',
  },
  '5': {
    title: 'WordPress & Shopify Solutions',
    description: 'E-commerce and CMS solutions for your business',
    details: 'Our WordPress and Shopify services provide robust platforms for your website or online store. We build custom themes, integrate essential plugins, and ensure a seamless user experience. Whether you\'re launching a new store or enhancing an existing one, our team is here to help you succeed.',
  },
};

const ServicePage = () => {
  const { id } = useParams(); // Access the dynamic parameter from the URL

  const service = services[id];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <PageContainer>
      <BackLink to="/service">← Back to Services</BackLink>
      <ServiceTitle>{service.title}</ServiceTitle>
      <ServiceDescription>{service.description}</ServiceDescription>
      <ServiceDetails>{service.details}</ServiceDetails>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;
const ServiceTitle = styled.h1`
  font-size: 2.5rem;
  color: #222;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
`;
const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: #0070f3;
  text-decoration: none;
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;

  &:hover {
    text-decoration: none;
    color: #ffffff;
    background-color: #0070f3;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceDescription = styled.p`
  font-size: 1.4rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.8;
  text-align: center;
`;

const ServiceDetails = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.8;
  margin: 1rem 0;
  text-align: justify;
`;

export default ServicePage;

