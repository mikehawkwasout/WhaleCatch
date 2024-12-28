import { useState, useEffect } from 'react';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
  duration: number;
  size: number;
  opacity: number;
}

export function useFallingItems(emojis: string[]) {
  const [items, setItems] = useState<FallingItem[]>([]);

  useEffect(() => {
    const createItem = (): FallingItem => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: -10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      duration: 3 + Math.random() * 4,
      size: 20 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.7,
    });

    const addItem = () => {
      setItems(prev => [...prev, createItem()]);
    };

    const removeOldItems = () => {
      setItems(prev => prev.filter(item => {
        const itemAge = Date.now() - item.id;
        return itemAge < item.duration * 1000;
      }));
    };

    const spawnInterval = setInterval(addItem, 300);
    const cleanupInterval = setInterval(removeOldItems, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(cleanupInterval);
    };
  }, [emojis]);

  return items;
}