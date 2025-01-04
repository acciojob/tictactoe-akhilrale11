const submitButton = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const messageDiv = document.querySelector('.message');
const boardDiv = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let moves = Array(9).fill(null);

submitButton.addEventListener('click', () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert('Please enter names for both players.');
    return;
  }

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up!`;
  messageDiv.classList.remove('hidden');
  boardDiv.classList.remove('hidden');
  document.querySelector('.input-section').classList.add('hidden');
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const cellIndex = cell.id - 1;

    if (moves[cellIndex] || checkWinner()) {
      return;
    }

    moves[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
    cell.textContent = moves[cellIndex];

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      return;
    }

    if (moves.every(move => move)) {
      messageDiv.textContent = "It's a draw!";
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  });
});

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return moves[a] && moves[a] === moves[b] && moves[a] === moves[c];
  });
}
