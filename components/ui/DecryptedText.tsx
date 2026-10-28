import React, { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&^*=-+';

interface DecryptedTextProps {
  text: string;
  className?: string;
  animateOnHover?: boolean;
  /** Characters revealed per 30ms tick. The hero uses 0.4. */
  speed?: number;
  /** Change this to replay the effect from outside (the Motion Lab does). */
  replayKey?: number;
}

/** Scrambles each character, then resolves left to right. Used on the hero name. */
const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  animateOnHover = true,
  speed = 0.4,
  replayKey = 0,
}) => {
  const [iteration, setIteration] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIteration(0);
    let localIteration = 0;
    intervalRef.current = setInterval(() => {
      localIteration += speed;
      setIteration(localIteration);
      if (localIteration >= text.length && intervalRef.current) clearInterval(intervalRef.current);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, animateOnHover, speed, replayKey]);

  const handleHover = () => {
    if (!animateOnHover || iteration < text.length) return;
    runAnimation();
  };

  return (
    <span className={`inline-flex whitespace-nowrap select-none ${className}`} onMouseEnter={handleHover}>
      {text.split('').map((char, index) => {
        // Preserve spaces as non-breaking to maintain shape
        if (char === ' ') return <span key={index} className="w-[0.3em] inline-block">&nbsp;</span>;
        const isRevealed = index < iteration;
        return (
          <span
            key={index}
            className={`inline-block text-center ${isRevealed ? '' : 'text-[#94A3B8] opacity-50 font-mono'}`}
            style={{ minWidth: '0.52em' }}
          >
            {isRevealed ? char : CHARS[Math.floor(Math.random() * CHARS.length)]}
          </span>
        );
      })}
    </span>
  );
};

export default DecryptedText;
