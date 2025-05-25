import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SEOHead from './SEO/SEOHead';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: clamp(6rem, 20vw, 12rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, #6C63FF, #FF6584);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
`;

const ErrorTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 1rem 0;
  color: ${({ theme }) => theme.text};
`;

const ErrorDescription = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 600px;
  margin: 1rem auto 2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: ${props => props.primary ? '#6C63FF' : 'transparent'};
  color: ${props => props.primary ? 'white' : ({ theme }) => theme.text};
  border: 2px solid ${props => props.primary ? '#6C63FF' : ({ theme }) => theme.border};
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
    background: ${props => props.primary ? '#5A52E0' : 'rgba(108, 99, 255, 0.1)'};
  }
`;

const Illustration = styled.img`
  max-width: 100%;
  height: auto;
  width: 400px;
  margin-bottom: 2rem;
`;

const NotFound = () => {
  return (
    <>
      <SEOHead 
        title="Page Not Found" 
        description="The page you're looking for doesn't exist. Return to the WebVitels homepage for web design and SEO services."
        keywords="404, page not found, WebVitels, web design, SEO services"
      />
      <NotFoundContainer>
        <Illustration src="/images/404-illustration.svg" alt="Page not found illustration" />
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorDescription>
          The page you're looking for doesn't exist or has been moved.
          Don't worry, you can find plenty of other things on our homepage.
        </ErrorDescription>
        <ButtonContainer>
          <Button to="/" primary>Back to Homepage</Button>
          <Button to="/contact">Contact Support</Button>
        </ButtonContainer>
      </NotFoundContainer>
    </>
  );
};

export default NotFound;
