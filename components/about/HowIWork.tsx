import React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { getProject } from '../../data/projects';

const principles = [
  {
    title: 'Find the core flow',
    body: 'Messy requirements usually hide one flow that really matters. I find it first and design outwards from there.',
    slug: 'robofiesta-26',
    practice: 'RoboFiesta’s registration came down to three steps: choose an arena, register the team, pay and upload proof.',
  },
  {
    title: 'Design every state',
    body: 'Loading, empty, error, slow network. The states in between are where an interface earns trust, so they get designed too.',
    slug: 'tech-token-heist',
    practice: 'In Tech Token Heist, queue, match and gameplay each got their own screen, so 24 teams always knew what was happening.',
  },
  {
    title: 'Leave code a team can extend',
    body: 'Small, typed, reusable components, so the next feature is easier to build than the last one.',
    slug: 'fancall',
    practice: 'At Fancall, Figma screens became reusable React components instead of one-off pages.',
  },
];

const HowIWork: React.FC = () => (
  <div>
    <ul className="border-t border-line">
      {principles.map((p) => {
        const project = getProject(p.slug)!;
        return (
          <li key={p.title} className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 md:gap-10 py-9 border-b border-line">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-ice tracking-tight leading-tight">{p.title}</h3>
            <div>
              <p className="text-lg text-[#B4BBC8] leading-relaxed">{p.body}</p>
              <Link
                to={`/work/${project.slug}`}
                viewTransition
                data-cursor="hover"
                className="group mt-5 flex gap-3 text-sm text-body leading-relaxed hover:text-ice transition-colors"
              >
                <span className="mt-[7px] w-1.5 h-1.5 shrink-0" style={{ background: project.accent.base }} />
                <span>
                  {p.practice}{' '}
                  <span className="inline-flex items-center gap-1 whitespace-nowrap text-ice underline decoration-line underline-offset-4 group-hover:decoration-accent">
                    {project.title} <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </span>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>

    <blockquote className="mt-16 md:mt-20 max-w-3xl">
      <p className="font-display text-3xl md:text-[2.6rem] font-medium text-ice leading-[1.15] tracking-tight">
        “Build the smallest useful version, test it honestly, then improve what matters.”
      </p>
      <footer className="mt-5 flex items-center gap-3 text-sm text-dim">
        <span className="w-6 h-px bg-accent" /> The rule I come back to on every project
      </footer>
    </blockquote>
  </div>
);

export default HowIWork;
