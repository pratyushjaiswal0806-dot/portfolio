import tsLogo from '../components/assets/icons8-typescript.svg';
import jsLogo from '../components/assets/icons8-javascript.svg';
import pyLogo from '../components/assets/icons8-python.svg';
import javaLogo from '../components/assets/icons8-java.svg';
import nodeLogo from '../components/assets/icons8-nodejs.svg';
import reactLogo from '../components/assets/icons8-react-40.png';
import tailwindLogo from '../components/assets/icons8-tailwind-css.svg';
import expressLogo from '../components/assets/icons8-express-js.svg';
import gitLogo from '../components/assets/icons8-git.svg';
import githubLogo from '../components/assets/icons8-github.svg';
import figmaLogo from '../components/assets/figma.svg';
import postmanLogo from '../components/assets/Postman-Icon--Streamline-Svg-Logos.svg';
import supabaseLogo from '../components/assets/Supabase-Icon--Streamline-Svg-Logos.svg';
import firebaseLogo from '../components/assets/icons8-firebase.svg';
import nextLogo from '../components/assets/nextjs.svg';
import motionLogo from '../components/assets/framer-motion.svg';

export interface Technology {
  name: string;
  icon: string;
  /** Brand colour, used for hover accents. */
  color: string;
  /** Monochrome dark logos need inverting on the obsidian background. */
  invert?: boolean;
}

export const technologies = {
  React: { name: 'React', icon: reactLogo, color: '#61DAFB' },
  TypeScript: { name: 'TypeScript', icon: tsLogo, color: '#3178C6' },
  Next: { name: 'Next.js', icon: nextLogo, color: '#EAEAF0' },
  Tailwind: { name: 'Tailwind CSS', icon: tailwindLogo, color: '#06B6D4' },
  Motion: { name: 'Framer Motion', icon: motionLogo, color: '#FFF312' },
  JavaScript: { name: 'JavaScript', icon: jsLogo, color: '#F7DF1E' },
  Node: { name: 'Node.js', icon: nodeLogo, color: '#5FA04E' },
  Express: { name: 'Express', icon: expressLogo, color: '#EAEAF0', invert: true },
  Supabase: { name: 'Supabase', icon: supabaseLogo, color: '#3ECF8E' },
  Firebase: { name: 'Firebase', icon: firebaseLogo, color: '#FFCA28' },
  Python: { name: 'Python', icon: pyLogo, color: '#3776AB' },
  Java: { name: 'Java', icon: javaLogo, color: '#ED8B00' },
  Git: { name: 'Git', icon: gitLogo, color: '#F05032' },
  GitHub: { name: 'GitHub', icon: githubLogo, color: '#EAEAF0', invert: true },
  Figma: { name: 'Figma', icon: figmaLogo, color: '#F24E1E' },
  Postman: { name: 'Postman', icon: postmanLogo, color: '#FF6C37' },
} satisfies Record<string, Technology>;

export type TechKey = keyof typeof technologies;

/** How the about page groups the toolkit, from most to least used. */
export const toolkitGroups: { label: string; note: string; items: TechKey[] }[] = [
  { label: 'Every day', note: 'What most of my work is built with.', items: ['React', 'TypeScript', 'Next', 'Tailwind', 'Motion'] },
  { label: 'When the project needs it', note: 'Back ends, data and the languages I learned along the way.', items: ['JavaScript', 'Node', 'Express', 'Supabase', 'Firebase', 'Python', 'Java'] },
  { label: 'Workflow', note: 'Design hand-off, version control and API testing.', items: ['Git', 'GitHub', 'Figma', 'Postman'] },
];
