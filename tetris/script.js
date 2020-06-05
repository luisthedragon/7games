const squares =  document.querySelectorAll('.tile');
const width=20;
const height=20;

function Tetromino (type='O'){
  // I, O, T, S, Z, J, and L
  this.type = type;

  switch (this.type){
    case 'I':
      this.blocks = [new Block(width/2-1,0), new Block(width/2-1, 1), new Block(width/2-1,2), new Block(width/2-1,3), ];
      break;
    case 'O':
      this.blocks = [new Block(width/2-1,0), new Block(width/2,0), new Block(width/2-1,1), new Block(width/2,1), ];
      break;
    case 'T':
      this.blocks = [new Block(width/2-2,0), new Block(width/2-1, 0), new Block(width/2,0), new Block(width/2-1,1), ];
      break;
    case 'S':
      this.blocks = [new Block(width/2-1,0), new Block(width/2, 0), new Block(width/2-2,1), new Block(width/2-1,1), ];
      break;
    case 'Z':
      this.blocks = [new Block(width/2-2,0), new Block(width/2-1, 0), new Block(width/2-1,1), new Block(width/2,1), ];
      break;
    case 'J':
      this.blocks = [new Block(width/2,0), new Block(width/2, 1), new Block(width/2-1,2), new Block(width/2,2), ];
      break;
    case 'L':
      this.blocks = [new Block(width/2-1,0), new Block(width/2-1, 1), new Block(width/2-1,2), new Block(width/2,2), ];
      break;
  }
  
  switch (this.type){
    case 'I':
      this.topColliders = [0];
      this.leftColliders = [0, 1, 2, 3];
      this.rightColliders = [0, 1, 2, 3];
      this.bottomColliders = [3];
      break;
    case 'O':
      this.topColliders = [0, 1];
      this.leftColliders = [0, 2];
      this.rightColliders = [1, 3];
      this.bottomColliders = [2, 3];
      break;
    case 'T':
      this.topColliders = [0, 1, 2];
      this.leftColliders = [0, 3];
      this.rightColliders = [2, 3];
      this.bottomColliders = [0, 2, 3];
      break;
    case 'S':
      this.topColliders = [0, 1, 2];
      this.leftColliders = [0, 2];
      this.rightColliders = [1, 3];
      this.bottomColliders = [1, 2, 3];
      break;
    case 'Z':
      this.topColliders = [0, 1, 3];
      this.leftColliders = [0, 2];
      this.rightColliders = [1, 3];
      this.bottomColliders = [0, 2, 3];
      break;
    case 'J':
      this.topColliders = [0, 2];
      this.leftColliders = [0, 1, 2];
      this.rightColliders = [0, 1, 3];
      this.bottomColliders = [2, 3];
      break;
    case 'L':
      this.topColliders = [0, 3];
      this.leftColliders = [0, 1, 2];
      this.rightColliders = [0, 1, 3];
      this.bottomColliders = [2, 3];
      break;
  }
  

  this.reachedBottom = false;
  this.rotation = 0;

  this.draw = function(){
    this.blocks.forEach(b => b.draw());
  }

  this.collidesLeft = function(){
    return this.leftColliders.reduce((acumm, lc) => acumm || this.blocks[lc].collidesLeft(), false);
  }

  this.collidesRight = function(){
    return this.rightColliders.reduce((acumm, rc) => acumm || this.blocks[rc].collidesRight(), false);
  }

  this.checkReachedBottom = function(){
    this.bottomColliders.forEach(bc => this.blocks[bc].checkReachedBottom());
    if (this.bottomColliders.reduce((acumm, bc) => acumm || this.blocks[bc].reachedBottom, false)){
      console.log('changed');
      this.reachedBottom = true;
    }
  }

  this.fall = function(){
    this.checkReachedBottom();
    if (!this.reachedBottom){
      console.log('falling');
      this.blocks.forEach(b => b.fall());
    }
  }

  // this.move() = function(){
  //   this.blocks.forEach(move => b.draw());
  // }

  this.updateLastPos = function(){
    this.blocks.forEach(b => {
      b.lastX = b.x;
      b.lastY = b.y;
    });
  }

  this.control = function (e){
    // console.log(this);
    if (tetromino!=this){
      return;
    }

    switch(e.keyCode){
      case 37:
        // this.move('left');
        this.dir = 'left';
        break;
      case 38:
        this.rotate();
        break;
      case 39:
        this.dir = 'right';
        // this.move('right');
        break;
      case 40:
        this.fall();
    }
    // console.log('pressed', e.keyCode);
  }

  this.slide = function(){
    switch (this.dir) {
      case 'left':
        if (!this.collidesLeft()){
          this.blocks.forEach(b => {
            b.dir = 'left';
          });
        }
        break;
      case 'right':
        if (!this.collidesRight()){
          this.blocks.forEach(b => {
            b.dir = 'right';
          });
        }
        break;
      default:
        // statements_def
      break;
    }
    this.dir = 'stay';
    this.blocks.forEach(b => {
      b.slide();
      b.dir = 'stay';
    });
  }

  this.rotate = function(){
    // counter-clock-wise-rotation
    switch(this.type){
      case 'I':
        if (this.rotation === 0){
          this.blocks[0].x -= 1;
          this.blocks[0].y += 2;

          this.blocks[1].y += 1;

          this.blocks[2].x += 1;

          this.blocks[3].x += 2;
          this.blocks[3].y -= 1;
          this.rotation = 90;
        }else if(this.rotation === 90){
          this.blocks[0].x += 2;
          this.blocks[0].y += 1;

          this.blocks[1].x += 1;

          this.blocks[2].y -= 1;

          this.blocks[3].x -= 1;
          this.blocks[3].y -= 2;
          this.rotation = 180;
        }else if(this.rotation === 180){
          this.blocks[0].x += 1;
          this.blocks[0].y -= 2;

          this.blocks[1].y -= 1;

          this.blocks[2].x -= 1;

          this.blocks[3].x -= 2;
          this.blocks[3].y += 1;
          this.rotation = 270;
        }else if(this.rotation === 270){
          this.blocks[0].x -= 2;
          this.blocks[0].y -= 1;

          this.blocks[1].x -= 1;

          this.blocks[2].y += 1;

          this.blocks[3].x += 1;
          this.blocks[3].y += 2;
          this.rotation = 0;
        }
        break;
      case 'T':
        if (this.rotation === 0){
          this.blocks[0].x += 1;
          this.blocks[0].y += 1;

          this.blocks[2].x -= 1;
          this.blocks[2].y -= 1;

          this.blocks[3].x += 1;
          this.blocks[3].y -= 1;
          this.rotation = 90;
        }else if(this.rotation === 90){
          this.blocks[0].x += 1;
          this.blocks[0].y -= 1;

          this.blocks[2].x -= 1;
          this.blocks[2].y += 1;

          this.blocks[3].x -= 1;
          this.blocks[3].y -= 1;
          this.rotation = 180;
        }else if(this.rotation === 180){
          this.blocks[0].x -= 1;
          this.blocks[0].y -= 1;

          this.blocks[2].x += 1;
          this.blocks[2].y += 1;

          this.blocks[3].x -= 1;
          this.blocks[3].y += 1;
          this.rotation = 270;
        }else if(this.rotation === 270){
          this.blocks[0].x -= 1;
          this.blocks[0].y += 1;

          this.blocks[2].x += 1;
          this.blocks[2].y -= 1;

          this.blocks[3].x += 1;
          this.blocks[3].y += 1;
          this.rotation = 0;
        }
        break;
      case 'S':
        if (this.rotation === 0){
          this.blocks[0].x -= 1;
          this.blocks[0].y += 1;

          this.blocks[1].x -= 2;

          this.blocks[2].x += 1;
          this.blocks[2].y += 1;
          this.rotation = 90;
        }else if(this.rotation === 90){
          this.blocks[0].x += 1;
          this.blocks[0].y += 1;

          this.blocks[1].y += 2;

          this.blocks[2].x += 1;
          this.blocks[2].y -= 1;
          this.rotation = 180;
        }else if(this.rotation === 180){
          this.blocks[0].x += 1;
          this.blocks[0].y -= 1;

          this.blocks[1].x += 2;

          this.blocks[2].x -= 1;
          this.blocks[2].y -= 1;
          this.rotation = 270;
        }else if(this.rotation === 270){
          this.blocks[0].x -= 1;
          this.blocks[0].y -= 1;

          this.blocks[1].y -= 2;

          this.blocks[2].x -= 1;
          this.blocks[2].y += 1;
          this.rotation = 0;
        }
        break;
      case 'Z':
        if (this.rotation === 0){
          this.blocks[0].y += 2;

          this.blocks[1].x -= 1;
          this.blocks[1].y += 1;

          this.blocks[3].x -= 1;
          this.blocks[3].y -= 1;
          this.rotation = 90;
        }else if(this.rotation === 90){
          this.blocks[0].x += 2;

          this.blocks[1].x += 1;
          this.blocks[1].y += 1;

          this.blocks[3].x -= 1;
          this.blocks[3].y += 1;
          this.rotation = 180;
        }else if(this.rotation === 180){
          this.blocks[0].y -= 2;

          this.blocks[1].x += 1;
          this.blocks[1].y -= 1;

          this.blocks[3].x += 1;
          this.blocks[3].y += 1;
          this.rotation = 270;
        }else if(this.rotation === 270){
          this.blocks[0].x -= 2;

          this.blocks[1].x -= 1;
          this.blocks[1].y -= 1;

          this.blocks[3].x += 1;
          this.blocks[3].y -= 1;
          this.rotation = 0;
        }
        break;
      case 'J':
        if (this.rotation === 0){
          this.blocks[0].x -= 1;
          this.blocks[0].y += 1;

          this.blocks[2].x += 2;

          this.blocks[3].x += 1;
          this.blocks[3].y -= 1;
          this.rotation = 90;
        }else if(this.rotation === 90){
          this.blocks[0].x += 1;
          this.blocks[0].y += 1;
          
          this.blocks[2].y -= 2;

          this.blocks[3].x -= 1;
          this.blocks[3].y -= 1;
          this.rotation = 180;
        }else if(this.rotation === 180){
          this.blocks[0].x += 1;
          this.blocks[0].y -= 1;
          
          this.blocks[2].x -= 2;

          this.blocks[3].x -= 1;
          this.blocks[3].y += 1;
          this.rotation = 270;
        }else if(this.rotation === 270){
          this.blocks[0].x -= 1;
          this.blocks[0].y -= 1;
          
          this.blocks[2].y += 2;

          this.blocks[3].x += 1;
          this.blocks[3].y += 1;
          this.rotation = 0;
        }
        break;
      case 'L':
        if (this.rotation === 0){
          this.blocks[0].x -= 1;
          this.blocks[0].y += 1;

          this.blocks[2].x += 1;
          this.blocks[2].y -= 1;

          this.blocks[3].y -= 2;
          this.rotation = 90;
        }else if(this.rotation === 90){
          this.blocks[0].x += 1;
          this.blocks[0].y += 1;
          
          this.blocks[2].x -= 1;
          this.blocks[2].y -= 1;

          this.blocks[3].x -= 2;
          this.rotation = 180;
        }else if(this.rotation === 180){
          this.blocks[0].x += 1;
          this.blocks[0].y -= 1;
          
          this.blocks[2].x -= 1;
          this.blocks[2].y += 1;

          this.blocks[3].y += 2;
          this.rotation = 270;
        }else if(this.rotation === 270){
          this.blocks[0].x -= 1;
          this.blocks[0].y -= 1;
          
          this.blocks[2].x += 1;
          this.blocks[2].y += 1;

          this.blocks[3].x += 2;
          this.rotation = 0;
        }
        break;
      default:
        console.log('Rotation not implemented');
        break;
    }

    if (this.type != 'O'){
      let aux = [...this.bottomColliders];
      this.bottomColliders = [...this.leftColliders];
      this.leftColliders = [...this.topColliders];
      this.topColliders = [...this.rightColliders];
      this.rightColliders = [...aux];  
    }
  }

  this.checkOverlaps = function(){

  }
}


