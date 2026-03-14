import React, { useState, useEffect, useRef } from 'react';
import { 
    motion, useScroll, useTransform, useSpring, useMotionValue, 
    useAnimationFrame, cubicBezier, AnimatePresence, useVelocity, useMotionTemplate 
} from 'framer-motion';
import { 
    Activity, MousePointer2, Layers, Zap, ChevronLeft, Move, 
    Grid, List, RefreshCw, Sliders, CircleDot, Play 
} from 'lucide-react';
import Magnetic from '../ui/Magnetic';

// --- CONSTANTS ---
const SYSTEM_EASE = [0.22, 1, 0.36, 1] as const;

// --- TYPES ---
type EaseType = 'system' | 'linear' | 'easeOut';

const AnimationLab: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fpsQuality, setFpsQuality] = useState<'Optimal' | 'Reduced'>('Optimal');

  // Performance Monitor
  useAnimationFrame((time, delta) => {
    if (delta > 24) { 
      setFpsQuality('Reduced');
    } else {
      setFpsQuality('Optimal');
    }
  });

  return (
    <motion.section 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#0B0D10] text-[#EAEAF0] relative overflow-hidden pt-24 pb-32 px-6 md:px-12 perspective-1000"
    >
        {/* Dynamic Background Noise */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
        />
        
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: `linear-gradient(#2D3442 1px, transparent 1px), linear-gradient(90deg, #2D3442 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />

      {/* HEADER */}
      <LabHeader onBack={onBack} quality={fpsQuality} />

      <div className="max-w-6xl mx-auto space-y-32 mt-20 relative z-10">
        
        {/* 1. HERO TYPOGRAPHY */}
        <TimeBasedTypography />

        {/* 2. CORE MODULES (3D TILT ENABLED) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
           <MicroInteractionModule quality={fpsQuality} />
           <ScrollLinkedModule />
           <CursorDrivenModule quality={fpsQuality} />
        </div>

        {/* 3. VELOCITY PHYSICS (SKEW ENABLED) */}
        <VelocityTextSection />

        {/* 4. ADVANCED PHYSICS MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
            <GesturePhysicsModule />
            <SpringPlaygroundModule />
        </div>

        {/* 5. LAYOUT & ORCHESTRATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
             <LayoutMorphModule />
             <SequenceRippleModule />
        </div>

        {/* 6. TIMELINE & EASING */}
        <TimelineSection />
        <EasingShowcase />

        {/* FOOTER STATE */}
        <div className="text-center py-24 opacity-60">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <div className="w-1 h-12 bg-gradient-to-b from-transparent to-[#2D3442] mx-auto mb-8" />
                <p className="text-sm font-mono tracking-widest text-[#94A3B8]">SYSTEM_IDLE</p>
                <p className="mt-4 text-xl font-light text-[#555A6B]">Motion ends where clarity begins.</p>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// --- HEADER ---

const LabHeader = ({ onBack, quality }: { onBack: () => void, quality: 'Optimal' | 'Reduced' }) => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center border-b border-[#2D3442] pb-6 sticky top-0 bg-[#0B0D10]/80 backdrop-blur-md z-50 pt-4">
      <div className="flex items-center gap-6">
        <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-sm font-mono text-[#94A3B8] hover:text-[#EAEAF0] transition-colors"
        >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            RETURN_HOME
        </button>
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="flex items-center gap-2 px-3 py-1 bg-[#141821] rounded text-[10px] tracking-widest font-mono text-[#EAEAF0] border border-[#2D3442]/50"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            MOTION SYSTEM · ACTIVE
        </motion.div>
      </div>

      <div className="flex items-center gap-4 text-[10px] font-mono text-[#555A6B]">
        <div className="hidden md:flex items-center gap-2">
            <Layers size={12} />
            MODULES: 08
        </div>
        <div className="flex items-center gap-2">
            <Activity size={12} />
            <span className={quality === 'Optimal' ? "text-green-500" : "text-yellow-500"}>{quality.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

const TimeBasedTypography = () => {
    const text = "Motion with intent not decoration";
    const words = text.split(" ");
    
    return (
        <div className="py-12 border-l-2 border-[#2D3442] pl-8 md:pl-16 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#2D3442] origin-top scale-y-50" />
            <p className="text-[10px] font-mono text-[#555A6B] mb-8 uppercase tracking-widest">01 / Text Stagger System</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-tight overflow-hidden">
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        className="inline-block mr-[0.25em] origin-bottom"
                        initial={{ opacity: 0, y: 80, rotateX: -40 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ 
                            duration: 1.2, 
                            delay: i * 0.15, 
                            ease: SYSTEM_EASE 
                        }}
                        whileHover={{ y: -10, scale: 1.05, color: "#FFFFFF", transition: { duration: 0.2 } }}
                    >
                        {word === "intent" ? <span className="text-[#94A3B8]">{word}</span> : 
                         word === "not" ? <span className="text-[#555A6B]">{word}</span> : word}
                    </motion.span>
                ))}
            </h1>
        </div>
    )
}

// --- 3D MODULE CARD WRAPPER ---

const ModuleCard = ({ title, subtitle, icon: Icon, children, className = "" }: any) => {
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);
    
    // Spotlight Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        
        const xPct = localX / width - 0.5;
        const yPct = localY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
        mouseX.set(localX);
        mouseY.set(localY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        mouseX.set(0);
        mouseY.set(0);
    };

    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: SYSTEM_EASE }}
            className={`relative bg-[#141821]/50 border border-[#2D3442] p-8 rounded-lg flex flex-col min-h-[360px] group ${className}`}
        >
            {/* Spotlight Effect */}
            <motion.div 
                className="absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                   background: "linear-gradient(135deg, rgba(148, 163, 184, 0.1), transparent)",
                   maskImage,
                   WebkitMaskImage: maskImage
                }}
            />

            <div className="relative z-10 flex justify-between items-start mb-8" style={{ transform: "translateZ(20px)" }}>
                <div>
                    <h3 className="text-lg font-bold text-[#EAEAF0]">{title}</h3>
                    <p className="text-xs text-[#94A3B8] mt-2 font-mono tracking-widest uppercase">{subtitle}</p>
                </div>
                <div className="p-2 bg-[#0B0D10] border border-[#2D3442] rounded text-[#555A6B]">
                    <Icon size={16} />
                </div>
            </div>
            
            <div 
                className="flex-1 flex items-center justify-center bg-[#0B0D10]/30 rounded border border-[#2D3442]/30 overflow-hidden relative group-hover:bg-[#0B0D10]/50 transition-colors"
                style={{ transform: "translateZ(10px)" }}
            >
                {children}
            </div>
        </motion.div>
    )
}

