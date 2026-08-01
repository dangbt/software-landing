"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Text split animation hook
export function useSplitText(
  ref: RefObject<HTMLElement | null>,
  options: {
    trigger?: boolean;
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    type?: "chars" | "words" | "lines";
  } = {}
) {
  const {
    trigger = true,
    delay = 0,
    stagger = 0.03,
    duration = 0.8,
    ease = "power3.out",
    type = "chars",
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const text = element.textContent || "";
    
    let items: string[] = [];
    
    if (type === "chars") {
      items = text.split("");
    } else if (type === "words") {
      items = text.split(" ");
    } else {
      items = text.split("\n");
    }

    // Create spans for each item
    element.innerHTML = items
      .map(
        (item, i) =>
          `<span class="split-item" style="display:inline-block;overflow:hidden;"><span class="split-inner" style="display:inline-block;">${item}${type === "words" && i < items.length - 1 ? "&nbsp;" : ""}</span></span>`
      )
      .join("");

    const innerSpans = element.querySelectorAll(".split-inner");

    gsap.set(innerSpans, { y: "100%", opacity: 0 });

    const animationConfig = {
      y: "0%",
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
    };

    if (trigger) {
      gsap.to(innerSpans, {
        ...animationConfig,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(innerSpans, animationConfig);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [ref, trigger, delay, stagger, duration, ease, type]);
}

// Blur reveal animation hook
export function useBlurReveal(
  ref: RefObject<HTMLElement | null>,
  options: {
    delay?: number;
    duration?: number;
    trigger?: boolean;
  } = {}
) {
  const { delay = 0, duration = 1.2, trigger = true } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.set(element, {
      filter: "blur(20px)",
      opacity: 0,
      y: 30,
    });

    const animationConfig = {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      duration,
      ease: "power3.out",
      delay,
    };

    if (trigger) {
      gsap.to(element, {
        ...animationConfig,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(element, animationConfig);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [ref, delay, duration, trigger]);
}

// Scramble text effect
export function useScrambleText(
  ref: RefObject<HTMLElement | null>,
  options: {
    delay?: number;
    duration?: number;
    trigger?: boolean;
  } = {}
) {
  const { delay = 0, duration = 1.5, trigger = true } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const originalText = element.textContent || "";
    const chars = "!<>-_\\/[]{}—=+*^?#_____";

    let frame = 0;
    const totalFrames = duration * 60; // 60fps

    const scramble = () => {
      const progress = frame / totalFrames;
      const revealLength = Math.floor(progress * originalText.length);
      
      let result = "";
      for (let i = 0; i < originalText.length; i++) {
        if (i < revealLength) {
          result += originalText[i];
        } else if (originalText[i] === " ") {
          result += " ";
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      element.textContent = result;
      frame++;

      if (frame <= totalFrames) {
        requestAnimationFrame(scramble);
      } else {
        element.textContent = originalText;
      }
    };

    const startAnimation = () => {
      setTimeout(() => {
        frame = 0;
        scramble();
      }, delay * 1000);
    };

    if (trigger) {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: startAnimation,
        once: true,
      });
    } else {
      startAnimation();
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [ref, delay, duration, trigger]);
}

// Parallax effect hook
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.5
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [ref, speed]);
}

// Stagger reveal for children
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  childSelector: string,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    y?: number;
  } = {}
) {
  const { delay = 0, stagger = 0.1, duration = 0.8, y = 40 } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = container.querySelectorAll(childSelector);

    gsap.set(children, { y, opacity: 0 });

    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      delay,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [containerRef, childSelector, delay, stagger, duration, y]);
}

// Counter animation
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  endValue: number,
  options: {
    duration?: number;
    delay?: number;
    suffix?: string;
    prefix?: string;
  } = {}
) {
  const { duration = 2, delay = 0, suffix = "", prefix = "" } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const obj = { value: 0 };

    gsap.to(obj, {
      value: endValue,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
      },
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [ref, endValue, duration, delay, suffix, prefix]);
}

// Magnetic button effect
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength: number = 0.3
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
}

// Line draw animation for SVG
export function useDrawSVG(
  ref: RefObject<SVGElement | null>,
  options: {
    duration?: number;
    delay?: number;
    stagger?: number;
  } = {}
) {
  const { duration = 1.5, delay = 0, stagger = 0.2 } = options;

  useEffect(() => {
    if (!ref.current) return;

    const svg = ref.current;
    const paths = svg.querySelectorAll("path, line, circle, rect, polyline, polygon");

    paths.forEach((path) => {
      const length = (path as SVGGeometryElement).getTotalLength?.() || 1000;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration,
      stagger,
      delay,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === svg) st.kill();
      });
    };
  }, [ref, duration, delay, stagger]);
}
