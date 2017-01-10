/**
 * 
 */
//Card Constructor
function Card(name, suit){
	this.name = name;
	this.suit = suit;
}
Card.prototype.toString = function cardtoString() { //method that turns card object into a string
	var card = '[' + this.name + ' ' + this.suit + ']' + '\n';
	return card;
};
Card.prototype.cShuffle = function cardShuffle(cards) { //method that picks a sudo random index value
	return Math.floor(Math.random() * this.length);
};
Card.prototype.cValue = function cardValue() {
	if(parseInt(this.name) >= 2 || parseInt(this.name) <=10){
		this.value = this.name;
	} else if (this.name === "J" || this.name === "Q" || this.name === "K") {
		this.value = "10";
	} else if (this.name === "A") {
		this.value = "1";
	} else {
		this.value = "No Value Set";
	}
};
Card.prototype.hValue = function handValue() {
	var v = 0;
	var total = 0;
	for(v in this){
		total += parseInt(this[v].value);
	}
	
	if ((this[0].value + this[1].value) === 21){
		total = total + " Black Jack";
	} else if(total === 21){
		total = total + " Winner";
	} else if(total > 21){
		total = total + " Bust";
	} 
	
	return total;
};
Card.prototype.aValue = function aceValue() {
	var a = 0;
	var total = 0;
	
	if(this[0].name === "A" && this[1].name === "A" && this.length <= 2){
		this[0].value = '11';
		this[1].value = '1';
		return Card.prototype.hValue.call(this);
	}
	
	for(a in this){
		total += parseInt(this[a].value);
	}

	for(a in this){
		if(this[a].name === "A" && total > 2 && total <= 17 && this.length <= 2){
			this[a].value = '11';
		}else if (this[a].name === "A" && this.length >= 2){
			this[a].value = '1';
		}else{}
	}
	return Card.prototype.hValue.call(this);
};

//deck builder function
function deck(){
	this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['&hearts;','&diams;','&spades;','&clubs;'];
	var cards = [];
	
	var n;
	var s;
	for(n = 0; n < this.names.length; n++){
		for(s = 0; s < this.suits.length; s++){
			cards.push(new Card(this.names[n], this.suits[s]));
	    }
    }
    
	var shuffleCards = Card.prototype.cShuffle.call(cards);
	var myCard = cards[shuffleCards];
	myCardValue = Card.prototype.cValue.call(myCard);
	
    return myCard;
}

//function that the deal button calls, deals two cards to dealer and two to player
function deal(){
	var dealerHand = [];
	var playerHand = [];
	var dealCard;
	var dealerTotal, playerTotal;
	var d; //Dealer
	var p; //Player
	
	for(p = 0; p < 2; p++){
		dealCard = deck();
		document.getElementById("playerCards").innerHTML += dealCard;
		playerHand.push(dealCard);
			for(d = 0; d < 1; d++){
				dealCard = deck();
				document.getElementById("dealerCards").innerHTML += dealCard;
				dealerHand.push(dealCard);
			}
	}
	
	dealerTotal = Card.prototype.aValue.call(dealerHand);
	playerTotal = Card.prototype.aValue.call(playerHand);

	document.getElementById("hitButton").addEventListener('click', function() {
		dealCard = deck();
		document.getElementById("playerCards").innerHTML += dealCard;
		playerHand.push(dealCard);
		dealerTotal = Card.prototype.aValue.call(dealerHand);
		playerTotal = Card.prototype.aValue.call(playerHand);
		print(dealerTotal, playerTotal);
	});
	
	document.getElementById("stayButton").addEventListener('click', function() {
		dealerTotal = Card.prototype.aValue.call(dealerHand);
		while(dealerTotal < 17){
			dealCard = deck();
			document.getElementById("dealerCards").innerHTML += dealCard;
			dealerHand.push(dealCard);
			dealerTotal = Card.prototype.aValue.call(dealerHand);
			playerTotal = Card.prototype.aValue.call(playerHand);
			print(dealerTotal, playerTotal);
		}
	});
	
	print(dealerTotal, playerTotal);
}

function print(dealerTotal, playerTotal){
	document.getElementById('dealerScore').innerHTML = 'Score: ' + dealerTotal;
	document.getElementById('playerScore').innerHTML = 'Score: ' + playerTotal;
}

function playAgain(){
	var playAgainButton = document.getElementById("playAgainButton");
	console.log(playAgainButton.style.display);
	if(playAgainButton.style.display === "block"){
		playAgainButton.style.display = ' ';
		document.getElementById("playerCards").innerHTML += '';
		document.getElementById("dealerCards").innerHTML += '';
		document.getElementById('dealerScore').innerHTML = 'Score: ';
		document.getElementById('playerScore').innerHTML = 'Score: ';
		playAgainButton.style.display = '';
	}
}


/*******************Game Logic*************************
 * 
 * dealer
 * 
 * player
 * 
 * deck = 52 cards of varying values
 * 
 * Each player gets 2 cards. 
 * 
 * player can hit or stay
 * dealer can hit or stay
 * 
 * closest to 21 to win
 * 
 */