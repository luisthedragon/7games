function Bullet(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.dir = -1;
  this.toDelete = false;

  this.paint = function() {
    noStroke();
    fill(200, 50, 50);
    rect(this.x, this.y, this.w, this.h);
  }

  this.move = function() {
    this.y += this.dir;
  }

  this.checkBumpsAlien = function(a) {
    [cx, cy, radius] = [a.x, a.y, a.r];
    [rx, ry, rw, rh] = [this.x, this.y, this.w, this.h]
    // temporary variables to set edges for testing
    testX = cx;
    testY = cy;

    // which edge is closest?
    if (cx < rx) testX = rx; // test left edge
    else if (cx > rx + rw) testX = rx + rw; // right edge
    if (cy < ry) testY = ry; // top edge
    else if (cy > ry + rh) testY = ry + rh; // bottom edge

    // get distance from closest edges
    distX = cx - testX;
    distY = cy - testY;
    distance = sqrt((distX * distX) + (distY * distY));

    // if the distance is less than the radius, collision!
    if (distance <= radius) {
      console.log('bump');
      fill(255);
      rect(this.x, this.y, this.w, this.h);
      a.toDelete = true;
      this.toDelete = true;
      return true;
    }
    return false;
  }

  // this.checkGetsDeleted = function(){
  //   if (bullet.) 
  // }
}