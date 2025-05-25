import React from 'react';
import ServicesSection from './ServicesSection';
import TeamSectionNew from './TeamSectionNew';
import SEOHead from './SEO/SEOHead';

const Service = () => {
  return (
    <>
      <SEOHead 
        title="Professional Web Services" 
        description="WebVitels offers comprehensive web design, development, and SEO services to help your business establish a powerful online presence and drive growth."
        keywords="web design services, SEO services, web development, responsive website design, ecommerce solutions, digital marketing, website optimization, mobile-friendly websites"
        ogType="service"
      />
      <ServicesSection />
      <TeamSectionNew />
    </>
  );
};

export default Service;
