"use client";
import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Quiz questions={questions} />
    </div>
  );
};

export default App;

