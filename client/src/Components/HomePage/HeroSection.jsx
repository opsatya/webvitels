import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP, useSplitText } from '../../hooks/useGSAP';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const HeroContainer = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const HeroContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1600px;
  z-index: 2;
  padding: 0 2rem;
`;

const HeroHeading = styled.h1`
  font-size: clamp(3rem, 8vw, 5.4rem);
  font-weight: 800;
  line-height: 1;
  margin-bottom: 2rem;
  overflow: hidden;
  
  .highlight {
    color: #6C63FF;
    display: inline-block;
  }
  
  .char {
    display: inline-block;
    transform-origin: 50% 100%;
  }

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 8vw, 4rem);
  }
`;

const HeroSubheading = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  max-width: 700px;
  margin-bottom: 3rem;
  overflow: hidden;
  
  .char {
    display: inline-block;
    transform-origin: 50% 100%;
  }
`;

const CTAButton = styled.button`
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: #6C63FF;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #6C63FF, #8C7FFF);
    z-index: -1;
    transition: transform 0.5s ease;
    transform: scaleX(0);
    transform-origin: right;
  }
  
  &:hover:before {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(108, 99, 255, 0.5);
  }
`;

const StatsContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .stat-number {
    font-size: 3rem;
    font-weight: 700;
    color: #6C63FF;
  }
  
  .stat-label {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  background: linear-gradient(45deg, rgba(108, 99, 255, 0.1), rgba(140, 127, 255, 0.1));
  border-radius: 50%;
  z-index: 1;
  
  &.shape1 {
    width: 40vw;
    height: 40vw;
    top: -10%;
    right: -10%;
  }
  
  &.shape2 {
    width: 25vw;
    height: 25vw;
    bottom: 10%;
    left: -5%;
  }
`;

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 10;
  
  .scroll-text {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .scroll-icon {
    width: 30px;
    height: 50px;
    border: 2px solid ${({ theme }) => theme.text};
    border-radius: 25px;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background: ${({ theme }) => theme.text};
      border-radius: 50%;
      margin-top: 10px;
    }
  }
  
  &:hover .scroll-icon {
    transform: translateY(5px);
    border-color: #6C63FF;
    
    &:before {
      background: #6C63FF;
    }
  }
  
  &:hover .scroll-text {
    color: #6C63FF;
  }
`;

const HeroSection = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  
  // Split text for animation
  useSplitText(headingRef, { autoAnimate: false });
  useSplitText(subheadingRef, { autoAnimate: false });
  
  // GSAP animations
  useGSAP((gsap) => {
    const tl = gsap.timeline();
    
    // Animate heading characters
    tl.fromTo(
      headingRef.current.querySelectorAll('.char'),
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
      }
    );
    
    // Animate subheading characters
    tl.fromTo(
      subheadingRef.current.querySelectorAll('.char'),
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.01,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );
    
    // Animate CTA button
    tl.fromTo(
      ctaButtonRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );
    
    // Animate stats
    tl.fromTo(
      statsRef.current.children,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.6"
    );
    
    // Animate scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );
    
    // Animate background shapes
    tl.fromTo(
      [shape1Ref.current, shape2Ref.current],
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=1"
    );
    
    // Animate scroll indicator dot
    gsap.to(
      scrollIndicatorRef.current.querySelector('.scroll-icon:before'),
      {
        y: 30,
        repeat: -1,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
      }
    );
    
    // Add optimized click functionality to scroll indicator
    scrollIndicatorRef.current.addEventListener('click', () => {
      const projectsSection = document.querySelector('#projects-section');
      if (projectsSection) {
        // Use GSAP for smoother scrolling performance
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: projectsSection,
            offsetY: 0,
            autoKill: true
          },
          ease: "power2.inOut"
        });
      }
    });
    
    // Animate stat numbers
    const statNumbers = statsRef.current.querySelectorAll('.stat-number');
    
    gsap.fromTo(
      statNumbers[0],
      { innerText: 0 },
      {
        innerText: 120,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
        delay: 1,
      }
    );
    
    gsap.fromTo(
      statNumbers[1],
      { innerText: 0 },
      {
        innerText: 5,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
        delay: 1.2,
      }
    );
    
    // Optimized parallax effect on background shapes
    gsap.to(shape1Ref.current, {
      y: "20%",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5, // Smoother scrubbing
        invalidateOnRefresh: true,
        fastScrollEnd: true, // Optimize for fast scrolling
      },
      force3D: true, // Hardware acceleration
    });
    
    gsap.to(shape2Ref.current, {
      y: "-20%",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5, // Smoother scrubbing
        invalidateOnRefresh: true,
        fastScrollEnd: true, // Optimize for fast scrolling
      },
      force3D: true, // Hardware acceleration
    });
  }, []);
  
  return (
    <HeroContainer>
      <BackgroundShape className="shape1" ref={shape1Ref} />
      <BackgroundShape className="shape2" ref={shape2Ref} />
      
      <HeroContent>
        <HeroHeading ref={headingRef}>
          CRAFTING <span className="highlight">DIGITAL  EXPERIENCES THAT INSPIRE</span>
        </HeroHeading>
        
        <HeroSubheading ref={subheadingRef}>
          We are a cutting-edge web agency delivering innovative solutions that transform businesses and captivate audiences.
        </HeroSubheading>
        
        <CTAButton ref={ctaButtonRef}>
          Start a Project
        </CTAButton>
      </HeroContent>
      
      <StatsContainer ref={statsRef}>
        <StatItem>
          {/* <span className="stat-number">120</span>
          <span className="stat-label">Projects Completed</span> */}
        </StatItem>
        
        <StatItem>
          {/* <span className="stat-number">5</span>
          <span className="stat-label">Years Experience</span> */}
        </StatItem>
      </StatsContainer>
      
      <ScrollIndicator ref={scrollIndicatorRef}>
        <span className="scroll-text">Scroll Down</span>
        <div className="scroll-icon"></div>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