// --- MODULES ---

const MicroInteractionModule = ({ quality }: { quality: string }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <ModuleCard title="Micro-Interaction" subtitle="INPUT_FEEDBACK_LOOP" icon={MousePointer2}>
            <motion.button
                onTapStart={() => setIsPressed(true)}
                onTap={() => setIsPressed(false)}
                onTapCancel={() => setIsPressed(false)}
                animate={{ 
                    scale: isPressed ? 0.94 : 1,
                    backgroundColor: isPressed ? "rgba(148, 163, 184, 0.2)" : "rgba(148, 163, 184, 0.1)"
                }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="px-8 py-3 rounded text-sm font-medium tracking-wide border border-[#94A3B8]/30 text-[#EAEAF0] relative overflow-hidden"
            >
                <span className="relative z-10">INITIALIZE</span>
                {quality === 'Optimal' && isPressed && (
                    <motion.div 
                        layoutId="glow"
                        className="absolute inset-0 bg-[#94A3B8]/10 blur-md"
                    />
                )}
            </motion.button>
        </ModuleCard>
    )
}

const ScrollLinkedModule = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"]
    });
    
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "50%", "0%"]);

    return (
        <ModuleCard title="Scroll Link" subtitle="Timeline control" icon={Layers}>
            <div ref={ref} className="w-full h-full flex items-center justify-center">
                <motion.div 
                    style={{ rotate: rotation, scale, borderRadius }}
                    className="w-20 h-20 border-2 border-[#94A3B8] bg-[#94A3B8]/10 backdrop-blur-sm"
                />
            </div>
        </ModuleCard>
    )
}

