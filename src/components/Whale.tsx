import React, { useEffect, useState } from 'react';
import { Fish } from 'lucide-react';

interface WhaleProps {
  size: 'small' | 'medium' | 'large';
  onCatch: () => void;
  onEscape: () => void;
}

export function Whale({ size, onCatch, onEscape }: WhaleProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [taps, setTaps] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const sizeMap = {
    small: { width: 32, speed: 2, points: 10 },
    medium: { width: 48, speed: 3, points: 20 },
    large: { width: 64, speed: 4, points: 30 },
  };

  useEffect(() => {
    const startX = Math.random() * (window.innerWidth - sizeMap[size].width);
    const startY = Math.random() * (window.innerHeight - sizeMap[size].width);
    setPosition({ x: startX, y: startY });

    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + sizeMap[size].speed * direction;
        let newDirection = direction;

        // Check if whale has reached the edge
        if (newX > window.innerWidth - sizeMap[size].width || newX < 0) {
          onEscape();
          return prev;
        }

        return {
          x: newX,
          y: prev.y + Math.sin(newX / 50) * 2, // Add wavy motion
        };
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [size, direction, onEscape]);

  const handleClick = () => {
    const newTaps = taps + 1;
    setTaps(newTaps);
    
    if (newTaps >= 3) {
      onCatch();
    }
  };

  return (
    <div
      className={`absolute transition-transform cursor-pointer
        ${direction === -1 ? 'scale-x-[-1]' : ''}
        ${taps === 1 ? 'text-blue-400' : ''}
        ${taps === 2 ? 'text-blue-600' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onClick={handleClick}
    >
      <Fish size={sizeMap[size].width} className="animate-bounce" />
    </div>
  );
}