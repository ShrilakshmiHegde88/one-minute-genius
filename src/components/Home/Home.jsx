import "./Home.css";
import { useGame } from "../../context/GameContext";

function Home() {
  const { startGame ,showStatistics} = useGame();
  

  return (
    <div className="home">
      <div className="home-card">

        <h1 className="title">
          🧠 One Minute Genius
        </h1>

        <p className="subtitle">
          You have 60 seconds to solve as many challenges as possible!
        </p>

        <button
          className="start-btn"
          onClick={startGame}
        >
          Start Game
        </button>
        <button
  className="stats-btn"
  onClick={showStatistics}
>
  📊 Statistics
</button>

      </div>
    </div>
  );
}

export default Home;