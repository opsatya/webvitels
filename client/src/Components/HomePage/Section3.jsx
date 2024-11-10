'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const HomeSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  padding: 4rem 1rem 4rem 0;
  max-width: 1200px;
  overflow: hidden;
  margin-left:18.6rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
    margin-left:2rem;
  }
`

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  color: #666;
  margin-bottom: 2rem;
  text-align: center; 
`

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const Stat = styled(motion.div)`
  text-align: center;
`

const StatNumber = styled.div`
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: bold;
  color: #4a90e2;
`

const StatLabel = styled.div`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #666;
`

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center; /* Center-aligning image content */
  align-items: center;

  @media (max-width: 768px) {
    height: 300px;
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

   const Section3= ()=> {
  return (
    <HomeSection>
      <ContentArea>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Our Creative Studio
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We bring your ideas to life with passion and innovation
        </Subtitle>
        <StatsContainer>
          <Stat
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatNumber>1+</StatNumber>
            <StatLabel>Years Experience</StatLabel>
          </Stat>
          <Stat
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <StatNumber>100+</StatNumber>
            <StatLabel>Happy Customers</StatLabel>
          </Stat>
        </StatsContainer>
      </ContentArea>
      <ImageContainer
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <StyledImage
          src="./images/website.gif?height=400&width=600"
          alt="Creative workspace"
        />
      </ImageContainer>
      <ImageContainer
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <StyledImage
          src="./images/website2.gif?height=400&width=600"
          alt="Team collaboration"
        />
      </ImageContainer>
      <ContentArea>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Crafting Digital Experiences
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          From concept to creation, we're with you every step of the way
        </Subtitle>
      </ContentArea>
    </HomeSection>
  )
}
export default Section3