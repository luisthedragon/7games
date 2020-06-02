function Player(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.isShooting = false;
  this.canShoot = true;
  this.reloadTime = 500;  // ms
  
  this.paint = function() {
    noStroke();
    fill(0, 200, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  this.move = function(direction) {
    if (direction == 'left') {
      this.x -= 5;
    }else if (direction == 'right') {
      this.x += 5;
    }
  }

  this.listenKey = function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.move('left');
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.move('right');
    }
    if (keyIsDown(32)) {
      this.shoot();
    }
  }
  
  this.shoot = function() {
    if(this.canShoot){
      this.isShooting = true;   
    }
  }
  
  this.reload = function(){
    setTimeout(() => this.canShoot = true, this.reloadTime);
  }
}