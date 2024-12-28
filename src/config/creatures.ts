import { CreatureConfig } from '../types/gameTypes';

export const CREATURES_CONFIG: Record<string, CreatureConfig> = {
  fish: {
    type: 'fish',
    points: 1,
    tapsRequired: 2,
    speed: 3,
    spawnRate: 0.5,
    emoji: '🐟'
  },
  jellyfish: {
    type: 'jellyfish',
    points: 3,
    tapsRequired: 3,
    speed: 2,
    spawnRate: 0.3,
    emoji: '🎐'
  },
  octopus: {
    type: 'octopus',
    points: 5,
    tapsRequired: 5,
    speed: 2.5,
    spawnRate: 0.15,
    emoji: '🐙'
  },
  shark: {
    type: 'shark',
    points: 7,
    tapsRequired: 7,
    speed: 4,
    spawnRate: 0.1,
    emoji: '🦈'
  },
  whale: {
    type: 'whale',
    points: 10,
    tapsRequired: 4,
    speed: 6,
    spawnRate: 0.05,
    emoji: '🐋'
  }
};