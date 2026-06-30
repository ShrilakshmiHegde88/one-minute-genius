import "./Statistics.css";

import { getPlayerData } from "../../services/playerStorage";
import { useGame } from "../../context/GameContext";

function Statistics() {
  const { goHome } = useGame();

  const player = getPlayerData();
  console.log("Player Data:", player);

  const total =
    player.totalCorrect + player.totalWrong;

  const accuracy =
    total === 0
      ? 0
      : Math.round(
          (player.totalCorrect / total) * 100
        );

  return (
    <div className="statistics">
      <div className="statistics-card">
        <h1>📊 Statistics</h1>

        <div className="stat-row">
          <span>🏆 High Score</span>
          <span>{player.highScore}</span>
        </div>

        <div className="stat-row">
          <span>🎮 Games Played</span>
          <span>{player.gamesPlayed}</span>
        </div>

        <div className="stat-row">
          <span>⭐ Total Score</span>
          <span>{player.totalScore}</span>
        </div>

        <div className="stat-row">
          <span>🎯 Correct Answers</span>
          <span>{player.totalCorrect}</span>
        </div>

        <div className="stat-row">
          <span>❌ Wrong Answers</span>
          <span>{player.totalWrong}</span>
        </div>

        <div className="stat-row">
          <span>📈 Accuracy</span>
          <span>{accuracy}%</span>
        </div>

        <div className="stat-row">
          <span>🔥 Best Combo</span>
          <span>{player.bestCombo}</span>
        </div>

        <button
          className="home-btn"
          onClick={goHome}
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
}

export default Statistics;