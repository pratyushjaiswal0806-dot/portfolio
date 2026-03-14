import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, cubicBezier, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { Code2, Layout, Zap, Activity, Terminal, Grid3x3 } from 'lucide-react';

// --- Motion Constants ---
const BOOT_EASING = cubicBezier(0.22, 1, 0.36, 1);
const HOVER_EASE = "easeOut";

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Section Activation
  const isInView = useInView(containerRef, { amount: 0.2, once: false });

  // Mouse tracking for global grid effect in this section
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const skillItems = [
    {
      title: "Web Development",
      desc: "Building responsive, performant web applications with modern frameworks and clean architecture.",
      icon: Code2,
      tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      colSpan: "md:col-span-2",
      type: "frontend"
    },
    {
      title: "Programming Languages",
      desc: "Strong foundation across multiple languages for different problem domains.",
      icon: Terminal,
      tags: ["Python", "C++", "JavaScript", "Java"],
      colSpan: "md:col-span-1",
      type: "tools"
    },
    {
      title: "DSA & Problem Solving",
      desc: "Consistent practice in data structures, algorithms, and competitive thinking.",
      icon: Activity,
      tags: ["Arrays", "Trees", "Graphs", "DP"],
      colSpan: "md:col-span-1",
      type: "perf"
    },
    {
      title: "UI / UX Design",
      desc: "Designing intuitive interfaces driven by user empathy and aesthetic precision.",
      icon: Layout,
      tags: ["Figma", "Wireframing", "Prototyping"],
      colSpan: "md:col-span-1",
      type: "ui"
    },
    {
      title: "Motion & Interaction",
      desc: "Bringing interfaces to life with purposeful animations and micro-interactions.",
      icon: Zap,
      tags: ["Framer Motion", "GSAP", "CSS Animations"],
      colSpan: "md:col-span-1",
      type: "motion"
    },
    {
      title: "Dev Tools & Workflow",
      desc: "Efficient development workflows with version control, CI/CD, and modern tooling.",
      icon: Grid3x3,
      tags: ["Git", "GitHub", "VS Code", "Linux"],
      colSpan: "md:col-span-1",
      type: "system"
    },
  ];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-32 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden"
    >
      {/* 8. BACKGROUND GRID & MOUSE SPOTLIGHT */}
      <SkillsGrid isActive={isInView} mouseX={mouseX} mouseY={mouseY} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header System Activation */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.4, ease: HOVER_EASE }}
          >
            <span className="text-[#94A3B8] font-bold uppercase tracking-widest text-sm">Capabilities</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#EAEAF0] mt-2"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.12, ease: HOVER_EASE }}
          >
            More than just <span className="text-[#94A3B8]">a student</span>.
          </motion.h2>
        </div>

        {/* Card Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {skillItems.map((item, index) => (
            <BentoCard
              key={index}
              item={item}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              isSectionActive={isInView}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ item, index, hoveredIndex, setHoveredIndex, isSectionActive, isMobile }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  // 7. SCROLL-LINKED DEPTH
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const depthScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);
  const depthOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  // 6. FOCUS MANAGEMENT
  const finalOpacity = useTransform(depthOpacity, (v) => v * (isDimmed ? 0.9 : 1));
  const finalScale = useTransform(depthScale, (v) => isHovered ? v * 1.01 : v);

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (!isMobile) setHoveredIndex(null);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isSectionActive ? "visible" : "exit"}
      variants={{
        hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.5,
            delay: index * 0.08,
            ease: BOOT_EASING
          }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
      }}
      className={`
        ${item.colSpan} relative group rounded-md bg-[#141821]/80 backdrop-blur-sm border 
        transition-all duration-300 overflow-hidden
        ${isDimmed ? 'border-[#2D3442]/40 shadow-none' : 'border-[#2D3442] shadow-sm'} 
      `}
      style={{
        scale: isMobile ? 1 : finalScale,
        opacity: isMobile ? 1 : finalOpacity,
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        zIndex: isHovered ? 20 : 1,
        transformStyle: "preserve-3d" // Enable 3D space for children
      }}
      onMouseEnter={() => !isMobile && setHoveredIndex(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 4. ACTIVE MODULE STATE: Corner Targeting Brackets */}
      <CornerBrackets isHovered={isHovered} />

      {/* Internal Background & Gradient */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#141821] to-[#0B0D10]"
        animate={{
          background: isHovered
            ? "linear-gradient(135deg, #1E2330 0%, #141821 100%)"
            : "linear-gradient(135deg, #141821 0%, #0B0D10 100%)"
        }}
        transition={{ duration: 0.3 }}
        style={{ transform: "translateZ(0px)" }}
      />

      {/* Subtle Scanline Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* Index ID (Mechanical Feel) */}
      <div className="absolute top-4 right-5 text-[10px] font-mono text-[#2D3442] group-hover:text-[#94A3B8] transition-colors duration-300" style={{ transform: "translateZ(10px)" }}>
        SYS_0{index + 1}
      </div>

      <div className="relative z-10 p-8 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
        {/* Icon Container */}
        <div className="mb-8 flex justify-between items-start">
          <div className="p-3 rounded bg-[#0B0D10] border border-[#2D3442] text-[#EAEAF0] group-hover:border-[#94A3B8]/50 group-hover:shadow-[0_0_15px_rgba(148,163,184,0.1)] transition-all duration-300">
            <motion.div animate={isHovered ? "active" : "idle"}>
              {/* Custom Icon Animations */}
              {item.type === 'frontend' && (
                <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <motion.polyline points="16 18 22 12 16 6" variants={{ active: { pathLength: [0, 1], opacity: [0, 1] }, idle: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.4 }} />
                  <motion.polyline points="8 6 2 12 8 18" variants={{ active: { pathLength: [0, 1], opacity: [0, 1] }, idle: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.4, delay: 0.1 }} />
                </motion.svg>
              )}
              {item.type === 'ui' && (
                <motion.div variants={{ active: { scale: [1, 1.15, 1] }, idle: { scale: 1 } }} transition={{ duration: 0.3 }}>
                  <Layout className="w-6 h-6" />
                </motion.div>
              )}
              {item.type === 'motion' && (
                <motion.div variants={{ active: { opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }, idle: { opacity: 1, scale: 1 } }} transition={{ duration: 0.3 }}>
                  <Zap className="w-6 h-6" />
                </motion.div>
              )}
              {item.type === 'perf' && (
                <motion.div variants={{ active: { rotate: [0, 10, -10, 0] }, idle: { rotate: 0 } }} transition={{ duration: 0.3 }}>
                  <Activity className="w-6 h-6" />
                </motion.div>
              )}
              {!['frontend', 'ui', 'motion', 'perf'].includes(item.type) && (
                <motion.div variants={{ active: { rotate: [0, 15, 0] }, idle: { rotate: 0 } }}>
                  <Icon className="w-6 h-6" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-auto">
          <h3 className="text-xl md:text-2xl font-bold text-[#EAEAF0] mb-3 group-hover:text-white transition-colors tracking-tight">
            {item.title}
          </h3>
          <p className="text-[#9AA0B2] text-sm md:text-base mb-6 leading-relaxed font-light">
            {item.desc}
          </p>

          {/* Tag Discovery */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag: string, i: number) => (
              <Tag key={i} text={tag} index={i} isCardHovered={isHovered} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Corner Brackets for Active State
const CornerBrackets = ({ isHovered }: { isHovered: boolean }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none p-1 z-20"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      variants={variants}
      style={{ transform: "translateZ(10px)" }} // Slight lift
    >
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#94A3B8]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#94A3B8]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#94A3B8]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#94A3B8]" />
    </motion.div>
  );
};

const Tag = ({ text, index, isCardHovered }: { text: string, index: number, isCardHovered: boolean }) => {
  return (
    <motion.span
      initial={{ opacity: 0.6, y: 0 }}
      animate={{
        opacity: isCardHovered ? 1 : 0.6,
        x: isCardHovered ? 2 : 0
      }}
      transition={{
        duration: 0.2,
        delay: isCardHovered ? index * 0.05 : 0,
      }}
      className="text-[11px] uppercase tracking-wider font-mono text-[#555A6B] group-hover/tag:text-[#EAEAF0] cursor-default transition-colors duration-200"
    >
      <span className="mr-1 text-[#94A3B8]">{`>`}</span>
      {text}
    </motion.span>
  )
}

// --- Background Grid System ---
const SkillsGrid = ({ isActive, mouseX, mouseY }: { isActive: boolean, mouseX: any, mouseY: any }) => {

  // Dynamic mask for revealing the grid
  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="absolute inset-0 pointer-events-none scale-110">
      {/* Base Faint Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#EAEAF0 1px, transparent 1px), linear-gradient(90deg, #EAEAF0 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      />

      {/* Mouse Revealed Grid (Brighter) */}
      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage,
          WebkitMaskImage: maskImage
        }}
      />

      {/* Active System Nodes */}
      {isActive && <ActiveNodes />}
    </div>
  )
}

