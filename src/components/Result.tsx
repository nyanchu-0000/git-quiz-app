import React from 'react';
import { Button } from './Button';

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const Result: React.FC<ResultProps> = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="result-container">
      <h2 className="result-title">クイズ結果発表！ 🎉</h2>
      <p className="result-score">
        あなたのスコアは **{totalQuestions}問中 {score}問正解** でした。
      </p>
      <Button
        onClick={onRestart}
      >
        もう一度挑戦する
      </Button>
    </div>
  );
};