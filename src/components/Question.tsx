import React from 'react';

interface QuestionProps {
  question: string;
  options: string[];
  currentQuestionIndex: number;
  selectOption: (option: string) => void;
  selectedOption: string | null;
  correctAnswer: string;
}

const Question: React.FC<QuestionProps> = ({ question, options, selectOption, selectedOption, correctAnswer }) => {
  const handleOptionSelect = (option: string) => {
    selectOption(option);
  };

  return (
    <div className="question" style={{ marginBottom: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className="option" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="radio"
              id={`option-${index}`}
              name="options"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionSelect(option)}
              style={{ marginRight: '10px' }}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
