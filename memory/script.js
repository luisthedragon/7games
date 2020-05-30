defaultImg = 'wwo logo.png';
foundImg = 'white.png';
imgs = ['hacked.png', 'shiffman.jpg', 'talin.JPG', 'castorcito.jpg'];
cardRevealedCount = 0;
cardsRevealed = [undefined, undefined];

cardsImgs = [0, 0, 1, 1, 2, 2, 3, 3];
pointsToWin = 4;
points = 0;
shuffle(cardsImgs);
cardsImgs = cardsImgs.map(item => `img/${imgs[item]}`);
// alert(cardsImgs);
handlers=[]
// for(let i=0; i<8; i++){
// 	handlers[i]=function(){clickHandler(`c${i}`)}
// }

// document.querySelectorAll('.card').forEach(item => {
//   item.addEventListener('click', handlers[item.id[1]]);
// });
document.querySelectorAll('.card').forEach(item => {
  item.addEventListener('click', handlers[item.id[1]]=function(){clickHandler(item.id)});
});


function clickHandler(id){
	if (cardRevealedCount == 2){
		return;
	}
	card = document.querySelector(`#${id}`);
	if (card === cardsRevealed[0]){
		return;
	}
	console.log(card);
  	// reveal
	card.style.backgroundImage = `url(${cardsImgs[card.id[1]]})`;
	cardsRevealed[cardRevealedCount] = card;

	cardRevealedCount += 1;
	console.log(cardsRevealed)
	if (cardRevealedCount == 2){
		document.querySelector('#match-info').style.animation = 'none';
		if (cardsRevealed[0].style.backgroundImage === cardsRevealed[1].style.backgroundImage){
			setTimeout( () => {
				document.querySelector('#match-info').innerHTML = 'You found a match! :D';
				document.querySelector('#match-info').style.animation = 'xd 2s linear 2 alternate';

				console.log('matches');
				cardsRevealed[0].style.backgroundImage = `url('img/${foundImg}')`;
				cardsRevealed[0].removeEventListener('click', handlers[cardsRevealed[0].id[1]]);
				cardsRevealed[1].style.backgroundImage = `url('img/${foundImg}')`;
				cardsRevealed[1].removeEventListener('click', handlers[cardsRevealed[1].id[1]]);
				cardRevealedCount = 0;
				cardsRevealed = [undefined, undefined]
				points += 1;

				if (check_win()){
					displayWinMsg();
				}
			}, 1000);
		}
		else{
			setTimeout( () => {
				document.querySelector('#match-info').innerHTML = "That's not a match :(";
				cardsRevealed[0].style.backgroundImage = `url('img/${defaultImg}')`;
				cardsRevealed[1].style.backgroundImage = `url('img/${defaultImg}')`;
				cardRevealedCount = 0;
				cardsRevealed = [undefined, undefined]
			}, 1000);
			
		}
		// hide
		// card.style.backgroundImage = `url(${defaultImg})`;
		// if matches
		// card.style.backgroundImage = `url(${foundImg})`;
		
	}
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function check_win(){
	console.log(points);
	console.log(pointsToWin);
	return points === pointsToWin;
}

function displayWinMsg(){
	document.querySelector('#final-message').style.display = 'block';
}