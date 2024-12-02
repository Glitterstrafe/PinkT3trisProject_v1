import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const MagicalBackground: React.FC = () => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const createStars = () => {
      const newStars = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 10,
        size: Math.random() * 2 + 1
      }));
      setStars(newStars);
    };

    createStars();
    const interval = setInterval(createStars, 15000); // Recreate stars every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <React.Fragment key={star.id}>
          <div
            className="absolute rounded-full bg-white opacity-0 animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`
            }}
          />
          {Math.random() > 0.8 && ( // 20% chance to show a heart instead of a star
            <Heart
              className="absolute w-3 h-3 text-pink-400 opacity-0 animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                animationDelay: `${star.delay + 1}s`
              }}
              fill="currentColor"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MagicalBackground;