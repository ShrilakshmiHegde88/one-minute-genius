import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import memoryData from "../../data/memoryData";
import { shuffleArray } from "../../utils/shuffleArray";

import {
  playClick,
  playCorrect,
  playWrong,
} from "../../utils/soundManager";

function MemoryChallenge({ onResult }) {
  const { resetCombo } = useGame();

  const [sequence, setSequence] = useState([]);
  const [options, setOptions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showSequence, setShowSequence] = useState(true);

  function generateChallenge() {
    const shuffled = shuffleArray(memoryData);

    // Pick 4 random emojis
    const newSequence = shuffled.slice(0, 4);

    // Choose one position to ask about
    const randomIndex = Math.floor(Math.random() * 4);

    const correctEmoji = newSequence[randomIndex];

    // Create 3 wrong options
    const wrongOptions = shuffleArray(
      memoryData.filter((emoji) => !newSequence.includes(emoji))
    ).slice(0, 3);

    // Shuffle all options
    const answerOptions = shuffleArray([
      correctEmoji,
      ...wrongOptions,
    ]);

    setSequence(newSequence);
    setQuestionIndex(randomIndex);
    setOptions(answerOptions);
    setShowSequence(true);

    setTimeout(() => {
      setShowSequence(false);
    }, 3000);
  }

  useEffect(() => {
    generateChallenge();
  }, []);

  function checkAnswer(selectedEmoji) {
    if (selectedEmoji === sequence[questionIndex]) {
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
        message: `Correct Emoji: ${sequence[questionIndex]}`,
      });
    }

    generateChallenge();
  }

  return (
    <ChallengeCard title="🧠 Memory Challenge">
      {showSequence ? (
        <>
          <h2>Remember this sequence</h2>

          <div
            style={{
              fontSize: "50px",
              margin: "30px 0",
            }}
          >
            {sequence.join(" ")}
          </div>

          <p>Memorize carefully...</p>
        </>
      ) : (
        <>
          <h2>
            Which emoji was in position {questionIndex + 1}?
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {options.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  playClick();
                  checkAnswer(emoji);
                }}
                style={{
                  fontSize: "32px",
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}
    </ChallengeCard>
  );
}

export default MemoryChallenge;