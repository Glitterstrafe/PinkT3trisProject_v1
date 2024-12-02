import { MIN_SPEED, MAX_SPEED, SPEED_STEP, SPEED_INCREASE_PER_LEVEL } from './constants';

/**
 * Calculates the game speed based on the current level
 */
export const calculateLevelSpeed = (baseSpeed: number, level: number): number => {
  const validBaseSpeed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, baseSpeed));
  const validLevel = Math.max(1, level);

  const levelAdjustedSpeed = Math.floor(
    validBaseSpeed * Math.pow(SPEED_INCREASE_PER_LEVEL, validLevel - 1)
  );

  return Math.max(MIN_SPEED, Math.min(MAX_SPEED, levelAdjustedSpeed));
};

/**
 * Converts speed in milliseconds to slider value (0-90)
 */
export const speedToSlider = (speedMs: number): number => {
  const validSpeed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, speedMs));
  return Math.round((MAX_SPEED - validSpeed) / SPEED_STEP);
};

/**
 * Converts slider value to speed in milliseconds
 */
export const sliderToSpeed = (sliderValue: number): number => {
  const validSliderValue = Math.max(0, Math.min(90, sliderValue));
  return Math.max(MIN_SPEED, Math.min(MAX_SPEED, MAX_SPEED - (validSliderValue * SPEED_STEP)));
};