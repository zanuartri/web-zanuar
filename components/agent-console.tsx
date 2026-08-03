'use client';

import { useEffect, useState } from 'react';
import { TerminalWindow } from '@/components/terminal-window';

const LINES = [
  '$ agent.run("review checkout flow coverage")',
  '> retrieving context (RAG)',
  '> planning: break task into steps',
  '> calling tool: run_tests',
  '> reviewing output...',
  '> self-correcting on failure',
  '> eval passed ✓',
];

const TYPE_MS = 22;
const LINE_PAUSE_MS = 450;
const LOOP_PAUSE_MS = 2200;

export function AgentConsole() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const t = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, LOOP_PAUSE_MS);
      return () => clearTimeout(t);
    }

    const currentLine = LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), TYPE_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, LINE_PAUSE_MS);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  const completedLines = LINES.slice(0, lineIndex);
  const typingLine = lineIndex < LINES.length ? LINES[lineIndex].slice(0, charIndex) : '';

  return (
    <TerminalWindow title="agent.log">
      <div className="min-h-[220px] space-y-1.5">
        {completedLines.map((line, i) => (
          <p key={i} className={lineColor(line)}>
            {line}
          </p>
        ))}
        {lineIndex < LINES.length && (
          <p className={lineColor(LINES[lineIndex])}>
            {typingLine}
            <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-lime" />
          </p>
        )}
      </div>
    </TerminalWindow>
  );
}

function lineColor(line: string) {
  if (line.startsWith('$')) return 'text-lime';
  if (line.startsWith('> eval')) return 'text-paper';
  return 'text-paper/60';
}
