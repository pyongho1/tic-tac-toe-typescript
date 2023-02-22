"use strict";
// Constants
const winningCombos = [
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
let board, turn, winner, tie;
// Cached Elements
const squareEl = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#resetBtn");
const boardEl = document.querySelector(".board");
console.dir(squareEl);
// Event Listeners
squareEl.forEach(function (box) {
    box.addEventListener("click", handleClick);
});
resetBtnEl.addEventListener("click", init);
function init() {
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
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach((element, index) => {
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
function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's ${turn === 1 ? "🌝" : "🌚"}'s turn`;
        return turn;
    }
    else if (winner === false && tie === true) {
        return "It's a tie!";
    }
    else {
        messageEl.textContent = `${turn === 1 ? "🌝" : "🌚"} wins the game!`;
    }
}
function handleClick(evt) {
    const sqIdx = Number(evt.target.id.slice(2));
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
function placePiece(pieceIdx) {
    board[pieceIdx] = turn;
}
function checkForTie() {
    let tieResult = board.every((box) => box !== null);
    if (tieResult) {
        tie = true;
        messageEl.textContent = "It's a tie!";
        messageEl.classList.add("animate__animated", "animate__shakeX");
    }
    else {
        tie = false;
    }
}
function checkForWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        const winCombo = Math.abs(board[winningCombos[i][0]] +
            board[winningCombos[i][1]] +
            board[winningCombos[i][2]]);
        if (winCombo === 3) {
            winner = true;
            // confetti.start(1500);
            messageEl.textContent = "We have a winner!";
            boardEl.classList.add("animate__animated", "animate__flash");
        }
    }
}
function switchPlayerTurn() {
    if (winner === true) {
        return;
    }
    else {
        turn *= -1;
    }
}
