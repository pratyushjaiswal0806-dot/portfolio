import React from 'react';

/* A deliberately tiny highlighter: comments, strings, keywords, numbers and
   function calls. Enough for short snippets without shipping a parser. */
const TOKEN =
  /(\/\/.*$|\/\*[\s\S]*?\*\/)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|\b(const|let|return|import|from|function|await|new|if|else|true|false|export|default|type)\b|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\()/gm;

const COLORS = ['#555A6B', '#B8D4A8', '#8FA6CB', '#E6C07B', '#EAEAF0'];

const highlight = (code: string) => {
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(TOKEN)) {
    const index = m.index ?? 0;
    if (index > last) out.push(code.slice(last, index));
    const group = m.slice(1, 6).findIndex(Boolean);
    out.push(
      <span key={key++} style={{ color: COLORS[group], fontStyle: group === 0 ? 'italic' : undefined }}>
        {m[0]}
      </span>,
    );
    last = index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
};

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre className="m-0 p-5 sm:p-6 overflow-x-auto text-[13px] leading-[1.75] font-mono text-body min-h-[360px] scrollbar-hide">
    <code>{highlight(code.trim())}</code>
  </pre>
);

export default CodeBlock;
