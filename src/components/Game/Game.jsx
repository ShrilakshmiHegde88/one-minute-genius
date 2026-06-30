import { useEffect } from "react";

import { useGame } from "../../context/GameContext";

import ChallengeManager from "../ChallengeManager/ChallengeManager";
import GameHUD from "../GameHUD/GameHUD";

import {
  playCountdown,
  playGameOver,
} from "../../utils/soundManager";

import { updatePlayerStats } from "../../services/playerStorage";

function Game() {
  const {
    score,
    combo,
    timeLeft,
    correctAnswers,
    wrongAnswers,

    setTimeLeft,
    increaseScore,
    endGame,
  } = useGame();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 10 && prev > 1) {
          playCountdown();
        }

        if (prev <= 1) {
          clearInterval(timer);

          playGameOver();

          updatePlayerStats({
            score,
            combo,
            correct: correctAnswers,
            wrong: wrongAnswers,
          });

          endGame();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, combo, correctAnswers, wrongAnswers]);

  return (
    <>
      <GameHUD />

      <ChallengeManager
      />
    </>
  );
}

export default Game;