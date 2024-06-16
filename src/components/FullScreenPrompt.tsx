import React from 'react';

interface FullScreenPromptProps {
  enableFullScreen: () => void;
}

const FullScreenPrompt: React.FC<FullScreenPromptProps> = ({ enableFullScreen }) => (
  <div className="fullscreen-prompt">
    <p>Please enable full-screen mode to start the quiz.</p>
    <button onClick={enableFullScreen}>Enable Full Screen</button>
  </div>
);

export default FullScreenPrompt;
