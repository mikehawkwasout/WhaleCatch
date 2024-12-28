import React, { useState, useEffect, useRef } from 'react';
import { CreatureConfig } from '../types/gameTypes';

interface CreatureProps {
  config: CreatureConfig;
  position: { x: number; y: number };
  direction: number;
  onCatch: () => void;
  onEscape: () => void;
}

export function Creature({ config, position: initialPosition, direction, onCatch, onEscape }: CreatureProps) {
  const [taps, setTaps] = useState(0);
  const [position, setPosition] = useState(initialPosition);
  const positionRef = useRef(position);
  positionRef.current = position;

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => {
        const newX = prev.x + config.speed * direction;
        const newY = prev.y + Math.sin(newX / 50) * 2; // Add wavy motion
        
        if (newX > window.innerWidth + 50 || newX < -50) {
          onEscape();
        }
        
        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [config.speed, direction, onEscape]);

  const handleClick = () => {
    const newTaps = taps + 1;
    setTaps(newTaps);
    
    if (newTaps >= config.tapsRequired) {
      onCatch();
    }
  };

  return (
    <div
      className={`absolute transition-transform cursor-pointer select-none
        ${direction === -1 ? 'scale-x-[-1]' : ''}
        ${taps > 0 ? 'animate-pulse' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        fontSize: `${config.type === 'whale' ? '64px' : '48px'}`,
      }}
      onClick={handleClick}
    >
      {config.emoji}
      {taps > 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-sm bg-white/80 px-2 py-1 rounded">
          {config.tapsRequired - taps} more
        </div>
      )}
    </div>
  );
}