import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';

const FooterContainer = styled.footer`
  position: relative;
  background: ${({ theme }) => theme.footerBackground || '#111'};
  color: ${({ theme }) => theme.footerText || '#fff'};
  padding: 6rem 2rem 2rem;
  overflow: hidden;
`;

const FooterContent = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  z-index: 2;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  
  span {
    color: #6C63FF;
  }
`;

const FooterDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 300px;
  opacity: 0.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: #6C63FF;
    transform: translateY(-5px);
  }
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: #6C63FF;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 1rem;
  
  a {
    color: ${({ theme }) => theme.footerText || '#fff'};
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    
    svg {
      width: 0;
      height: 16px;
      margin-right: 0;
      transition: all 0.3s ease;
    }
    
    &:hover {
      opacity: 1;
      color: #6C63FF;
      transform: translateX(5px);
      
      svg {
        width: 16px;
        margin-right: 8px;
      }
    }
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  
  svg {
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    margin-top: 3px;
    color: #6C63FF;
  }
  
  p {
    margin: 0;
    opacity: 0.8;
  }
`;

const NewsletterForm = styled.form`
  margin-top: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  
  input {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.9rem;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #6C63FF;
    }
  }
  
  button {
    position: absolute;
    right: 5px;
    top: 5px;
    bottom: 5px;
    border: none;
    background: #6C63FF;
    color: white;
    border-radius: 50px;
    padding: 0 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #8C7FFF;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.footerText || '#fff'};
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 1;
      color: #6C63FF;
    }
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  background: linear-gradient(45deg, rgba(108, 99, 255, 0.1), rgba(140, 127, 255, 0.05));
  border-radius: 50%;
  z-index: 1;
  
  &.shape1 {
    width: 40vw;
    height: 40vw;
    top: -20%;
    right: -10%;
  }
  
  &.shape2 {
    width: 30vw;
    height: 30vw;
    bottom: -10%;
    left: -5%;
  }
`;

const AnimatedFooter = () => {
  const footerRef = useRef(null);
  const columnsRef = useRef(null);
  const bottomRef = useRef(null);
  const shape1Ref = useRef(null);
  const shape2Ref = useRef(null);
  
  // GSAP animations
  useGSAP((gsap, ScrollTrigger) => {
    // Animate footer columns
    const columns = columnsRef.current.children;
    
    gsap.fromTo(
      columns,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
    
    // Animate footer bottom
    gsap.fromTo(
      bottomRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
    
    // Parallax effect on background shapes
    gsap.to(shape1Ref.current, {
      y: "20%",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    
    gsap.to(shape2Ref.current, {
      y: "-20%",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    
    // Hover animations for social icons
    const socialIcons = footerRef.current.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -5,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);
  
  return (
    <FooterContainer ref={footerRef}>
      <BackgroundShape className="shape1" ref={shape1Ref} />
      <BackgroundShape className="shape2" ref={shape2Ref} />
      
      <FooterContent>
        <FooterTop ref={columnsRef}>
          <FooterColumn>
            <FooterLogo>
              Web<span>Vitels</span>
            </FooterLogo>
            <FooterDescription>
              We create cutting-edge digital experiences that inspire and transform businesses in the digital landscape.
            </FooterDescription>
            <SocialLinks>
              <SocialIcon href="#" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="#" className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinks>
              <FooterLink>
                <Link to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Home
                </Link>
              </FooterLink>
              <FooterLink>
                <Link to="/projects">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Projects
                </Link>
              </FooterLink>
              <FooterLink>
                <Link to="/service">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Services
                </Link>
              </FooterLink>
              <FooterLink>
                <Link to="/contact">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </Link>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterHeading>Our Services</FooterHeading>
            <FooterLinks>
              <FooterLink>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Web Development
                </a>
              </FooterLink>
              <FooterLink>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  UI/UX Design
                </a>
              </FooterLink> 
              <FooterLink>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Graphic Design
                </a>
              </FooterLink>
              <FooterLink>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  SEO Optimization
                </a>
              </FooterLink>
              <FooterLink>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Web Design
                </a>
              </FooterLink>
              <FooterLink>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Wordpress & Shopify
                </a>
              </FooterLink>
              <FooterLink>
                <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  SSL & Hosting Services
                </a>
              </FooterLink>
            </FooterLinks>
            
          </FooterColumn>
          
          <FooterColumn>
            <FooterHeading>Contact Us</FooterHeading>
            <ContactInfo>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>98/4 Sun City, Charohli, Pimpri Chinchwad, 412105</p>
            </ContactInfo>
            <ContactInfo>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>webvitels.com@gmail.com</p>
            </ContactInfo>
            <ContactInfo>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p>+91 7709003064</p>
            </ContactInfo>
            
            <NewsletterForm>
              <FooterHeading>Newsletter</FooterHeading>
              <p>Subscribe to our newsletter for updates</p>
              <InputGroup>
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </InputGroup>
            </NewsletterForm>
          </FooterColumn>
        </FooterTop>
        
        <FooterBottom ref={bottomRef}>
          <Copyright>
            © {new Date().getFullYear()} Web Vitels. All rights reserved.
          </Copyright>
          
          <FooterBottomLinks>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default AnimatedFooter;