function Block(x, y){
  this.lastX = x;
  this.lastY = y;
  this.x = x;
  this.y = y;
  this.reachedBottom = false;
  this.dir = 'stay';

  this.draw = function(){
    if(this.checkOverlaps()){
      console.log('shit');
    }
    squares[this.x+this.y*width].classList.add('block');
    squares[this.x+this.y*width].classList.add(`${tetromino.type}-block`);
  }

  this.checkReachedBottom = function(){
    // if(squares[this.x+(this.y+1)*width] === undefined){
    //   console.log(`Error here: ${this.x}, ${this.y}, ${this.x+(this.y+1)*width}`);
    //   console.log('I am...');
    //   console.log(this);
    // }
    if (this.y == height-1 || squares[this.x+(this.y+1)*width].classList.contains('block'))
      this.reachedBottom = true;
  }

  this.fall = function(){
    if (!this.reachedBottom)
      this.y++;
  }

  this.collidesLeft = function(){
    return this.x <= 0 || squares[this.x-1+(this.y)*width].classList.contains('block');
  }

  this.collidesRight = function(){
    return this.x >= width-1 || squares[this.x+1+(this.y)*width].classList.contains('block');
  }
  
  this.slide = function(){
    switch (this.dir) {
      case 'left':
        // if (!this.collidesLeft())
        this.x--;
        break;
      case 'right':
        // if (!this.collidesRight())
        this.x++;
        break;
      case 'down':
        this.fall();
      default:
        // statements_def
        break;
    }
    this.dir = 'stay';
  }

  this.updateLastPos = function(){
    this.lastX = this.x;
    this.lastY = this.y;
  }

  // USE ONLY BEFORE DRAWING, DON'T BE DUMB!!!
  this.checkOverlaps = function(){
    return squares[this.x+this.y*width].classList.contains('block');
  }
}

