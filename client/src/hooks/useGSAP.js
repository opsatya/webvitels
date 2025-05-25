import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Custom hook for GSAP animations
export const useGSAP = (callback, dependencies = []) => {
  const ctx = useRef(gsap.context(() => {}));

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a new context
    ctx.current = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    });

    // Cleanup function
    return () => {
      ctx.current.revert(); // Reverts all animations created in this context
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all ScrollTriggers
    };
  }, dependencies);

  return ctx.current;
};

// Custom hook for text splitting and animation
export const useSplitText = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    const text = element.textContent;
    element.innerHTML = '';
    
    // Split by character
    for (let i = 0; i < text.length; i++) {
      const char = document.createElement('span');
      char.className = 'char';
      char.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      element.appendChild(char);
    }
    
    // Animate if autoAnimate is true
    if (options.autoAnimate) {
      const chars = element.querySelectorAll('.char');
      
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: options.yOffset || 100,
          rotateX: options.rotateX || -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: options.stagger || 0.02,
          duration: options.duration || 1,
          ease: options.ease || 'power4.out',
          delay: options.delay || 0,
        }
      );
    }
    
    return () => {
      // Cleanup if component unmounts before animation completes
      gsap.killTweensOf(element.querySelectorAll('.char'));
    };
  }, [ref, options]);
};

// Custom hook for scroll animations
export const useScrollAnimation = (ref, animation, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || 'top 80%',
      end: options.end || 'bottom 20%',
      animation: animation(element, gsap),
      toggleActions: options.toggleActions || 'play none none reverse',
      markers: options.markers || false,
    });
    
    return () => {
      trigger.kill();
    };
  }, [ref, animation, options]);
};

// Custom hook for hover animations
export const useHoverAnimation = (ref, enterAnimation, leaveAnimation) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const handleMouseEnter = () => {
      enterAnimation(element, gsap);
    };
    
    const handleMouseLeave = () => {
      leaveAnimation(element, gsap);
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, enterAnimation, leaveAnimation]);
};

export default useGSAP;
