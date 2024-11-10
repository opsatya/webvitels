import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Moon, Sun, Menu, X } from 'lucide-react';

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,30
  
  body {
    margin: 0;
    padding: 0;
    font-family: "Figtree", sans-serif;
    transition: all 0.3s ease;
  }
`;

const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  primary: '#6C63FF',
};

const darkTheme = {
  background: '#1a1a1a',
  text: '#ffffff',
  primary: '#8C7FFF',
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.a`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.8rem;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.background};
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    align-items: center; 
    text-align: center;  
    transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${props => props.theme.primary};
    transition: width 0.5s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.9rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TryFreeButton = styled.button`
  background: linear-gradient(135deg, #6C63FF, #8C7FFF); // Gradient background
  color: #ffffff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 25px; // Rounder corners for a pill shape
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(108, 99, 255, 0.4); // Soft shadow for depth

  &:hover {
    transform: translateY(-3px); // Lift effect on hover
    box-shadow: 0 6px 12px rgba(108, 99, 255, 0.6); // Enhanced shadow on hover
  }

  &:active {
    transform: translateY(1px); // Subtle press effect
    box-shadow: 0 2px 4px rgba(108, 99, 255, 0.3); // Softer shadow when pressed
  }
`;


const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <NavbarContainer>
        <Logo href="/">Web Vitels</Logo>
        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#service">Service</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
        <ButtonGroup>
          <ToggleButton onClick={toggleTheme}>
            {isDarkMode ? <Sun /> : <Moon />}
          </ToggleButton>
          <TryFreeButton>Try free</TryFreeButton>
        </ButtonGroup>
      </NavbarContainer>
    </ThemeProvider>
  );
};

export default Navbar;