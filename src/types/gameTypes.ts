export type CreatureType = 'fish' | 'jellyfish' | 'octopus' | 'shark' | 'whale';

export interface CreatureConfig {
  type: CreatureType;
  points: number;
  tapsRequired: number;
  speed: number;
  spawnRate: number;
  emoji: string;
}

export interface CreatureInstance {
  id: number;
  type: CreatureType;
  position: { x: number; y: number };
  direction: number;
}