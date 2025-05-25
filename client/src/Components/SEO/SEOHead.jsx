import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEOHead Component - Dynamically updates document head for SEO
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (default: website)
 * @param {string} props.twitterCard - Twitter card type (default: summary_large_image)
 */
const SEOHead = ({
  title,
  description,
  keywords,
  ogImage = 'https://webvitels.com/images/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}) => {
  const location = useLocation();
  const currentUrl = `https://webvitels.com${location.pathname}`;
  
  useEffect(() => {
    // Update document title
    document.title = title ? `${title} | WebVitels` : 'WebVitels - Professional Web Design & SEO Services';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else if (keywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', keywords);
      document.head.appendChild(metaKeywords);
    }
    
    // Update canonical URL
    let canonicalUrl = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      canonicalUrl.setAttribute('href', currentUrl);
    } else {
      canonicalUrl = document.createElement('link');
      canonicalUrl.setAttribute('rel', 'canonical');
      canonicalUrl.setAttribute('href', currentUrl);
      document.head.appendChild(canonicalUrl);
    }
    
    // Update Open Graph meta tags
    updateMetaTag('og:title', title ? `${title} | WebVitels` : 'WebVitels - Professional Web Design & SEO Services');
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', ogType);
    
    // Update Twitter Card meta tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title ? `${title} | WebVitels` : 'WebVitels - Professional Web Design & SEO Services');
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Clean up function
    return () => {
      // No cleanup needed as we're just updating existing tags
    };
  }, [title, description, keywords, ogImage, ogType, twitterCard, currentUrl]);
  
  // Helper function to update meta tags
  const updateMetaTag = (property, content) => {
    if (!content) return;
    
    let tag = document.querySelector(`meta[property="${property}"]`) || 
              document.querySelector(`meta[name="${property}"]`);
              
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      tag = document.createElement('meta');
      if (property.startsWith('og:')) {
        tag.setAttribute('property', property);
      } else {
        tag.setAttribute('name', property);
      }
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    }
  };
  
  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
