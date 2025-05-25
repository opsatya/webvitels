import React from 'react';
import LazyImage from './LazyImage';

/**
 * ResponsiveImage Component - Renders responsive images with proper srcSet and sizes
 * 
 * @param {Object} props
 * @param {string} props.src - Base image source URL
 * @param {string} props.alt - Image alt text
 * @param {Object} props.variants - Object containing different image sizes (e.g., { small: '/path/small.webp', medium: '/path/medium.webp' })
 * @param {string} props.sizes - CSS sizes attribute for responsive images
 * @param {string} props.height - Container height
 * @param {boolean} props.priority - If true, loads image immediately without lazy loading
 */
const ResponsiveImage = ({
  src,
  alt,
  variants = {},
  sizes = '100vw',
  height = 'auto',
  priority = false,
  ...props
}) => {
  // Generate srcSet from variants
  const generateSrcSet = () => {
    if (!variants || Object.keys(variants).length === 0) {
      return '';
    }

    // Common breakpoints
    const breakpoints = {
      small: 640,
      medium: 768,
      large: 1024,
      xlarge: 1280,
      xxlarge: 1536
    };

    return Object.entries(variants)
      .map(([key, path]) => {
        const width = breakpoints[key] || parseInt(key, 10);
        if (isNaN(width)) return null;
        return `${path} ${width}w`;
      })
      .filter(Boolean)
      .join(', ');
  };

  const srcSet = generateSrcSet();

  // Choose the most appropriate format based on browser support
  const getImageSrc = () => {
    // If we have a WebP version in variants, use it as the default
    if (variants.webp) {
      return variants.webp;
    }
    // Otherwise use the original src
    return src;
  };

  return (
    <LazyImage
      src={getImageSrc() || src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      height={height}
      priority={priority}
      {...props}
    />
  );
};

export default ResponsiveImage;
