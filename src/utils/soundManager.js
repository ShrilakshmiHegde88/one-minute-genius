import clickSound from "../assets/sounds/click.mp3";
import correctSound from "../assets/sounds/correct.mp3";
import wrongSound from "../assets/sounds/wrong.mp3";
import countdownSound from "../assets/sounds/countdown.mp3";
import gameOverSound from "../assets/sounds/gameover.mp3";

const click = new Audio(clickSound);
const correct = new Audio(correctSound);
const wrong = new Audio(wrongSound);
const countdown = new Audio(countdownSound);
const gameOver = new Audio(gameOverSound);

click.volume = 0.6;
correct.volume = 0.8;
wrong.volume = 0.8;
countdown.volume = 0.8;
gameOver.volume = 0.8;

export const playClick = () => {
  click.currentTime = 0;
  click.play().catch(console.error);
};

export const playCorrect = () => {
  correct.currentTime = 0;
  correct.play().catch(console.error);
};

export const playWrong = () => {
  wrong.currentTime = 0;
  wrong.play().catch(console.error);
};

export const playCountdown = () => {
  countdown.currentTime = 0;
  countdown.play().catch(console.error);
};

export const playGameOver = () => {
  gameOver.currentTime = 0;
  gameOver.play().catch(console.error);
};