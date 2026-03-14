import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';

const Intro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress for entrance animations (text reveal)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.25"]
  });

  // Smooth out the scroll progress for a liquid feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll progress for exit animations (background drift)
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const content = [
    { text: "I'm a ", type: "normal" },
    { text: "Computer Science", type: "highlight" },
    { text: " student who thrives on ", type: "normal" },
    { text: "building projects", type: "highlight" },
    { text: ", learning ", type: "normal" },
    { text: "new technologies", type: "highlight" },
    { text: ", and solving ", type: "normal" },
    { text: "real-world problems", type: "highlight" },
    { text: " with code that's clean, thoughtful, and ", type: "normal" },
    { text: "built to last", type: "highlight" },
    { text: ".", type: "normal" },
  ];

  // Flatten the content into individual words for granular animation
  const words: { text: string; isHighlight: boolean }[] = [];
  content.forEach(segment => {
    segment.text.split(" ").forEach(word => {
      if (word) {
        words.push({ text: word, isHighlight: segment.type === "highlight" });
      }
    });
  });

  // Metadata appears in the final 15% of the entrance sequence
  const metaOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);
  const metaY = useTransform(smoothProgress, [0.85, 1], [30, 0]);

  // Background elements drift up and fade out as user scrolls past
  const bgY = useTransform(exitProgress, [0, 1], [0, -200]);
  const bgOpacity = useTransform(exitProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="py-24 md:py-40 px-6 md:px-24 bg-[#0B0D10] relative z-20 overflow-hidden min-h-[80vh] flex flex-col justify-center">

      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        {/* Subtle Gradient Orb */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#94A3B8]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />

        {/* Architectural Vertical Guide Line */}
        <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-[#2D3442]/20" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Divider line that grows with scroll */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-[#94A3B8] to-transparent mb-16"
          style={{ scaleX: smoothProgress, transformOrigin: "left" }}
        />

        <p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight text-[#EAEAF0] flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2">
          {words.map((wordObj, i) => (
            <ScrollWord
              key={i}
              word={wordObj.text}
              isHighlight={wordObj.isHighlight}
              index={i}
              total={words.length}
              progress={smoothProgress}
            />
          ))}
        </p>

        <motion.div
          className="mt-20 flex flex-col md:flex-row gap-12 text-[#9AA0B2]"
          style={{ opacity: metaOpacity, y: metaY }}
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#94A3B8] font-bold">Based In</span>
            <span className="text-[#EAEAF0] text-lg">Bangalore, India</span>
          </div>
          <div className="hidden md:block w-[1px] bg-[#2D3442] h-12"></div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#94A3B8] font-bold">Availability</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[#EAEAF0] text-lg">Open for opportunities</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ScrollWordProps {
  word: string;
  isHighlight: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const ScrollWord: React.FC<ScrollWordProps> = ({ word, isHighlight, index, total, progress }) => {
  // Calculate the range for this specific word based on scroll
  const step = 0.9 / total; // Use 90% of the scroll space for text
  const start = index * step;
  const end = start + 0.25; // Overlap slightly for fluid feel

  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [15, 0]);
  const blur = useTransform(progress, [start, end], [4, 0]);
  const color = useTransform(progress, [start, end], ["#334155", isHighlight ? "#94A3B8" : "#EAEAF0"]); // Slate-700 to Highlight/White

  // Dynamic filter string
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <span className="relative inline-block">
      <motion.span
        style={{ opacity, y, filter, color }}
        className="inline-block transition-colors duration-200"
      >
        {word}
      </motion.span>
    </span>
  );
};

export default Intro;