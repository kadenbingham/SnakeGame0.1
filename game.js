//Variables
let nIntervId;
const boardConatiner = document.querySelector("#boardContainer");
const board = document.createElement("div");
const start = document.querySelector(".startButton");
const maxRows = 15;
const maxCols = 15;
const UP = [-1, 0];
const RIGHT = [0, 1];
const LEFT = [0, -1];
const DOWN = [1, 0];
const score = document.querySelector("#scoreDisplay");
let numFoodCoords = 0;
document.addEventListener("keydown", changeDir);

let snake = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
];
let currDir = RIGHT;
function gameOver() {
  if (
    snake[snake.length - 1].row < 0 ||
    snake[snake.length - 1].col < 0 ||
    snake[snake.length - 1].row > 14 ||
    snake[snake.length - 1].col > 14
  ) {
    board.remove();
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomId() {
  let randomRow = getRandomInt(0, 14);
  let randomCol = getRandomInt(0, 14);
  let randomId;
  randomId = `${randomRow},${randomCol}`;
  return randomId;
}
function dropFood() {
  if (numFoodCoords == 0) {
    numFoodCoords = getRandomId();
    let foodCoords = document.getElementById(numFoodCoords);
    foodCoords.classList.add("food");
    console.log("numfoodcoord?", numFoodCoords);
  }
  if (
    //if snake head  == apples
    `${snake[snake.length - 1].row},${snake[snake.length - 1].col}` ==
    numFoodCoords
  ) {
    //eat/delete it and grow snake bigger
    console.log("happy birthday");
    let foodCoords = document.getElementById(numFoodCoords);
    foodCoords.removeAttribute("food");
    foodCoords.style.backgroundColor = "rgb(167, 227, 167)";
    snake.unshift({
      row: `${snake[0].row}` - 1,
      col: `${snake[0].col}` - 1,
    });
    numFoodCoords = 0;
  }
}
function tick() {
  gameOver();
  moveSnake();
  makeSnake();
  dropFood();
}
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
}

//Tick

//functions
function makeGrid() {
  snake = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
  ];
  console.log("end my suffering");
  // make the gameBoard div here, and append each cell to this div
  //const board = document.createElement("div");
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
start.addEventListener("click", (nIntervId = setInterval(tick, 200)));
