import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1840px;
  margin: 0 auto;
  padding: 3rem 1rem;
  gap: 2rem;
  background-color: #f8f8f8;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 6rem 2rem;
    gap: 4rem;
  }
`

const Section = styled.div`
  flex: 1;
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #000;

  @media (min-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  }
`

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 3rem;
  }
`

const SliderContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  @media (min-width: 768px) {
    overflow-x: visible;
    padding-bottom: 0;
  }
`

const SliderDot = styled.div`
  width: 60px;
  height: 4px;
  flex-shrink: 0;
  background-color: ${props => props.active ? '#000' : '#E5E7EB'};
  transition: background-color 0.3s ease;

  @media (min-width: 768px) {
    width: 80px;
  }
`

const Logo = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: auto;

  @media (min-width: 768px) {
    width: 40px;
  }
`

const TestimonialContent = styled(motion.div)`
  margin-top: 2rem;

  @media (min-width: 768px) {
    margin-top: 3rem;
  }
`

const Quote = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: #000;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`

const Author = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.875rem;
    color: #666;
  }

  @media (min-width: 768px) {
    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`

const testimonials = [
  {
    quote: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum dignissimos? Officiis ipsam dolorum magnam assumenda.",
    author: "Jane Dodson",
    title: "Marketing Director, Nike"
  },
  {
    quote: "Expedita sequi cupiditate harum repellendus ipsum dignissimos. Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    author: "John Smith",
    title: "Product Manager, Nike"
  },
  {
    quote: "Officiis ipsam dolorum magnam assumenda. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi.",
    author: "Sarah Johnson",
    title: "Design Lead, Nike"
  },
  {
    quote: "Sit amet consectetur adipisicing elit. Lorem ipsum dolor, Expedita sequi cupiditate harum repellendus ipsum.",
    author: "Mike Wilson",
    title: "Creative Director, Nike"
  },
  {
    quote: "Harum repellendus ipsum dignissimos. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi.",
    author: "Emily Brown",
    title: "Brand Manager, Nike"
  },
  {
    quote: "Lorem ipsum dolor, Expedita sequi cupiditate. Sit amet consectetur adipisicing elit harum repellendus ipsum.",
    author: "David Lee",
    title: "Strategy Director, Nike"
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Container>
      <Section>
        <Title>What our customers think</Title>
        <Description>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus commodi sint, similique cupiditate possimus suscipit delectus illum eos iure magnam!
        </Description>
        <SliderContainer>
          {testimonials.map((_, index) => (
            <SliderDot 
              key={index} 
              active={index === current}
            />
          ))}
        </SliderContainer>
      </Section>
      <Section style={{ position: 'relative' }}>
        <Logo src="/placeholder.svg" alt="logo" />
        <AnimatePresence mode="wait">
          <TestimonialContent
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Quote>{testimonials[current].quote}</Quote>
            <Author>
              <h3>{testimonials[current].author}</h3>
              <p>{testimonials[current].title}</p>
            </Author>
          </TestimonialContent>
        </AnimatePresence>
      </Section>
    </Container>
  )
}