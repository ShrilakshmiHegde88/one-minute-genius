import { motion } from "framer-motion";
import "./ChallengeCard.css";

function ChallengeCard({ title, children }) {
  return (
    <motion.div
      className="challenge-card"
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -40,
        scale: 0.95,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <h2 className="challenge-title">{title}</h2>

      <div className="challenge-content">
        {children}
      </div>
    </motion.div>
  );
}

export default ChallengeCard;