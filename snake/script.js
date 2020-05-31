//constants
const width = 20;
const squares =  document.querySelectorAll('.tile');
const scoreDisplay = document.querySelector('.score span')
const speedDisplay = document.querySelector('.speed span')

let snake = [];
let foodInd = 0;
let interval = 0;
let speed = 0.9;
let score = 0;

function startGame() {
	direction = newdirection = 1;
	score = 0;
	ate = false;
	gameover = false;
    snake.forEach(index => squares[index].classList.remove('snake', 'snake-head'));
    squares[foodInd].classList.remove('food');
    if (interval != 0){
    	clearInterval(interval);
    	console.log(interval);
    }
    score = 0;
    spawnFood();
    direction = 1;
    intervalTime = 500;
    scoreDisplay.innerText = score;
    speedDisplay.innerText = 1000/intervalTime;
    snake = [2,1,0];
    snake.forEach(index => {
		if (index != 2)
			squares[index].classList.add('snake');
		else
			squares[index].classList.add('snake-head');
	});
    interval = setInterval(move, intervalTime);
    console.log(interval);
  }

function updateSpeed(newIntervalTime){
	clearInterval(interval);
	intervalTime = newIntervalTime;
    interval = setInterval(move, newIntervalTime);
    speedDisplay.innerText = 1000/newIntervalTime;
}

function move(){
	direction = newdirection;
	handleColission();
	if (gameover) return;
	if (!ate){
		tail = snake.pop();
		squares[tail].classList.remove('snake');
	}
	ate = false;
	squares[snake[0]].classList.remove('snake-head');
	squares[snake[0]].classList.add('snake');
	snake.unshift(snake[0] + direction);
	squares[snake[0]].classList.add('snake-head');
	// console.log('evaluated direction:', direction)
	handleEating();
	// console.log(snake);
}

function handleEating(){
	head = snake[0];
	if (squares[head].classList.contains('food')){
		squares[foodInd].classList.remove('food');
		ate = true;
		spawnFood();
		updateSpeed(intervalTime * speed);
	    score++;
	    scoreDisplay.innerText = score;
	}
}

function handleColission(){
	console.log(snake)
	if(
	  (snake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      (snake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      (snake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (snake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      squares[snake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
   	  gameover = true;
      return clearInterval(interval); //this will clear the interval if any of the above happen
    }
}

function spawnFood(){
	do{
		foodInd = Math.floor(Math.random()*100)	
	}while(snake.includes(foodInd));
	squares[foodInd].classList.add('food');
}

function control(e){
	if(e.keyCode === 39 && direction != -1){ // left
		newdirection = 1;
	}else if(e.keyCode === 38 && direction != width){ // up
		newdirection = -width;
	}else if(e.keyCode === 37 && direction != 1){ // right
		newdirection = -1;
	}else if(e.keyCode === 40 && direction != -width){ // down
		newdirection = width;
	}
	else if(e.keyCode === 17){
		if (interval){
			clearInterval(interval);
			interval = undefined;	
		}
		else {
			interval = setInterval(move, intervalTime);
		}
	}
	else if(e.keyCode === 107){
		updateSpeed(intervalTime * speed);
	}
	else if(e.keyCode === 109){
		updateSpeed(intervalTime / speed);
	}
	console.log('pressed', e.keyCode);
}

document.addEventListener('keyup', control);
document.querySelector('.start').addEventListener('click', startGame);