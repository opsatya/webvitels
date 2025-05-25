import { useEffect } from 'react';

/**
 * StructuredData Component - Injects structured data JSON-LD into the document head
 * 
 * @param {Object} props
 * @param {string} props.type - Schema.org type (e.g., 'WebPage', 'Article', 'FAQPage')
 * @param {Object} props.data - The structured data object
 */
const StructuredData = ({ type, data }) => {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `structured-data-${type.toLowerCase()}`;
    
    // Prepare the structured data object
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };
    
    // Set the script content
    script.textContent = JSON.stringify(structuredData);
    
    // Remove any existing script with the same ID
    const existingScript = document.getElementById(`structured-data-${type.toLowerCase()}`);
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Cleanup on component unmount
    return () => {
      const scriptToRemove = document.getElementById(`structured-data-${type.toLowerCase()}`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);
  
  // This component doesn't render anything visible
  return null;
};

export default StructuredData;
