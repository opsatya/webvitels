import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.gradient || 'linear-gradient(45deg, rgba(108, 99, 255, 0.05), rgba(140, 127, 255, 0.05))'};
  opacity: ${props => props.opacity || 0.5};
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.background || 'rgba(108, 99, 255, 0.1)'};
  filter: blur(${props => props.blur || '0px'});
  opacity: ${props => props.opacity || 0.5};
`;

class Particle {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.x = options.x || Math.random() * canvas.width;
    this.y = options.y || Math.random() * canvas.height;
    this.size = options.size || Math.random() * 3 + 1;
    this.speedX = options.speedX || (Math.random() * 1) - 0.5;
    this.speedY = options.speedY || (Math.random() * 1) - 0.5;
    this.color = options.color || '#6C63FF';
    this.opacity = options.opacity || (Math.random() * 0.5) + 0.1;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x > this.canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    
    if (this.y > this.canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }
  
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fill();
  }
}

const AnimatedBackground = ({ 
  type = 'particles', 
  particleCount = 50, 
  particleColor = '#6C63FF',
  gradient = 'linear-gradient(45deg, rgba(108, 99, 255, 0.05), rgba(140, 127, 255, 0.05))',
  gradientOpacity = 0.5,
  shapes = []
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  
  // Initialize particles
  useEffect(() => {
    if (type !== 'particles' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
      
      // Reinitialize particles on resize
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas, {
          color: particleColor,
        }));
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections between particles
      drawConnections();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particleColor;
            ctx.globalAlpha = 0.2 * (1 - distance / 100);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [type, particleCount, particleColor]);
  
  // Animate floating shapes
  useEffect(() => {
    if (type !== 'shapes' || shapes.length === 0 || !containerRef.current) return;
    
    const shapeElements = containerRef.current.querySelectorAll('.floating-shape');
    
    shapeElements.forEach((shape, index) => {
      // Random duration between 15-30 seconds
      const duration = 15 + Math.random() * 15;
      
      // Create random movement animation
      gsap.to(shape, {
        x: `random(-20, 20, 5)%`,
        y: `random(-20, 20, 5)%`,
        rotation: `random(-15, 15, 5)`,
        duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
      });
    });
  }, [type, shapes]);
  
  return (
    <BackgroundContainer ref={containerRef}>
      {type === 'particles' && (
        <ParticleCanvas ref={canvasRef} />
      )}
      
      {type === 'shapes' && shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          className="floating-shape"
          style={{
            width: shape.size || '20vw',
            height: shape.size || '20vw',
            top: shape.top || '10%',
            left: shape.left || '10%',
            zIndex: shape.zIndex || 0,
          }}
          background={shape.background || 'rgba(108, 99, 255, 0.1)'}
          blur={shape.blur || '0px'}
          opacity={shape.opacity || 0.5}
        />
      ))}
      
      <GradientOverlay gradient={gradient} opacity={gradientOpacity} />
    </BackgroundContainer>
  );
};

export default AnimatedBackground;
