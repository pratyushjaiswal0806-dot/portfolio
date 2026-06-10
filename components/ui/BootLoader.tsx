import React from 'react';
import { motion } from 'framer-motion';

const BootLoader: React.FC = () => {
  const bootLines = [
    'INITIALIZING PJ.SYSTEM',
    'LOADING INTERFACE MODULES',
    'COMPILING PROJECT INDEX',
    'SYSTEM READY'
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[10000] bg-[#0B0D10] flex items-center justify-center px-6"
      aria-label="Portfolio loading"
    >
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[#EAEAF0] font-bold text-2xl tracking-tight">
            PJ<span className="text-[#94A3B8]">.</span>SYSTEM
          </span>
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">
            Boot Sequence
          </span>
        </div>

        <div className="border border-[#2D3442] bg-[#141821]/60 rounded-md overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2D3442]">
            <span className="w-2 h-2 rounded-full bg-red-500/25" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/25" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2 text-[10px] font-mono text-[#555A6B] uppercase tracking-widest">
              terminal_00
            </span>
          </div>

          <div className="p-5 space-y-3">
            {bootLines.map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.16, duration: 0.28 }}
                className="flex items-center gap-3 text-xs md:text-sm font-mono text-[#9AA0B2]"
              >
                <span className="text-[#94A3B8]">&gt;</span>
                <span>{line}</span>
              </motion.div>
            ))}

            <div className="pt-4">
              <div className="h-px bg-[#2D3442] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-[#94A3B8] origin-left"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BootLoader;
