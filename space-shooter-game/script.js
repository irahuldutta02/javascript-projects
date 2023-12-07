const jet = document.getElementById("jet");
const board = document.getElementById("board");
const message = document.getElementById("message");
let boardWidth = board.clientWidth;
let boardHeight = board.clientHeight;
let jetHitLeftWall = false;
let moveJetBy = 25;
let point = 0;
let life = 3;
let bulletCountInterval;
let gameOver = false;

let bulletCount = document.getElementById("bullets");

function noBulletMessage() {
  let secondCount = 10;
  bulletCountInterval = setInterval(() => {
    if (secondCount === 0) {
      bulletCount = 0;
      message.innerHTML = `You have ${100 - bulletCount} bullets left.`;
      clearInterval(bulletCountInterval);
      return;
    }
    message.innerHTML = `Reloading bullets in ${secondCount} secondes.`;
    secondCount--;
  }, 1000);
}

// control the jet
function controlJet() {
  let left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));

  if (jetHitLeftWall == false) {
    jet.style.left = left - moveJetBy + "px";
    if (left <= 0) {
      jetHitLeftWall = true;
    }
  }

  if (jetHitLeftWall == true) {
    jet.style.left = left + moveJetBy + "px";
    if (left >= boardWidth - 100) {
      jetHitLeftWall = false;
    }
  }
}

// shoot bullets
function shootBullets() {
  if (isNaN(bulletCount) || bulletCount == 0 || bulletCount <= 100) {
    message.innerHTML = `You have ${100 - bulletCount} bullets left.`;
    let left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));

    let bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);
    bulletCount++;

    let moveBullets = setInterval(() => {
      let aliens = document.querySelectorAll(".alien");

      aliens.forEach((alien) => {
        if (alien !== undefined) {
          let alienBound = alien.getBoundingClientRect();
          let bulletBound = bullet.getBoundingClientRect();

          if (
            bulletBound.left >= alienBound.left &&
            bulletBound.right <= alienBound.right &&
            bulletBound.top <= alienBound.top &&
            bulletBound.bottom <= alienBound.bottom
          ) {
            alien.parentElement.removeChild(alien);

            point++;
            document.getElementById("points").innerHTML = `Score: ${point}`;
          }
        }
      });

      let bulletBottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      if (bulletBottom >= boardHeight) {
        clearInterval(moveBullets);
        bullet.remove();
      }

      bullet.style.left = left + "px";
      bullet.style.bottom = bulletBottom + 3 + "px";
    });

    if (bulletCount > 100) {
      noBulletMessage();
    }
  }
  return;
}

// Object to keep track of pressed keys
const keys = {};

// Function to handle keydown event
function handleKeyDown(event) {
  keys[event.key] = true;
  handleKeys();
}

// Function to handle keyup event
function handleKeyUp(event) {
  keys[event.key] = false;
}

// Function to handle pressed keys
function handleKeys() {
  if (!gameOver) {
    if (keys[" "] && keys["w"]) {
      if (bulletCount > 100) {
        return;
      } else {
        controlJet();
        shootBullets();
      }
    }

    if (keys["w"]) {
      if (bulletCount > 100) {
        return;
      } else {
        shootBullets();
      }
    }

    if (keys[" "]) {
      if (bulletCount > 100) {
        return;
      } else {
        controlJet();
      }
    }
  }
}

// Attach event listeners
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

let generateAliens = setInterval(() => {
  let alien = document.createElement("div");
  alien.classList.add("alien");

  alien.style.left =
    Math.floor(Math.random() * (board.clientWidth - 100)) + "px";

  board.appendChild(alien);
}, 600);

let moveAliens = setInterval(() => {
  moveAliensFunction();
}, 450);

function moveAliensFunction() {
  let aliens = document.querySelectorAll(".alien");

  aliens.forEach((alien) => {
    let alienBottom = parseInt(
      window.getComputedStyle(alien).getPropertyValue("bottom")
    );

    let alienTop = parseInt(
      window.getComputedStyle(alien).getPropertyValue("top")
    );

    if (alienBottom <= 0) {
      if (life > 0) {
        life--;
        document.getElementById("life").innerHTML = `Life: ${life}`;
        message.innerHTML = `One life lost. Try again.`;
        const aliens = document.querySelectorAll(".alien");
        aliens.forEach((alien) => alien.remove());
      } else {
        gameOver = true;
        message.innerHTML = `Game Over Score: ${point}`;
        clearInterval(bulletCountInterval);
        clearInterval(moveAliens);
        clearInterval(generateAliens);
        const aliens = document.querySelectorAll(".alien");
        aliens.forEach((alien) => alien.remove());
        jet.style.left = "50%";
        jet.style.transform = "translateX(-50%)";

        window.location.reload();
      }
    }

    alien.style.top = alienTop + 50 + "px";
  });
}
