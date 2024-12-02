import { BOARD_WIDTH, BOARD_HEIGHT } from './constants';

export const createEmptyBoard = () => 
  Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(0));

export const checkCollision = (
  piece: number[][],
  pos: { x: number; y: number },
  board: number[][]
) => {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x]) {
        const newX = pos.x + x;
        const newY = pos.y + y;
        if (
          newX < 0 || 
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const rotateMatrix = (matrix: number[][]) => {
  const N = matrix.length;
  const M = matrix[0].length;
  
  // Create a new matrix with swapped dimensions
  const rotated = Array(M).fill(0).map(() => Array(N).fill(0));
  
  // Fill the rotated matrix
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      rotated[col][N - 1 - row] = matrix[row][col];
    }
  }
  
  return rotated;
};