import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  
  const [screen, setScreen] = useState("home");

  
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  function increaseScore() {
    setScore((prev) => prev + 10);
    setCombo((prev) => prev + 1);
  }

  function resetCombo() {
    setCombo(0);
  }

  function increaseCorrect() {
    setCorrectAnswers((prev) => prev + 1);
  }

  function increaseWrong() {
    setWrongAnswers((prev) => prev + 1);
  }

  
  function startGame() {
    restartGame();
    setScreen("countdown");
  }
  function finishCountdown() {
  setScreen("game");
}

  function endGame() {
    setScreen("gameOver");
  }

  function goHome() {
    setScreen("home");
  }
  function showStatistics() {
  setScreen("statistics");
}

  function restartGame() {
    setScore(0);
    setCombo(0);
    setTimeLeft(60);

    setCorrectAnswers(0);
    setWrongAnswers(0);
  }

  return (
    <GameContext.Provider
      value={{
        
        screen,
        startGame,
        finishCountdown,
        goHome,
        showStatistics,
        endGame,

        
        score,
        combo,
        timeLeft,
        setTimeLeft,
        increaseScore,
        resetCombo,
        restartGame,

        
        correctAnswers,
        wrongAnswers,
        increaseCorrect,
        increaseWrong,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}