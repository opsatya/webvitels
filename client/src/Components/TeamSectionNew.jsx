import React, { useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';

const Container = styled.section`
  position: relative;
  padding: 8rem 1rem;
  background: ${({ theme }) => theme.background};
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: 8rem 1.5rem;
  }
`;

const SectionHeader = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 6rem;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  
  span {
    color: #6C63FF;
  }
`;

const SectionDescription = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
`;

const TeamMemberCard = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.cardBackground || 'rgba(255, 255, 255, 0.05)'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.5s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const MemberImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  ${TeamMemberCard}:hover &:before {
    opacity: 1;
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  
  ${TeamMemberCard}:hover & {
    transform: scale(1.1);
  }
`;

const MemberInfo = styled.div`
  padding: 2rem;
  position: relative;
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const MemberPosition = styled.p`
  font-size: 1rem;
  color: #6C63FF;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const MemberBio = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(108, 99, 255, 0.1);
  color: #6C63FF;
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    background: #6C63FF;
    color: white;
    transform: translateY(-3px);
  }
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
    right: -15%;
  }
  
  &.shape2 {
    width: 30vw;
    height: 30vw;
    bottom: 10%;
    left: -10%;
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

const TeamSectionNew = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const teamGridRef = useRef(null);
  const buttonRef = useRef(null);
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
    
    // Team members staggered animation
    const teamCards = teamGridRef.current.children;
    
    gsap.fromTo(
      teamCards,
      {
        opacity: 0,
        y: 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: teamGridRef.current,
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
    
    // Parallax effect on background shapes
    gsap.to(shape1Ref.current, {
      y: "20%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    
    gsap.to(shape2Ref.current, {
      y: "-20%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    
    // Hover animations for team cards
    Array.from(teamCards).forEach(card => {
      const image = card.querySelector('img');
      const info = card.querySelector('.member-info');
      const socialLinks = card.querySelectorAll('.social-link');
      
      card.addEventListener("mouseenter", () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out",
        });
        
        gsap.fromTo(
          socialLinks,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.4,
            ease: "back.out(1.7)",
          }
        );
      });
      
      card.addEventListener("mouseleave", () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        
        gsap.to(socialLinks, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);
  
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Creative Director",
      bio: "Sarah leads our creative team with over 10 years of experience in design and brand strategy.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        dribbble: "#",
      },
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Lead Developer",
      bio: "Michael is a full-stack developer with expertise in React, Node.js, and modern web technologies.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      position: "UX/UI Designer",
      bio: "Emma creates intuitive user experiences and beautiful interfaces that delight users and drive results.",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        dribbble: "#",
      },
    },
    {
      id: 4,
      name: "David Kim",
      position: "Marketing Specialist",
      bio: "David helps our clients grow their online presence through strategic digital marketing campaigns.",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
  ];
  
  return (
    <Container ref={containerRef} id="team-section">
      <BackgroundShape className="shape1" ref={shape1Ref} />
      <BackgroundShape className="shape2" ref={shape2Ref} />
      
      <SectionHeader ref={headerRef}>
        <SectionTitle>Meet Our <span>Team</span></SectionTitle>
        <SectionDescription>
          We're a diverse team of talented individuals passionate about creating exceptional digital experiences.
        </SectionDescription>
      </SectionHeader>
      
      <TeamGrid ref={teamGridRef}>
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id}>
            <MemberImageWrapper>
              <MemberImage src={member.image} alt={member.name} />
            </MemberImageWrapper>
            <MemberInfo className="member-info">
              <MemberName>{member.name}</MemberName>
              <MemberPosition>{member.position}</MemberPosition>
              <MemberBio>{member.bio}</MemberBio>
              <SocialLinks>
                {member.social.twitter && (
                  <SocialLink href={member.social.twitter} className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 00-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 01-1.894-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.89.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.191 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
                    </svg>
                  </SocialLink>
                )}
                {member.social.linkedin && (
                  <SocialLink href={member.social.linkedin} className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </SocialLink>
                )}
                {member.social.dribbble && (
                  <SocialLink href={member.social.dribbble} className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073a42.153 42.153 0 00-.767-1.68c2.31-1 4.165-2.358 5.548-4.082a9.863 9.863 0 012.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68a46.287 46.287 0 00-3.488-5.438A9.894 9.894 0 0112 2.087c2.275 0 4.368.779 6.043 2.072zM7.527 3.166a44.59 44.59 0 013.537 5.381c-2.43.715-5.331 1.082-8.684 1.105a9.931 9.931 0 015.147-6.486zM2.087 12l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48A9.865 9.865 0 012.087 12zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027a39.137 39.137 0 012.043 7.46c-3.349 1.291-6.953.666-9.641-1.433zm11.586.43a41.098 41.098 0 00-1.92-6.897c1.876-.265 3.94-.196 6.199.196a9.923 9.923 0 01-4.279 6.701z" />
                    </svg>
                  </SocialLink>
                )}
                {member.social.github && (
                  <SocialLink href={member.social.github} className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </SocialLink>
                )}
                {member.social.instagram && (
                  <SocialLink href={member.social.instagram} className="social-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </SocialLink>
                )}
              </SocialLinks>
            </MemberInfo>
          </TeamMemberCard>
        ))}
      </TeamGrid>
      
      <ViewAllButton ref={buttonRef}>
        View All Team Members
      </ViewAllButton>
    </Container>
  );
};

export default TeamSectionNew;
