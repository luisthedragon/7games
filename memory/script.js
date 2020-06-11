const IMG_PATH = 'img/languages-frameworks/'
const cards = document.querySelectorAll('.card');
const defaultImg = 'the-matrix.png';
const foundImg = 'white.png';
const imgs = ['hacked.png', 'shiffman.jpg', 'talin.JPG', 'castorcito.jpg'];
const pairs = [
  ['java.png', 'spring.png'],
  ['ruby.png', 'ruby-on-rails.png'],
  ['sql.png', 'mysql.png'],
  ['js.png', 'vue.png'],
  ['python.png', 'django.png'],
  ['php.png', 'laravel.png'],
  // ['dart.png', 'flutter.png'],
]
const pointsToWin = pairs.length;

let cardRevealedCount = 0;
let cardsRevealed = [undefined, undefined];

// cardsImgs = [0, 0, 1, 1, 2, 2, 3, 3];
let cardsImgs = [...Array(12).keys()];

let points = 0;
shuffle(cardsImgs);
// cardsImgs = cardsImgs.map(item => `img/${imgs[item]}`);

cardsImgs = cardsImgs.map(item => pairs[Math.floor(item / 2)][item % 2]);
// cards.forEach((card, i) => card.style.backgroundImage = `url(${IMG_PATH}${cardsImgs[i]})`);
// alert(cardsImgs);
handlers = [];

cards.forEach((item, i) => {
  item.addEventListener('click', handlers[i] = function() { clickHandler(i) });
});

function clickHandler(id) {
  if (cardRevealedCount == 2) {
    return;
  }
  card = cards[id];
  if (card === cardsRevealed[0]) {
    return;
  }
  console.log(card);
  // reveal
  card.style.backgroundImage = `url(${IMG_PATH}${cardsImgs[id]})`;
  cardsRevealed[cardRevealedCount] = card;

  cardRevealedCount += 1;
  console.log(cardsRevealed)
  if (cardRevealedCount == 2) {
    document.querySelector('#match-info').style.animation = 'none';
    if (checkMatch(cardsRevealed[0], cardsRevealed[1])) {
      setTimeout(() => {
        document.querySelector('#match-info').innerHTML = 'You found a match! :D';
        document.querySelector('#match-info').style.animation = 'xd 2s linear 2 alternate';

        console.log('matches');
        cardsRevealed[0].style.backgroundImage = `url('img/${foundImg}')`;
        cardsRevealed[0].removeEventListener('click', handlers[[...cards].indexOf(cardsRevealed[0])]);
        cardsRevealed[1].style.backgroundImage = `url('img/${foundImg}')`;
        cardsRevealed[1].removeEventListener('click', handlers[[...cards].indexOf(cardsRevealed[1])]);
        cardRevealedCount = 0;
        cardsRevealed = [undefined, undefined]
        points += 1;

        if (checkWin()) {
          displayWinMsg();
        }
      }, 1000);
    } else {
      setTimeout(() => {
        document.querySelector('#match-info').innerHTML = "That's not a match :(";
        cardsRevealed[0].style.backgroundImage = `url('img/${defaultImg}')`;
        cardsRevealed[1].style.backgroundImage = `url('img/${defaultImg}')`;
        cardRevealedCount = 0;
        cardsRevealed = [undefined, undefined]
      }, 1000);
    }
  }
}

function checkMatch(cardA, cardB) {
  // Disclaimer: It is assumed that cardA and cardB are different
  // We extract the index of both cards
  let indA = [...cards].indexOf(cardA);
  let indB = [...cards].indexOf(cardB);
  console.log(indA, indB);
  // We extract the pairs corresponding to each card
  let a = pairs.filter(pair => pair.includes(cardsImgs[indA]))
  let b = pairs.filter(pair => pair.includes(cardsImgs[indB]))
  // The next line means both pairs are different, so it's not a match
  if (a[0] != b[0]) return false;
  // Then, we found a match!
  return true;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkWin() {
  console.log(points);
  console.log(pointsToWin);
  return points === pointsToWin;
}

function displayWinMsg() {
  document.querySelector('#final-message').style.display = 'block';
}