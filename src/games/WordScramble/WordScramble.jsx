import { useEffect, useState } from "react";
import ChallengeCard from "../../components/ChallengeCard/ChallengeCard";
import { useGame } from "../../context/GameContext";
import wordData from "../../data/wordData";

import {
  playClick,
  playCorrect,
  playWrong,
} from "../../utils/soundManager";

function WordScramble({ onResult }) {
  const { resetCombo } = useGame();

  const [word, setWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    generateWord();
  }, []);

  function shuffleWord(word) {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  function generateWord() {
    const randomWord =
      wordData[Math.floor(Math.random() * wordData.length)];

    let scrambledWord = shuffleWord(randomWord);

    while (scrambledWord === randomWord) {
      scrambledWord = shuffleWord(randomWord);
    }

    setWord(randomWord);
    setScrambled(scrambledWord);
    setAnswer("");
  }

  function checkAnswer() {
    if (answer.trim().toLowerCase() === word.toLowerCase()) {
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
        message: `Correct Word: ${word}`,
      });
    }

    generateWord();
  }

  return (
    <ChallengeCard title="🔤 Word Scramble">
      <h1
        style={{
          letterSpacing: "8px",
          fontSize: "42px",
        }}
      >
        {scrambled.toUpperCase()}
      </h1>

      <input
        type="text"
        placeholder="Unscramble the word..."
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

export default WordScramble;