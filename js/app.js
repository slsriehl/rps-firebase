// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCoP2rutXDNtMkqSleshn31PiY-NxjSbrk",
    authDomain: "rps-7-9cc1d.firebaseapp.com",
    databaseURL: "https://rps-7-9cc1d.firebaseio.com",
    storageBucket: "rps-7-9cc1d.appspot.com",
  };
  firebase.initializeApp(config);

var fire = firebase.database();
var data;

var playObj = {
	player1: {
		name: 1,
		play: 1
	},
	player2: {
		name: 1,
		play: 1
	},
	plays: {
		myPlay: 1,
		opponentPlay: 1
	},
	opponentName: null,
	localReset: null,
}


function start() {
	fire.ref().set({
			player1: {
				name: 1,
				play: 1
			},
			player2: {
				name: 1,
				play: 1
			},
			reset: false,
		}); // end ref set
}

function giveName() {
	$('.row-start').slideUp(2000);
	console.log('initial value of firebase name1 is ' + data.player1.name);

	if((data.player1.name === 1) && ($('#name-input').val() !== '')) {
		playObj.player1.name = $('#name-input').val();
		console.log('name input in player1.name block is ' + $('#name-input').val());
		console.log('local name 1 is ' + playObj.player1.name);
		fire.ref().update({
			player1: {
				name: playObj.player1.name,
				play: 1
			}
		}); // end firebase set data.player1.name
		playObj.player1.name = data.player1.name;
		playObj.localReset = false;
		$('#name-input').val('');
		$('.row-message').show();
		$('.col-message').html("<h3>Waiting for an opponent...</h3>");
		console.log('firebase player1.name is ' + data.player1.name);
		console.log('localReset for player1.name is ' + playObj.localReset);
		player2OpponentSet();
	} else if(($('#name-input').val() !== '') && (data.player1.name != playObj.player1.name) && (data.player2.name === 1)) {
		playObj.player2.name = $('#name-input').val();
		console.log('name input in name2 block is ' + $('#name-input').val());
		console.log('local player2.name is ' + playObj.player2.name);
		fire.ref().update({
			player2: {
				name: playObj.player2.name,
				play: 1
			}
		}); // end firebase set name2
		playObj.player2.name = data.player2.name;
		playObj.localReset = false;
		$('#name-input').val('');
		console.log('firebase name 2 is ' + data.player2.name);
		playObj.opponentName = data.player1.name;
		console.log('local opponent name (1) is ' + playObj.opponentName);
		console.log('localReset for name2 is ' + playObj.localReset);
		playersTogether();

	} // set player1 and player2

} // end giveName

function player2OpponentSet() {
	if((data.player2.name !== playObj.player2.name) && (data.player1.name === playObj.player1.name) && (data.player2.name !== 1)) {
		playObj.player2.name = data.player2.name;
		playObj.opponentName = data.player2.name;
		console.log('local opponent name (2) is ' + playObj.opponentName);
		playersTogether();
	} else {
		setTimeout(player2OpponentSet, 1000);
	}
} // player2OpponentSet

function playersTogether() {
	if(playObj.opponentName !== null) {
		console.log('opponent is ' + playObj.opponentName);
		$('.row-message').show();
		$('.col-message').html("<h3>You're playing with " + playObj.opponentName + " today.  Click rock, paper or scissors to play a round.  Have fun!</h3>");
		setTimeout(startPlay, 3000);
	} // show begin message
} // end playersTogether

function startPlay() {
	$('.row-message').slideUp();
	$('.row-play-choice').slideDown(2000);
} // end startPlay

function nameFocus(){
	$('#name-input').focus(function() {
		if((($('#name-input').attr('value')) || ($('#name-input').val()))  == 'Name') {
			$('#name-input').attr('value', '');
			$('#name-input').val('');
			console.log('onfocus ' + $('#name-input').attr('value'), $('#name-input').val());
		} // name-input focus if
	}); // name-input focus
	$('#name-input').blur(function() {
		if((($('#name-input').attr('value')) || ($('#name-input').val()))  == '') {
			$('#name-input').attr('value', 'Name');
			$('#name-input').val('Name');
			console.log('onblur ' + $('#name-input').attr('value'), $('#name-input').val());
		} //name-input blur if
	}); // name-input blur
} //end nameFocus

