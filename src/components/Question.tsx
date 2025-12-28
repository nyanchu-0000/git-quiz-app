import React from 'react';
import type { QuestionType, Choice } from '../types/quiz'; 
import { Button } from './Button';

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
    // 共通のベーススタイル
    const baseClass = "w-full p-3 text-left border rounded transition-colors duration-200";

    if (!showResult) {
      // 結果表示前
      if (choice.id === userAnswerId) {
          return `${baseClass} bg-[#cceeff] border-[#007bff]`; // 選択中
      }
      return `${baseClass} bg-white border-[#aaa] hover:bg-[#e6e6e6]`; // 通常
    }

    // 結果表示後
    if (choice.id === question.correctChoiceId) {
      return `${baseClass} bg-[#d4edda] border-[#28a745] font-bold`; // 正解
    } else if (choice.id === userAnswerId) {
      return `${baseClass} bg-[#f8d7da] border-[#dc3545]`; // 不正解 (ユーザーが選んだもの)
    }
    return `${baseClass} bg-white border-[#aaa] opacity-60 cursor-not-allowed`; // その他の選択肢
  };

  return (
    <div className="p-[15px] border border-[#ddd] rounded mb-[15px] w-[800px]">
      <h3 className="text-[18px] font-semibold mb-[15px]">
        Q{question.id}. {question.question}
      </h3>
      <div className="flex flex-col gap-[10px]">
        {question.choices.map((choice) => (
          <Button
            key={choice.id}
            onClick={() => onAnswer(choice.id)}
            disabled={showResult}
            className={getButtonClass(choice)}
          >
            {choice.text}
          </Button>
        ))}
      </div>
      
      {showResult && (
        <div className="mt-[15px] p-[10px] border-l-[5px] border-[#007bff] bg-[#f9f9f9]">
          <p className="font-bold">解説:</p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};