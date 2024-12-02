import React from 'react';
import { HeartCrack } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10 rounded-lg">
    <HeartCrack className="w-24 h-24 text-pink-400 mb-4 animate-pulse" />
    <div className="pixel-text text-4xl text-pink-400 mb-2">GAME OVER</div>
    <div className="text-2xl mb-8 pixel-text text-white">Final Score: {score}</div>
    <button
      onClick={onRestart}
      className="pixel-button bg-pink-500 hover:bg-pink-400 text-white px-8 py-4 text-xl"
    >
      Play Again?
    </button>
  </div>
);

export default GameOver;