import React from 'react';

interface GameStatsProps {
  score: number;
  level: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, level }) => (
  <div className="game-stats mb-4 flex justify-between text-xl pixel-text">
    <div>Score: {score}</div>
    <div>Level: {level}</div>
  </div>
);

export default GameStats;