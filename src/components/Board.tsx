import React from 'react';
import { PIECE_COLORS } from '../utils/constants';

interface BoardProps {
  board: number[][];
  currentPiece: number[][];
  currentPosition: { x: number; y: number };
}

const Board: React.FC<BoardProps> = ({ board, currentPiece, currentPosition }) => {
  const getMergedBoard = () => {
    const mergedBoard = board.map(row => [...row]);
    
    currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const newY = currentPosition.y + y;
          const newX = currentPosition.x + x;
          if (newY >= 0 && newY < mergedBoard.length && newX >= 0 && newX < mergedBoard[0].length) {
            mergedBoard[newY][newX] = value;
          }
        }
      });
    });
    
    return mergedBoard;
  };

  const getColorClass = (value: number) => {
    if (value === 0) return 'bg-transparent';
    const pieceTypes = Object.keys(PIECE_COLORS);
    return PIECE_COLORS[pieceTypes[value - 1] as keyof typeof PIECE_COLORS];
  };

  const mergedBoard = getMergedBoard();

  return (
    <div className="game-board">
      {mergedBoard.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                w-6 h-6 rounded-sm
                ${getColorClass(cell)}
                transition-all duration-200
              `}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;