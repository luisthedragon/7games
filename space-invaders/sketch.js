function setup() {
  createCanvas(400, 400);
  aliens = [];
  bullets = [];
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 3; j++) {
      aliens.push(new Alien(56 * i / 2 + 75, 40 + j * 30, 10))
    }
  }
  player = new Player(width / 2, height - 20, 20, 20);
}

function draw() {
  background(50);
  stroke(255, 0, 0);
  line(0, height - 80, width, height - 80);
  if (player.isShooting) {
    bullets.push(new Bullet(player.x + player.w / 4, player.y, 10, 20));
    player.isShooting = false;
    player.canShoot = false;
    player.reload();
  }

  bullets.forEach(b => {
    b.paint();
    b.move();
  });

  for (i = 0; i < aliens.length; i++) {
    if (aliens[i].checkBumpsWall()) {
      aliens.forEach(a => a.dropDown());
      break;
    }
  }

  player.paint();
  player.listenKey();

  if (aliens.length == 0) {
    console.log('you win');
    winMessage();
  }

  for (i = 0; i < aliens.length; i++) {
    bullets.forEach(b => b.checkBumpsAlien(aliens[i]));
    aliens[i].paint();
    aliens[i].move();
    if (aliens[i].checkTresspass()) {
      console.log('you lose');
      loseMessage();
      break;
    }
  }

  collectGarbage();
}

function collectGarbage() {
  aliens.forEach((a, ind) => {
    if (a.toDelete) {
      aliens.splice(ind, 1)
    }
  });
  bullets.forEach((b, ind) => {
    if (b.toDelete) {
      bullets.splice(ind, 1)
    }
  });
}

function loseMessage() {
  noLoop();
  noCanvas();
  createImg('img/game_over.PNG', '');
}


function winMessage() {
  noLoop();
  noCanvas();
  createImg('img/winner.PNG', '');
}