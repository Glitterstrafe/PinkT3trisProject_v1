import React, { useEffect, useState } from 'react';
import { speedToSlider, sliderToSpeed } from '../utils/speedUtils';
import { MAX_SPEED, MIN_SPEED } from '../utils/constants';

interface SpeedControlProps {
  level: number;
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
}

const SpeedControl: React.FC<SpeedControlProps> = ({ 
  level, 
  currentSpeed,
  onSpeedChange
}) => {
  // Ensure initial slider value is always a number
  const [sliderValue, setSliderValue] = useState(() => {
    const initialSliderValue = speedToSlider(currentSpeed);
    return isNaN(initialSliderValue) ? 0 : initialSliderValue;
  });

  useEffect(() => {
    const newSliderValue = speedToSlider(currentSpeed);
    // Add a safety check to prevent NaN
    setSliderValue(isNaN(newSliderValue) ? 0 : newSliderValue);
  }, [currentSpeed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure parsed value is a number
    const newSliderValue = Number.isNaN(parseInt(e.target.value, 10)) 
      ? 0 
      : parseInt(e.target.value, 10);
    
    setSliderValue(newSliderValue);
    const newSpeed = sliderToSpeed(newSliderValue);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="mystical-panel p-4">
      <h3 className="pixel-text text-sm mb-3 text-pink-200">
        Game Speed (Level {level})
      </h3>
      <input
        type="range"
        min="0"
        max="90"
        // Ensure value is always a number
        value={Number.isNaN(sliderValue) ? 0 : sliderValue}
        onChange={handleChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-pink-900/50
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-gradient-to-r
          [&::-webkit-slider-thumb]:from-pink-400
          [&::-webkit-slider-thumb]:to-purple-500
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:shadow-pink-500/50"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-pink-300">Slower</span>
        <span className="text-xs text-pink-300">{Math.round(currentSpeed)}ms</span>
        <span className="text-xs text-pink-300">Faster</span>
      </div>
    </div>
  );
};

export default SpeedControl;