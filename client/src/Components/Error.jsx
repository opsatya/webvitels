import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Error = () => {
  const intervalRef = useRef(null);
  const [text, setText] = useState("404 (Page Not Found :)");

  const TARGET_TEXT = "404 (Page Not Found :)";
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;
  const CHARS = "!@#$%^&*():{};|,.<>/?";

  useEffect(() => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);

    return () => clearInterval(intervalRef.current); // Cleanup on component unmount
  }, []);

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setText(TARGET_TEXT);
  };

  return (
    <Container>
      <ErrorText>{text}</ErrorText>
      <BackToHomeButton href="/">
        <ArrowLeft size={20} />
        Back to Home
      </BackToHomeButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #f0f0f0;
  font-family: monospace;
  gap: 2rem;
`;

const ErrorText = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  color: #ff4757;
  text-align: center;
`;

const BackToHomeButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: #f0f0f0;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.2rem;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #8c7fff;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default Error;
