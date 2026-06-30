const STORAGE_KEY = "brainBlitzPlayer";

const defaultPlayer = {
  highScore: 0,
  gamesPlayed: 0,
  totalScore: 0,
  totalCorrect: 0,
  totalWrong: 0,
  bestCombo: 0,
};

export function getPlayerData() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return defaultPlayer;
  }

  return JSON.parse(data);
}

export function savePlayerData(player) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(player)
  );
}

export function updatePlayerStats({
  score,
  combo,
  correct,
  wrong,
}) {
  const player = getPlayerData();

  player.gamesPlayed += 1;
  player.totalScore += score;
  player.totalCorrect += correct;
  player.totalWrong += wrong;

  if (score > player.highScore) {
    player.highScore = score;
  }

  if (combo > player.bestCombo) {
    player.bestCombo = combo;
  }

  savePlayerData(player);
}

export function resetPlayerData() {
  localStorage.removeItem(STORAGE_KEY);
}