import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from './motion';

interface PageHeaderProps {
  kicker: string;
  title: React.ReactNode;
  inspectName: string;
  children?: React.ReactNode;
}

/** Shared top-of-page block for every page except home. */
const PageHeader: React.FC<PageHeaderProps> = ({ kicker, title, inspectName, children }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <header
      data-inspect={inspectName}
      className="relative pt-32 md:pt-44 pb-12 md:pb-16 px-5 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-grid-fade pointer-events-none" />
      <motion.div
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
        className="max-w-[1248px] mx-auto relative"
      >
        <motion.span variants={fadeUp} className="section-kicker">{kicker}</motion.span>
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-8xl font-bold text-ice tracking-tight leading-[0.98]">
          {title}
        </motion.h1>
        {children && <motion.div variants={fadeUp}>{children}</motion.div>}
      </motion.div>
    </header>
  );
};

export default PageHeader;
