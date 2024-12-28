import React from 'react';
import { Cloud } from 'lucide-react';
import { useFallingItems } from '../hooks/useFallingItems';

const EMOJIS = ['🐟', '🐠', '🐡', '🦈', '🐋', '🐳', '🦀', '🦞', '🦐', '🐚', '🍳'];

export function FallingObjects() {
  const items = useFallingItems(EMOJIS);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Cloud at the top */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-white/50">
        <Cloud size={120} />
      </div>

      {/* Falling items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-fall"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}