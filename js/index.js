let count = 0;
let moveCounter = 0;
let gameCleared = false;
let rate = '★★★';

var cardOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var cardShownList = [];
var matchedCards = [];

function toggleCard(el) {
	if (document.getElementById('startTimer').style.display === 'none') {
		if (el.classList.contains('hidden')) {
			if (cardShownList.length < 2) {
				el.classList.add('show');
				el.classList.remove('hidden');
				addCardsToList(el);
				moveCounter = moveCounter + .5;
			}	
		} else {
			el.classList.add('hidden');
			el.classList.remove('show');
			cardShownList = [];
		}
	}
}

function myTimer() {
	document.getElementById('startTimer').style.display = 'none';
	document.getElementById("timerCounter").innerHTML = "<b>Timer: </b>" + count + " seconds";
	document.getElementById("star-rating").innerHTML = rate;
	if (moveCounter % 1 === 0) {
		document.getElementById('move-counter').innerHTML = '<b>Moves: </b>' + moveCounter;
	}
	if (!gameCleared) {
		count += 1;
	}
}

function resetGame(myVar) {
	clearInterval(myVar);
	hideAllCards();
	changeCardOrders();
	starRating();
	count = 0;
	moveCounter = 0;
	gameCleared = false;
	rate = '★★★';
	matchedCards = [];
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
			shownClassList[i].style.backgroundColor = '#eaeaea';
			shownClassList[i].style.color = '#488e8a';
			shownClassList[i].style.boxShadow = 'none';
			shownClassList[i].classList.add('hidden');
			shownClassList[i].classList.remove('show');
			console.log(shownClassList);
		}
	}
}


function addCardsToList(el) {
	console.log(cardShownList)
	if (cardShownList.length < 2) {
		cardShownList.push([el.className.split(' ')]);
	}
	checkMatch(el);
}

function checkGameEnd() {
	if (matchedCards.length == 8) {
		gameCleared = true;

		document.getElementById("totalRate").innerHTML = rate;
		document.getElementById("counterTotal").innerHTML = "It took "+ count + " seconds to clear the game!";
		document.getElementById("myModal").style.display = "block";
	}
}

function checkMatch(el) {
	if (cardShownList.length === 2) {
		if (cardShownList[0][0][0] === cardShownList[1][0][0]) {
			matchedCards.push(cardShownList[0][0][0]);
			for (var i = 0; i < matchedCards.length; i++) {
				document.getElementsByClassName(matchedCards[i])[0].style.backgroundColor = 'blueviolet';
				document.getElementsByClassName(matchedCards[i])[1].style.backgroundColor = 'blueviolet';
				document.getElementsByClassName(matchedCards[i])[0].style.color = 'white';
				document.getElementsByClassName(matchedCards[i])[1].style.color = 'white';
				document.getElementsByClassName(matchedCards[i])[0].style.boxShadow = '0px 0px 8px 3px white';
				document.getElementsByClassName(matchedCards[i])[1].style.boxShadow = '0px 0px 8px 3px white';
			}
			cardShownList = [];
			console.log(matchedCards)
		}
		else {
			console.log('failed');
			console.log(cardShownList[0][0][0])
			setTimeout(hideMissedCards,700);
		}
	}
	if (cardShownList.length > 2) {
		cardShownList = [];
		return;
	}

	checkGameEnd();
	starRating();
}

function hideMissedCards() {
	if (cardShownList.length > 0) {
		var unmatchedCard1 = document.getElementsByClassName(cardShownList[0][0][0]);
		var unmatchedCard2 = document.getElementsByClassName(cardShownList[1][0][0]);

		for (var i = 0; i < unmatchedCard1.length; i++) {
			unmatchedCard1[i].classList.add('hidden');
			unmatchedCard1[i].classList.remove('show');
		}
		for (var i = 0; i < unmatchedCard2.length; i++) {
			unmatchedCard2[i].classList.add('hidden');
			unmatchedCard2[i].classList.remove('show');
		}
	}
	cardShownList = [];
}

function starRating() {
	if (moveCounter >= 40) {
		rate = '★';
	}
	else if(moveCounter >= 30 ) {
		rate= '★★';
	}
	else if(moveCounter >= 20) {
		rate = '★★★';
	}
	document.getElementById('star-rating').innerText = rate;
}


// modal code from https://www.w3schools.com/howto/howto_css_modals.asp
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

function playAgain(myVar) {
	resetGame(myVar);
	modal.style.display = "none";
}