const CursorDrivenModule = ({ quality }: { quality: string }) => {
    return (
        <ModuleCard title="Cursor Physics" subtitle="Proximity awareness" icon={Zap}>
            <Magnetic strength={0.4}>
                <div className="w-20 h-20 bg-[#EAEAF0] rounded-full flex items-center justify-center cursor-none group relative overflow-hidden">
                    <div className="w-3 h-3 bg-[#0B0D10] rounded-full group-hover:scale-[10] transition-transform duration-500 ease-out z-10" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#EAEAF0] opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-300 font-bold text-xs">
                        ACTIVE
                    </div>
                </div>
            </Magnetic>
        </ModuleCard>
    )
}

const GesturePhysicsModule = () => {
    const constraintsRef = useRef(null);

    return (
        <ModuleCard title="Gesture Physics" subtitle="Direct manipulation with inertia" icon={Move}>
            <motion.div ref={constraintsRef} className="w-full h-full relative p-8 cursor-grab active:cursor-grabbing">
                {/* Boundary visualization */}
                <div className="absolute inset-8 border border-dashed border-[#2D3442] rounded opacity-50" />
                
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    whileHover={{ scale: 1.1, cursor: "grab" }}
                    whileDrag={{ scale: 1.2, cursor: "grabbing" }}
                    className="w-20 h-20 bg-[#EAEAF0] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] absolute top-[calc(50%-40px)] left-[calc(50%-40px)] flex items-center justify-center z-20"
                >
                    <div className="w-2 h-2 bg-[#0B0D10] rounded-full" />
                </motion.div>
            </motion.div>
        </ModuleCard>
    )
}

