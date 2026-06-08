import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, AnimatePresence, useVelocity } from 'framer-motion';
import { ArrowDown, Terminal, Wifi, Battery, Disc } from 'lucide-react';
import Magnetic from '../ui/Magnetic';

// Easing for mechanical/architectural feel (expo.out)
const MECHANICAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isHeroNameHovered, setIsHeroNameHovered] = useState(false); 
  const { scrollY } = useScroll();
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
      if (isMobile) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  const parallaxX = useTransform(smoothMouseX, (v) => isMobile ? 0 : (v - dimensions.width / 2) * 0.015);
  const parallaxY = useTransform(smoothMouseY, (v) => isMobile ? 0 : (v - dimensions.height / 2) * 0.015);

  const bgX = useTransform(parallaxX, (v) => v * 0.2); 
  const bgY = useTransform([scrollBgY, parallaxY], ([s, p]) => (s as number) + (p as number) * 0.2);
  
  const fgX = parallaxX;
  const fgY = useTransform([scrollFgY, parallaxY], ([s, p]) => (s as number) + (p as number));

  // Dynamic mask template based on velocity radius
  const maskImage = useMotionTemplate`radial-gradient(${smoothMaskRadius}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0B0D10]">
      
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
        {!isMobile && <GridNodes count={8} size={60} dimensions={dimensions} />}

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
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Identity & Manifesto */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <HeroContent 
            onHoverChange={setIsCtaHovered} 
            onNameHoverChange={setIsHeroNameHovered}
            contentY={contentY}
          />
        </div>

        {/* RIGHT COLUMN: System Panel (Desktop Only) */}
        <motion.div 
          style={{ y: panelY, rotateX: useTransform(smoothMouseY, [0, 1000], [5, -5]), rotateY: useTransform(smoothMouseX, [0, 1000], [-5, 5]) }}
          className="lg:col-span-5 hidden lg:flex justify-end perspective-1000"
        >
          <SystemPanel />
        </motion.div>
      </div>

      {/* LAYER 3: Bottom Aligned Footer Elements (Matches Content Grid) */}
      <div className="absolute bottom-10 left-0 w-full z-20 pointer-events-none">
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-end">
            <ScrollIndicator />
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
        runAnimation();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    const handleHover = () => {
        if (!animateOnHover || iteration < text.length) return;
        runAnimation();
    };

    return (
        <span 
            className={`inline-flex flex-nowrap ${className}`} 
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
                        className={isRevealed ? "" : "text-[#94A3B8] opacity-50 font-mono"}
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
const GridNodes = ({ count, size, dimensions }: { count: number, size: number, dimensions: { width: number, height: number } }) => {
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
        <SystemNode key={node.id} x={node.x} y={node.y} delay={node.delay} />
      ))}
    </>
  );
}

const SystemNode: React.FC<{ x: number, y: number, delay: number }> = ({ x, y, delay }) => {
    return (
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#EAEAF0]" 
          style={{ left: x - 3, top: y - 3, opacity: 0.05 }}
          animate={{ 
            opacity: [0.05, 0.5, 0.05],
            scale: [1, 1.2, 1],
            boxShadow: [ "0 0 0px rgba(234, 234, 240, 0)", "0 0 8px rgba(234, 234, 240, 0.3)", "0 0 0px rgba(234, 234, 240, 0)" ]
          }}
          transition={{ duration: 4, times: [0, 0.5, 1], delay: delay, repeat: Infinity, repeatDelay: Math.random() * 10 + 5, ease: "easeInOut" }}
        />
    )
}

// 4. Rotating Role Component
const RotatingRole = () => {
  const roles = ["CS Student", "Problem Solver", "Builder"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[1.1em] overflow-hidden relative inline-block align-bottom ml-2 md:ml-4 w-full md:w-auto">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 0.6, rotateX: 0 }} 
          exit={{ y: -40, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.5, ease: MECHANICAL_EASE }}
          className="block text-[#9AA0B2] font-bold tracking-widest"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// 5. Main Text Content
const HeroContent = ({ onHoverChange, onNameHoverChange, contentY }: { onHoverChange: (hover: boolean) => void, onNameHoverChange: (hover: boolean) => void, contentY: any }) => {
  
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemAnim = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: MECHANICAL_EASE } }
  };
  
  const roleAnim = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.6, ease: MECHANICAL_EASE } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      style={{ y: contentY }}
      className="relative"
    >
      {/* Label */}
      <motion.div variants={itemAnim} className="mb-6 flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-pulse shadow-[0_0_8px_#94A3B8]" />
        <span className="text-xs font-mono text-[#94A3B8] tracking-[0.2em] uppercase">Building & Learning Every Day</span>
      </motion.div>

      {/* Name & Role — H1 is the single most important on-page SEO element */}
      <div className="mb-6">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#EAEAF0] leading-[1] mb-2 cursor-none origin-left relative whitespace-nowrap"
          data-cursor="hero-text"
          aria-label="Pratyush Jaiswal"
          onMouseEnter={() => onNameHoverChange(true)}
          onMouseLeave={() => onNameHoverChange(false)}
        >
          {/* sr-only text ensures Google indexes the real name, not scrambled chars */}
          <span className="sr-only">Pratyush Jaiswal</span>
          <span aria-hidden="true">
            <DecryptedText text="Pratyush Jaiswal" />
          </span>
        </h1>
        <motion.div 
          variants={roleAnim} 
          className="text-3xl md:text-5xl lg:text-6xl flex flex-wrap items-baseline cursor-none"
          data-cursor="text-hover"
        >
          <span className="text-[#9AA0B2] opacity-30 font-medium mr-2 tracking-wide">is a</span>
          <RotatingRole />
        </motion.div>
      </div>

      {/* Description */}
      <motion.p 
        variants={itemAnim}
        className="mt-8 text-lg md:text-xl text-[#9AA0B2] max-w-lg leading-relaxed font-light"
      >
        CSE student at RVITM who loves building things — from clean interfaces to clever algorithms. Always shipping, always learning.
      </motion.p>

      {/* CTA Button */}
      <motion.div variants={itemAnim} className="mt-12">
        <Magnetic strength={0.2}>
          <a 
            href="#projects"
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent text-[#EAEAF0] font-medium transition-all duration-300"
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            data-cursor="hover"
          >
            <span className="absolute top-0 left-0 w-[1px] h-0 bg-[#94A3B8] group-hover:h-full group-hover:bg-[#EAEAF0] group-hover:shadow-[0_0_10px_#94A3B8] transition-all duration-300 delay-100 ease-out" />
            <span className="absolute bottom-0 right-0 w-[1px] h-0 bg-[#94A3B8] group-hover:h-full group-hover:bg-[#EAEAF0] group-hover:shadow-[0_0_10px_#94A3B8] transition-all duration-300 delay-100 ease-out" />
            <span className="absolute top-0 left-0 h-[1px] w-0 bg-[#94A3B8] group-hover:w-full group-hover:bg-[#EAEAF0] group-hover:shadow-[0_0_10px_#94A3B8] transition-all duration-300 ease-out" />
            <span className="absolute bottom-0 right-0 h-[1px] w-0 bg-[#94A3B8] group-hover:w-full group-hover:bg-[#EAEAF0] group-hover:shadow-[0_0_10px_#94A3B8] transition-all duration-300 ease-out" />
            <span className="absolute inset-0 bg-[#94A3B8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 font-mono tracking-wider text-sm">OPEN BLUEPRINT</span>
            <ArrowDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 group-hover:text-[#EAEAF0] transition-all text-[#94A3B8]" />
          </a>
        </Magnetic>
      </motion.div>
    </motion.div>
  );
};

// 6. System Panel (Right Side) - Terminal Upgrade
const SystemPanel = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const messages = [
      "INITIALIZING KERNEL...",
      "LOADING MODULES...",
      "COMPILING SOURCE CODE...",
      "LINKING DEPENDENCIES...",
      "RUNNING TEST SUITE...",
      "ALL TESTS PASSED.",
      "SYSTEM READY."
  ];

  useEffect(() => {
      let delay = 0;
      messages.forEach((msg, i) => {
          delay += Math.random() * 500 + 300;
          setTimeout(() => {
              setLogs(prev => [...prev.slice(-6), `> ${msg}`]);
          }, delay);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 1, ease: MECHANICAL_EASE }}
      className="relative w-80 h-96 border border-[#2D3442] bg-[#0B0D10]/90 backdrop-blur-md rounded-lg overflow-hidden group hover:border-[#94A3B8] transition-all duration-500 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-[#2D3442] bg-[#141821]/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-[#94A3B8]" />
          <span className="text-[10px] font-mono text-[#94A3B8] tracking-wider">TERMINAL_01</span>
        </div>
        <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
             <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
             <div className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 font-mono text-[10px] text-[#9AA0B2] flex flex-col justify-end">
          <div className="space-y-1.5">
            {logs.map((log, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex"
                >
                    <span className="mr-2 text-[#555A6B]">{new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit', second: '2-digit'})}</span>
                    <span className={log.includes("READY") ? "text-green-400" : "text-[#94A3B8]"}>{log}</span>
                </motion.div>
            ))}
            <motion.div 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-[#94A3B8] mt-1"
            />
          </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="p-2 border-t border-[#2D3442] grid grid-cols-3 gap-2">
          <div className="bg-[#141821] p-1.5 rounded flex items-center justify-center gap-2 text-[#555A6B]">
              <Wifi size={10} />
              <span className="text-[9px] font-mono">ONLINE</span>
          </div>
          <div className="bg-[#141821] p-1.5 rounded flex items-center justify-center gap-2 text-[#555A6B]">
              <Disc size={10} />
              <span className="text-[9px] font-mono">64GB</span>
          </div>
          <div className="bg-[#141821] p-1.5 rounded flex items-center justify-center gap-2 text-[#555A6B]">
              <Battery size={10} />
              <span className="text-[9px] font-mono">PWR</span>
          </div>
      </div>
    </motion.div>
  );
};

// 7. Scroll Indicator Component (Refactored for Layout Alignment)
const ScrollIndicator = () => {
  return (
    <motion.div 
      className="flex items-center gap-4 text-[#9AA0B2] pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <div className="h-[1px] w-12 bg-[#2D3442]" />
      <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">System Ready</span>
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