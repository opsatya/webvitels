import React from 'react';
import styled from 'styled-components';
import { MessageSquare, Phone } from 'lucide-react';

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  font-family: 'Poppins', sans-serif;
  background-color: #fdfdfd;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  h2 {
    color: #374151;
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

const InfoText = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
  color: #6b7280;
`;

const Label = styled.h3`
  font-weight: 500;
  margin: 1.5rem 0 0.5rem;
  color: #1f2937;
`;

const Link = styled.a`
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StickyButtons = styled.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  display: flex;
  gap: 1rem;
  z-index: 1000;
`;

const IconButton = styled.a`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bg};
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 25px;
    height: 25px;
  }
`;

const ContactForm = styled.div`
  h2 {
    color: #374151;
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: #6b7280;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: #f3f4f6;
  border-radius: 8px;
  font-size: 1rem;
  color: #374151;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: #f3f4f6;
  border-radius: 8px;
  font-size: 1rem;
  color: #374151;
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const Subtitle = styled.p`
  color: #9ca3af;
  margin-bottom: 2rem;
`;

const StyledIframe = styled.iframe`
  border: 0;
  border-radius: 12px;
  width: 100%;
  height: 450px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0;
`;
const MapContainer = styled.div`
  width: 100%;
  max-width: 1800px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 1rem auto 0 auto; 
  padding: 0;
  margin-bottom:2rem;
`;


export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
    <Section>
      <Grid>
        <ContactInfo>
          <h2>Contact Us</h2>
          <InfoText>We're here to help! Connect with us through the details below.</InfoText>

          <Label>Location:</Label>
          <InfoText>98/4 Sun City, Charohli, Pimpri Chinchwad, 412105</InfoText>

          <Label>Email Us:</Label>
          <Link href="mailto:webvitels@gmail.com">webvitels@gmail.com</Link>

          <Label>Call Us:</Label>
          <Link href="tel:+7709003064">+91 7709003064</Link>
          <br />
          <Link href="tel:+7020328220">+91 7020328220</Link>
        </ContactInfo>

        <ContactForm>
          <h2>Let's Connect!</h2>
          <h3>We’re just a message away 📩</h3>
          <Subtitle>
            Got questions? We'd love to chat. Drop us a message, and we’ll get back to you within minutes!
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <div>
              <Label as="label" htmlFor="name">Full Name</Label>
              <Input type="text" id="name" placeholder="Enter your name" required />
            </div>

            <div>
              <Label as="label" htmlFor="email">Email Address</Label>
              <Input type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div>
              <Label as="label" htmlFor="message">Your Message</Label>
              <TextArea id="message" placeholder="Write your message here" required />
            </div>

            <SubmitButton type="submit">Send Message</SubmitButton>
          </Form>
        </ContactForm>
      </Grid>

      <StickyButtons>
        <IconButton
          href="https://wa.me/7709003064"
          target="_blank"
          bg="#25D366"
          aria-label="Contact us on WhatsApp"
        >
          <MessageSquare />
        </IconButton>
        <IconButton
          href="tel:+7709003064"
          bg="#3b82f6"
          aria-label="Call us"
        >
          <Phone />
        </IconButton>
      </StickyButtons>
    </Section>
    <MapContainer>
      <StyledIframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3780.957906319463!2d73.92582007483473!3d18.62096298249217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDM3JzE1LjUiTiA3M8KwNTUnNDIuMiJF!5e0!3m2!1sen!2sin!4v1731343889348!5m2!1sen!2sin"
        loading="lazy"
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
      ></StyledIframe>
      </MapContainer>
    </>
  );
}
//<iframe allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>