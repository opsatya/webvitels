import React from 'react';
import styled from 'styled-components';

const ImageSectionWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 3rem 6rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem 5rem;
`;

const ImageCard = styled.a`
  position: relative;
  background-color: #f0f0f0;
  border-radius: 2rem;
  overflow: hidden;
  .image {
    width: 100%;
    height: auto;
    border-radius: 2rem;
  }
  .overlay {
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #333;
  }
  &:hover .image {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const Section2 = () => {
  return (
    <ImageSectionWrapper>
      <ImageCard href="#">
        <img className="image" src="./images/works.png" alt="webvitels" />
        <div className="overlay">
          <h1>WORKS</h1>
          <i className="ri-arrow-right-up-line"></i>
        </div>
      </ImageCard>
      <ImageCard href="#">
        <img className="image" src="./images/services.png" alt="webvitels" />
        <div className="overlay">
          <h1>SERVICES</h1>
          <i className="ri-arrow-right-up-line"></i>
        </div>
      </ImageCard>
    </ImageSectionWrapper>
  );
};

export default Section2;
