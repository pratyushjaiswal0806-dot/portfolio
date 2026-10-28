import React from 'react';
import Hero from '../components/sections/Hero';
import Intro from '../components/sections/Intro';
import FeaturedWork from '../components/sections/FeaturedWork';
import WhatIDo from '../components/sections/WhatIDo';
import NowStrip from '../components/sections/NowStrip';
import LatestNote from '../components/sections/LatestNote';
import Contact from '../components/sections/Contact';
import { usePageMeta } from '../lib/usePageMeta';
import { useHashScroll } from '../lib/useHashScroll';

const HomePage: React.FC = () => {
  usePageMeta({
    title: 'Pratyush Jaiswal — Frontend Developer',
    description:
      'Pratyush Jaiswal is a frontend developer in Bengaluru building fast, expressive web interfaces — tech-fest sites, real-time game platforms and developer tools — with React, TypeScript and motion.',
    path: '/',
  });

  // "/#contact" from another page: scroll once the sections have mounted.
  useHashScroll();

  return (
    <>
      <Hero />
      <Intro />
      <FeaturedWork />
      <WhatIDo />
      <NowStrip />
      <LatestNote />
      <Contact />
    </>
  );
};

export default HomePage;
