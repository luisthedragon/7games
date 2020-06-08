function Alien(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dir = 1;
  this.toDelete = false;

  this.paint = function() {
    noStroke();
    fill(100, 100, 100);
    ellipse(this.x, this.y, this.r * 2);
  }

  this.move = function() {
    this.x += this.dir;
  }

  this.checkBumpsWall = function() {
    if (this.x + this.r >= width || this.x - this.r <= 0) {
      return true;
    }
  }

  this.dropDown = function() {
    this.dir = -this.dir;
    this.y += 30;
  }

  this.checkTresspass = function() {
    if (this.y >= height - 80) {
      return true;
    }
  }
}