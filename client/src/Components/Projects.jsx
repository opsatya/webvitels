import React from 'react'
import styled from 'styled-components'
import SEOHead from './SEO/SEOHead'

const Container = styled.section`
  position: relative;
  max-width: 100%;
  padding: 8rem 1rem;
  background: ${({ theme }) => theme.background};
  overflow: hidden;
`

const ContentWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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
  opacity: 0.15;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.text};
  z-index: 0;
  white-space: nowrap;
  pointer-events: none;
`;

const SectionTitle = styled.h2`
  position: relative;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.text};
  z-index: 1;
  
  span {
    color: #6C63FF;
  }
  @media (max-width: 768px) {
    font-size: clamp(2rem, 5vw, 3rem);
  }
`;

const Subtitle = styled.p`
  position: relative;
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 600px;
  margin: 1rem auto 0;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  & > div:nth-child(1) {
    grid-column: span 3;
  }
  & > div:nth-child(2) {
    grid-column: span 3;
  }
  & > div:nth-child(3) {
    grid-column: span 2;
  }
  & > div:nth-child(4) {
    grid-column: span 2;
  }
  & > div:nth-child(5) {
    grid-column: span 2;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.text};
  transition: transform 0.3s ease;
  border-radius: 20px;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  transition: transform 0.3s ease, border-radius 0.3s ease;
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #333;
`

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px; /* Consistent border radius for all images */
`

const Projects = () => {
  const projects = [
    { title: "Project 1", image: "./images/Project-image/img1.avif", background: "#FF5F1F", link: "#orangin" },
    { title: "Project 2", image: "./images/Project-image/img2.avif", background: "#000000", scroll: true, link: "#atlas-v" },
    { title: "Project 3", image: "./images/Project-image/img3.avif", link: "#sunset" },
    { title: "Project 4", image: "./images/Project-image/img4.avif", link: "#project4" },
    { title: "Project 5", image: "./images/Project-image/img5.avif", link: "#project5" }
  ]

  return (
    <Container>
      <SEOHead 
        title="Our Portfolio Projects" 
        description="Explore WebVitels' portfolio of innovative web design and development projects that have helped businesses transform their online presence and achieve growth."
        keywords="web design portfolio, web development projects, WebVitels portfolio, responsive website examples, business website designs, ecommerce website examples, digital transformation case studies"
      />
      <ContentWrapper>
        <SectionHeader>
          <HeadingBackground>PROJECTS</HeadingBackground>
          <SectionTitle>Our <span>Featured</span> Projects</SectionTitle>
          <Subtitle>
            Explore our portfolio of innovative digital solutions that have helped businesses transform and grow.
          </Subtitle>
        </SectionHeader>
        
        <Grid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ImageWrapper style={{ background: project.background }}>
              <ProjectImage src={project.image} alt={project.title} />
              {project.scroll && <ScrollIndicator>SCROLL</ScrollIndicator>}
            </ImageWrapper>
          </ProjectCard>
        ))}
      </Grid>
      </ContentWrapper>
    </Container>
  )
}

export default Projects;