const SpringPlaygroundModule = () => {
    const [stiffness, setStiffness] = useState(100);
    const [damping, setDamping] = useState(10);
    const [trigger, setTrigger] = useState(0);

    const x = useSpring(0, { stiffness, damping });

    useEffect(() => {
        x.set(trigger);
    }, [trigger, stiffness, damping, x]);

    return (
        <ModuleCard title="Spring Physics" subtitle="Interactive parameter tuning" icon={Sliders}>
            <div className="w-full h-full p-6 flex flex-col gap-6">
                
                <div 
                    className="flex-1 bg-[#0B0D10] rounded border border-[#2D3442] relative flex items-center cursor-pointer overflow-hidden"
                    onClick={() => setTrigger(trigger === 0 ? 100 : 0)}
                >
                     {/* Target Line */}
                     <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-[#2D3442] border-r border-dashed border-[#555A6B]" />
                     
                     <motion.div 
                        className="w-10 h-10 bg-[#94A3B8] rounded-full ml-8 shadow-[0_0_15px_rgba(148,163,184,0.3)] relative z-10"
                        style={{ x: useTransform(x, [0, 100], ["0%", "400%"]) }}
                     />
                     
                     <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#555A6B] pointer-events-none">CLICK TO TRIGGER</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                            <span>STIFFNESS</span>
                            <span>{stiffness}</span>
                        </div>
                        <input 
                            type="range" min="10" max="500" value={stiffness} 
                            onChange={(e) => setStiffness(Number(e.target.value))}
                            className="w-full h-1 bg-[#2D3442] rounded-lg appearance-none cursor-pointer accent-[#EAEAF0]"
                        />
                    </div>
                    <div className="space-y-2">
                         <div className="flex justify-between text-[10px] font-mono text-[#94A3B8]">
                            <span>DAMPING</span>
                            <span>{damping}</span>
                        </div>
                        <input 
                            type="range" min="1" max="100" value={damping} 
                            onChange={(e) => setDamping(Number(e.target.value))}
                            className="w-full h-1 bg-[#2D3442] rounded-lg appearance-none cursor-pointer accent-[#EAEAF0]"
                        />
                    </div>
                </div>
            </div>
        </ModuleCard>
    )
}

const LayoutMorphModule = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const items = [1, 2, 3, 4];

    return (
        <ModuleCard title="Shared Layout" subtitle="Geometry morphing (layoutId)" icon={viewMode === 'grid' ? Grid : List}>
            <div className="w-full h-full p-6 flex flex-col">
                <div className="flex justify-end mb-4">
                    <div className="flex bg-[#0B0D10] p-1 rounded-lg border border-[#2D3442]">
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#2D3442] text-white' : 'text-[#555A6B]'}`}>
                            <Grid size={14} />
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#2D3442] text-white' : 'text-[#555A6B]'}`}>
                            <List size={14} />
                        </button>
                    </div>
                </div>
                
                <motion.div layout className={`flex-1 gap-3 ${viewMode === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'}`}>
                    <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                        <motion.div
                            layoutId={`item-${item}`}
                            key={item}
                            className={`bg-[#2D3442] rounded-md border border-[#94A3B8]/20 relative overflow-hidden group ${viewMode === 'grid' ? 'aspect-square' : 'h-12 w-full'}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ ...SYSTEM_EASE, duration: 0.4 }}
                        >
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </ModuleCard>
    )
}

const SequenceRippleModule = () => {
    const [key, setKey] = useState(0);

    return (
        <ModuleCard title="Sequence Orchestration" subtitle="Staggered entry timing" icon={CircleDot}>
            <div className="w-full h-full p-6 flex flex-col items-center justify-center relative">
                 <button 
                    onClick={() => setKey(k => k + 1)}
                    className="absolute top-4 right-4 p-2 bg-[#2D3442] rounded-full hover:bg-[#94A3B8] hover:text-[#0B0D10] transition-colors"
                 >
                    <Play size={12} />
                 </button>

                 <div className="grid grid-cols-5 gap-3" key={key}>
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                                delay: i * 0.02, 
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }}
                            className="w-3 h-3 bg-[#94A3B8] rounded-full"
                        />
                    ))}
                 </div>
            </div>
        </ModuleCard>
    )
}

// --- VELOCITY TEXT SECTION ---

interface ParallaxTextProps {
  children: string;
  baseVelocity: number;
}

const VelocityTextSection = () => {
    return (
        <div className="py-24 border-y border-[#2D3442]/50 overflow-hidden relative bg-[#0B0D10]">
            <div className="absolute inset-0 bg-[#141821]/20" />
            <p className="text-[10px] font-mono text-[#555A6B] mb-12 uppercase tracking-widest px-8 md:px-0 relative z-10">02 / Kinetic Typography (Skew + Velocity)</p>
            <div className="flex flex-col gap-8 relative z-10">
                <ParallaxText baseVelocity={-2}>VELOCITY · MOMENTUM · FORCE ·</ParallaxText>
                <ParallaxText baseVelocity={2}>PHYSICS · INERTIA · DRAG ·</ParallaxText>
            </div>
        </div>
    )
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]); 

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div 
        className="font-bold uppercase text-6xl md:text-8xl flex whitespace-nowrap flex-nowrap text-[#2D3442] tracking-tighter" 
        style={{ x, skewX: skew }}
      >
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
        <span className="block mr-12">{children} </span>
      </motion.div>
    </div>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};


// --- TIMELINE SECTION ---

const TimelineSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const width = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

    return (
        <div ref={containerRef} className="py-24 relative overflow-hidden">
             <p className="text-[10px] font-mono text-[#555A6B] mb-12 uppercase tracking-widest text-center">03 / Scroll Timeline Assembly</p>
             
             <div className="flex flex-col gap-8 items-center justify-center min-h-[200px]">
                <div className="w-full max-w-lg h-1 bg-[#2D3442] relative rounded-full overflow-hidden">
                    <motion.div style={{ width, opacity }} className="absolute left-0 top-0 h-full bg-[#EAEAF0]" />
                </div>
                <div className="w-full max-w-md h-1 bg-[#2D3442] relative rounded-full overflow-hidden">
                     {/* Reverse motion */}
                    <motion.div style={{ width, opacity, right: 0, left: 'auto' }} className="absolute h-full bg-[#94A3B8]" />
                </div>
                <div className="flex justify-between w-full max-w-lg text-[10px] font-mono text-[#555A6B]">
                    <span>START_TRIGGER</span>
                    <span>END_TRIGGER</span>
                </div>
             </div>
        </div>
    )
}

// --- EASING SHOWCASE ---

const EasingShowcase = () => {
    const [ease, setEase] = useState<EaseType>('system');
    const [key, setKey] = useState(0); 

    const getEaseArray = (t: EaseType) => {
        switch(t) {
            case 'linear': return 'linear';
            case 'easeOut': return 'easeOut';
            case 'system': return SYSTEM_EASE;
        }
    }

    const triggerReplay = (newEase: EaseType) => {
        setEase(newEase);
        setKey(prev => prev + 1);
    }

    return (
        <div className="py-12">
             <p className="text-[10px] font-mono text-[#555A6B] mb-8 uppercase tracking-widest">04 / Easing Curve Logic</p>
             
             <div className="bg-[#141821]/30 border border-[#2D3442] rounded-lg p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20 text-[200px] leading-none font-bold text-[#2D3442] -z-10 select-none">
                    ƒ
                </div>

                {/* Animation Area */}
                <div className="h-32 relative border-b border-[#2D3442]/50 mb-8 flex items-center">
                    <motion.div 
                        key={key}
                        initial={{ x: 0 }}
                        animate={{ x: "90%" }}
                        transition={{ duration: 1.5, ease: getEaseArray(ease) }}
                        className="absolute left-0 w-12 h-12 bg-[#EAEAF0] rounded shadow-[0_0_20px_rgba(255,255,255,0.2)] z-10 flex items-center justify-center text-[#0B0D10] font-bold text-xs"
                    >
                        {ease === 'system' && "SYS"}
                    </motion.div>
                    
                    {/* Ghost Trails for comparison */}
                    <div className="absolute w-12 h-12 bg-[#2D3442] rounded left-0 opacity-20" />
                    <div className="absolute w-12 h-12 bg-[#2D3442] rounded left-[90%] opacity-20" />

                    <div className="absolute bottom-0 left-0 h-2 w-[1px] bg-[#555A6B]" />
                    <div className="absolute bottom-0 left-1/2 h-2 w-[1px] bg-[#555A6B]" />
                    <div className="absolute bottom-0 right-[10%] h-2 w-[1px] bg-[#555A6B]" />
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex gap-4">
                        {(['linear', 'easeOut', 'system'] as EaseType[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => triggerReplay(t)}
                                className={`px-4 py-2 text-xs font-mono uppercase tracking-wide border transition-all ${
                                    ease === t 
                                    ? "bg-[#94A3B8] text-[#0B0D10] border-[#94A3B8]" 
                                    : "bg-transparent text-[#555A6B] border-[#2D3442] hover:border-[#94A3B8]"
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#555A6B] font-mono cursor-pointer hover:text-[#EAEAF0] transition-colors" onClick={() => triggerReplay(ease)}>
                         <RefreshCw size={12} className={key > 0 ? "animate-spin" : ""} />
                         REPLAY_SIMULATION
                    </div>
                </div>
             </div>
        </div>
    )
}

export default AnimationLab;