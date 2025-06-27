let score = 0;
let maxScore = 10;
let duration = 20; // seconds
let interval;
let spawnInterval;

function startGame() {
  score = 0;
  document.getElementById("scoreBox").textContent = "Score: 0";
  document.getElementById("surpriseBox").style.display = "none";
  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  const endTime = Date.now() + duration * 1000;

  spawnInterval = setInterval(() => {
    createHeart();
  }, 600);

  interval = setInterval(() => {
    if (Date.now() >= endTime) {
      endGame();
    }
  }, 1000);
}

function createHeart() {
  const gameArea = document.getElementById("gameArea");
  const heart = document.createElement("div");
  heart.classList.add("heart");

  heart.style.left = Math.random() * (gameArea.offsetWidth - 40) + "px";
  heart.onclick = () => {
    score++;
    document.getElementById("scoreBox").textContent = `Score: ${score}`;
    heart.remove();
  };

  gameArea.appendChild(heart);

  setTimeout(() => {
    if (heart.parentNode) heart.remove();
  }, 5000);
}

function endGame() {
  clearInterval(spawnInterval);
  clearInterval(interval);
  if (score >= maxScore) {
    document.getElementById("surpriseBox").style.display = "block";
  } else {
    alert(`You scored ${score}. Try again to unlock the surprise! 💔`);
  }
}
