import React, { useState } from 'react';
import { Link } from 'react-router';
import { Check, Copy } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface ExperimentProps {
  id: string;
  title: string;
  summary: React.ReactNode;
  usedOn?: { label: string; to: string };
  controls?: React.ReactNode;
  code: string;
  hint?: string;
  children: React.ReactNode;
}

/** One lab specimen: explanation and controls on the left, a live stage on the right
 *  with the code behind it one tab away. The stage stays mounted while viewing code. */
const Experiment: React.FC<ExperimentProps> = ({ id, title, summary, usedOn, controls, code, hint, children }) => {
  const [tab, setTab] = useState<'demo' | 'code'>('demo');
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <section id={id} data-inspect={`Lab:${title}`} className="relative scroll-mt-28">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 py-16 md:py-20 border-t border-line/70">
        <div className="lg:col-span-4 min-w-0">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ice tracking-tight">{title}</h2>
          <div className="mt-4 text-body leading-relaxed space-y-3">{summary}</div>
          {usedOn && (
            <p className="mt-4 text-sm text-dim">
              On this site:{' '}
              <Link to={usedOn.to} viewTransition className="text-ice underline decoration-line underline-offset-4 hover:decoration-accent">
                {usedOn.label}
              </Link>
            </p>
          )}
          {controls && <div className="mt-8 space-y-6">{controls}</div>}
        </div>

        <div className="lg:col-span-8 min-w-0">
          <div className="border border-line bg-panel">
            <div className="flex items-center justify-between gap-4 px-3 h-11 border-b border-line">
              <div className="flex" role="tablist" aria-label={`${title} view`}>
                {(['demo', 'code'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`px-3 h-11 text-xs capitalize border-b transition-colors ${
                      tab === t ? 'text-ice border-accent' : 'text-dim border-transparent hover:text-ice'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {tab === 'code' ? (
                <button type="button" onClick={copy} className="flex items-center gap-1.5 text-xs text-dim hover:text-ice transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              ) : (
                hint && <span className="text-xs text-dim truncate">{hint}</span>
              )}
            </div>
            <div className={tab === 'demo' ? 'relative' : 'hidden'}>
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                  backgroundImage: 'linear-gradient(#EAEAF0 1px, transparent 1px), linear-gradient(90deg, #EAEAF0 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative">{children}</div>
            </div>
            {tab === 'code' && <CodeBlock code={code} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiment;
