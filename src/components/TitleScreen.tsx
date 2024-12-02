import React from 'react';
import { Heart } from 'lucide-react';

interface TitleScreenProps {
  onStart: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
    <div className="pixel-text text-4xl md:text-6xl mb-8 text-pink-300 text-center space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Heart className="w-12 h-12 text-pink-400" fill="currentColor" />
        Let's Play Cute Tetris
        <Heart className="w-12 h-12 text-pink-400" fill="currentColor" />
      </div>
    </div>
    <button
      onClick={onStart}
      className="pixel-button bg-pink-500 hover:bg-pink-400 text-white px-8 py-4 text-2xl transition-all"
    >
      START GAME
    </button>
  </div>
);

export default TitleScreen;