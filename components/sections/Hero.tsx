import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, AnimatePresence, useVelocity, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useSpring as useReactSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import Magnetic from '../ui/Magnetic';
import pratyushImg from '../assets/pratyush.jpg';


// Easing for mechanical/architectural feel (expo.out)
const MECHANICAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isHeroNameHovered, setIsHeroNameHovered] = useState(false); 
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Scroll Parallax - Multi-layered
  const scrollBgY = useTransform(scrollY, [0, 600], [0, -50]); 
  const scrollFgY = useTransform(scrollY, [0, 600], [0, -150]); 
  const contentY = useTransform(scrollY, [0, 600], [0, 50]);
  const panelY = useTransform(scrollY, [0, 600], [0, -100]);

  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Velocity tracking for "Pressure" effect
  const mouseXVelocity = useVelocity(smoothMouseX);
  const mouseYVelocity = useVelocity(smoothMouseY);
  const mouseSpeed = useTransform<number, number>([mouseXVelocity, mouseYVelocity], ([vx, vy]) => {
     return Math.sqrt(vx * vx + vy * vy);
  });
  
  // Map speed to mask radius (0 speed = 250px radius, high speed = 450px radius)
  const maskRadius = useTransform(mouseSpeed, [0, 1500], [250, 450]);
  const smoothMaskRadius = useSpring(maskRadius, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || shouldReduceMotion) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile, shouldReduceMotion]);

  const parallaxX = useTransform(smoothMouseX, (v) => isMobile || shouldReduceMotion ? 0 : (v - dimensions.width / 2) * 0.015);
  const parallaxY = useTransform(smoothMouseY, (v) => isMobile || shouldReduceMotion ? 0 : (v - dimensions.height / 2) * 0.015);

  const bgX = useTransform(parallaxX, (v) => v * 0.25); 
  const bgY = useTransform([scrollBgY, parallaxY], ([s, p]) => (s as number) + (p as number) * 0.25);
  
  const fgX = parallaxX;
  const fgY = useTransform([scrollFgY, parallaxY], ([s, p]) => (s as number) + (p as number));

  // Dynamic parallax for the system panel
  const panelParallaxX = useTransform(smoothMouseX, (v) => isMobile || shouldReduceMotion ? 0 : (v - dimensions.width / 2) * 0.012);
  const panelParallaxY = useTransform(smoothMouseY, (v) => isMobile || shouldReduceMotion ? 0 : (v - dimensions.height / 2) * 0.012);
  const panelParallaxYCombined = useTransform([panelY, panelParallaxY], ([s, p]) => (s as number) + (p as number));

  // Dynamic opacity for scroll indicator based on scroll position
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  // Dynamic mask template based on velocity radius
  const maskImage = useMotionTemplate`radial-gradient(${smoothMaskRadius}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section ref={containerRef} className="relative lg:min-h-screen lg:h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0B0D10] pt-24 pb-8 sm:py-20 lg:py-0">
      
      {/* LAYER 0: Deep/Background Grid */}
      <motion.div 
        style={{ y: bgY, x: bgX }}
        className="absolute inset-0 z-0 pointer-events-none opacity-20 blur-[2px] scale-110 origin-center"
      >
        <BlueprintGrid color="#2D3442" opacity={0.2} size={60} strokeWidth={1} />
      </motion.div>

      {/* LAYER 1: Foreground Grid System & Nodes */}
      <motion.div 
        style={{ y: fgY, x: fgX }}
        className="absolute inset-0 z-0 pointer-events-none scale-105 origin-center"
      >
        <BlueprintGrid color="#2D3442" opacity={0.15} size={60} strokeWidth={1} />
        {!isMobile && !shouldReduceMotion && <GridNodes count={8} size={60} dimensions={dimensions} mouseX={smoothMouseX} mouseY={smoothMouseY} />}

        {/* Cursor Pressure Grid */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{ maskImage, WebkitMaskImage: maskImage }}
          animate={{ opacity: isHeroNameHovered ? 0.2 : 1 }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Thicker, brighter grid for pressure effect */}
          <BlueprintGrid color="#94A3B8" opacity={0.25} size={60} strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {/* LAYER 2: Main Content Container */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        
        {/* LEFT COLUMN: Identity & Manifesto */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <HeroContent 
            onHoverChange={setIsCtaHovered} 
            onNameHoverChange={setIsHeroNameHovered}
            contentY={contentY}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>

        {/* RIGHT COLUMN: Hero Image */}
        <motion.div 
          style={{ 
            x: panelParallaxX, 
            y: panelParallaxYCombined, 
            rotateX: useTransform(smoothMouseY, [0, 1000], [5, -5]), 
            rotateY: useTransform(smoothMouseX, [0, 1000], [-5, 5]) 
          }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end perspective-1000 mt-4 sm:mt-6 lg:mt-0"
        >
          <HeroImage />

          {/* Mobile Scroll Indicator */}
          <motion.div 
            style={{ opacity: scrollIndicatorOpacity }}
            className="md:hidden flex flex-col items-center justify-center gap-1.5 mt-5 pb-1 text-[#818C9D] cursor-pointer"
            onClick={() => {
              const introEl = document.getElementById('tech-stack');
              if (introEl) introEl.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-60">Scroll to Explore</span>
            <div className="w-4 h-6 border border-[#2D3442] rounded-full flex justify-center p-0.5">
              <motion.div 
                className="w-1 h-1.5 bg-[#94A3B8] rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* LAYER 3: Bottom Aligned Footer Elements (Matches Content Grid) */}
      <div className="hidden md:block absolute bottom-10 left-0 w-full z-20 pointer-events-none">
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-end">
            <ScrollIndicator opacity={scrollIndicatorOpacity} />
            <SystemStatus />
         </div>
      </div>
    </section>
  );
};

// --- Sub-components ---

// 1. Decrypted Text Effect (Refined)
const DecryptedText = ({ 
    text, 
    className, 
    animateOnHover = true 
}: { 
    text: string, 
    className?: string, 
    animateOnHover?: boolean 
}) => {
    const [iteration, setIteration] = useState(0);
    const intervalRef = useRef<any>(null); 
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&^*=-+";

    const runAnimation = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        setIteration(0);
        let localIteration = 0;
        
        intervalRef.current = setInterval(() => {
            localIteration += 1 / 2.5; // Smoother, heavier feel
            setIteration(localIteration);
            
            if (localIteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        }, 30);
    };

    useEffect(() => {
        if (!animateOnHover) {
            setIteration(text.length);
            return;
        }
        runAnimation();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, animateOnHover]);

    const handleHover = () => {
        if (!animateOnHover || iteration < text.length) return;
        runAnimation();
    };

    return (
        <span 
            className={`inline-flex whitespace-nowrap select-none ${className}`} 
            onMouseEnter={handleHover}
        >
            {text.split("").map((char, index) => {
                // Preserve spaces as non-breaking to maintain shape
                if (char === " ") return <span key={index} className="w-[0.3em] inline-block">&nbsp;</span>;
                
                const isRevealed = index < iteration;
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                
                return (
                    <span 
                        key={index} 
                        className={`inline-block text-center ${isRevealed ? "" : "text-[#94A3B8] opacity-50 font-mono"}`}
                        style={{ minWidth: char === ' ' ? 'auto' : '0.52em' }}
                    >
                        {isRevealed ? char : randomChar}
                    </span>
                );
            })}
        </span>
    );
};

// 2. Scalable SVG Grid
const BlueprintGrid = ({ color, opacity, size = 60, strokeWidth = 1 }: { color: string; opacity: number, size?: number, strokeWidth?: number }) => {
  return (
    <svg className="w-full h-full absolute inset-0">
      <defs>
        <pattern id={`grid-${size}-${color}-${strokeWidth}`} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke={color} strokeWidth={strokeWidth} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${size}-${color}-${strokeWidth})`} style={{ opacity }} />
    </svg>
  );
};

