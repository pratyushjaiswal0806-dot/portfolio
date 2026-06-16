import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';

import tsLogo from '../assets/icons8-typescript.svg';
import jsLogo from '../assets/icons8-javascript.svg';
import pyLogo from '../assets/icons8-python.svg';
import javaLogo from '../assets/icons8-java.svg';
import nodeLogo from '../assets/icons8-nodejs.svg';
import reactLogo from '../assets/icons8-react-40.png';
import tailwindLogo from '../assets/icons8-tailwind-css.svg';
import expressLogo from '../assets/icons8-express-js.svg';
import gitLogo from '../assets/icons8-git.svg';
import githubLogo from '../assets/icons8-github.svg';
import figmaLogo from '../assets/figma.svg';
import postmanLogo from '../assets/Postman-Icon--Streamline-Svg-Logos.svg';
import supabaseLogo from '../assets/Supabase-Icon--Streamline-Svg-Logos.svg';

interface TechItem {
  name: string;
  slug: string;
  color: string;
  customSvg?: string;
  asset?: string;
}

const initialTechItems: TechItem[] = [
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6', asset: tsLogo },
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', asset: jsLogo },
  { name: 'Python', slug: 'python', color: '#3776AB', asset: pyLogo },
  { name: 'Java', slug: 'java', color: '#ED8B00', asset: javaLogo },
  { name: 'Node.js', slug: 'nodedotjs', color: '#5FA04E', asset: nodeLogo },
  { name: 'React', slug: 'react', color: '#61DAFB', asset: reactLogo },
  { name: 'Next.js', slug: 'nextdotjs', color: '#FFFFFF' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4', asset: tailwindLogo },
  { name: 'Express', slug: 'express', color: '#EAEAF0', asset: expressLogo },
  { name: 'Git', slug: 'git', color: '#F05032', asset: gitLogo },
  { name: 'GitHub', slug: 'github', color: '#FFFFFF', asset: githubLogo },
  { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
  { name: 'MySQL', slug: 'mysql', color: '#4479A1' },
  { name: 'Figma', slug: 'figma', color: '#F24E1E', asset: figmaLogo },
  { name: 'Postman', slug: 'postman', color: '#FF6C37', asset: postmanLogo },
  { name: 'Nginx', slug: 'nginx', color: '#009639' },
  { name: 'Bun', slug: 'bun', color: '#F9F1E7' },
  { name: 'Supabase', slug: 'supabase', color: '#3ECF8E', asset: supabaseLogo }
];

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [techItems, setTechItems] = useState<TechItem[]>(initialTechItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSwap = useCallback((fromIndex: number, toIndex: number) => {
    setTechItems(prev => {
      const updated = [...prev];
      const [removed] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, removed);
      return updated;
    });
  }, []);

  return (
    <section
      id="tech-stack"
      ref={containerRef}
      className="py-32 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden min-h-[70vh] flex flex-col justify-center"
      aria-label="Technology Stack of Pratyush Jaiswal"
    >
      <SkillsGrid isActive={isInView} mouseX={mouseX} mouseY={mouseY} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[#94A3B8] font-mono uppercase tracking-widest text-xs">
                {hoveredTech ? `[ Active Module: ${hoveredTech.name.toUpperCase()} ]` : '[ Hover an icon to scan ]'}
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#EAEAF0] mt-2 h-[60px]"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              {hoveredTech ? (
                <span style={{ color: hoveredTech.color }} className="transition-colors duration-300">
                  {hoveredTech.name}
                </span>
              ) : (
                <>
                  My <span className="text-[#94A3B8]">Tech Stack</span>
                </>
              )}
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            className="text-xs font-mono text-[#555A6B] text-right hidden md:block"
          >
            <span>TOTAL_DEPS: {techItems.length} ACTIVE</span>
            <br />
            <span>STATUS: READY_TO_BUILD</span>
          </motion.div>
        </div>

        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-8 md:gap-12 justify-center items-center py-12"
        >
          {techItems.map((tech, index) => (
            <TechIcon
              key={tech.name}
              tech={tech}
              index={index}
              isHovered={hoveredTech?.name === tech.name}
              isDragged={draggedIndex === index}
              isDragOver={dragOverIndex === index && draggedIndex !== index}
              currentDragOverIndex={dragOverIndex}
              onHoverStart={() => setHoveredTech(tech)}
              onHoverEnd={() => setHoveredTech(null)}
              onDragStart={setDraggedIndex}
              onDragOver={setDragOverIndex}
              onSwap={handleSwap}
              totalItems={techItems.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface TechIconProps {
  tech: TechItem;
  index: number;
  isHovered: boolean;
  isDragged: boolean;
  isDragOver: boolean;
  currentDragOverIndex: number | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onDragStart: (index: number | null) => void;
  onDragOver: (index: number | null) => void;
  onSwap: (fromIndex: number, toIndex: number) => void;
  totalItems: number;
}

const TechIcon: React.FC<TechIconProps> = ({
  tech, index, isHovered, isDragged, isDragOver, currentDragOverIndex,
  onHoverStart, onHoverEnd, onDragStart, onDragOver, onSwap, totalItems
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isDragged) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
  };

  const iconUrl = tech.asset || (tech.slug === 'java'
    ? 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
    : `https://cdn.simpleicons.org/${tech.slug}/${tech.slug === 'nextdotjs' || tech.slug === 'github' || tech.slug === 'shadcnui' ? 'ffffff' : tech.color.replace('#', '')}`);

  return (
    <motion.div
      ref={ref}
      layout
      drag
      dragSnapToOrigin
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={() => onDragStart(index)}
      onDrag={(e: any, info: any) => {
        if (!ref.current) return;
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const container = el.closest('.flex.flex-wrap');
        if (!container) return;
        const children = Array.from(container.children) as HTMLElement[];

        let closestIdx: number | null = null;
        let closestDist = Infinity;

        children.forEach((child, i) => {
          if (i === index || i >= totalItems) return;
          const r = child.getBoundingClientRect();
          const childCx = r.left + r.width / 2;
          const childCy = r.top + r.height / 2;
          const dist = Math.hypot(cx - childCx, cy - childCy);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        });

        onDragOver(closestIdx);
      }}
      onDragEnd={() => {
        if (currentDragOverIndex !== null && currentDragOverIndex !== index) {
          onSwap(index, currentDragOverIndex);
        }
        onDragStart(null);
        onDragOver(null);
      }}
      onMouseEnter={onHoverStart}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={!isDragged ? { scale: 1.15 } : undefined}
      whileDrag={{ scale: 1.2, zIndex: 50, cursor: 'grabbing' }}
      animate={isDragOver ? { scale: 1.1, transition: { duration: 0.15 } } : undefined}
      className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
      style={{
        x: isDragged ? undefined : springX,
        y: isDragged ? undefined : springY,
        filter: isHovered || isDragged
          ? `drop-shadow(0 0 15px ${tech.color}60)`
          : isDragOver
            ? `drop-shadow(0 0 20px ${tech.color}90)`
            : 'none',
        opacity: isDragged ? 0.8 : 1,
        zIndex: isDragged ? 50 : isDragOver ? 40 : 10,
      }}
    >
      <img
        src={iconUrl}
        alt={`${tech.name} logo`}
        className="w-full h-full object-contain transition-all duration-300 filter pointer-events-none"
        style={{
          filter: isHovered || isDragged ? 'grayscale(0%)' : 'grayscale(30%) opacity(75%)',
        }}
        onError={(e) => {
          const currentSrc = e.currentTarget.src;
          if (currentSrc.includes('cdn.simpleicons.org')) {
            e.currentTarget.src = `https://unpkg.com/simple-icons@latest/icons/${tech.slug}.svg`;
          } else if (currentSrc.includes('unpkg.com')) {
            e.currentTarget.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tech.slug}.svg`;
          } else {
            e.currentTarget.style.display = 'none';
          }
        }}
        draggable={false}
      />
    </motion.div>
  );
};

// --- Background Grid System (reused from Skills but styled to match) ---
const SkillsGrid = ({ isActive, mouseX, mouseY }: { isActive: boolean, mouseX: any, mouseY: any }) => {
  const maskImage = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="absolute inset-0 pointer-events-none scale-110">
      {/* Base Faint Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#EAEAF0 1px, transparent 1px), linear-gradient(90deg, #EAEAF0 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      />

      {/* Mouse Revealed Grid (Brighter) */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage,
          WebkitMaskImage: maskImage
        }}
      />
    </div>
  );
};

export default TechStack;
