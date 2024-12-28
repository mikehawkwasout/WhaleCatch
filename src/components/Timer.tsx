import React from 'react';

interface TimerProps {
  timeLeft: number;
}

export function Timer({ timeLeft }: TimerProps) {
  return (
    <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-4 py-2 font-bold text-xl">
      Time: {timeLeft}s
    </div>
  );
}