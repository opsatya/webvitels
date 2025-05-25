/**
 * Image Utility Functions for WebVitels
 * 
 * This file contains utility functions for optimizing images
 * across the WebVitels website.
 */

/**
 * Get image dimensions for responsive images
 * @param {string} imagePath - Path to the image
 * @returns {Object} Object containing different image sizes
 */
export const getResponsiveImagePaths = (imagePath) => {
  if (!imagePath) return {};

  // Extract the file extension and base path
  const extension = imagePath.split('.').pop();
  const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));

  // Check if the image is already in the optimized directory
  const isOptimized = imagePath.includes('/optimized/');
  
  // If it's already an optimized image, return the variants
  if (isOptimized) {
    const baseFileName = basePath.substring(0, basePath.lastIndexOf('-'));
    
    return {
      small: `${baseFileName}-small.webp`,
      medium: `${baseFileName}-medium.webp`,
      large: `${baseFileName}-large.webp`,
      original: imagePath
    };
  }
  
  // For non-optimized images, generate paths to optimized versions
  const optimizedBasePath = `/images/optimized/${basePath.split('/').pop()}`;
  
  return {
    small: `${optimizedBasePath}-small.webp`,
    medium: `${optimizedBasePath}-medium.webp`,
    large: `${optimizedBasePath}-large.webp`,
    // Fallback to original image if optimized versions don't exist
    original: imagePath
  };
};

/**
 * Get appropriate image sizes attribute for responsive images
 * @param {string} type - Type of image (hero, card, thumbnail, etc.)
 * @returns {string} CSS sizes attribute
 */
export const getImageSizes = (type) => {
  switch (type) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';
    case 'logo':
      return '(max-width: 640px) 150px, 200px';
    case 'banner':
      return '100vw';
    default:
      return '100vw';
  }
};

/**
 * Generate placeholder color based on image path
 * Used for creating nice placeholders while images load
 * @param {string} imagePath - Path to the image
 * @returns {string} CSS color value
 */
export const getPlaceholderColor = (imagePath) => {
  if (!imagePath) return '#f0f0f0';
  
  // Simple hash function to generate consistent colors for the same image
  const hash = imagePath.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Generate a pastel color based on the hash
  const h = Math.abs(hash) % 360;
  const s = 25 + (Math.abs(hash) % 30); // 25-55% saturation
  const l = 85 + (Math.abs(hash) % 10); // 85-95% lightness
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * Check if WebP format is supported by the browser
 * @returns {boolean} True if WebP is supported
 */
export const isWebPSupported = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  
  return false;
};

/**
 * Get appropriate image format based on browser support
 * @returns {string} Best supported image format
 */
export const getBestImageFormat = () => {
  return isWebPSupported() ? 'webp' : 'jpg';
};
