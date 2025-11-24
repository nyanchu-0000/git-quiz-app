import React from 'react';

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
      <button
        onClick={onRestart}
        className="restart-button"
      >
        もう一度挑戦する
      </button>
    </div>
  );
};