import { motion } from "framer-motion";
import "./Feedback.css";

function Feedback({ correct, message }) {
  return (
    <motion.div
      className={`feedback ${correct ? "success" : "error"}`}
      initial={{
        scale: 0.7,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <h2>
        {correct ? "✅ Correct!" : "❌ Wrong!"}
      </h2>

      <p>{message}</p>
    </motion.div>
  );
}

export default Feedback;