// Game Board Constants
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

// Speed Constants
export const INITIAL_SPEED = 800; // Slower initial speed (800ms)
export const MIN_SPEED = 100;     // Fastest possible speed (100ms)
export const MAX_SPEED = 1000;    // Slowest possible speed (1000ms)
export const SPEED_STEP = 10;     // Each slider step
export const SPEED_INCREASE_PER_LEVEL = 0.50; // More aggressive speed increase (50% of previous)

// Game Settings
export const INITIAL_LIVES = 3;

// Piece Colors
export const PIECE_COLORS = {
  I: 'bg-gradient-to-br from-pink-300 to-pink-400 shadow-lg shadow-pink-400/50',
  O: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 shadow-lg shadow-fuchsia-500/50',
  T: 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-500/50',
  S: 'bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/50',
  Z: 'bg-gradient-to-br from-violet-400 to-violet-500 shadow-lg shadow-violet-500/50',
  J: 'bg-gradient-to-br from-pink-600 to-pink-700 shadow-lg shadow-pink-600/50',
  L: 'bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-600/50'
} as const;

// Tetromino Shapes
export const TETROMINOS = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  O: [
    [2, 2],
    [2, 2]
  ],
  T: [
    [0, 3, 0],
    [3, 3, 3],
    [0, 0, 0]
  ],
  S: [
    [0, 4, 4],
    [4, 4, 0],
    [0, 0, 0]
  ],
  Z: [
    [5, 5, 0],
    [0, 5, 5],
    [0, 0, 0]
  ],
  J: [
    [6, 0, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 7],
    [7, 7, 7],
    [0, 0, 0]
  ]
} as const;