import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";

import {
  playClick,
  playCorrect,
  playWrong,
} from "../../utils/soundManager";

function MathChallenge({ onResult }) {
  const { resetCombo } = useGame();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    generateQuestion();
  }, []);

  function generateQuestion() {
    const first = Math.floor(Math.random() * 20) + 1;
    const second = Math.floor(Math.random() * 20) + 1;

    setNum1(first);
    setNum2(second);
    setAnswer("");
  }

  function checkAnswer() {
    const correct = Number(answer) === num1 + num2;

    if (correct) {
      playCorrect();

      onResult({
        correct: true,
        message: "+10 Points",
      });
    } else {
      playWrong();

      resetCombo();

      onResult({
        correct: false,
        message: `Correct Answer: ${num1 + num2}`,
      });
    }

    generateQuestion();
  }

  return (
    <ChallengeCard title="🧮 Math Challenge">
      <h1>
        {num1} + {num2} = ?
      </h1>

      <input
        type="number"
        placeholder="Enter your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button
        onClick={() => {
          playClick();
          checkAnswer();
        }}
      >
        Submit
      </button>
    </ChallengeCard>
  );
}

export default MathChallenge;