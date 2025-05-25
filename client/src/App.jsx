import { useState, useEffect } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import './App.css';
import StructuredData from './Components/SEO/StructuredData';
import { getOrganizationData } from './utils/seoUtils';

// Original Components
import Error from './Components/Error';
import Service from './Components/Service.jsx';
import Contact from './Components/Contact';
import Projects from './Components/Projects';

// New Animated Components
import AnimatedNavbar from './Components/HomePage/AnimatedNavbar';
import HeroSection from './Components/HomePage/HeroSection';
import ProjectsShowcase from './Components/ProjectsShowcase';
import ServicesSection from './Components/ServicesSection';
import TestimonialsSection from './Components/TestimonialsSection';
import TeamSectionNew from './Components/TeamSectionNew';
import AnimatedFooter from './Components/HomePage/AnimatedFooter';
import AnimatedBackground from './Components/HomePage/AnimatedBackground';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// Page transition component
const PageTransition = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Page transition animation
    const timeline = gsap.timeline();
    
    timeline.to('.page-transition-overlay', {
      duration: 0.5,
      scaleY: 1,
      transformOrigin: 'top',
      ease: 'power3.inOut',
    });
    
    timeline.to('.page-transition-overlay', {
      duration: 0.5,
      scaleY: 0,
      transformOrigin: 'bottom',
      ease: 'power3.inOut',
      delay: 0.1,
    });
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="page-container">
      <div className="page-transition-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#6C63FF',
        transform: 'scaleY(0)',
        zIndex: 9999,
      }}></div>
      {children}
    </div>
  );
};

// Main App component
function App() {
  // Preloader state
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Preloader animation
  useEffect(() => {
    if (loading) {
      // Animate loading text
      gsap.to('.loading-text .char', {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      });
      
      // Animate loading bar
      gsap.to('.loading-bar-fill', {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
      });
    } else {
      // Animate preloader out
      gsap.to('.preloader', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set('.preloader', { display: 'none' });
        },
      });
    }
  }, [loading]);
  
  // Split loading text into characters for animation
  useEffect(() => {
    const loadingText = document.querySelector('.loading-text');
    if (!loadingText) return;
    
    const text = loadingText.textContent;
    loadingText.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = document.createElement('span');
      char.className = 'char';
      char.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      char.style.display = 'inline-block';
      char.style.transform = 'translateY(20px)';
      char.style.opacity = '0';
      loadingText.appendChild(char);
    }
  }, []);
  
  // Background shapes for floating animation
  const backgroundShapes = [
    { size: '30vw', top: '-10%', left: '70%', background: 'rgba(108, 99, 255, 0.05)', blur: '50px', opacity: 0.5 },
    { size: '20vw', top: '60%', left: '-5%', background: 'rgba(140, 127, 255, 0.05)', blur: '30px', opacity: 0.4 },
    { size: '15vw', top: '30%', left: '80%', background: 'rgba(108, 99, 255, 0.05)', blur: '20px', opacity: 0.3 },
  ];

  return (
    <ThemeProvider>
      <GlobalStyles />
      <StructuredData type="Organization" data={getOrganizationData()} />
      
      {/* Preloader */}
      <div className="preloader" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}>
        <h1 className="loading-text" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#fff',
          marginBottom: '2rem',
        }}>
          Web Vitels
        </h1>
        <div className="loading-bar" style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div className="loading-bar-fill" style={{
            height: '100%',
            width: '0%',
            background: '#6C63FF',
          }}></div>
        </div>
      </div>
      
      <BrowserRouter>
        <AnimatedNavbar />
        
        <PageTransition>
          <Routes>
            {/* Home page route with new animated components */}
            <Route 
              path="/" 
              element={
                <>
                  <AnimatedBackground type="shapes" shapes={backgroundShapes} />
                  <HeroSection />
                  <ProjectsShowcase />
                  <ServicesSection />
                  <TestimonialsSection />
                </>
              } 
            />

            <Route path="/projects" element={<Projects />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="*" element={<Error />} />
          </Routes>
        </PageTransition>

        <AnimatedFooter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
