import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartEffectsProps {
  linesCleared: number;
  onEffectComplete: () => void;
}

const HeartEffects: React.FC<HeartEffectsProps> = ({ linesCleared, onEffectComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (linesCleared > 0 && !isAnimating) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onEffectComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [linesCleared, onEffectComplete, isAnimating]);

  if (!isAnimating) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {linesCleared === 1 ? (
        <Heart
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-400 animate-[singleHeart_1s_ease-out_forwards]"
          style={{ width: '100px', height: '100px' }}
          fill="currentColor"
        />
      ) : (
        [...Array(linesCleared * 3)].map((_, id) => (
          <Heart
            key={id}
            className="absolute text-pink-400 animate-[multipleHearts_1s_ease-out_forwards]"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              bottom: '-20px',
              width: '40px',
              height: '40px',
              animationDelay: `${id * 100}ms`
            }}
            fill="currentColor"
          />
        ))
      )}
    </div>
  );
};

export default HeartEffects;