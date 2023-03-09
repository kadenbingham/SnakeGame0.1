//Variables
const boardConatiner = document.querySelector("#boardContainer");
const start = document.querySelector(".startButton");
console.log("Start button?", start);
const maxRows = 15;
const maxCols = 15;
const UP = [-1, 0];
const RIGHT = [0, 1];
const LEFT = [0, -1];
const DOWN = [1, 0];

document.addEventListener("keydown", changeDir);

let snake = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
];
let currDir = RIGHT;
//direction
function changeDir(event) {
  switch (event.key) {
    case "ArrowUp":
      if (currDir !== DOWN) {
        currDir = UP;
      }
      break;
    case "ArrowDown":
      if (currDir !== UP) {
        currDir = DOWN;
      }
      break;
    case "ArrowLeft":
      if (currDir !== RIGHT) {
        currDir = LEFT;
      }
      break;
    case "ArrowRight":
      if (currDir !== LEFT) {
        currDir = RIGHT;
      }
      break;
  }
  moveSnake();
  makeSnake();
}
// makeSnake
function makeSnake() {
  for (k = 0; k < snake.length; k++) {
    const snekSeg = snake[k];
    for (const prop in snekSeg) {
      let snakey = document.getElementById(`${snekSeg.row},${snekSeg.col}`);
      snakey.classList.add("snake");
    }
  }
}
// moveSnake
function moveSnake() {
  //drop the 'tail' of the snake and then add a new head
  //based off the direction variable
  let newHead;
  let behindSnake;
  let nonSnake;
  newHead = {
    row: currDir[0] + snake[snake.length - 1].row,
    col: currDir[1] + snake[snake.length - 1].col,
  };
  snake.push(newHead);
  behindSnake = snake.shift();
  nonSnake = document.getElementById(`${behindSnake.row},${behindSnake.col}`);
  nonSnake.classList.remove("snake");
  console.log("snake", snake);
  console.log("Behind SNake?", behindSnake);
}

//Tick

//functions
function makeGrid() {
  console.log("end my suffering");
  // make the gameBoard div here, and append each cell to this div
  const board = document.createElement("div");
  board.id = "gameBoard";
  for (let i = 0; i < maxRows; i++) {
    for (let j = 0; j < maxCols; j++) {
      const cell = document.createElement("div");
      cell.id = `${i},${j}`;
      board.appendChild(cell);
    }
  }
  // append the board to the body
  boardConatiner.append(board);
  makeSnake();
}

//Game Start
start.addEventListener("click", makeGrid);
