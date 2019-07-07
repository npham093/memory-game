let count = 0;
let moveCounter = 0;

var cardOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var cardShownList = [];
var matchedCards = [];


function toggleCard(el) {
	if (document.getElementById('startTimer').style.display === 'none') {
		if (el.classList.contains('hidden')) {
			el.classList.add('show');
			el.classList.remove('hidden');
			addCardsToList(el);
			moveCounter = moveCounter + .5;
			
		} else {
			el.classList.add('hidden');
			el.classList.remove('show');
		}
	}
}

function myTimer() {
	document.getElementById('startTimer').style.display = 'none';
  	document.getElementById("timerCounter").innerHTML = "Timer: " + count + " seconds";
  	count += 1;

	if (moveCounter % 1 === 0) {
		document.getElementById('move-counter').innerHTML = 'Moves: ' + moveCounter;
	}
}

function resetGame(myVar) {
	hideAllCards();
	clearInterval(myVar);
	changeCardOrders();
	starRating();
	count = 0;
	moveCounter = 0;
}

// Used the shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function changeCardOrders() {
	var hiddenClassList = document.getElementsByClassName('hidden');
	shuffle(cardOrder)
	for (var i = 0; i < hiddenClassList.length; i++) {
		hiddenClassList[i].style.order = cardOrder[i];
	}
}

changeCardOrders();

function hideAllCards() {
	var shownClassList = document.getElementsByClassName('show');

	while (shownClassList.length !== 0) {
		for (var i = 0; i < shownClassList.length; i++) {
			shownClassList[i].classList.add('hidden');
			shownClassList[i].classList.remove('show');
			console.log(shownClassList);
		}
	}
}


function addCardsToList(el) {
	if (cardShownList.length < 2) {
		cardShownList.push([el.className.split(' ')]);
	}
	checkMatch(el);
}

function checkMatch(el) {
	if (cardShownList.length === 2) {
		if (cardShownList[0][0][0] === cardShownList[1][0][0]) {
			matchedCards.push(cardShownList[0][0][0]);
			for (var i = 0; i < matchedCards.length; i++) {
				document.getElementsByClassName(matchedCards[i])[0].style.backgroundColor = 'blue';
				document.getElementsByClassName(matchedCards[i])[1].style.backgroundColor = 'blue';
				document.getElementsByClassName(matchedCards[i])[0].style.color = 'white';
				document.getElementsByClassName(matchedCards[i])[1].style.color = 'white';
			}
			cardShownList = [];
			console.log(matchedCards)
		}
		if (cardShownList[0][0][0] !== cardShownList[1][0][0]) {
			console.log('failed');
			console.log(cardShownList[0][0][0])
			setTimeout(hideMissedCards,700);
		}
	}
	if (cardShownList.length > 2) {
		return;
	}
}

function hideMissedCards() {

	var unmatchedCard1 = document.getElementsByClassName(cardShownList[0][0][0]);
	var unmatchedCard2 = document.getElementsByClassName(cardShownList[1][0][0]);

	for (var i = 0; i < unmatchedCard1.length; i++) {
		unmatchedCard1[i].style.fontSize = '10em';
		unmatchedCard1[i].classList.add('hidden');
		unmatchedCard1[i].classList.remove('show');
		unmatchedCard1[i].style.fontSize = '8em';
	}
	for (var i = 0; i < unmatchedCard2.length; i++) {
		unmatchedCard1[i].style.fontSize = '10em';
		unmatchedCard2[i].classList.add('hidden');
		unmatchedCard2[i].classList.remove('show');
		unmatchedCard1[i].style.fontSize = '8em';
	}
	cardShownList = [];
}

function starRating() {
	if (moveCounter >= 20) {
		document.getElementById('star-rating').innerText = '★';
	}
	else if(moveCounter >= 3 ) {
	document.getElementById('star-rating').innerText = '★★';
	}

	else if(moveCounter >= 0) {
		document.getElementById('star-rating').innerText = '★★★';
	}
}

starRating();

// modal code from https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
