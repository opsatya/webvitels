import React , { useState }from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme'

const HomeSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.accent};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SectionWrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 3rem 6rem;
  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 3rem 10rem;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  padding-right: 4rem;
  h1 {
    font-size: 3rem;
    font-weight: 550;
    line-height: 1.2;
    color: #333;
    @media (min-width: 768px) {
      font-size: 4rem;
    }
    @media (min-width: 1024px) {
      font-size: 5rem;
    }
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  @media (min-width: 1024px) {
    width: 25%;
    margin-top: 0;
    transform: rotate(-90deg);
    p {
      font-size: 1rem;
    }
  }
`;

const StatsItem = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
  }
  p {
    font-size: 1rem;
    color: #777;
  }
`;

const Section1 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
};
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    <SectionWrapper>
      <TextWrapper>
        <h1>
          THE <span>DIGITAL</span> AGENCY DELIVERING FINEST SOLUTIONS
        </h1>
      </TextWrapper>
      <StatsWrapper>
        <StatsItem>
          <h1>260</h1>
          <p>PROJECTS COMPLETED</p>
        </StatsItem>
        <StatsItem>
          <h1>4 +</h1>
          <p>YEARS EXPERIENCE</p>
        </StatsItem>
      </StatsWrapper>
    </SectionWrapper>
    </ThemeProvider>
  );
};

export default Section1;
