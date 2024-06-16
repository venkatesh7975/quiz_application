import React from 'react';

interface QuestionProps {
  question: string;
  options: string[];
  currentQuestionIndex: number;
  selectOption: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, currentQuestionIndex, selectOption }) => (
  <div className="question-container">
    <h2>{`Question ${currentQuestionIndex + 1}: ${question}`}</h2>
    {options.map((option, index) => (
      <button key={index} onClick={() => selectOption(option)}>
        {option}
      </button>
    ))}
  </div>
);

export default Question;
