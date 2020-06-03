const squares =  document.querySelectorAll('.tile');
const width=20;
const height=20;

function Trunk(x, y, w, s){
  this.x = x;
  this.y = y;
  this.w = w;
  this.s = s;

  this.draw = function(){
    squares[this.x+this.y*width].classList.add('trunk','trunk-left');
    for (i=1; i<this.w-1; i++){
      squares[(this.x+i)%width+this.y*width].classList.add('trunk');
    }
    squares[(this.x+this.w-1)%width+this.y*width].classList.add('trunk', 'trunk-right');
  }

  this.move = function(){
    this.x = (this.x + s + width) % width;
  }

  this.overlapsOtherTrunk = function(other_trunk){
    if (other_trunk.x + other_trunk.w >= width){
      // evaluate substracting width to other_trunk
      if (this.x + this.w < other_trunk.x && other_trunk.x + other_trunk.w - width < this.x){
        return false;
      }
    }else if(this.x + this.w >= width){
      // evaluate substracting width to this
      if (this.x + this.w - width < other_trunk.x  && other_trunk.x + other_trunk.w < this.x){
        return false;
      }
    }else{
      // evaluate normally
      // if the right side of this is lower than the left side of the other
      // or the right side of the other is lower than the left side of the this
      if (this.x + this.w < other_trunk.x  || other_trunk.x + other_trunk.w < this.x){
        return false;
      }  
    }
    return true;
  }

  this.overlapsAnyOtherTrunk = function(other_trunks){
    return_val = false;
    other_trunks.forEach(t => {
      if (return_val) return;
      if (t.overlapsOtherTrunk(this)){
        // console.log(this);
        return_val = true;
      }
    });
    return return_val;
  }

}

function Frog(x, y){
  this.lastX = x;
  this.lastY = y;
  this.x = x;
  this.y = y;
  this.onwater = false;
  this.ongoal = false;

  this.draw = function(){
    squares[this.x+this.y*width].classList.add('frog');
  }

  this.move = function(){
    switch (this.dir) {
      case 'up':
        this.y--;
        break;
      case 'down':
        this.y++;
        break;
      case 'left':
        this.x--;
        break;
      case 'right':
        this.x++;
        break;
      default:
        // statements_def
        break;
    }
    frog.dir = 'stay';
  }

  this.control = function (e){
    console.log(this);
    switch(e.keyCode){
      case 37:
        // this.move('left');
        this.dir = 'left';
        break;
      case 38:
        this.dir = 'up';
        // this.move('up');
        break;
      case 39:
        this.dir = 'right';
        // this.move('right');
        break;
      case 40:
        this.dir = 'down';
        // this.move('down');
        break;
    }
    console.log('pressed', e.keyCode);
  }

  this.updateLastPos = function(){
    this.lastX = this.x;
    this.lastY = this.y;
  }

  this.checkOnWater = function(){
    if (squares[this.x+this.y*width].classList.contains('water')){
      this.onwater = true;
    }
  }

  this.checkOnGoal = function(){
    if (this.y === 0){
      this.ongoal = true;
    }
  }
}

// trunks = [new Trunk(16,1,3), new Trunk(8,5,5), new Trunk(1,18,5)];
// THE GOD OF FROGGER SAYS:
// TRUNKS MUST HAVE A WIDTH: 3-6
// EVERY ROW MUST HAVE N-TRUNKS: 2-3
// TRUNKS MUST NOT OVERLAP
function genTrunks(){
  for (let i=1; i<height-1; i++){
  // for (let i=1; i<2; i++){
    row_trunks = [];
    n_trunks = 2 + Math.floor(Math.random() * 2);
    for (let j=0; j<n_trunks; j++){
      w = 3 + Math.floor(Math.random() * 4);
      s = 1 + i % 2;
      if (i % 2 === 0){
        s *= -1;
      }
      patience = 20;
      do{
        x = Math.floor(Math.random() * width);  
        new_t = new Trunk(x, i, w, s);
        patience--;
        if(patience === 0) break;
      }while(new_t.overlapsAnyOtherTrunk(row_trunks));
      if (patience > 0){
        // console.log(new_t);
        row_trunks.push(new_t);  
      }else{
        console.log('patience exceeded');
      }
    }
    trunks.push(...row_trunks);
  }
}

function main(){
  // clean screen
  squares.forEach(s =>{
    s.classList.remove('trunk');
    s.classList.remove('trunk-left');
    s.classList.remove('trunk-right');
    s.classList.remove('water');
  });
  // draw
  for(let i=0; i<width; i++){
    squares[i].classList.add('rock');
    squares[i + (height-1)*width].classList.add('rock');
  }
  trunks.forEach(t => {
    t.draw();
  });
  
  squares.forEach((s,i) => {
    if (!s.classList.contains('trunk') && !s.classList.contains('rock')){
      s.classList.add('water');
    }
  });

  // move
  trunks.forEach(t => {
    t.move();
  });
}

function mainfrog(){
  squares[frog.lastX + frog.lastY * width].classList.remove('frog');
  frog.updateLastPos();
  frog.draw();
  // check for game over
  if (checkGameOver()){
    displayGameOverMessage();
    clearInterval(interval);
    clearInterval(interval2);
  }
  // check for winner
  if (checkWinner()){
    displayWinnerMessage();
    clearInterval(interval);
    clearInterval(interval2);
  }
  frog.move();
}

function checkGameOver(){
  frog.checkOnWater();
  if (frog.onwater){
    return true;
  }
}


function checkWinner(){
  frog.checkOnGoal();
  if (frog.ongoal){
    return true;
  }
}

function displayGameOverMessage(){
  console.log('game over');
  alert("YOU LOST... TRY AGAIN!!!");
}

function displayWinnerMessage(){
  console.log('you won!!');
  alert('YEAHH YOU WON!!!');
}

// here is where the magic happens

trunks = [];
genTrunks();
console.log(trunks);
frog = new Frog(Math.floor(width/2), height-1);

interval = setInterval(main, 1000);
interval2 = setInterval(mainfrog, 50);

document.addEventListener('keyup', frog.control.bind(frog));
document.querySelector('.start').addEventListener('click', () =>alert("HEEY!! I apologise this button doesn't work yet, but next version will include this feature for sure!!!"));



