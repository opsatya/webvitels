import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 100%;
  padding: 2rem;
  background: white;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 400;
  margin: 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  /* Define brick pattern for larger screens */
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
    &:hover {
    transform: scale(1.05); /* Slight zoom effect on hover */
  }
`

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  transition: border-radius 0.3s ease;
`

const ProjectTitle = styled.a`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  text-decoration: none;
  transition: color 0.5s ease;

  &:hover {
    color: #ff5f1f;
    text-decoration: underline;
  }
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
`

const Projects = () => {
  const projects = [
    { title: "Project 1",   image: "./images/Project-image/img1.avif", background: "#FF5F1F", link: "#orangin" },
    { title: "Project 2",   image: "./images/Project-image/img2.avif", background: "#000000", scroll: true, link: "#atlas-v" },
    { title: "Project 3",    image: "./images/Project-image/img3.avif", link: "#sunset" },
    { title: "Project 4", image: "./images/Project-image/img4.avif", link: "#project4" },
    { title: "Project 5", image: "./images/Project-image/img5.avif", link: "#project5" }
  ]

  return (
    <Container>
      <Header>
        <Title>Our featured projects</Title>
      </Header>
      
      <Grid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ImageWrapper style={{ background: project.background }}>
              <ProjectImage src={project.image} alt={project.title} />
              {project.scroll && <ScrollIndicator>SCROLL</ScrollIndicator>}
            </ImageWrapper>
            <ProjectTitle href={project.link} target="_blank" rel="noopener noreferrer">
              {project.title}
            </ProjectTitle>
          </ProjectCard>
        ))}
      </Grid>
    </Container>
  )
}

export default Projects;
