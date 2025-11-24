export type Choice = {
    id: number;
    text: string;
  };
  
  export type QuestionType = {
    id: number;
    question: string;
    choices: Choice[];
    correctChoiceId: number;
    explanation: string;
  };