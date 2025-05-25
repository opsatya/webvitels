import React, { useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';

const Container = styled.section`
  position: relative;
  padding: 8rem 1rem;
  width: 100%;
  background: ${({ theme }) => theme.background};
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1600px; // or another value that fits your design
  margin: 0 auto;    // centers the content
  position: relative;
  z-index: 1;
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
    left: -15%;
  }
  
  &.shape2 {
    width: 30vw;
    height: 30vw;
    bottom: 10%;
    right: -10%;
  }
`;

const SectionHeader = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 6rem;
  z-index: 1;
`;

const HeadingBackground = styled.span`
  position: absolute;
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 800;
  opacity: 0.05;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
  color: #333333 !important;
  z-index: 0;
  white-space: nowrap;
  pointer-events: none;
`;

const SectionTitle = styled.h2`
  position: relative;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  z-index: 1;
  
  span {
    color: #6C63FF;
  }
`;

const SectionDescription = styled.p`
  position: relative;
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  z-index: 1;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.cardBackground || 'rgba(255, 255, 255, 0.05)'};
  border-radius: 20px;
  padding: 3rem 2rem;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #6C63FF, #8C7FFF);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  &:hover:before {
    transform: scaleX(1);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(45deg, #6C63FF, #8C7FFF);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: white;
  font-size: 2rem;
  
  svg {
    width: 40px;
    height: 40px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 2rem;
`;

const ServiceLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #6C63FF;
  text-decoration: none;
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const ServicesSection = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const servicesRef = useRef(null);
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  
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
    
    // Services staggered animation
    const serviceCards = servicesRef.current.children;
    
    gsap.fromTo(
      serviceCards,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
    
    // Optimized parallax effect on background shapes
    gsap.to(shape1Ref.current, {
      y: "20%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
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
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5, // Smoother scrubbing
        invalidateOnRefresh: true,
        fastScrollEnd: true, // Optimize for fast scrolling
      },
      force3D: true, // Hardware acceleration
    });
    
    // Add hover animations for service cards
    Array.from(serviceCards).forEach(card => {
      const icon = card.querySelector('.service-icon');
      const title = card.querySelector('h3');
      const link = card.querySelector('a');
      
      card.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -10,
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out",
        });
        
        gsap.to(title, {
          color: "#6C63FF",
          duration: 0.3,
          ease: "power2.out",
        });
        
        gsap.to(link.querySelector('svg'), {
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        
        gsap.to(title, {
          color: "",
          duration: 0.3,
          ease: "power2.out",
        });
        
        gsap.to(link.querySelector('svg'), {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);
  
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Crafting digital masterpieces with pixel-perfect precision and innovative coding solutions. Our passionate developers breathe life into your vision with cutting-edge technologies, ensuring your website stands as a testament to excellence in the digital realm.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Transforming user journeys into captivating digital experiences through creative innovation. Our design artisans meticulously craft each element with unwavering dedication, blending aesthetic brilliance with functional intuition to create interfaces that leave lasting impressions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "SEO Optimization",
      description: "Elevating your digital presence with strategic search engine optimization that drives organic traffic and boosts visibility. Our SEO experts employ innovative techniques and data-driven strategies to position your brand at the forefront of search results, ensuring maximum reach and engagement.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Graphic Design",
      description: "Creating visual masterpieces that communicate your brand's essence with artistic flair and strategic intent. Our graphic designers blend creativity with purpose, crafting stunning visuals that captivate audiences and strengthen brand identity across all touchpoints.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Web Design",
      description: "Designing immersive digital environments that harmonize aesthetics with functionality. Our web designers craft visually stunning interfaces that engage users and reflect your brand's unique personality, ensuring a memorable online experience that converts visitors into loyal customers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 6,
      title: "WordPress & Shopify",
      description: "Harnessing the power of leading platforms to create customized, scalable websites and e-commerce solutions. Our experts transform standard templates into bespoke digital experiences, optimizing every aspect of your WordPress or Shopify site to maximize performance, user engagement, and conversions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 7,
      title: "Hosting & SSL Services",
      description: "Providing rock-solid hosting infrastructure and bulletproof security solutions that keep your digital assets safe and performing optimally. Our comprehensive hosting and SSL services ensure lightning-fast loading speeds, maximum uptime, and encrypted connections that build trust with your audience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 8,
      title: "E-Commerce Solutions",
      description: "Transforming your business with powerful e-commerce solutions that drive sales and enhance customer experience. Our expert team creates seamless online stores with intuitive navigation, secure payment gateways, and optimized product displays that convert browsers into loyal customers and maximize your digital revenue.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
  ];
  
  return (
    <Container ref={containerRef}>
      <BackgroundShape className="shape1" ref={shape1Ref} />
      <BackgroundShape className="shape2" ref={shape2Ref} />
      
      <ContentWrapper>
          <SectionHeader ref={headerRef}>
            <HeadingBackground>SERVICES</HeadingBackground>
            <SectionTitle>Our <span>Services</span></SectionTitle>
            <SectionDescription>
              We offer comprehensive digital solutions tailored to elevate your online presence. From stunning web design to robust development, SEO optimization, and secure hosting - our services are designed to help your business stand out and succeed in today's competitive digital landscape.
            </SectionDescription>
          </SectionHeader>
      
      <ServicesGrid ref={servicesRef}>
        {services.map((service) => (
          <ServiceCard key={service.id}>
            <ServiceIcon className="service-icon">
              {service.icon}
            </ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceLink href="#">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </ServiceLink>
          </ServiceCard>
        ))}
      </ServicesGrid>
      </ContentWrapper>
    </Container>
  );
};

export default ServicesSection;
