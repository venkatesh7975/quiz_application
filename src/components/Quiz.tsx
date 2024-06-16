import React, { useEffect, useState } from 'react';
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
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    const savedTimeLeft = localStorage.getItem('quizTimeLeft');
    const savedScore = localStorage.getItem('quizScore');
    const savedQuizStarted = localStorage.getItem('quizStarted');

    if (savedIndex) {
      setCurrentQuestionIndex(Number(savedIndex));
    }
    if (savedTimeLeft) {
      setTimeLeft(Number(savedTimeLeft));
    }
    if (savedScore) {
      setScore(Number(savedScore));
    }
    if (savedQuizStarted === 'true') {
      setQuizStarted(true);
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
      localStorage.setItem('quizTimeLeft', timeLeft.toString());
      localStorage.setItem('quizScore', score.toString());
      localStorage.setItem('quizStarted', 'true');
    }
  }, [currentQuestionIndex, quizStarted, timeLeft, score]);

  const enableFullScreen = () => {
    document.documentElement.requestFullscreen();
  };

  const selectOption = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    const isCorrect = selectedOptions[currentQuestionIndex] === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: null, // Clear selected option for current question
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleTimeUp = () => {
    alert('Time is up!');
    handlePlayAgain();
  };

  const handlePlayAgain = () => {
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(600);
    setSelectedOptions({});
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('quizTimeLeft');
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizStarted');
  };

  if (!isFullScreen) {
    return <FullScreenPrompt enableFullScreen={enableFullScreen} />;
  }

  return (
    <div className="container mt-5">
      {quizCompleted ? (
        <div className="quiz-container">
          <h1 className="text-center">Quiz Completed!</h1>
          <div ><h1 className="score">Score: {score}/{questions.length}</h1></div>
          <p className="text-center">Your score is: {score}/{questions.length}</p>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handlePlayAgain}>Play Again</button>
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <Timer initialTime={600} timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={handleTimeUp} />
          <div className="question-number">Question {currentQuestionIndex + 1}/{questions.length}</div>
          <Question
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            currentQuestionIndex={currentQuestionIndex}
            selectOption={selectOption}
            selectedOption={selectedOptions[currentQuestionIndex]}
            correctAnswer={questions[currentQuestionIndex].answer}
          />

<div className="button-container text-center mt-3">
  <button className="btn btn-primary m-2" onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
  {currentQuestionIndex !== questions.length && (
    <button className="btn btn-primary m-3" onClick={handleNext}>Next</button>
  )}
</div>

        </div>
      )}
    </div>
  );
};

export default Quiz;
