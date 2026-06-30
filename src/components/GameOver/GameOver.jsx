import "./GameOver.css";

import { useGame } from "../../context/GameContext";

function GameOver() {
  const {
    score,
    startGame,
    goHome,
    showStatistics,
  } = useGame();

  return (
    <div className="game-over">
      <div className="game-over-card">
        <h1>🎉 Time's Up!</h1>

        <h2>Final Score</h2>

        <h3>{score}</h3>

        <button onClick={startGame}>
          ▶ Play Again
        </button>

        <button
          style={{ marginTop: "15px" }}
          onClick={goHome}
        >
          🏠 Home
        </button>
        <button
  onClick={showStatistics}
  style={{ marginTop: "15px" }}
>
  📊 Statistics
</button>
      </div>
    </div>
  );
}

export default GameOver;