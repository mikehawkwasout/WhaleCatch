import React, { useEffect, useState } from 'react';

interface SpecialWhaleProps {
  onEscape: () => void;
}

export function SpecialWhale({ onEscape }: SpecialWhaleProps) {
  const [position, setPosition] = useState({ x: -100, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (Math.random() < 0.1 && !isActive) { // 10% chance every check
        setIsActive(true);
        const randomY = Math.random() * (window.innerHeight - 50);
        setPosition({ x: -100, y: randomY });
      }
    }, 5000);

    return () => clearInterval(spawnInterval);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const moveInterval = setInterval(() => {
      setPosition(prev => {
        const newX = prev.x + 10; // Move faster than regular whales
        
        if (newX > window.innerWidth) {
          setIsActive(false);
          onEscape();
          return prev;
        }

        return { ...prev, x: newX };
      });
    }, 20);

    return () => clearInterval(moveInterval);
  }, [isActive, onEscape]);

  if (!isActive) return null;

  return (
    <div
      className="absolute transition-transform"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <img 
        src="https://cdn.freewebstore.com/origin/919667/untitled50x50px1_1735359124645.png"
        alt="Special Whale"
        className="w-[50px] h-[50px]"
      />
    </div>
  );
}