// 3. Intelligent Grid Nodes
const GridNodes = ({ count, size, dimensions, mouseX, mouseY }: { count: number, size: number, dimensions: { width: number, height: number }, mouseX: any, mouseY: any }) => {
  const [nodes, setNodes] = useState<{id: number, x: number, y: number, delay: number}[]>([]);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const cols = Math.ceil(dimensions.width / size);
    const rows = Math.ceil(dimensions.height / size);
    
    const newNodes = [];
    let idCounter = 0;

    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * cols) * size;
        const y = Math.floor(Math.random() * rows) * size;
        const delay = Math.random() * 8; 
        newNodes.push({ id: idCounter++, x, y, delay });
        if (Math.random() > 0.6) {
             const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
             const x2 = direction === 'horizontal' ? x + size : x;
             const y2 = direction === 'vertical' ? y + size : y;
             newNodes.push({ id: idCounter++, x: x2, y: y2, delay: delay + 0.6 });
        }
    }
    setNodes(newNodes);
  }, [count, size, dimensions]);

  return (
    <>
      {nodes.map((node) => (
        <SystemNode key={node.id} x={node.x} y={node.y} delay={node.delay} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </>
  );
}

const SystemNode: React.FC<{ x: number, y: number, delay: number, mouseX: any, mouseY: any }> = ({ x, y, delay, mouseX, mouseY }) => {
    // Generate different depth factors per node for parallax depth layering
    const depthFactorX = useRef((Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1));
    const depthFactorY = useRef((Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1));

    const finalX = useTransform(mouseX, (v: number) => x + v * depthFactorX.current);
    const finalY = useTransform(mouseY, (v: number) => y + v * depthFactorY.current);

    return (
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#EAEAF0]" 
          style={{ left: finalX, top: finalY, opacity: 0.05 }}
          animate={{ 
            opacity: [0.05, 0.4, 0.05],
            scale: [1, 1.3, 1],
            boxShadow: [ "0 0 0px rgba(234, 234, 240, 0)", "0 0 6px rgba(234, 234, 240, 0.25)", "0 0 0px rgba(234, 234, 240, 0)" ]
          }}
          transition={{ duration: 4, times: [0, 0.5, 1], delay: delay, repeat: Infinity, repeatDelay: Math.random() * 10 + 5, ease: "easeInOut" }}
        />
    )
}

// 4. Rotating Role Component
const RotatingRole = ({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) => {
  const roles = ["CS Student", "Problem Solver", "Builder"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <div className="h-[1.1em] overflow-hidden relative inline-block align-bottom ml-1.5 md:ml-4 w-auto">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={shouldReduceMotion ? false : { y: 40, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 0.85, rotateX: 0 }}
          exit={shouldReduceMotion ? undefined : { y: -40, opacity: 0, rotateX: 90 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: MECHANICAL_EASE }}
          className="block text-[#9AA0B2] font-bold tracking-widest"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// 5. Main Text Content
const HeroContent = ({ onHoverChange, onNameHoverChange, contentY, shouldReduceMotion }: { onHoverChange: (hover: boolean) => void, onNameHoverChange: (hover: boolean) => void, contentY: any, shouldReduceMotion: boolean | null }) => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemAnim = {
    hidden: { y: 25, opacity: 0, filter: 'blur(4px)' },
    show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: MECHANICAL_EASE } }
  };
  
  const roleAnim = {
    hidden: { y: 25, opacity: 0, filter: 'blur(4px)' },
    show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, delay: 0.6, ease: MECHANICAL_EASE } }
  };

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty('--mouse-x', `${x}px`);
    btnRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      style={shouldReduceMotion ? undefined : { y: contentY }}
      className="relative"
    >
      {/* Label */}
      <motion.div variants={itemAnim} className="mb-6 flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-pulse shadow-[0_0_8px_#94A3B8]" />
        <span className="text-xs font-mono text-[#94A3B8] tracking-[0.2em] uppercase">Building & Learning Every Day</span>
      </motion.div>

      {/* Name & Role — H1 with gradient sweep */}
      <div className="mb-6">
        <h1
          className="text-[clamp(1.7rem,8vw,2.25rem)] sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1] mb-3 cursor-none origin-left relative whitespace-nowrap gradient-sweep"
          data-cursor="hero-text"
          aria-label="Pratyush Jaiswal"
          onMouseEnter={() => onNameHoverChange(true)}
          onMouseLeave={() => onNameHoverChange(false)}
        >
          {/* sr-only text ensures Google indexes the real name, not scrambled chars */}
          <span className="sr-only">Pratyush Jaiswal</span>
          <span aria-hidden="true">
            <DecryptedText text="Pratyush Jaiswal" animateOnHover={!shouldReduceMotion} />
          </span>
        </h1>
        <motion.div 
          variants={roleAnim} 
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl flex flex-wrap items-baseline cursor-none"
          data-cursor="text-hover"
        >
          <span className="text-[#7F899B] font-medium mr-2 tracking-wide">is a</span>
          <RotatingRole shouldReduceMotion={shouldReduceMotion} />
        </motion.div>
      </div>

      {/* Description with blur reveal */}
      <motion.p 
        variants={itemAnim}
        className="mt-7 sm:mt-8 text-base sm:text-lg md:text-xl text-[#9AA0B2] max-w-lg leading-relaxed font-light"
      >
        CSE student building fast React interfaces, real-time apps, developer tools, and algorithm-focused projects.
      </motion.p>

      {/* CTA Button with Mouse Glow */}
      <motion.div variants={itemAnim} className="mt-12">
        <Magnetic strength={0.25}>
          <a 
            ref={btnRef}
            href="#projects"
            onMouseMove={handleBtnMouseMove}
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent text-[#EAEAF0] font-medium transition-all duration-300"
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            data-cursor="hover"
          >
            <span className="absolute top-0 left-0 w-[1px] h-0 bg-[#94A3B8] group-hover:h-full group-hover:bg-[#EAEAF0] group-hover:shadow-[0_0_10px_#94A3B8] transition-all duration-300 delay-100 ease-out" />
            <span className="absolute bottom-0 right-0 w-[1px] h-0 bg-[#94A3B8] group-hover:h-full group-hover:bg-[#EAEAF0] group-hover:shadow-[0_0_10px_#94A3B8] transition-all duration-300 delay-100 ease-out" />
            <span className="absolute top-0 left-0 h-[1px] w-0 bg-[#94A3B8] group-hover:w-full group-hover:bg-[#EAEAF0] group-hover:shadow-[0_0_10px_#94A3B8] transition-all duration-300 ease-out" />
            <span className="absolute bottom-0 right-0 h-[1px] w-0 bg-[#94A3B8] group-hover:w-full group-hover:bg-[#EAEAF0] group-hover:shadow-[0_0_10px_#94A3B8] transition-all duration-300 ease-out" />
            
            {/* Spotlight Glow */}
            <span className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 spotlight-card-glow" />
            
            <span className="relative z-10 font-mono tracking-wider text-sm">VIEW SELECTED WORK</span>
            <motion.span 
              className="relative z-10 text-[#94A3B8] group-hover:text-[#EAEAF0] transition-colors"
              animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
              transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.span>
          </a>
        </Magnetic>
      </motion.div>
    </motion.div>
  );
};

