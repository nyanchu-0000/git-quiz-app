import React, { useState } from 'react';
import { quizQuestions } from '../data/questions';
import { Question } from './Question';
import { Result } from './Result';
import { Button } from './Button';

type Answer = {
  questionId: number;
  selectedChoiceId: number;
  isCorrect: boolean;
};

export const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = userAnswers.find(a => a.questionId === currentQuestion.id);

  const handleAnswer = (choiceId: number) => {
    if (currentAnswer && !showExplanation) return;
    
    const isCorrect = choiceId === currentQuestion.correctChoiceId;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedChoiceId: choiceId,
      isCorrect: isCorrect,
    };

    setUserAnswers(prev => {
        const existingIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
        if (existingIndex > -1) {
            return prev.map((item, index) => index === existingIndex ? newAnswer : item);
        }
        return [...prev, newAnswer];
    });

    setShowExplanation(true);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    setShowExplanation(false);

    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResult(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    return userAnswers.filter(answer => answer.isCorrect).length;
  };

  if (showResult) {
    return (
      <Result 
        score={calculateScore()} 
        totalQuestions={quizQuestions.length} 
        onRestart={handleRestart} 
      />
    );
  }

  return (
    // 外側の背景（元 .app-root 相当）
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0]">
      {/* メインコンテナ（元 .quiz-app-container） */}
      <div>
        
        {/* タイトル（元 .main-title） */}
        <h1 className="text-2xl font-bold text-center mb-5">
          Git コマンド クイズ
        </h1>
        
        <Question
          question={currentQuestion}
          onAnswer={handleAnswer}
          userAnswerId={currentAnswer?.selectedChoiceId ?? null}
          showResult={showExplanation}
        />

        {/* ナビゲーション（元 .navigation-area） */}
        <div className="flex justify-end">
          {showExplanation && (
            <Button
              onClick={handleNext}
              className="px-5 py-[10px] bg-[#28a745] text-white font-bold rounded hover:opacity-90 transition-opacity"
            >
              {currentQuestionIndex === quizQuestions.length - 1 ? '結果を見る' : '次の問題へ'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};