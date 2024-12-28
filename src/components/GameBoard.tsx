import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { Timer } from './Timer';
import { Score } from './Score';
import { FallingObjects } from './FallingObjects';
import { Creature } from './Creature';
import { CREATURES_CONFIG } from '../config/creatures';
import { CreatureInstance } from '../types/gameTypes';

const GAME_DURATION = 30;
const MAX_CREATURES = 5;
const WHALE_APPEARANCES = 2;

export function GameBoard() {
  const [creatures, setCreatures] = useState<CreatureInstance[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [whaleCount, setWhaleCount] = useState(0);

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const spawnInterval = setInterval(() => {
      if (creatures.length < MAX_CREATURES) {
        const random = Math.random();
        let selectedType = Object.values(CREATURES_CONFIG).find(
          config => random <= config.spawnRate
        );

        // Handle whale spawning limit
        if (selectedType?.type === 'whale' && whaleCount >= WHALE_APPEARANCES) {
          selectedType = CREATURES_CONFIG.fish;
        }

        if (selectedType) {
          const newCreature: CreatureInstance = {
            id: Date.now(),
            type: selectedType.type,
            position: {
              x: Math.random() < 0.5 ? -50 : window.innerWidth,
              y: Math.random() * (window.innerHeight - 100)
            },
            direction: Math.random() < 0.5 ? 1 : -1
          };

          setCreatures(prev => [...prev, newCreature]);
          if (selectedType.type === 'whale') {
            setWhaleCount(prev => prev + 1);
          }
        }
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, creatures.length, whaleCount]);

  const handleCatch = (id: number, type: string) => {
    const config = CREATURES_CONFIG[type];
    setScore(prev => prev + config.points);
    setCreatures(prev => prev.filter(creature => creature.id !== id));
  };

  const handleEscape = (id: number) => {
    setCreatures(prev => prev.filter(creature => creature.id !== id));
  };

  const startNewGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setCreatures([]);
    setWhaleCount(0);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-200 to-blue-400 overflow-hidden">
      {/* Only show falling objects when game is not started */}
      {!gameStarted && <FallingObjects />}
      
      {/* Only show navigation when game is not started */}
      {!gameStarted && <Navigation />}
      
      {!gameStarted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          {timeLeft === 0 && (
            <div className="text-3xl font-bold text-white mb-4">
              Final Score: {score}
            </div>
          )}
          <button
            onClick={startNewGame}
            className="px-8 py-4 text-2xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {timeLeft === 0 ? 'Play Again' : 'Start Game'}
          </button>
        </div>
      ) : (
        <>
          <Score score={score} />
          <Timer timeLeft={timeLeft} />
          {creatures.map(creature => (
            <Creature
              key={creature.id}
              config={CREATURES_CONFIG[creature.type]}
              position={creature.position}
              direction={creature.direction}
              onCatch={() => handleCatch(creature.id, creature.type)}
              onEscape={() => handleEscape(creature.id)}
            />
          ))}
        </>
      )}
    </div>
  );
}