import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  min-height: 60vh;
  background-color: #ffffff;
  padding: 4rem 1rem;
  font-family: Arial, sans-serif;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`

const Grid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-top:1rem;
  margin-left:1px;
  padding-right: 10rem;
`

const Number = styled.span`
  font-size: 0.875rem;
  font-weight: 300;
`

const Vision = styled.span`
  font-size: 0.875rem;
  text-transform: uppercase;
`

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 4rem;
  }
`

const Paragraph = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  max-width: 100%;

  @media (min-width: 768px) {
    font-size: 1.125rem;
    max-width: 80%;
  }
`

const Link = styled.a`
  font-size: 0.875rem;
  color: #000;
  text-decoration: none;
  border-bottom: 1px solid #000;
  display: inline-block;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-bottom-color: #666;
  }
`

const MissionSection = ()=> {
  return (
    <Section>
      <Grid>
        <TopRow>
          <Number>— 01</Number>
          <Vision>(OUR VISION)</Vision>
        </TopRow>
        <ContentColumn>
          <Heading>Our epiphany began with a simple idea.</Heading>
          <Paragraph>
            Creative freedom that was not bound by a limited classic agency approach. We
            wanted to work directly with clients, form connections, and help founders build
            distinctive identities that resonate with today's consumers.
          </Paragraph>
          <Link href="#">Get to know us better</Link>
        </ContentColumn>
      </Grid>
    </Section>
  )
}
export default MissionSection;