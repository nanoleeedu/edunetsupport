
import React, { useState, useEffect } from 'react';

const bootLines = [
  'Initialising Edunet Support System...',
  'Loading AI Custodian core...',
  'Establishing secure link with portal database...',
  'Ready.',
  '> Welcome, user. Type a command to begin.',
];

interface BootAnimationProps {
  onComplete: () => void;
}

const BootAnimation: React.FC<BootAnimationProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [visibleLineIndex, setVisibleLineIndex] = useState(0);

  useEffect(() => {
    if (visibleLineIndex < bootLines.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, bootLines[visibleLineIndex]]);
        setVisibleLineIndex(prev => prev + 1);
      }, 700); // Delay between lines
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(onComplete, 1200); // Wait after last line
      return () => clearTimeout(finalTimeout);
    }
  }, [visibleLineIndex, onComplete]);

  return (
    <div className="w-full max-w-2xl p-4 font-mono-console text-[#32cd32]">
      {lines.map((line, index) => (
        <p key={index} className="animate-fadeIn">{line}</p>
      ))}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BootAnimation;
