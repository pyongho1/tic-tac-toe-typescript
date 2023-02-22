// Constants

const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Variables (state)

let board: (number | null)[], turn: number, winner: boolean, tie: boolean;

// Cached Elements

const squareEl = document.querySelectorAll<HTMLDivElement>(".sqr")!;
const messageEl = document.querySelector<HTMLHeadingElement>("#message")!;
const resetBtnEl = document.querySelector<HTMLButtonElement>("#resetBtn")!;
const boardEl = document.querySelector<HTMLElement>(".board")!;

console.dir(squareEl);

// Event Listeners

squareEl.forEach(function (box: HTMLDivElement): void {
  box.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);

function init(): void {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = false;
  tie = false;
  if (winner === false) {
    messageEl.textContent = "";
  }
  // boardEl.classList.remove("animate__animated", "animate__flash");
  render();
}

init();

function render(): void {
  updateBoard();
  updateMessage();
}

function updateBoard(): void {
  board.forEach((element: number | null, index: number) => {
    if (element === 1) {
      squareEl[index].textContent = "🌝";
    }
    if (element === -1) {
      squareEl[index].textContent = "🌚";
    }
    if (element === null) {
      squareEl[index].textContent = "";
    }
  });
}

function updateMessage(): number | string | undefined {
  if (winner === false && tie === false) {
    messageEl.textContent = `It's ${turn === 1 ? "🌝" : "🌚"}'s turn`;
    return turn;
  } else if (winner === false && tie === true) {
    return "It's a tie!";
  } else {
    messageEl.textContent = `${turn === 1 ? "🌝" : "🌚"} wins the game!`;
  }
}

function handleClick(evt: MouseEvent): void {
  const sqIdx: number = Number((evt.target as Element).id.slice(2));
  if (board[sqIdx] !== null) {
    return;
  }
  if (winner === true) {
    return;
  }
  console.log(sqIdx);
  placePiece(sqIdx);
  updateBoard();
  checkForTie();
  checkForWinner();
  switchPlayerTurn();
  render();
}

function placePiece(pieceIdx: number): void {
  board[pieceIdx] = turn;
}

function checkForTie(): void {
  let tieResult: boolean = board.every((box) => box !== null);
  if (tieResult) {
    tie = true;
    messageEl.textContent = "It's a tie!";
    messageEl.classList.add("animate__animated", "animate__shakeX");
  } else {
    tie = false;
  }
}

function checkForWinner(): void {
  for (let i = 0; i < winningCombos.length; i++) {
    const winCombo: number = Math.abs(
      board[winningCombos[i][0]]! +
        board[winningCombos[i][1]]! +
        board[winningCombos[i][2]]!
    );

    if (winCombo === 3) {
      winner = true;
      // confetti.start(1500);
      messageEl.textContent = "We have a winner!";
      boardEl.classList.add("animate__animated", "animate__flash");
    }
  }
}

function switchPlayerTurn(): void {
  if (winner === true) {
    return;
  } else {
    turn *= -1;
  }
}
