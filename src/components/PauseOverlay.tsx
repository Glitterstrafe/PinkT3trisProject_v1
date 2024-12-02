import React from 'react';
import { Heart } from 'lucide-react';

const PauseOverlay: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
    <div className="relative flex flex-col items-center">
      <Heart 
        className="w-32 h-32 text-pink-400 animate-pulse" 
        fill="currentColor"
      />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pixel-text text-white text-xl">
        PAUSED
      </span>
    </div>
  </div>
);

export default PauseOverlay;