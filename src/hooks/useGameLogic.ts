import { useState, useCallback, useEffect } from 'react';
import { 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  INITIAL_SPEED,
  INITIAL_LIVES,
  TETROMINOS,
  SPEED_INCREASE_PER_LEVEL 
} from '../utils/constants';
import { createEmptyBoard, checkCollision, rotateMatrix } from '../utils/gameUtils';

export const useGameLogic = () => {
  const [board, setBoard] = useState<number[][]>(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentPiece, setCurrentPiece] = useState<number[][]>([]);
  const [nextPieces, setNextPieces] = useState<number[][][]>([]);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dropSpeed, setDropSpeed] = useState(INITIAL_SPEED);
  const [highScores, setHighScores] = useState<number[]>([0, 0, 0]);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [linesCleared, setLinesCleared] = useState(0);

  const getRandomPiece = useCallback(() => {
    const pieces = Object.values(TETROMINOS);
    return pieces[Math.floor(Math.random() * pieces.length)];
  }, []);

  const updateHighScores = useCallback((newScore: number) => {
    const newHighScores = [...highScores, newScore]
      .sort((a, b) => b - a)
      .slice(0, 3);
    setHighScores(newHighScores);
    localStorage.setItem('tetrisHighScores', JSON.stringify(newHighScores));
  }, [highScores]);

  const calculateDropSpeed = useCallback((currentLevel: number) => {
    return Math.max(100, Math.floor(INITIAL_SPEED * Math.pow(SPEED_INCREASE_PER_LEVEL, currentLevel - 1)));
  }, []);

  const mergePieceToBoard = useCallback(() => {
    const newBoard = board.map(row => [...row]);
    currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const newY = currentPosition.y + y;
          if (newY >= 0) {
            newBoard[newY][currentPosition.x + x] = value;
          }
        }
      });
    });
    return newBoard;
  }, [board, currentPiece, currentPosition]);

  const clearLines = useCallback((boardToCheck: number[][]) => {
    let clearedLines = 0;
    const newBoard = boardToCheck.filter(row => {
      const isLineFull = row.every(cell => cell);
      if (isLineFull) clearedLines++;
      return !isLineFull;
    });

    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    if (clearedLines > 0) {
      setLinesCleared(clearedLines);
      const newScore = score + (clearedLines * 100 * level);
      setScore(newScore);
      const newLevel = Math.floor(newScore / 1000) + 1;
      if (newLevel !== level) {
        setLevel(newLevel);
        setDropSpeed(calculateDropSpeed(newLevel));
      }
    }

    return newBoard;
  }, [level, score, calculateDropSpeed]);

  const checkTopCollision = useCallback((newBoard: number[][]) => {
    return newBoard[0].some(cell => cell !== 0) || newBoard[1].some(cell => cell !== 0);
  }, []);

  const moveBlock = useCallback((direction: 'left' | 'right' | 'down') => {
    if (!isPlaying || gameOver || isPaused) return;

    const newPos = {
      x: currentPosition.x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0),
      y: currentPosition.y + (direction === 'down' ? 1 : 0)
    };

    if (!checkCollision(currentPiece, newPos, board)) {
      setCurrentPosition(newPos);
    } else if (direction === 'down') {
      const newBoard = clearLines(mergePieceToBoard());
      
      if (checkTopCollision(newBoard)) {
        if (lives > 1) {
          setLives(prev => prev - 1);
          setBoard(createEmptyBoard());
          setCurrentPiece(nextPieces[0]);
          const newNextPieces = [...nextPieces.slice(1), getRandomPiece()];
          setNextPieces(newNextPieces);
          setCurrentPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: -2 });
          setLevel(1);
          setDropSpeed(INITIAL_SPEED);
        } else {
          setGameOver(true);
          setIsPlaying(false);
          updateHighScores(score);
        }
      } else {
        setBoard(newBoard);
        setCurrentPiece(nextPieces[0]);
        const newNextPieces = [...nextPieces.slice(1), getRandomPiece()];
        setNextPieces(newNextPieces);
        setCurrentPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: -2 });
      }
    }
  }, [isPlaying, gameOver, isPaused, currentPiece, nextPieces, currentPosition, board, lives, clearLines, mergePieceToBoard, getRandomPiece, score, updateHighScores]);

  const rotateBlock = useCallback(() => {
    if (!isPlaying || gameOver || isPaused) return;
    
    const rotated = rotateMatrix(currentPiece);
    
    if (!checkCollision(rotated, currentPosition, board)) {
      setCurrentPiece(rotated);
    } else {
      const kicks = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -2, y: 0 },
        { x: 2, y: 0 },
      ];

      for (const kick of kicks) {
        const kickedPos = {
          x: currentPosition.x + kick.x,
          y: currentPosition.y + kick.y
        };
        
        if (!checkCollision(rotated, kickedPos, board)) {
          setCurrentPiece(rotated);
          setCurrentPosition(kickedPos);
          break;
        }
      }
    }
  }, [isPlaying, gameOver, isPaused, currentPiece, currentPosition, board]);

  const dropBlock = useCallback(() => {
    if (!isPlaying || gameOver || isPaused) return;
    let newY = currentPosition.y;
    while (!checkCollision(currentPiece, { x: currentPosition.x, y: newY + 1 }, board)) {
      newY++;
    }
    setCurrentPosition(prev => ({ ...prev, y: newY }));
    moveBlock('down');
  }, [isPlaying, gameOver, isPaused, currentPiece, currentPosition, board, moveBlock]);

  const togglePause = useCallback(() => {
    if (!gameOver && isPlaying) {
      setIsPaused(prev => !prev);
      setDropSpeed(prev => prev === 0 ? calculateDropSpeed(level) : 0);
    }
  }, [gameOver, isPlaying, level, calculateDropSpeed]);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLevel(1);
    setDropSpeed(INITIAL_SPEED);
    setGameOver(false);
    setIsPlaying(true);
    setIsPaused(false);
    setLives(INITIAL_LIVES);
    setLinesCleared(0);
    
    const firstPiece = getRandomPiece();
    const nextThreePieces = [getRandomPiece(), getRandomPiece(), getRandomPiece()];
    setCurrentPiece(firstPiece);
    setNextPieces(nextThreePieces);
    setCurrentPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: -2 });
  }, [getRandomPiece]);

  useEffect(() => {
    const savedHighScores = localStorage.getItem('tetrisHighScores');
    if (savedHighScores) {
      setHighScores(JSON.parse(savedHighScores));
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || gameOver || isPaused) return;
    const dropInterval = setInterval(() => moveBlock('down'), dropSpeed);
    return () => clearInterval(dropInterval);
  }, [isPlaying, gameOver, isPaused, dropSpeed, moveBlock]);

  return {
    board,
    score,
    level,
    gameOver,
    isPlaying,
    isPaused,
    startGame,
    moveBlock,
    rotateBlock,
    dropBlock,
    togglePause,
    currentPiece,
    currentPosition,
    nextPieces,
    highScores,
    lives,
    linesCleared,
    setLinesCleared,
  };
};