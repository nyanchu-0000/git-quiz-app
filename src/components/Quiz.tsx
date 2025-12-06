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
    <div className="quiz-app-container">
      <h1 className="main-title">Git コマンド クイズ</h1>
      
      <Question
        question={currentQuestion}
        onAnswer={handleAnswer}
        userAnswerId={currentAnswer?.selectedChoiceId ?? null}
        showResult={showExplanation}
      />

      <div className="navigation-area">
        {showExplanation && (
          <Button
            onClick={handleNext}
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? '結果を見る' : '次の問題へ'}
          </Button>
        )}
      </div>
    </div>
  );
};