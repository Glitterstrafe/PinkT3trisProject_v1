import React from 'react';
import { Heart } from 'lucide-react';

interface LivesProps {
  lives: number;
}

const Lives: React.FC<LivesProps> = ({ lives }) => (
  <div className="flex gap-2 justify-center mt-4">
    {[...Array(lives)].map((_, i) => (
      <Heart
        key={i}
        className="w-6 h-6 text-pink-400 animate-pulse"
        fill="currentColor"
      />
    ))}
  </div>
);

export default Lives;