function makeMove(event) {
		playObj.plays.myPlay = $(event.target).data('move');
		console.log('myPlay is ' + playObj.plays.myPlay);
		$('.row-play-choice').hide();
		$('.col-my-play').html('<img src="img/' + playObj.plays.myPlay + '-small.jpg" alt="You played ' + playObj.plays.myPlay + '" />');
		if((playObj.opponentName === data.player2.name) && (data.player1.play === 1)) {
			console.log('player 1 set play value in firebase');
			playObj.player1.play = playObj.plays.myPlay;
			fire.ref().update({
				player1: {
					name: data.player1.name,
					play: playObj.player1.play
				}
			}); // end firebase update data.player1.play
			console.log('set player1 play complete.  playObj.plays.myPlay for player 1 is "' + playObj.plays.myPlay + '" and data.player1.play is "' + data.player1.play +'"');
			setLocalOpponent1Play();
		} else if((playObj.opponentName === data.player1.name) && (data.player2.play === 1)){
			console.log('player2 set play value in firebase');
			playObj.player2.play = playObj.plays.myPlay;
			fire.ref().update({
				player2: {
					name: data.player2.name,
					play: playObj.player2.play
				}
			}); // end firebase update data.player2.play
			console.log('set player2 play complete.  playObj.plays.myPlay for player2 is "' + playObj.plays.myPlay + '" and data.player2.play is "' + data.player2.play +'"');
			setLocalOpponent2Play();
		} // end set play db values
		reckoning();
} // end makeMove
function setLocalOpponent1Play() {
		if(data.player2.play !== 1) {
			console.log('player1 set opponent play value locally');
			playObj.player2.play = data.player2.play;
			playObj.plays.opponentPlay = playObj.player2.play;
			$('.col-opponent-play').html('<img src="img/' + playObj.plays.opponentPlay + '-small.jpg" alt="Your opponent played ' + playObj.plays.opponentPlay + '" />');
		} else {
			setTimeout(setLocalOpponent1Play, 1000);
		}
} // end set local opponent 1 play
function setLocalOpponent2Play() {
		if(data.player1.play !== 1) {
			console.log('player2 set opponent play value locally');
			playObj.player1.play = data.player1.play;
			playObj.plays.opponentPlay = playObj.player1.play;
			$('.col-opponent-play').html('<img src="img/' + playObj.plays.opponentPlay + '-small.jpg" alt="Your opponent played ' + playObj.plays.opponentPlay + '" />');
		} else {
			setTimeout(setLocalOpponent2Play, 1000);
		}// end else if set opponent values
} // end set local opponent values

	// click handler fires in first page, hide row-play-choice run set playObj.playerX.play and battle screen for nameX, push firebase playerX.play

	// click handler fires in second page, hide row-play-choice run set playObj.playerX.play and battle screen for nameX, push firebase playerX.play

	// if play isn't null for both players, set local playObj.playerX.play variables equal to firebase move variables and complete battle screens and reckon

	// one second timeout, then animate reckoning function

	// display score at the top, hide battle screen, show row-play-choice, repeat click handler

function reckoning() {
	console.log('reckoning fired');
}

function resetFire() {
	console.log('reset fired');
		fire.ref().set({
			player1: {
				name: 1,
				play: 1
			},
			player2: {
				name: 1,
				play: 1
			},
			reset: true
		}); // end ref set
	nameFocus();
} // end resetFire to begin

function resetWrite() {
		if(data.reset == true) {
			playObj.localReset = data.reset;
		} // end onvalue if
	console.log('localReset is ' + playObj.localReset);
	if(playObj.localReset == true) {
		$('.row-message').hide();
		$('.col-message').empty();
		$('.row-play-choice').hide();
		$('.row-play-battle').hide();
		$('.row-start').slideDown();
		playObj = {
			player1: {
				name: 2,
				play: 2
			},
			player2: {
				name: 3,
				play: 3
			},
			plays: {
				myPlay: 5,
				opponentPlay: 5
			},
			opponentName: null,
			localReset: null,
		} // end playObj reset
	} // resetWrite snapshot if
} // resetWrite write


$(document).ready(function(){
	start();
	nameFocus();
	$('.btn-reset').click(resetFire);
	$('#name-submit').click(giveName);
	$('.col-play-pic').click(function(event){
		makeMove(event)
	});
	fire.ref().on('value', function(snapshot) {
		data = snapshot.val();
	});
	resetWrite();


}); // end doc ready

  // player 1 inputs name /
  // waiting for player 2
  // player 2 inputs name
  // firebase save names
  // alert player 2 name to player 1 firebase call names
  // alert player 1 name to player 2 firebase call names
  // ready, go!
  // provide three picture choices to click and a 5 second timer
  // on player click, fill half split battle screen with that player's choice push choice to firebase under player's name
  // on both clicks, populate both halves with images pull opponent from firebase
  // on both clicks, animate winning picture covering losing picture increment and push win/lose/tie counter to firebase
  // on timeout by one player, alert other player that they've won by timeout push win to firebase
  // alert win/lose/tie to each player pull from firebase
  // display as wins losses and ties at the top of the screen
  // repeat from ready, go!
  // on end game button, alert player that game end, push end game to firebase, alert other player that name has ended the game and reset both to name $('#name-input').val() screen
  // .child.set()