function main(){
  //clean
  // tetromino.blocks.forEach(b => {
  //   squares[b.lastX + b.lastY * width].classList.remove('block');
  //   squares[b.lastX + b.lastY * width].classList.remove(`${tetromino.type}-block`);
  // });
  // tetromino.updateLastPos();
  // tetromino.draw();
  tetromino.fall();
  

  // block.updateLastPos();
  // blocks.forEach(b => b.draw());
  // // // check for game over
  // // if (checkGameOver()){
  // //   displayGameOverMessage();
  // //   clearInterval(interval);
  // //   clearInterval(interval2);
  // // }
  // // // check for winner
  // // if (checkWinner()){
  // //   displayWinnerMessage();
  // //   clearInterval(interval);
  // //   clearInterval(interval2);
  // // }
  // block.fall();
}

function main2(){
  // squares[block.lastX + block.lastY * width].classList.remove('block');
  // block.updateLastPos();
  // blocks.forEach(b => b.draw());
  // block.move();
  // for(let i=1; i<width; i++){
  //   squares[i + (height-2)*width].classList.add('block');
  //   squares[i + (height-1)*width].classList.add('block');
  // }
  tetromino.blocks.forEach(b => {
    squares[b.lastX + b.lastY * width].classList.remove('block');
    squares[b.lastX + b.lastY * width].classList.remove(`${tetromino.type}-block`);
  });
  tetromino.updateLastPos();
  tetromino.draw();
  tetromino.slide();
  if (tetromino.reachedBottom){
    tetromino = getRandomTetromino();
    document.addEventListener('keydown', tetromino.control.bind(tetromino));
    clearRows(getRowsCompleted());
  }
}