// 6. Hero Image (Right Side) with 3D Spring Gesture Effect
const HeroImage = () => {
  const domTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, imgScale }, api] = useReactSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      imgScale: 1.25,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 },
    })
  );

  const [{ wheelY }, wheelApi] = useReactSpring(() => ({ wheelY: 0 }));

  const calcX = (py: number, ly: number) => {
    if (!domTarget.current) return 0;
    const rect = domTarget.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    return -(py - centerY) / 15;
  };

  const calcY = (px: number, lx: number) => {
    if (!domTarget.current) return 0;
    const rect = domTarget.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    return (px - centerX) / 15;
  };

  useGesture(
    {
      onDrag: ({ active, offset: [dx, dy] }) =>
        api.start({ x: dx, y: dy, rotateX: 0, rotateY: 0, imgScale: active ? 1.35 : 1.25 }),
      onPinch: ({ offset: [d, a] }) => api.start({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api.start({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          imgScale: 1.35,
        }),
      onHover: ({ hovering }) =>
        !hovering && api.start({ rotateX: 0, rotateY: 0, imgScale: 1.25, x: 0, y: 0 }),
      onWheel: ({ event, offset: [, wy] }) => {
        event.preventDefault();
        wheelApi.start({ wheelY: wy });
      },
    },
    { 
      target: domTarget, 
      drag: { filterTaps: true, preventDefault: false },
      eventOptions: { passive: true } 
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1, ease: MECHANICAL_EASE }}
      className="relative w-full max-w-[17rem] sm:max-w-[20rem] md:max-w-[26rem] aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center select-none"
    >
      <span className="absolute -top-3 left-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[#667085]">Portrait / PJ_01</span>
      <span className="absolute -bottom-3 right-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[#667085]">Bengaluru · IN</span>
      <span className="absolute -left-2 -top-2 w-8 h-8 border-l border-t border-[#94A3B8] pointer-events-none" />
      <span className="absolute -right-2 -bottom-2 w-8 h-8 border-r border-b border-[#94A3B8] pointer-events-none" />
      <animated.div
        ref={domTarget}
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl touch-pan-y bg-[#0B0D10] border border-[#2D3442]"
        style={{
          transform: 'perspective(600px)',
          x,
          y,
          rotateX,
          rotateY,
          rotateZ,
          willChange: 'transform',
        }}
      >
        <animated.div
          className="w-full h-full"
          style={{
            transform: wheelY.to(wy => `translateY(${- (wy % 40)}px)`),
          }}
        >
          <animated.img
            src={pratyushImg}
            alt="Pratyush Jaiswal"
            className="w-full h-full object-cover origin-center pointer-events-none select-none"
            style={{
              scale: to([imgScale, zoom], (s, z) => s + z),
            }}
            draggable={false}
          />
        </animated.div>

        {/* Very subtle overlay to blend with dark mode */}
        <div className="absolute inset-0 bg-[#0B0D10] opacity-10 pointer-events-none" />
      </animated.div>
    </motion.div>
  );
};



// 7. Scroll Indicator Component (Refactored to show bouncing scroll pill and fade with scroll)
const ScrollIndicator = ({ opacity }: { opacity: any }) => {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2 text-[#9AA0B2] pointer-events-auto cursor-pointer"
      style={{ opacity }}
      onClick={() => {
        const skillsEl = document.getElementById('tech-stack');
        if (skillsEl) skillsEl.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-50">Scroll to Explore</span>
      <div className="w-5 h-8 border border-[#2D3442] rounded-full flex justify-center p-1">
        <motion.div 
          className="w-1 h-1.5 bg-[#94A3B8] rounded-full"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

// 8. Signature System Status (Bottom Right)
const SystemStatus = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="hidden md:block pointer-events-auto"
    >
      <div className="flex flex-col items-end gap-1 font-mono text-[10px] text-[#555A6B] tracking-wider leading-tight">
        <div className="flex items-center gap-4 border-b border-[#2D3442] pb-1 mb-1">
          <span className="opacity-80">ID: PJ_01</span>
          <span className="opacity-80">VER: 2.5.0</span>
        </div>
        <div className="flex flex-col items-end opacity-70">
           <span>COMPONENTS: 12</span>
           <span>MOTION SYSTEMS: 08</span>
           <span className="text-[#94A3B8]">STATUS: READY</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
