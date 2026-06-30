import { useEffect, useState } from "react";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import { useGame } from "../../context/GameContext";

import {
  playClick,
  playCorrect,
  playWrong,
} from "../../utils/soundManager";

function ReflexChallenge({ onResult }) {
  const { resetCombo } = useGame();

  const [status, setStatus] = useState("waiting");
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const delay = Math.floor(Math.random() * 3000) + 2000;

    const timer = setTimeout(() => {
      setStatus("click");
      setStartTime(Date.now());
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  function handleClick() {
    playClick();

    if (status === "waiting") {
      playWrong();

      resetCombo();

      onResult({
        correct: false,
        message: "Too Early!",
      });

      return;
    }

    const reactionTime = Date.now() - startTime;

    playCorrect();

    onResult({
      correct: true,
      message: `${reactionTime} ms`,
    });
  }

  return (
    <ChallengeCard title="⚡ Reflex Challenge">
      {status === "waiting" ? (
        <>
          <h1>⏳ Wait...</h1>
          <p>Don't click until the screen changes!</p>
        </>
      ) : (
        <>
          <h1 style={{ color: "#22c55e" }}>
            🟢 CLICK NOW!
          </h1>

          <p>Click as fast as you can!</p>
        </>
      )}

      <button onClick={handleClick}>
        CLICK
      </button>
    </ChallengeCard>
  );
}

export default ReflexChallenge;