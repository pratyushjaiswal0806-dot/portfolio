import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import Experiment from './Experiment';
import { ActionButton, Slider } from './controls';
import DecryptedText from '../ui/DecryptedText';

/** The hero's name effect, with your own text. */
const DecryptExperiment: React.FC = () => {
  const [text, setText] = useState('Pratyush Jaiswal');
  const [speed, setSpeed] = useState(0.4);
  const [replay, setReplay] = useState(0);
  const shown = text.trim() || 'Type something';

  return (
    <Experiment
      id="decrypt"
      title="Decrypt"
      hint="Hover the text to replay"
      summary={
        <>
          <p>Every 30 milliseconds a few more characters lock into place, left to right. The ones that haven’t yet show a random glyph in a monospace face, so the width doesn’t jump around.</p>
          <p>It’s the effect on my name on the home page. Try it with yours.</p>
        </>
      }
      usedOn={{ label: 'the name on the home page', to: '/' }}
      code={`
let revealed = 0;
const timer = setInterval(() => {
  revealed += ${speed.toFixed(2)}; // characters per tick
  setIteration(revealed);
  if (revealed >= text.length) clearInterval(timer);
}, 30);

// render: characters before \`revealed\` are real,
// the rest are random picks from A–Z, 0–9 and symbols
`}
      controls={
        <>
          <div>
            <label htmlFor="decrypt-text" className="block text-sm text-body mb-2">Text</label>
            <input
              id="decrypt-text"
              value={text}
              maxLength={22}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2.5 bg-obsidian border border-line text-ice text-sm focus:outline-hidden focus:border-accent"
            />
          </div>
          <Slider label="Characters per tick" value={speed} min={0.1} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={setSpeed} />
          <ActionButton onClick={() => setReplay((r) => r + 1)}>
            <RotateCcw className="w-3.5 h-3.5" /> Replay
          </ActionButton>
        </>
      }
    >
      <div className="h-[360px] flex items-center justify-center px-6 overflow-hidden">
        <h3 className="font-display font-bold tracking-tight text-ice text-[clamp(1.6rem,7.5vw,3.75rem)]">
          <DecryptedText text={shown} speed={speed} replayKey={replay} />
        </h3>
      </div>
    </Experiment>
  );
};

export default DecryptExperiment;
