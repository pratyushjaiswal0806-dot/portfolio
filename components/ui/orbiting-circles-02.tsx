"use client";

import React from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

import tsLogo from "../assets/icons8-typescript.svg";
import jsLogo from "../assets/icons8-javascript.svg";
import pyLogo from "../assets/icons8-python.svg";
import javaLogo from "../assets/icons8-java.svg";
import nodeLogo from "../assets/icons8-nodejs.svg";
import reactLogo from "../assets/icons8-react-40.png";
import tailwindLogo from "../assets/icons8-tailwind-css.svg";
import expressLogo from "../assets/icons8-express-js.svg";
import gitLogo from "../assets/icons8-git.svg";
import githubLogo from "../assets/icons8-github.svg";
import figmaLogo from "../assets/figma.svg";
import postmanLogo from "../assets/Postman-Icon--Streamline-Svg-Logos.svg";
import supabaseLogo from "../assets/Supabase-Icon--Streamline-Svg-Logos.svg";
import firebaseLogo from "../assets/icons8-firebase.svg";

interface OrbitItem {
  src: string;
  alt: string;
  angle: number;
  url: string;
}

interface OrbitRing {
  size: string;
  duration: number;
  icons: OrbitItem[];
}

const orbits: OrbitRing[] = [
  {
    size: "w-[240px] h-[240px] md:w-[340px] md:h-[340px]",
    duration: 18,
    icons: [
      { src: reactLogo, alt: "React", angle: 0, url: "https://react.dev/" },
      { src: tsLogo, alt: "TypeScript", angle: 90, url: "https://www.typescriptlang.org/" },
      { src: tailwindLogo, alt: "Tailwind CSS", angle: 180, url: "https://tailwindcss.com/" },
      { src: jsLogo, alt: "JavaScript", angle: 270, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    ],
  },
  {
    size: "w-[360px] h-[360px] md:w-[480px] md:h-[480px]",
    duration: 26,
    icons: [
      { src: nodeLogo, alt: "Node.js", angle: 0, url: "https://nodejs.org/" },
      { src: pyLogo, alt: "Python", angle: 72, url: "https://www.python.org/" },
      { src: expressLogo, alt: "Express", angle: 144, url: "https://expressjs.com/" },
      { src: supabaseLogo, alt: "Supabase", angle: 216, url: "https://supabase.com/" },
      { src: postmanLogo, alt: "Postman", angle: 288, url: "https://www.postman.com/" },
    ],
  },
  {
    size: "w-[480px] h-[480px] md:w-[640px] md:h-[640px]",
    duration: 34,
    icons: [
      { src: gitLogo, alt: "Git", angle: 0, url: "https://git-scm.com/" },
      { src: githubLogo, alt: "GitHub", angle: 72, url: "https://github.com/" },
      { src: figmaLogo, alt: "Figma", angle: 144, url: "https://www.figma.com/" },
      { src: javaLogo, alt: "Java", angle: 216, url: "https://dev.java/" },
      { src: firebaseLogo, alt: "Firebase", angle: 288, url: "https://firebase.google.com/" },
    ],
  },
];

export default function OrbitingCirclesGlobeDemo() {
  return (
    <div className="relative w-full h-[520px] md:h-[660px] overflow-hidden flex justify-center items-center select-none">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      {/* Center particle globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square pointer-events-none w-[180px] md:w-[280px] z-10">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        return (
          <div
            key={index}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2D3442]/50 ${orbit.size}`}
          >
            {orbit.icons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 h-1/2 -ml-4 md:-ml-5 origin-bottom flex flex-col justify-start items-center"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <a
                  href={iconData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${iconData.alt} official website`}
                  className="group relative -mt-4 md:-mt-5 z-20 hover:scale-130 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  {/* Clean un-encapsulated logo */}
                  <img
                    src={iconData.src}
                    alt={iconData.alt}
                    width={36}
                    height={36}
                    className="w-7 h-7 md:w-9 md:h-9 object-contain filter drop-shadow-[0_0_8px_rgba(234,234,240,0.15)] group-hover:drop-shadow-[0_0_14px_rgba(148,163,184,0.7)] transition-all duration-300 pointer-events-none"
                  />
                  {/* Hover Tooltip revealing icon name */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-mono font-medium tracking-wider text-[#EAEAF0] bg-[#141821]/95 border border-[#2D3442] rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl z-30">
                    {iconData.alt}
                  </span>
                </a>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
