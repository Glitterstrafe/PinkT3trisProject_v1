import React from 'react';
import { Trophy } from 'lucide-react';

interface HighScoresProps {
  scores: number[];
}

const HighScores: React.FC<HighScoresProps> = ({ scores }) => (
  <div className="mystical-panel p-4">
    <div className="flex items-center gap-2 mb-4">
      <Trophy className="w-5 h-5 text-pink-300" />
      <h3 className="pixel-text text-lg text-pink-200">High Scores</h3>
    </div>
    <div className="space-y-3">
      {scores.map((score, index) => (
        <div key={index} className="pixel-text text-sm flex justify-between items-center">
          <span className="text-pink-300">#{index + 1}</span>
          <span className="text-pink-100">{score}</span>
        </div>
      ))}
    </div>
  </div>
);

export default HighScores;