const ActiveNodes = () => {
  const [nodes, setNodes] = useState<{ id: number, type: 'h' | 'v', pos: number, length: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      // Randomly choose Horizontal or Vertical Packet
      const type = Math.random() > 0.5 ? 'h' : 'v';
      const pos = Math.random() * 100; // Position on the opposite axis (top for h, left for v)
      const length = Math.random() * 20 + 10; // Trail length

      setNodes(prev => [...prev.slice(-5), { id, type, pos, length }]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {nodes.map(node => <DataPacket key={node.id} {...node} />)}
    </>
  )
}

const DataPacket = ({ type, pos, length }: { type: 'h' | 'v', pos: number, length: number }) => {
  // Determine start and animation based on type
  const isH = type === 'h';

  // If Horizontal: moves Left to Right. Top is fixed.
  // If Vertical: moves Top to Bottom. Left is fixed.

  return (
    <motion.div
      className="absolute bg-gradient-to-r from-transparent to-[#94A3B8]"
      style={{
        height: isH ? '1px' : `${length}px`,
        width: isH ? `${length}px` : '1px',
        top: isH ? `${pos}%` : '-10%',
        left: isH ? '-10%' : `${pos}%`,
        opacity: 0.4
      }}
      animate={{
        top: isH ? `${pos}%` : '110%',
        left: isH ? '110%' : `${pos}%`,
      }}
      transition={{
        duration: Math.random() * 3 + 2, // 2-5s traverse
        ease: "linear"
      }}
    />
  )
}

export default Skills;