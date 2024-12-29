import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const Title = styled.h2`
  color: #FFB800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const MemberCard = styled.div`
  text-align: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1);
  }

  &:active {
    transform: scale(1.05); /* Reduce the scale-up effect on click */
    transition: transform 0.1s ease; /* Quicker transition for click */
  }
`


const MemberInfo = styled.div`
  padding: 1rem;
`

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const Role = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

const teamMembers = [
  {
    id: 1,
    name: 'Zidan Zius',
    role: 'CEO (Chief Executive Officer)',
    image: './images/Project-image/teamlead1.jpg',
    background: '#FFE5D4'
  },
  {
    id: 2,
    name: 'Zimbara Nau',
    role: 'CTO (Chief Technology Officer)',
    image: './images/Project-image/teamlead1.jpg',
    background: '#E5F0E5'
  },
  {
    id: 3,
    name: 'Syilina Angge',
    role: 'CFO (Chief Financial Officer)',
    image: './images/Project-image/teamlead1.jpg',
    background: '#FFE5E5'
  }
]

const TeamSection = () => {
  return (
    <Section>
      <Title>OUR TEAM</Title>
      <Heading>Get to know us closer</Heading>
      <TeamGrid>
        {teamMembers.map((member) => (
          <MemberCard key={member.id}>
            <Link to={`/team/${member.id}`}>
              <ImageWrapper>
                <Image
                  src={member.image}
                  alt={member.name}
                  style={{ background: member.background }}
                />
              </ImageWrapper>
            </Link>
            <MemberInfo>
              <Name>{member.name}</Name>
              <Role>{member.role}</Role>
              <SocialLinks>
                <a href="#" aria-label={`${member.name}'s Instagram`}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label={`${member.name}'s Twitter`}>
                  <i className="fab fa-twitter"></i>
                </a>
              </SocialLinks>
            </MemberInfo>
          </MemberCard>
        ))}
      </TeamGrid>
    </Section>
  )
}

export default TeamSection
