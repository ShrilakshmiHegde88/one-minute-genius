import Home from "./components/Home/Home";
import Countdown from "./components/Countdown/Countdown";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import Statistics from "./components/Statistics/Statistics";

import { useGame } from "./context/GameContext";

function App() {
  const { screen } = useGame();

  switch (screen) {
    case "home":
      return <Home />;

    case "countdown":
      return <Countdown />;

    case "game":
      return <Game />;

    case "gameOver":
      return <GameOver />
    case "statistics":
      return <Statistics />;

    default:
      return <Home />;
  }
}

export default App;