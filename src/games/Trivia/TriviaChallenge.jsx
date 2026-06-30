import { useState } from "react";
import { useGame } from "../../context/GameContext";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import triviaQuestions from "../../data/triviaQuestions";

import {
  playClick,
  playCorrect,
  playWrong,
} from "../../utils/soundManager";

function TriviaChallenge({ onResult }) {
  const { resetCombo } = useGame();

  const [question, setQuestion] = useState(
    triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)]
  );

  function nextQuestion() {
    const random =
      triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];

    setQuestion(random);
  }

  function chooseAnswer(option) {
    if (option === question.answer) {
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
        message: `Correct Answer: ${question.answer}`,
      });
    }

    nextQuestion();
  }

  return (
    <ChallengeCard title="📚 Trivia Challenge">
      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => {
              playClick();
              chooseAnswer(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </ChallengeCard>
  );
}

export default TriviaChallenge;