function getRandomTetromino(){
  // I, O, T, S, Z, J, and L
  let types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  let tInd = Math.floor(Math.random()*7);
  let tetromino = new Tetromino(types[tInd]);
  return tetromino;
}

function clearRow(row){
  deleteRow(row);
  dropDownRowsAbove(row);
}

function dropDownRowsAbove(row){
  for(let j=row-1; j>=0; j--){
    for (let i=0; i<width; i++){      
      if(squares[i + j * width].classList.contains('block') &&
        !(tetromino.blocks[0].x == i && tetromino.blocks[0].y == j) &&
        !(tetromino.blocks[1].x == i && tetromino.blocks[1].y == j) &&
        !(tetromino.blocks[2].x == i && tetromino.blocks[2].y == j) &&
        !(tetromino.blocks[3].x == i && tetromino.blocks[3].y == j)){
        squares[i + j * width].classList.forEach(c => {
          squares[i + (j+1) * width].classList.add(c);  
        });
        [...squares[i + j * width].classList].forEach(c => {
          if (c != 'tile')
            squares[i + j * width].classList.remove(c);    
        });
      }
    }  
  }
}

function deleteRow(row){
  for (let i=0; i<width; i++){
    [...squares[i + row * width].classList].forEach(c => {
      if (c != 'tile')
        squares[i + row * width].classList.remove(c);    
    });
  }
}

function getRowsCompleted(){
  let rowsToClear = [];
  let hasSquare;
  let i = 0;
  let j = height - 1;
  while(j >= 0){
    i=0;
    hasSquare = false;
    while(i < width){
      if (squares[i + j * width].classList.contains('block')){
        hasSquare = true;
        i++;
      }
      else{
        break;
      }
    }
    if (hasSquare && i == width){
      rowsToClear.unshift(j);
    }
    j--;
  }
  return rowsToClear;
}

function clearRows(rowsToClear){
  rowsToClear.forEach(row => clearRow(row));
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

// blocks = [];
// blocks.push(new Block(4,4));


tetromino = new Tetromino('L');
squares[120].classList.add('block');
for (let i=0; i<width; i++){
  squares[i + (height-1) * width].classList.add('block')
  squares[i + (height-2) * width].classList.add('block')
}
// blocks = [new Block(4,4)];

// block = blocks[0];
// console.log(block);

interval = setInterval(main, 1000);
interval2 = setInterval(main2, 10);

document.addEventListener('keydown', tetromino.control.bind(tetromino));


