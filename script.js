const rulesButton = document.getElementById("rules-btn");
const closeButton = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const color = getComputedStyle(document.documentElement).getPropertyValue(
  "--button-color"
);

const secondaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--sidebar-color");

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;
const heightRatio = 0.75;

canvas.height = canvas.width * heightRatio;
ctx.canvas.width = 800;
ctx.canvas.height = ctx.canvas.width * heightRatio;

const ball = {

  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

function drawBall() {
  ctx.beginPath();

  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = secondaryColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {

  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '20px "Helvetica"';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {

  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? color : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
 
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}