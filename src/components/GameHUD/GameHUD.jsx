import { motion } from "framer-motion";
import "./GameHUD.css";
import { useGame } from "../../context/GameContext";

function GameHUD() {
  const { score, combo, timeLeft } = useGame();

  const percentage = (timeLeft / 60) * 100;

  return (
    <div className="hud">
      <div className="hud-top">
        {/* Timer */}
        <div className="hud-box">
          ⏱ {timeLeft}s
        </div>

        {/* Score */}
        <div className="hud-box">
          ⭐ {score}
        </div>

        {/* Animated Combo */}
        <motion.div
          className="hud-box combo"
          key={combo}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.3,
          }}
        >
          🔥 x{combo}
        </motion.div>
      </div>

      {/* Timer Progress Bar */}
      <div className="progress">
        <motion.div
          className="progress-fill"
          initial={{ width: "100%" }}
          animate={{
            width: `${percentage}%`,
          }}
          transition={{
            duration: 0.5,
          }}
        />
      </div>
    </div>
  );
}

export default GameHUD;