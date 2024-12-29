import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  margin-bottom: 2rem;

  &:hover {
    color: #000;
  }
`

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Role = styled.p`
  color: #666;
  font-size: 1.125rem;
`

const Bio = styled.p`
  line-height: 1.6;
  color: #333;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`

const teamMembers = [
  {
    id: 1,
    name: 'Zidan Zius',
    role: 'CEO (Chief Executive Officer)',
    image: '/images/Project-image/teamlead1.jpg',
    background: '#FFE5D4',
    bio: 'Zidan brings over 15 years of experience in business leadership and strategic planning. His vision and dedication have been instrumental in our company\'s growth and success.'
  },
  {
    id: 2,
    name: 'Zimbara Nau',
    role: 'CTO (Chief Technology Officer)',
    image: '/images/Project-image/teamlead1.jpg',
    background: '#E5F0E5',
    bio: 'As our CTO, Zimbara leads our technical strategy and innovation initiatives. Her expertise in emerging technologies keeps us at the forefront of digital transformation.'
  },
  {
    id: 3,
    name: 'Syilina Angge',
    role: 'CFO (Chief Financial Officer)',
    image: '/images/Project-image/teamlead1.jpg',
    background: '#FFE5E5',
    bio: 'Syilina oversees our financial operations and strategic planning. Her strong financial acumen and strategic thinking help drive our sustainable growth.'
  }
]

export default function TeamMemberPage() {
  const { id } = useParams()
  const member = teamMembers.find(m => m.id === parseInt(id))

  if (!member) {
    return <div>Member not found</div>
  }

  return (
    <Container>
      <BackButton to="/about">
        <i className="fas fa-arrow-left"></i>
        Back to Team
      </BackButton>
      
      <ProfileSection>
        <ImageWrapper>
          <Image
            src={member.image}
            alt={member.name}
            style={{ background: member.background }}
          />
        </ImageWrapper>
        
        <Content>
          <div>
            <Name>{member.name}</Name>
            <Role>{member.role}</Role>
          </div>
          
          <Bio>{member.bio}</Bio>
          
          <SocialLinks>
            <a href="#" aria-label={`${member.name}'s Instagram`}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label={`${member.name}'s Twitter`}>
              <i className="fab fa-twitter"></i>
            </a>
          </SocialLinks>
        </Content>
      </ProfileSection>
    </Container>
  )
}

