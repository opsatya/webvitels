import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Text animation for hero section
export const animateHeroText = (element, delay = 0) => {
  const chars = element.querySelectorAll('.char');
  
  gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 100,
      rotateX: -90,
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.02,
      duration: 1,
      ease: "power4.out",
      delay,
    }
  );
};

// Scroll-triggered animations
export const createScrollAnimation = (element, animation) => {
  return ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    end: "bottom 20%",
    animation,
    toggleActions: "play none none reverse",
  });
};

// Fade-in animation for sections
export const fadeInAnimation = (element) => {
  const animation = gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
  );
  
  return createScrollAnimation(element, animation);
};

// Staggered fade-in for multiple elements
export const staggeredFadeIn = (elements, staggerAmount = 0.1) => {
  const animation = gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      stagger: staggerAmount, 
      duration: 0.6, 
      ease: "power2.out" 
    }
  );
  
  return createScrollAnimation(elements[0].parentElement, animation);
};

// Hover animation for buttons and cards
export const addHoverAnimation = (element) => {
  const hoverTl = gsap.timeline({ paused: true });
  
  hoverTl.to(element, {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out",
  });
  
  element.addEventListener("mouseenter", () => hoverTl.play());
  element.addEventListener("mouseleave", () => hoverTl.reverse());
  
  return hoverTl;
};

// Animated underline for navigation
export const animateNavUnderline = (element) => {
  const underline = element.querySelector('.underline');
  
  if (!underline) return;
  
  const hoverTl = gsap.timeline({ paused: true });
  
  hoverTl.fromTo(
    underline,
    { width: "0%" },
    { width: "100%", duration: 0.3, ease: "power2.inOut" }
  );
  
  element.addEventListener("mouseenter", () => hoverTl.play());
  element.addEventListener("mouseleave", () => hoverTl.reverse());
  
  return hoverTl;
};

// Parallax effect for background elements
export const createParallaxEffect = (element, strength = 0.1) => {
  gsap.to(element, {
    y: () => -strength * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: true,
    },
  });
};

// Split text utility function
export const splitText = (element) => {
  const text = element.textContent;
  element.textContent = "";
  
  // Split by character
  for (let i = 0; i < text.length; i++) {
    const char = document.createElement("span");
    char.className = "char";
    char.textContent = text[i] === " " ? "\u00A0" : text[i];
    element.appendChild(char);
  }
  
  return element.querySelectorAll('.char');
};

// Animated counter for statistics
export const animateCounter = (element, endValue, duration = 2, delay = 0) => {
  const startValue = 0;
  
  gsap.fromTo(
    element,
    { innerText: startValue },
    {
      innerText: endValue,
      duration,
      delay,
      ease: "power2.out",
      snap: { innerText: 1 },
      onUpdate: function() {
        element.innerText = Math.ceil(this.targets()[0].innerText);
      }
    }
  );
};

// Morphing animation for shapes
export const morphShape = (element, endPath, duration = 1) => {
  gsap.to(element, {
    attr: { d: endPath },
    duration,
    ease: "power2.inOut",
  });
};

// Animated gradient background
export const animateGradient = (element, colors, duration = 5) => {
  const tl = gsap.timeline({ repeat: -1 });
  
  colors.forEach((color, index) => {
    const nextColor = colors[(index + 1) % colors.length];
    
    tl.to(element, {
      background: `linear-gradient(45deg, ${color} 0%, ${nextColor} 100%)`,
      duration,
      ease: "none",
    });
  });
  
  return tl;
};
