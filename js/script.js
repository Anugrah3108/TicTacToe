const container = document.getElementsByClassName("container");
const cells = Array.from(document.querySelectorAll(".cell"));
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let winningChance = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  const index = cells.indexOf(cell);

  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.innerText = currentPlayer;
  if (checkWinner()) {
    statusText.innerText = `Player ${currentPlayer} Wins!🎉`;
    gameActive = false;
    setTimeout(() => {
      alert(`Player ${currentPlayer} Wins!🎉`);
    }, 500);
    setTimeout(restartGame, 3000);
  } else if (isDraw()) {
    statusText.innerText = "It's a Draw.";
    gameActive = false;
    setTimeout(() => {
      alert("It's a Draw.");
    }, 500);
    setTimeout(restartGame, 3000);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Current Turn: ${currentPlayer}`;
  }
}

function checkWinner() {
  let winnerFound = false;
  winningChance.forEach((winning) => {
    const [a, b, c] = winning;
    if (
      boardState[a] === currentPlayer &&
      boardState[b] === currentPlayer &&
      boardState[c] === currentPlayer
    ) {
      winnerFound = true;
      console.log("winnerfound");
    }
  });
  return winnerFound;
}

function isDraw() {
  let draw = true;
  boardState.forEach((value) => {
    if (value === "") {
      draw = false;
    }
  });
  return draw;
}

function restartGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.innerText = `Current Turn: ${currentPlayer}`;

  cells.forEach((cell) => {
    cell.innerText = "";
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
