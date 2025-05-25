import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MessageSquare, Phone } from 'lucide-react';
import emailjs from 'emailjs-com';
import SEOHead from './SEO/SEOHead';

const Section = styled.section`
  position: relative;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 8rem 1rem;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SectionHeader = styled.div`
  position: relative;
  text-align: center;
  margin-bottom: 6rem;
  z-index: 1;
`;

const HeadingBackground = styled.span`
  position: absolute;
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 800;
  opacity: 0.05;
  top: -5rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.text};
  z-index: 0;
  white-space: nowrap;
  pointer-events: none;
`;

const SectionTitle = styled.h2`
  position: relative;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  z-index: 1;
  
  span {
    color: #6C63FF;
  }
`;

const Subtitle = styled.p`
  position: relative;
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 700px;
  margin: 0 auto 3rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  z-index: 1;
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

const InfoText = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
`;

const Label = styled.h3`
  font-weight: 500;
  margin: 1.5rem 0 0.5rem;
`;

const Link = styled.a`
  text-decoration: blue;

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
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
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
  background-color: ${props => props.theme.mode === 'dark' ? '#3a3b3c' : '#f3f4f6'};
  border-radius: 8px;
  font-size: 1rem;

  &::placeholder {
    color: ${props => props.theme.mode === 'dark' ? '#e0e0e0' : '#9ca3af'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: ${props => props.theme.mode === 'dark' ? '#3a3b3c' : '#f3f4f6'};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &::placeholder {
    color: ${props => props.theme.mode === 'dark' ? '#e0e0e0' : '#9ca3af'};
  }
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);
  
  // Initialize EmailJS
  useEffect(() => {
    // Replace with your actual EmailJS User ID
    emailjs.init("f1TkHVnQM3XthW7Dv");
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
      to_email: 'webvitels@gmail.com'
    };
    
    // Send email using EmailJS
    // Replace with your actual service ID and template ID
    emailjs.send('service_yh4u44y', 'template_fbkws9m', templateParams)
      .then((response) => {
        console.log('Email sent successfully:', response);
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('success');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <SEOHead 
        title="Contact Us" 
        description="Get in touch with WebVitels for your web design, development, and SEO needs. Our team of experts is ready to help transform your online presence."
        keywords="contact WebVitels, web design consultation, SEO services inquiry, website development quote, digital marketing help, web agency contact"
        ogType="website"
      />
      <Section>
      <SectionHeader>
        <HeadingBackground>CONTACT</HeadingBackground>
        <SectionTitle>Get In <span>Touch</span></SectionTitle>
        <Subtitle>
          We're here to help! Connect with us through the details below or send us a message directly.
        </Subtitle>
      </SectionHeader>
      
      <Grid>
        <ContactInfo>
          <h2>Contact Details</h2>
          <InfoText>Reach out to us through any of these channels.</InfoText>

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
          <h3>We're just a message away 📩</h3>
          <Subtitle>
            Got questions? We'd love to chat. Drop us a message, and we'll get back to you within minutes!
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <div>
              <Label as="label" htmlFor="name">Full Name</Label>
              <Input 
                type="text" 
                id="name" 
                placeholder="Enter your name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label as="label" htmlFor="email">Email Address</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label as="label" htmlFor="message">Your Message</Label>
              <TextArea 
                id="message" 
                placeholder="Write your message here" 
                required 
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {submitStatus === 'success' && (
              <div style={{ color: '#4CAF50', marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: '4px' }}>
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div style={{ color: '#f44336', marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(244, 67, 54, 0.1)', borderRadius: '4px' }}>
                Sorry, there was a problem sending your message. Please try again or email us directly at webvitels@gmail.com.
              </div>
            )}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
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