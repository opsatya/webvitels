'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: #000000;
  color: #ffffff;
  padding: 4rem 2rem 1rem 2rem;
  font-family: Inter;
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 3rem;
`

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
`

const FooterLink = styled(motion.a)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  
  &:hover {
    opacity: 0.7;
  }
`

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.75rem;
  opacity: 0.7;
`

const Logo = styled(motion.h1)`
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  padding-left: 12.9rem;  
  padding-right: 23rem;

   @media (max-width: 768px) {
  
    flex-direction: column;
    align-items: center;
  }
`

export default function Footer() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <FooterContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Logo>
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            WEB
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          VITELS®   
          </motion.span>
        </Logo>
        
        <FooterContent>
          <FooterSection
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>[CONTACT]</SectionTitle>
            <FooterLink 
              href="mailto:webvitels@gmail.com"
              variants={linkVariants}
            >
              Email webvitels@gmail.com
            </FooterLink>
            <FooterLink 
              href="#"
              variants={linkVariants}
            >
              call on: 7709003064,7020328220
            </FooterLink>
          </FooterSection>

          <FooterSection
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>[SITEMAP]</SectionTitle>
            <FooterLink href="#" variants={linkVariants}>Work</FooterLink>
            <FooterLink href="#" variants={linkVariants}>Services</FooterLink>
            <FooterLink href="#" variants={linkVariants}>About</FooterLink>
          </FooterSection>

          <FooterSection
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <SectionTitle>[SOCIALS]</SectionTitle>
            <FooterLink href="#" variants={linkVariants}>LinkedIn</FooterLink>
            <FooterLink href="#" variants={linkVariants}>Instagram</FooterLink>
            <FooterLink href="#" variants={linkVariants}>Twitter/X</FooterLink>
          </FooterSection>
        </FooterContent>

        <BottomBar>
          <span>Copyright © 2024 Web Vitels</span>
          <span>Proudly built by webvitels®</span>
        </BottomBar>
      </motion.div>
    </FooterContainer>
  )
}