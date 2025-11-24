import React from 'react';
import type { QuestionType, Choice } from '../types/quiz'; 

interface QuestionProps {
    question: QuestionType;
    onAnswer: (choiceId: number) => void;
    userAnswerId: number | null;
    showResult: boolean;
  }
  
  export const Question: React.FC<QuestionProps> = ({
  question, 
  onAnswer, 
  userAnswerId, 
  showResult 
}) => {
  const getButtonClass = (choice: Choice) => {
    if (!showResult) {
      // 結果表示前
      if (choice.id === userAnswerId) {
          return 'choice-button selected'; // 選択中のボタン
      }
      return 'choice-button'; // 通常のボタン
    }

    // 結果表示後
    if (choice.id === question.correctChoiceId) {
      return 'choice-button correct'; // 正解
    } else if (choice.id === userAnswerId) {
      return 'choice-button incorrect'; // 不正解 (ユーザーが選んだもの)
    }
    return 'choice-button answered'; // その他の選択肢
  };

  return (
    <div className="question-container">
      <h3 className="question-title">
        Q{question.id}. {question.question}
      </h3>
      <div className="choices-list">
        {question.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onAnswer(choice.id)}
            disabled={showResult}
            className={getButtonClass(choice)}
          >
            {choice.text}
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className="explanation-box">
          <p className="explanation-title">解説:</p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};