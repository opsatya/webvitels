import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  overflow: hidden;
  background-color: ${props => props.placeholderColor || '#f0f0f0'};
  border-radius: ${props => props.borderRadius || '0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  object-position: ${props => props.objectPosition || 'center'};
  opacity: ${props => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color || '#f0f0f0'};
  opacity: ${props => (props.isLoaded ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

/**
 * LazyImage Component - Lazy loads images for better performance
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {string} props.srcSet - Optional srcSet for responsive images
 * @param {string} props.sizes - Optional sizes attribute for responsive images
 * @param {string} props.height - Container height (e.g., '300px', '100%')
 * @param {string} props.objectFit - CSS object-fit property
 * @param {string} props.objectPosition - CSS object-position property
 * @param {string} props.placeholderColor - Background color for placeholder
 * @param {string} props.borderRadius - Border radius for the container
 * @param {boolean} props.priority - If true, loads image immediately without lazy loading
 * @param {React.ReactNode} props.placeholderContent - Optional content to show while loading
 */
const LazyImage = ({
  src,
  alt,
  srcSet,
  sizes,
  height,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholderColor = '#f0f0f0',
  borderRadius = '0',
  priority = false,
  placeholderContent,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Handle image load event
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading when image is 200px from viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, [priority]);

  return (
    <ImageContainer
      ref={containerRef}
      height={height}
      placeholderColor={placeholderColor}
      borderRadius={borderRadius}
      {...props}
    >
      {isInView && (
        <>
          <StyledImage
            ref={imgRef}
            src={src}
            alt={alt}
            srcSet={srcSet}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleImageLoaded}
            isLoaded={isLoaded}
            objectFit={objectFit}
            objectPosition={objectPosition}
            decoding="async"
          />
          <Placeholder 
            isLoaded={isLoaded} 
            color={placeholderColor}
          >
            {placeholderContent}
          </Placeholder>
        </>
      )}
    </ImageContainer>
  );
};

export default LazyImage;
