import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';

const Container = styled.section`
  position: relative;
  padding: 8rem 1rem;
  background: ${({ theme }) => theme.background};
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: 8rem 1.5rem;
  }
`;

const SectionHeader = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 6rem;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  
  span {
    color: #6C63FF;
  }
`;

const SectionDescription = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const TestimonialsWrapper = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialsSlider = styled.div`
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
`;

const TestimonialsList = styled.div`
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: translateX(${props => props.offset}px);
`;

const TestimonialCard = styled.div`
  flex: 0 0 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  background: ${({ theme }) => theme.cardBackground || 'rgba(255, 255, 255, 0.05)'};
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const QuoteIcon = styled.div`
  font-size: 4rem;
  color: #6C63FF;
  opacity: 0.3;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const AuthorPosition = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin: 0.3rem 0 0;
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;
`;

const NavButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: #6C63FF;
    border-color: #6C63FF;
    color: white;
    transform: translateY(-3px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background: transparent;
      border-color: ${({ theme }) => theme.text};
      color: ${({ theme }) => theme.text};
      transform: none;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PaginationDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#6C63FF' : 'rgba(108, 99, 255, 0.3)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#6C63FF' : 'rgba(108, 99, 255, 0.5)'};
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(108, 99, 255, 0.05), rgba(140, 127, 255, 0.05));
  z-index: 0;
  
  &.shape1 {
    width: 40vw;
    height: 40vw;
    top: -10%;
    right: -15%;
  }
  
  &.shape2 {
    width: 30vw;
    height: 30vw;
    bottom: 10%;
    left: -10%;
  }
`;

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);
  const cardsRef = useRef(null);
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  
  const testimonials = [
    {
      id: 1,
      text: "Web Vitels transformed our online presence with their innovative approach. Their team delivered a website that not only looks stunning but also performs exceptionally well. Their dedication to perfection and creative solutions have significantly increased our conversion rates by 150%.",
      author: "Arjun Sharma",
      position: "CEO, TechVision India",
      image: "https://randomuser.me/api/portraits/men/71.jpg",
    },
    {
      id: 2,
      text: "Working with Web Vitels was a game-changer for our e-commerce business. Their attention to detail and innovative solutions helped us stand out in a competitive market. The team's creative approach and unwavering commitment to excellence made our project a remarkable success.",
      author: "Priya Patel",
      position: "Marketing Director, Elevate Brands India",
      image: "https://randomuser.me/api/portraits/women/70.jpg",
    },
    {
      id: 3,
      text: "The team at Web Vitels exceeded our expectations in every way. From the initial concept to the final implementation, they demonstrated exceptional skill and creativity. Their passionate dedication to our vision has helped us achieve unprecedented growth in our sector.",
      author: "Vikram Malhotra",
      position: "Founder, Artisan Collective Mumbai",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 4,
      text: "Web Vitels' innovative approach to our digital transformation was nothing short of revolutionary. Their team's creative genius and technical expertise blended perfectly to deliver a solution that not only met but exceeded our business objectives. Their dedication to our success was evident in every interaction.",
      author: "Ananya Desai",
      position: "CTO, InnovateNow Technologies",
      image: "https://randomuser.me/api/portraits/women/79.jpg",
    },
    {
      id: 5,
      text: "The level of creativity and technical innovation that Web Vitels brought to our project was exceptional. Their team worked tirelessly to understand our unique challenges and crafted solutions that perfectly aligned with our brand vision. Their dedication to excellence is truly commendable.",
      author: "Rajiv Mehta",
      position: "Director, Digital Futures Bangalore",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    {
      id: 6,
      text: "Partnering with Web Vitels was the best decision for our startup. Their team's passion for innovation and unwavering commitment to quality delivered a digital platform that has become our competitive advantage. They don't just build websites; they craft digital experiences that drive business growth.",
      author: "Meera Krishnan",
      position: "Founder & CEO, EcoSmart Solutions",
      image: "https://randomuser.me/api/portraits/women/66.jpg",
    },
  ];
  
  // GSAP animations
  useGSAP((gsap, ScrollTrigger) => {
    // Header animation
    gsap.fromTo(
      headerRef.current.children,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
    
    // Testimonial card animation
    const testimonialCard = sliderRef.current.querySelector('.testimonial-card');
    
    gsap.fromTo(
      testimonialCard,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
    
    // Parallax effect on background shapes
    gsap.to(shape1Ref.current, {
      y: "20%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    
    gsap.to(shape2Ref.current, {
      y: "-20%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  
  // Handle testimonial navigation
  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      animateSlide(newIndex);
      setCurrentIndex(newIndex);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      const newIndex = currentIndex + 1;
      animateSlide(newIndex);
      setCurrentIndex(newIndex);
    }
  };
  
  const handleDotClick = (index) => {
    animateSlide(index);
    setCurrentIndex(index);
  };
  
  const animateSlide = (index) => {
    const cards = cardsRef.current.children;
    const cardWidth = cards[0].offsetWidth;
    
    gsap.to(cardsRef.current, {
      x: -index * cardWidth,
      duration: 1,
      ease: "power4.out",
    });
    
    // Animate the active card
    gsap.fromTo(
      cards[index],
      {
        opacity: 0.5,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
      }
    );
    
    // Fade out other cards
    for (let i = 0; i < cards.length; i++) {
      if (i !== index) {
        gsap.to(cards[i], {
          opacity: 0.5,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }
  };
  
  return (
    <Container ref={containerRef} id="testimonials-section">
      <BackgroundShape className="shape1" ref={shape1Ref} />
      <BackgroundShape className="shape2" ref={shape2Ref} />
      
      <SectionHeader ref={headerRef}>
        <SectionTitle>Client <span>Testimonials</span></SectionTitle>
        <SectionDescription>
          Our commitment to excellence speaks through the success stories of our valued clients. Discover how our creative solutions and dedicated approach have transformed businesses across India.
        </SectionDescription>
      </SectionHeader>
      
      <TestimonialsWrapper>
        <TestimonialsSlider ref={sliderRef}>
          <TestimonialsList ref={cardsRef}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                className="testimonial-card"
                style={{ opacity: index === currentIndex ? 1 : 0.5 }}
              >
                <QuoteIcon>❝</QuoteIcon>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  {/* <AuthorImage src={testimonial.image} alt={testimonial.author} /> */}
                  <AuthorInfo>
                    <AuthorName>{testimonial.author}</AuthorName>
                    {/* <AuthorPosition>{testimonial.position}</AuthorPosition> */}
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsList>
        </TestimonialsSlider>
        
        <NavigationControls>
          <NavButton onClick={handlePrev} disabled={currentIndex === 0}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </NavButton>
          
          <Pagination>
            {testimonials.map((_, index) => (
              <PaginationDot 
                key={index} 
                active={index === currentIndex} 
                onClick={() => handleDotClick(index)}
              />
            ))}
          </Pagination>
          
          <NavButton onClick={handleNext} disabled={currentIndex === testimonials.length - 1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </NavButton>
        </NavigationControls>
      </TestimonialsWrapper>
    </Container>
  );
};

export default TestimonialsSection;
