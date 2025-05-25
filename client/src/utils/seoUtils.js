/**
 * SEO Utility Functions for WebVitels
 * 
 * This file contains utility functions for implementing SEO best practices
 * across the WebVitels website.
 */

/**
 * Generate structured data for the organization
 * @returns {Object} Organization structured data
 */
export const getOrganizationData = () => {
  return {
    '@type': 'ProfessionalService',
    'name': 'WebVitels',
    'url': 'https://webvitels.com',
    'logo': 'https://webvitels.com/images/logo.png',
    'description': 'WebVitels is a professional web design and SEO agency helping businesses grow their online presence with custom websites and digital marketing strategies.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '98/4 Sun City, Charohli',
      'addressLocality': 'Pimpri Chinchwad',
      'postalCode': '412105',
      'addressCountry': 'IN'
    },
    'telephone': '+917709003064',
    'email': 'webvitels@gmail.com',
    'sameAs': [
      'https://www.facebook.com/webvitels',
      'https://www.twitter.com/webvitels',
      'https://www.linkedin.com/company/webvitels',
      'https://www.instagram.com/webvitels'
    ],
    'priceRange': '$$$'
  };
};

/**
 * Generate structured data for a web page
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} url - Page URL
 * @param {string} imageUrl - Main image URL
 * @returns {Object} WebPage structured data
 */
export const getWebPageData = (title, description, url, imageUrl = 'https://webvitels.com/images/og-image.png') => {
  return {
    '@type': 'WebPage',
    'name': title,
    'description': description,
    'url': url,
    'image': imageUrl,
    'inLanguage': 'en-US',
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'WebVitels',
      'url': 'https://webvitels.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'WebVitels',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://webvitels.com/images/logo.png'
      }
    }
  };
};

/**
 * Generate structured data for a service
 * @param {string} name - Service name
 * @param {string} description - Service description
 * @param {string} url - Service page URL
 * @param {string} imageUrl - Service image URL
 * @param {string} price - Service price (optional)
 * @returns {Object} Service structured data
 */
export const getServiceData = (name, description, url, imageUrl, price = '') => {
  return {
    '@type': 'Service',
    'name': name,
    'description': description,
    'url': url,
    'image': imageUrl,
    'provider': {
      '@type': 'Organization',
      'name': 'WebVitels',
      'url': 'https://webvitels.com'
    },
    ...(price && { 'offers': {
      '@type': 'Offer',
      'price': price,
      'priceCurrency': 'USD'
    }})
  };
};

/**
 * Generate structured data for FAQ page
 * @param {Array} faqs - Array of FAQ objects with question and answer properties
 * @returns {Object} FAQPage structured data
 */
export const getFAQPageData = (faqs) => {
  return {
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
};

/**
 * Generate breadcrumb structured data
 * @param {Array} items - Array of breadcrumb items with name and url properties
 * @returns {Object} BreadcrumbList structured data
 */
export const getBreadcrumbData = (items) => {
  return {
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
};

/**
 * Generate canonical URL
 * @param {string} path - Current path
 * @returns {string} Canonical URL
 */
export const getCanonicalUrl = (path) => {
  return `https://webvitels.com${path}`;
};

/**
 * Generate meta description based on page content
 * @param {string} pageType - Type of page (home, services, projects, etc.)
 * @returns {string} Meta description
 */
export const getMetaDescription = (pageType) => {
  const descriptions = {
    home: "WebVitels delivers stunning website design, powerful SEO strategies, and digital marketing solutions that drive real business growth. Get a free consultation today!",
    services: "WebVitels offers comprehensive web design, development, and SEO services to help your business establish a powerful online presence and drive growth.",
    projects: "Explore WebVitels' portfolio of innovative web design and development projects that have helped businesses transform their online presence and achieve growth.",
    contact: "Get in touch with WebVitels for your web design, development, and SEO needs. Our team of experts is ready to help transform your online presence.",
    about: "WebVitels is a team of passionate web designers, developers, and SEO experts dedicated to helping businesses succeed online with innovative digital solutions."
  };
  
  return descriptions[pageType] || descriptions.home;
};
