import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';
import FullScreenPrompt from './FullScreenPrompt';

interface QuizProps {
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  useEffect(() => {
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    const savedTime = localStorage.getItem('quizTimeLeft');
    if (savedIndex) {
      setCurrentQuestionIndex(Number(savedIndex));
    }
    if (!savedTime) {
      localStorage.setItem('quizTimeLeft', '600');
    }

    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (quizStarted) {
      localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
    }
  }, [currentQuestionIndex, quizStarted]);

  const enableFullScreen = () => {
    document.documentElement.requestFullscreen();
  };

  const handleOptionSelect = (selectedOption: string) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Quiz completed!');
    }
  };

  const handleTimeUp = () => {
    alert('Time is up!');
  };

  if (!isFullScreen) {
    return <FullScreenPrompt enableFullScreen={enableFullScreen} />;
  }

  return (
    <div className="quiz-container">
      <Timer initialTime={600} onTimeUp={handleTimeUp} />
      <Question
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        currentQuestionIndex={currentQuestionIndex}
        selectOption={handleOptionSelect}
      />
    </div>
  );
};

export default Quiz;
