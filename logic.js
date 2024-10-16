const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const boardContainer = document.querySelector(".board");
document.addEventListener("swiped-up", (e) => {
  console.log(e.target);
});

function display() {
  let elem = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        boardContainer.children[elem].style.color = "";
        boardContainer.children[elem].innerText = "";
        boardContainer.children[elem].style.backgroundColor = "";
        elem++;
      } else {
        if (board[row][col] >= 128) {
          boardContainer.children[elem].style.color = "white";
        }
        boardContainer.children[elem].innerText = board[row][col];
        boardContainer.children[elem].style.backgroundColor = changeColor(
          row,
          col
        );
        elem++;
      }
    }
  }
}

function assignRandom() {
  let emptyCells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        emptyCells.push([row, col]);
      }
    }
  }

  if (emptyCells.length === 0) {
    const gameOver = document.querySelector(".board");
    gameOver.innerHTML = "Game Over";
    gameOver.classList.add("gameOver");
    return;
  }

  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  let [row, col] = randomCell;

  board[row][col] = Math.random() > 0.9 ? 4 : 2;
}

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      return;
  }
  display();
  assignRandom();
  display();
});

function changeColor(row, col) {
  let value = board[row][col];
  return `hsla(220, ${(100 / 12) * Math.log2(value)}%, ${
    100 - Math.log2(value) * 12
  }%,${100 - Math.log2(value) / 12}%)`;
}
assignRandom();
assignRandom();
display();

function moveUp() {
  for (let col = 0; col < 4; col++) {
    let temp = [];

    // Collect all non-zero values in the column
    for (let row = 0; row < 4; row++) {
      if (board[row][col] !== 0) {
        temp.push(board[row][col]);
      }
    }

    // Merge values if they are the same
    for (let i = 0; i < temp.length - 1; i++) {
      if (temp[i] === temp[i + 1]) {
        temp[i] *= 2;
        temp[i + 1] = 0;
      }
    }

    // Filter out the zeros created by merging and reassemble the column
    temp = temp.filter((value) => value !== 0);

    // Fill the remaining spaces in the column with zeros
    while (temp.length < 4) {
      temp.push(0);
    }

    // Put the new values back into the board
    for (let row = 0; row < 4; row++) {
      board[row][col] = temp[row];
    }
  }
}

function moveDown() {
  for (let col = 0; col < 4; col++) {
    let temp = [];

    // Collect all non-zero values in the column, starting from the bottom
    for (let row = 3; row >= 0; row--) {
      if (board[row][col] !== 0) {
        temp.push(board[row][col]);
      }
    }

    // Merge values if they are the same
    for (let i = 0; i < temp.length - 1; i++) {
      if (temp[i] === temp[i + 1]) {
        temp[i] *= 2;
        temp[i + 1] = 0;
      }
    }

    // Filter out the zeros created by merging
    temp = temp.filter((value) => value !== 0);

    // Fill the remaining spaces in the column with zeros
    while (temp.length < 4) {
      temp.push(0);
    }

    // Put the new values back into the board in reverse order
    for (let row = 3; row >= 0; row--) {
      board[row][col] = temp[3 - row];
    }
  }
}

function moveLeft() {
  for (let row = 0; row < 4; row++) {
    let temp = [];

    // Collect all non-zero values in the row
    for (let col = 0; col < 4; col++) {
      if (board[row][col] !== 0) {
        temp.push(board[row][col]);
      }
    }

    // Merge values if they are the same
    for (let i = 0; i < temp.length - 1; i++) {
      if (temp[i] === temp[i + 1]) {
        temp[i] *= 2;
        temp[i + 1] = 0;
      }
    }

    // Filter out the zeros created by merging and reassemble the row
    temp = temp.filter((value) => value !== 0);

    // Fill the remaining spaces in the row with zeros
    while (temp.length < 4) {
      temp.push(0);
    }

    // Put the new values back into the board
    for (let col = 0; col < 4; col++) {
      board[row][col] = temp[col];
    }
  }
}

function moveRight() {
  for (let row = 0; row < 4; row++) {
    let temp = [];

    // Collect all non-zero values in the row, starting from the right
    for (let col = 3; col >= 0; col--) {
      if (board[row][col] !== 0) {
        temp.push(board[row][col]);
      }
    }

    // Merge values if they are the same
    for (let i = 0; i < temp.length - 1; i++) {
      if (temp[i] === temp[i + 1]) {
        temp[i] *= 2;
        temp[i + 1] = 0;
      }
    }

    // Filter out the zeros created by merging
    temp = temp.filter((value) => value !== 0);

    // Fill the remaining spaces in the row with zeros
    while (temp.length < 4) {
      temp.push(0);
    }

    // Put the new values back into the board in reverse order
    for (let col = 3; col >= 0; col--) {
      board[row][col] = temp[3 - col];
    }
  }
}
