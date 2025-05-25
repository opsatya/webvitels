import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';
// Theme toggle removed

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  z-index: 1000;
  transition: all 0.5s ease;
  
  &.scrolled {
    background: ${({ theme }) => theme.background};
    padding: 1rem 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.a`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  
  .logo-text {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  
  .logo-letter {
    display: inline-block;
    transform-origin: 50% 100%;
  }
  
  .logo-highlight {
    color: #6C63FF;
  }
  
  .logo-w {
    color: #6C63FF;
    font-weight: 900;
    text-shadow: 0 0 10px rgba(108, 99, 255, 0.3);
  }
  
  .logo-v {
    color: #8C7FFF;
    font-weight: 900;
    text-shadow: 0 0 10px rgba(140, 127, 255, 0.3);
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .logo-icon {
    margin-right: 0.5rem;
    background: linear-gradient(45deg, #6C63FF, #8C7FFF);
    border-radius: 8px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(108, 99, 255, 0.3);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  position: relative;
  
  .nav-link {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 1px;
    transition: color 0.3s ease;
    
    &:hover, &.active {
      color: #6C63FF;
    }
  }
  
  .underline {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #6C63FF;
    transition: width 0.3s ease;
  }
`;

const CTAButton = styled.button`
  padding: 0.8rem 2rem;
  background: #6C63FF;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
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
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(108, 99, 255, 0.3);
  }
`;

// Theme toggle button removed

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transform: translateY(-100%);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #6C63FF #333333;
  
  &.open {
    transform: translateY(0);
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #333333;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #6C63FF;
    border-radius: 6px;
  }
`;

const MobileNavItem = styled.div`
  margin: 1.5rem 0;
  overflow: hidden;
  
  .mobile-nav-link {
    color: #ffffff;
    text-decoration: none;
    font-size: 2rem;
    font-weight: 700;
    display: block;
    transform: translateY(100%);
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    
    &.show {
      transform: translateY(0);
    }
    
    &:hover, &.active {
      color: #6C63FF;
    }
  }
`;

const MobileCTA = styled(CTAButton)`
  margin-top: 2rem;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  
  &.show {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AnimatedNavbar = () => {
  // Theme toggle functionality removed
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileNavItemsRef = useRef(null);
  const mobileCTARef = useRef(null);
  
  // Handle scroll event with optimized performance
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastScrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Split logo text for animation
  useEffect(() => {
    if (!logoRef.current) return;
    
    const logoText = logoRef.current.querySelector('.logo-text');
    const text = logoText.textContent;
    logoText.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      const letter = document.createElement('span');
      letter.className = 'logo-letter';
      letter.textContent = text[i];
      
      if (text[i] === 'V') {
        letter.classList.add('logo-highlight');
      }
      
      logoText.appendChild(letter);
    }
  }, []);
  
  // GSAP animations
  useGSAP((gsap) => {
    // Initial animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      logoRef.current.querySelectorAll('.logo-letter'),
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      }
    );
    
    tl.fromTo(
      navLinksRef.current.children,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );
    
    // Add hover animations for nav items
    const navItems = navLinksRef.current.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      const underline = item.querySelector('.underline');
      
      item.addEventListener('mouseenter', () => {
        gsap.to(underline, {
          width: '100%',
          duration: 0.3,
          ease: "power2.inOut",
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(underline, {
          width: '0%',
          duration: 0.3,
          ease: "power2.inOut",
        });
      });
    });
    
    // Mobile menu animations
    const mobileNavLinks = mobileNavItemsRef.current.querySelectorAll('.mobile-nav-link');
    
    const openMobileMenu = () => {
      gsap.to(mobileMenuRef.current, {
        y: '0%',
        duration: 0.8,
        ease: "expo.out",
      });
      
      gsap.to(mobileNavLinks, {
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        delay: 0.3,
        ease: "back.out(1.2)",
      });
      
      gsap.to(mobileCTARef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.5,
        ease: "back.out(1.2)",
      });
    };
    
    const closeMobileMenu = () => {
      gsap.to(mobileNavLinks, {
        y: '100%',
        stagger: 0.05,
        duration: 0.5,
        ease: "back.in(1.2)",
      });
      
      gsap.to(mobileCTARef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "back.in(1.2)",
      });
      
      gsap.to(mobileMenuRef.current, {
        y: '-100%',
        duration: 0.8,
        delay: 0.4,
        ease: "expo.in",
      });
    };
    
    // Return functions to be used in component
    return { openMobileMenu, closeMobileMenu };
  }, []);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // Close mobile menu
      const mobileNavLinks = mobileNavItemsRef.current.querySelectorAll('.mobile-nav-link');
      
      gsap.to(mobileNavLinks, {
        y: '100%',
        stagger: 0.05,
        duration: 0.5,
        ease: "back.in(1.2)",
      });
      
      gsap.to(mobileCTARef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "back.in(1.2)",
      });
      
      gsap.to(mobileMenuRef.current, {
        y: '-100%',
        duration: 0.8,
        delay: 0.4,
        ease: "expo.in",
      });
    } else {
      // Open mobile menu
      const mobileNavLinks = mobileNavItemsRef.current.querySelectorAll('.mobile-nav-link');
      
      gsap.to(mobileMenuRef.current, {
        y: '0%',
        duration: 0.8,
        ease: "expo.out",
      });
      
      gsap.to(mobileNavLinks, {
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        delay: 0.3,
        ease: "back.out(1.2)",
      });
      
      gsap.to(mobileCTARef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.5,
        ease: "back.out(1.2)",
      });
    }
    
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <>
      <NavbarContainer ref={navbarRef} className={isScrolled ? 'scrolled' : ''}>
        <NavbarContent>
          <Logo href="/" ref={logoRef}>
            <div className="logo-container">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L9 18L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 6L21 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="logo-text">
                <span className="logo-w">W</span>eb
                <span className="logo-v">V</span>itels
              </span>
            </div>
          </Logo>
          
          <NavLinks ref={navLinksRef}>
            <NavItem className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <div className="underline"></div>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink to="/projects" className="nav-link">Projects</NavLink>
              <div className="underline"></div>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink to="/service" className="nav-link">Services</NavLink>
              <div className="underline"></div>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
              <div className="underline"></div>
            </NavItem>
            
            <CTAButton as="a" href="mailto:webvitels@gmail.com">
              Work With Us
            </CTAButton>
            
            {/* Theme toggle button removed */}
          </NavLinks>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </MobileMenuButton>
        </NavbarContent>
      </NavbarContainer>
      
      <MobileMenu ref={mobileMenuRef} className={isMobileMenuOpen ? 'open' : ''}>
        <div ref={mobileNavItemsRef}>
          <MobileNavItem>
            <NavLink to="/" className={`mobile-nav-link ${isMobileMenuOpen ? 'show' : ''}`} onClick={toggleMobileMenu}>
              Home
            </NavLink>
          </MobileNavItem>
          <MobileNavItem>
            <NavLink to="/projects" className={`mobile-nav-link ${isMobileMenuOpen ? 'show' : ''}`} onClick={toggleMobileMenu}>
              Projects
            </NavLink>
          </MobileNavItem>
          <MobileNavItem>
            <NavLink to="/service" className={`mobile-nav-link ${isMobileMenuOpen ? 'show' : ''}`} onClick={toggleMobileMenu}>
              Services
            </NavLink>
          </MobileNavItem>
          <MobileNavItem>
            <NavLink to="/contact" className={`mobile-nav-link ${isMobileMenuOpen ? 'show' : ''}`} onClick={toggleMobileMenu}>
              Contact
            </NavLink>
          </MobileNavItem>
        </div>
        
        <MobileCTA 
          ref={mobileCTARef} 
          className={isMobileMenuOpen ? 'show' : ''}
          as="a" 
          href="mailto:webvitels@gmail.com"
        >
          Work With Us
        </MobileCTA>
      </MobileMenu>
    </>
  );
};

export default AnimatedNavbar;
