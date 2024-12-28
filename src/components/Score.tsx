import React from 'react';

interface ScoreProps {
  score: number;
}

export function Score({ score }: ScoreProps) {
  return (
    <div className="absolute top-4 left-4 bg-white/80 rounded-lg px-4 py-2 font-bold text-xl">
      Score: {score}
    </div>
  );
}