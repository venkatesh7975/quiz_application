import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number;
  timeLeft: number; // Add timeLeft to the interface
  setTimeLeft: (value: React.SetStateAction<number>) => void;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, timeLeft, setTimeLeft, onTimeUp }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, setTimeLeft]);

  return <div className="timer">{`Time left: ${timeLeft} seconds`}</div>;
};

export default Timer;
