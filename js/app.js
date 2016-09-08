// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCoP2rutXDNtMkqSleshn31PiY-NxjSbrk",
    authDomain: "rps-7-9cc1d.firebaseapp.com",
    databaseURL: "https://rps-7-9cc1d.firebaseio.com",
    storageBucket: "rps-7-9cc1d.appspot.com",
  };
  firebase.initializeApp(config);

var name1 = 2;
var name2 = 3;
var play;
var opponentName = 4;
var fire = firebase.database();
var localReset;

function giveName() {
	fire.ref().on('value', function(snapshot) {
		$('.row-start').slideUp(2000);
		console.log('initial value of firebase name1 is ' + snapshot.child('name1').val());

		if(((snapshot.child('name1').val() === 1) || (snapshot.child('name1').val() == name1)) && $('#name-input').val() !== '') {
			name1 = $('#name-input').val();
			console.log('name input in name1 block is ' + $('#name-input').val());
			console.log('local name 1 is ' + name1);
			fire.ref().set({
				name1: name1
			}); // end firebase set name1
			name1 = snapshot.child('name1').val();
			localReset = false;
			$('#name-input').val('');
			$('.row-message').show();
			$('.col-message').html("<h3>Waiting for an opponent...</h3>");
			console.log('firebase name 1 is ' + snapshot.child('name1').val());
			console.log('localReset for name1 is ' + localReset);
		} else if((snapshot.child('name1').val() == name1) || ($('#name-input').val() != '')) {
			name2 = $('#name-input').val();
			console.log('name input in name2 block is ' + $('#name-input').val());
			console.log('local name 2 is ' + name2);
			fire.ref().set({
				name1: snapshot.child('name1').val(),
				name2: name2
			}); // end firebase set name2
			name2 = snapshot.child('name2').val();
			localReset = false;
			$('#name-input').val('');
			console.log('firebase name 2 is ' + snapshot.child('name2').val());
			opponentName = snapshot.child('name1').val();
			console.log('local opponent name (1) is ' + opponentName);
			console.log('localReset for name2 is ' + localReset);

		} else {
			opponentName = snapshot.child('name2').val();
			console.log('local opponent name (2) is ' + opponentName);
			fire.ref().off();
		}// end name set if else
		playersTogether(snapshot);

	}); // end on value
	
} // end giveName

function playersTogether(snapshot) {
	if((opponentName !== 4) && (opponentName !== null)) {
		console.log('opponent is ' + opponentName);
		$('.row-message').show();
		$('.col-message').html("<h3>You're playing with " + opponentName + " today.  Click rock, paper or scissors to play a round.  Have fun!</h3>");
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

function resetFire() {
	console.log('reset fired');
	fire.ref().on('value', function(snapshot) {
		fire.ref().set({
			name1: 1,
			name2: 1,
			reset: true
		}); // end ref set
		localReset = snapshot.child('reset').val();
		console.log('localReset is ' + localReset);
		fire.ref().off();
	}); // end on value
	nameFocus();
} // end resetFire to begin

function resetWrite() {
	if(localReset == true) {
		$('.row-message').hide();
		$('.col-message').empty();
		$('.row-play-choice').hide();
		$('.row-play-battle').hide();
		$('.row-start').slideDown();
		opponentName = 4;
		name1 = 2;
		name2 = 3;
		} // resetWrite snapshot if
} // resetWrite write


$(document).ready(function(){
	
	nameFocus();
	$('.btn-reset').click(resetFire);
	$('#name-submit').click(giveName);



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
  // on end game button, alert player that game end, push end game to firebase, alert other player that name has ended the game and reset both to name input screen
  //