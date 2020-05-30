defaultImg = 'wwo logo.png';
moleImg = 'castorcito.jpg';
handlers=[]

document.querySelectorAll('.card').forEach(item => {
  item.addEventListener('click', handlers[item.id[1]]=function(){clickHandler(item.id)});
});

score = 0;
molePos = Math.floor(Math.random() * 9);
showTimeElapsed();
updateCards();
function clickHandler(id){
	card = document.querySelector(`#${id}`);
	if (molePos == id[1]){
		molePos = Math.floor(Math.random() * 9);
		score += 5;
		updateCards();
	}
	else{
		score -= 1;
	}
	updateScore();
}

function updateScore(){
	document.querySelector('#score').innerHTML = score;
}

function updateCards(){
	document.querySelectorAll('.card').forEach(item => {
		if (molePos != item.id[1])
			item.style.backgroundImage = `url('img/${defaultImg}')`;
		else
			item.style.backgroundImage = `url('img/${moleImg}')`;
	})
}

class Mole{
	constructor(){
		this.card = 0;
		this.timeAlive = 0;
	}

	updateTimeAlive(){
		this.timeAlive += 1000;
	}
}

function showTimeElapsed(){
	if(Math.floor(performance.now()/1000) <= 30){
		document.querySelector('#timeLeft').innerHTML = 30 - Math.floor(performance.now()/1000);
		setTimeout(showTimeElapsed, 1000);
	}
	else{
		gameOver = true;
		document.querySelectorAll('.card').forEach(item => {
			item.removeEventListener('click', handlers[item.id[1]]);
		});
		displayGameOverMsg();
	}
}

function displayGameOverMsg(){
	document.querySelector('#final-score').innerHTML = score;
	document.querySelector('#final-message').style.display = 'block';
}

// Every mole lasts for 1 second
// Not implemented, so sad :(
// moles = []
// moles.push(new Mole());
// setInterval(moles[0].updateTimeAlive.bind(moles[0]), 1000);

