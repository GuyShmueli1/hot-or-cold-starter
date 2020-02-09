$(document).ready(function(){
	handleInstructionsModal();
	handleGame();
});

function handleInstructionsModal() {
	$('.js-what').click(function() {
		$('.overlay').fadeIn(1000);
	});

	$('.js-close').click(function(){
		$(".overlay").fadeOut(1000);
	});
}

var randomNum =null;
var prevGuesses = [];
var lastDiff = 0;

function handleGame() {
	// add an event listener to handle clicking 'new game'
	$('.js-new-game').click(function() {
		newGame();
	});

	// add an event listener to handle clicking 'submit query'
	document.getElementById("js-guess-submit").addEventListener("click",play);

	randomNum = localStorage.getItem("randomNum");
	//alert ("randomNum is " + randomNum);//for debug only -to be removed

	//check if the pages has reloaded following a new game;
	if(null == randomNum) {
		//alert ("this is a new game");//for debug only -to be removed
		randomNum  = Math.floor((Math.random() * 100) + 1);
	} else{
		//alert ("this is not a new game");//for debug only -to be removed
		prevGuesses = JSON.parse(localStorage.getItem("prevGuesses"));
	}
	displayValues(randomNum, prevGuesses);
}

function newGame() {
	randomNum = Math.floor((Math.random() * 101));
	prevGuesses = [];
	saveValues();
	document. location. reload();
}


function saveValues() {

	localStorage.setItem("randomNum", randomNum);
	localStorage.setItem("prevGuesses",JSON.stringify(prevGuesses));
}

function displayValues() {

	try {
		//Display the number to guess
		//document.getElementById("random-number").innerHTML = randomNum; //for debug only -to be removed

		//Display the previous guesses
		var ul = document.getElementById("guessList");
		for (i = 0; i < prevGuesses.length; i++) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(prevGuesses[i]));
			var newDiff = Math.abs(prevGuesses[i] - randomNum);
			if (0 == newDiff) {
				li.setAttribute("style" , "background-color:green  ! important;");
			} else if (i!==0) {
				var prevDiff = Math.abs(prevGuesses[i-1] - randomNum);
				if (newDiff <= prevDiff) {
					li.setAttribute("style" , "background-color:red  ! important;");
				}
			}
			ul.appendChild(li);
		}

		//display the guesses count
		document.getElementById("js-guess-count").innerHTML = prevGuesses.length;
	} catch (e) {
		alert(e);
	}
}


function play() {

	//alert ("playing"); //for debug only -to be removed
	try {
		// read the new guess value
		var newGuess = document.getElementById("js-user-guess").value;

		// calculate the difference with the previous guess
		if (null == prevGuesses) {
			prevGuesses = [newGuess]
		} else {
			prevGuesses.push(newGuess);
		}

		saveValues();
		//displayValues(randomNum, newGuess);
	} catch (e) {
		alert(e);
	}
	lastDiff = newDiff;
}
