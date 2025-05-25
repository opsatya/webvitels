import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
const Container = styled.section`
  position: relative;
  max-width: 100%;
  padding: 8rem 1rem;
  background: ${({ theme }) => theme.background};
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: 8rem 1.5rem;
  }
`;

const SectionHeading = styled.div`
  position: relative;
  margin-bottom: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  z-index: 2;
`;

const HeadingBackground = styled.span`
  position: absolute;
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 800;
  opacity: 0.5;
  top: -10rem;
  left: 0;
  color: ${({ theme }) => theme.headingBackground};
  z-index: 0;
  white-space: nowrap;
  pointer-events: none;
`;

const Title = styled.h2`
  position: relative;
  font-size: clamp(1rem, 5vw, 2rem);
  font-weight: 600;
  margin: 0;
  margin-top: 3rem;
  color: ${({ theme }) => theme.text};
  z-index: 1;
  
  span {
    color: #6C63FF;
  }
`;

const Subtitle = styled.p`
  position: relative;
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 600px;
  margin-top: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  z-index: 1;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ProjectCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  background: ${({ theme }) => theme.cardBackground || '#f5f5f5'};
  transition: transform 0.5s ease;
  cursor: pointer;
  
  &:nth-child(1) {
    grid-column: span 8;
    grid-row: span 2;
  }
  
  &:nth-child(2) {
    grid-column: span 4;
    grid-row: span 1;
  }
  
  &:nth-child(3) {
    grid-column: span 4;
    grid-row: span 1;
  }
  
  &:nth-child(4) {
    grid-column: span 6;
    grid-row: span 1;
  }
  
  &:nth-child(5) {
    grid-column: span 6;
    grid-row: span 1;
  }
  
  @media (max-width: 768px) {
    &:nth-child(n) {
      grid-column: span 1;
      grid-row: span 1;
      height: 300px;
    }
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  color: white;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
`;

const ProjectCategory = styled.span`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
  transition-delay: 0.1s;
`;

const ViewButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: white;
  color: #333;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-20px) rotate(-45deg);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease, background 0.3s ease;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: #6C63FF;
    color: white;
  }
`;

const ProjectCardWrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &:hover ${ProjectImage} {
    transform: scale(1.1);
  }
  
  &:hover ${ProjectOverlay} {
    opacity: 1;
  }
  
  &:hover ${ProjectTitle}, 
  &:hover ${ProjectCategory} {
    transform: translateY(0);
    opacity: 1;
  }
  
  &:hover ${ViewButton} {
    transform: translateY(0) rotate(0);
    opacity: 1;
  }
`;

const ViewAllButton = styled.button`
  display: block;
  margin: 4rem auto 0;
  padding: 1rem 2.5rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.text};
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
    background: #6C63FF;
    z-index: -1;
    transition: transform 0.5s ease;
    transform: scaleX(0);
    transform-origin: right;
  }
  
  &:hover {
    color: white;
    border-color: #6C63FF;
  }
  
  &:hover:before {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const ProjectsShowcase = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const projectsRef = useRef(null);
  const buttonRef = useRef(null);
  
  // GSAP animations
  useGSAP((gsap, ScrollTrigger) => {
    // Heading animation
    const headingElements = headingRef.current.children;
    
    gsap.fromTo(
      headingElements,
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
          trigger: headingRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
    
    // Projects staggered animation
    const projectCards = projectsRef.current.children;
    
    gsap.fromTo(
      projectCards,
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
          trigger: projectsRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
    
    // Button animation
    gsap.fromTo(
      buttonRef.current,
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
          trigger: buttonRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
    
    // Add hover animations for project cards
    Array.from(projectCards).forEach(card => {
      const image = card.querySelector('img');
      const overlay = card.querySelector('.project-overlay');
      const title = card.querySelector('h3');
      const category = card.querySelector('.project-category');
      const button = card.querySelector('button');
      
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl
        .to(image, {
          scale: 1.1,
          duration: 0.7,
          ease: "power2.out",
        })
        .to(overlay, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }, 0)
        .to(title, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }, 0.1)
        .to(category, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }, 0.2)
        .to(button, {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        }, 0.1);
      
      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  }, []);
  
  const projects = [
    {
      id: 1,
      title: "Immersive E-Commerce Platform",
      category: "Web Development",
      image: "./images/Project-image/img1.avif",
    },
    {
      id: 2,
      title: "Financial Dashboard",
      category: "UI/UX Design",
      image: "./images/Project-image/img2.avif",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "App Development",
      image: "./images/Project-image/img3.avif",
    },
    {
      id: 4,
      title: "Fitness Tracker",
      category: "Web & Mobile",
      image: "./images/Project-image/img4.avif",
    },
    {
      id: 5,
      title: "Educational Platform",
      category: "E-Learning",
      image: "./images/Project-image/img5.avif",
    },
  ];
  
  return (
    <Container ref={containerRef} id="projects-section">
      <SectionHeading ref={headingRef}>
        <HeadingBackground>PROJECTS</HeadingBackground><br />
        <Title>Our <span>Featured</span> Work</Title>
        <Subtitle>
          Explore our portfolio of innovative digital solutions that have helped businesses transform and grow.
        </Subtitle>
      </SectionHeading>
      
      <ProjectsGrid ref={projectsRef}>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectCardWrapper>
              <ProjectImage src={project.image} alt={project.title} />
              <ProjectOverlay className="project-overlay">
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectCategory className="project-category">{project.category}</ProjectCategory>
                <ViewButton>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </ViewButton>
              </ProjectOverlay>
            </ProjectCardWrapper>
          </ProjectCard>
        ))}
      </ProjectsGrid>
      
      <ViewAllButton ref={buttonRef}>
        View All Projects
      </ViewAllButton>
    </Container>
  );
};

export default ProjectsShowcase;
