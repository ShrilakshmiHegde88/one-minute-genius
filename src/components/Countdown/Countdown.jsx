import { useEffect, useState } from "react";
import "./Countdown.css";

import { useGame } from "../../context/GameContext";

function Countdown() {

  const { finishCountdown } = useGame();

  const [count, setCount] = useState(3);

  useEffect(() => {

    if (count === 0) {

      const timer = setTimeout(() => {
        finishCountdown();
      }, 800);

      return () => clearTimeout(timer);
    }

    const interval = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(interval);

  }, [count]);

  return (
    <div className="countdown">
      <h1>{count === 0 ? "GO!" : count}</h1>
    </div>
  );
}

export default Countdown;