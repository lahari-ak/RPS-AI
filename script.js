let userHistory = [];
let userScore = 0;
let aiScore = 0;
let rounds = 0;
const maxRounds = 5;

function getAIChoice() {
  let randomChance = Math.random();

  // 70% smart, 30% random
  if (randomChance < 0.7 && userHistory.length >= 3) {
    let lastMoves = userHistory.slice(-3).join("");

    let patterns = {
      "rockrockrock": "paper",
      "paperpaperpaper": "scissors",
      "scissorsscissorsscissors": "rock"
    };

    if (patterns[lastMoves]) return patterns[lastMoves];
  }

  return randomMove();
}

function randomMove() {
  let moves = ["rock", "paper", "scissors"];
  return moves[Math.floor(Math.random() * 3)];
}

function play(userChoice) {
  if (rounds >= maxRounds) return;

  rounds++;
  userHistory.push(userChoice);

  let aiChoice = getAIChoice();

  document.getElementById("userMove").innerText = "You: " + userChoice;
  document.getElementById("aiMove").innerText = "AI: " + aiChoice;

  let result = "";

  if (userChoice === aiChoice) {
    result = "Draw!";
  } else if (
    (userChoice === "rock" && aiChoice === "scissors") ||
    (userChoice === "paper" && aiChoice === "rock") ||
    (userChoice === "scissors" && aiChoice === "paper")
  ) {
    result = "You Win!";
    userScore++;
  } else {
    result = "AI Wins!";
    aiScore++;
  }

  document.getElementById("winner").innerText = result;
  document.getElementById("userScore").innerText = userScore;
  document.getElementById("aiScore").innerText = aiScore;

  // After 5 rounds → show final result
  if (rounds === maxRounds) {
    showFinalWinner();
  }
  document.getElementById("round").innerText = rounds;
}

function showFinalWinner() {
  let finalMessage = "";

  if (userScore > aiScore) {
    finalMessage = "🎉 You WON the Match!";
  } else if (aiScore > userScore) {
    finalMessage = "🤖 AI WON the Match!";
  } else {
    finalMessage = "🤝 It's a DRAW Match!";
  }

  document.getElementById("winner").innerText = finalMessage;
}

function resetGame() {
  userScore = 0;
  aiScore = 0;
  rounds = 0;
  userHistory = [];

  document.getElementById("userScore").innerText = 0;
  document.getElementById("aiScore").innerText = 0;
  document.getElementById("winner").innerText = "";
  document.getElementById("userMove").innerText = "";
  document.getElementById("aiMove").innerText = "";
}