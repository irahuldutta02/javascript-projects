document.addEventListener("DOMContentLoaded", function () {
  let message = document.querySelector(".message");
  let table = document.getElementById("ping-pong-table");
  let ball = document.getElementById("ball");
  let paddle = document.getElementById("paddle");
  let score = 0;
  let scoreBoard = document.querySelector(".score");
  scoreBoard.innerHTML = `Score: ${score}`;
  let life = 3;
  let lifeBoard = document.querySelector(".life");
  lifeBoard.innerHTML = `Life: ${life}`;
  let intervalId;

  let ballX = 20; // initial position of ball in x-direction
  let ballY = 20; // initial position of ball in y-direction

  let dx = 2; // displacement factor in x-direction
  let dy = 2; // displacement factor in y-direction

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  intervalId = setInterval(function () {
    ballX += dx;
    ballY += dy;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    if (ballX > table.offsetWidth - ball.offsetWidth || ballX < 0) {
      dx *= -1;
    }

    if (ballX < 0) {
      life -= 1;
      if (life < 0) {
        lifeBoard.innerHTML = `Life: 0`;
        message.innerHTML = "Game Over";
        message.style.color = "red";
        clearInterval(intervalId);
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        lifeBoard.innerHTML = `Life: ${life}`;
      }
    }

    if (ballY > table.offsetHeight - ball.offsetHeight || ballY < 0) {
      dy *= -1;
    }

    // collision detection
    if (
      ballX + 5 < paddle.offsetLeft + paddle.offsetWidth &&
      ballY > paddle.offsetTop &&
      ballY - ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight + 10
    ) {
      dx *= -1;
      score += 1;
      scoreBoard.innerHTML = `Score: ${score}`;
    }
  }, 10);

  let paddleY = 0; // initial position of paddle in y-direction
  let dpy = 15; // displacement factor in y-direction
  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.keyCode == 38) {
      if (paddleY > 0) {
        paddleY += -1 * dpy;
      }
    } else if (event.keyCode == 40) {
      if (paddleY < table.offsetHeight - paddle.offsetHeight - 10) {
        paddleY += dpy;
      }
    }

    paddle.style.top = `${paddleY}px`;
  });
});
