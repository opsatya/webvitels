import React from 'react';
import StructuredData from './StructuredData';

/**
 * ServiceSchema Component - Adds structured data for services
 * 
 * @param {Object} props
 * @param {string} props.name - Service name
 * @param {string} props.description - Service description
 * @param {string} props.url - Service page URL
 * @param {string} props.image - Service image URL
 * @param {string} props.price - Service price (optional)
 * @param {string} props.currency - Price currency (default: USD)
 */
const ServiceSchema = ({
  name,
  description,
  url,
  image,
  price,
  currency = 'USD'
}) => {
  const serviceData = {
    '@type': 'Service',
    'name': name,
    'description': description,
    'url': url,
    'image': image,
    'provider': {
      '@type': 'Organization',
      'name': 'WebVitels',
      'url': 'https://webvitels.com'
    }
  };

  // Add price information if available
  if (price) {
    serviceData.offers = {
      '@type': 'Offer',
      'price': price,
      'priceCurrency': currency
    };
  }

  return <StructuredData type="Service" data={serviceData} />;
};

export default ServiceSchema;
