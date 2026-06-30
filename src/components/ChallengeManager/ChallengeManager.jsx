import { useEffect, useState } from "react";

import { challenges } from "../../games/registry";
import { shuffleArray } from "../../utils/shuffleArray";

import Feedback from "../Feedback/Feedback";
import { useGame } from "../../context/GameContext";

function ChallengeManager() {
  const [challengeQueue, setChallengeQueue] = useState([]);
  const [CurrentChallenge, setCurrentChallenge] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const {
    increaseScore,
    increaseCorrect,
    increaseWrong,
    resetCombo,
  } = useGame();

  useEffect(() => {
    createNewQueue();
  }, []);

  function createNewQueue() {
    const shuffled = shuffleArray([...challenges]);

    setChallengeQueue(shuffled);
    setCurrentChallenge(() => shuffled[0]);
  }

  function loadNextChallenge() {
    setChallengeQueue((prevQueue) => {
      const remaining = prevQueue.slice(1);

      if (remaining.length === 0) {
        const shuffled = shuffleArray([...challenges]);

        setCurrentChallenge(() => shuffled[0]);

        return shuffled;
      }

      setCurrentChallenge(() => remaining[0]);

      return remaining;
    });
  }

  function handleResult(result) {
    if (result.correct) {
      increaseScore();
      increaseCorrect();
    } else {
      increaseWrong();
      resetCombo();
    }

    setFeedback(result);

    setTimeout(() => {
      setFeedback(null);
      loadNextChallenge();
    }, 1000);
  }

  if (feedback) {
    return (
      <Feedback
        correct={feedback.correct}
        message={feedback.message}
      />
    );
  }

  if (!CurrentChallenge) {
    return <p>Loading...</p>;
  }

  return (
    <CurrentChallenge
      onResult={handleResult}
    />
  );
}

export default ChallengeManager;