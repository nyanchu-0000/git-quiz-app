import React, { useState } from "react";
import { quizQuestions } from "../data/questions";
import { Question } from "./Question";
import Result from "./Result";
import { Button } from "./Button";

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
    const currentAnswer = userAnswers.find(
        (a) => a.questionId === currentQuestion.id
    );

    const handleAnswer = (choiceId: number) => {
        if (currentAnswer && !showExplanation) return;

        const isCorrect = choiceId === currentQuestion.correctChoiceId;

        const newAnswer: Answer = {
            questionId: currentQuestion.id,
            selectedChoiceId: choiceId,
            isCorrect: isCorrect,
        };

        setUserAnswers((prev) => {
            const existingIndex = prev.findIndex(
                (a) => a.questionId === currentQuestion.id
            );
            if (existingIndex > -1) {
                return prev.map((item, index) =>
                    index === existingIndex ? newAnswer : item
                );
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

    const handleJump = (index: number) => {
        setCurrentQuestionIndex(index);

        // 移動先の問題が回答済みかどうかチェック
        const targetQuestionId = quizQuestions[index].id;
        const isAnswered = userAnswers.some(
            (a) => a.questionId === targetQuestionId
        );

        setShowExplanation(isAnswered);
    };

    const calculateScore = () => {
        return userAnswers.filter((answer) => answer.isCorrect).length;
    };

    const renderNavButton = (q: (typeof quizQuestions)[0], index: number) => {
        const isCurrent = index === currentQuestionIndex;
        const isAnswered = userAnswers.some((a) => a.questionId === q.id);

        return (
            <button
                key={q.id}
                onClick={() => handleJump(index)}
                className={`
                    w-10 h-10 border rounded flex items-center justify-center text-sm font-medium transition-colors
                    ${
                        isCurrent
                            ? "bg-blue-600 text-white border-blue-600"
                            : isAnswered
                            ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }
                `}
            >
                {q.id}
            </button>
        );
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
        <div className="w-[800px]">
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
                        {currentQuestionIndex === quizQuestions.length - 1
                            ? "結果を見る"
                            : "次の問題へ"}
                    </Button>
                )}
            </div>

            {/* 問題番号ナビゲーション */}
            <div className="mt-8 pt-4 border-t border-gray-300">
                <p className="text-sm text-gray-600 mb-2">問題一覧:</p>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-center">
                        {quizQuestions
                            .slice(0, 15)
                            .map((q, i) => renderNavButton(q, i))}
                    </div>
                    <div className="flex gap-2 justify-center">
                        {quizQuestions
                            .slice(15, 30)
                            .map((q, i) => renderNavButton(q, i + 15))}
                    </div>
                </div>
            </div>
        </div>
    );
};
