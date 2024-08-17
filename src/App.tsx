import React, { useState } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <div className="flex justify-center items-start p-5 bg-primary-dark min-h-screen">
        <GameBoard />
      </div>
    </>
  );
};

export default App;
