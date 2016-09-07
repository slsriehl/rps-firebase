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

function giveName() {
	$('.row-start').slideUp(2000);
	$('.row-play-choice').slideDown(2000);

	fire.ref().on('value', function(snapshot) {

		console.log('initial value of firebase name1 is ' + snapshot.child('name1').val());

		if((snapshot.child('name1').val() === 1) || (snapshot.child('name1').val() == name1)) {
			name1 = $('#name-input').val();
			console.log('name input in name1 block is ' + $('#name-input').val());
			console.log('local name 1 is ' + name1);
			fire.ref().set({
				name1: name1
			}); // end firebase set name1
			name1 = snapshot.child('name1').val();
			$('#name-input').val('');
			console.log('firebase name 1 is ' + snapshot.child('name1').val());
		} else if((snapshot.child('name1').val() == name1) || ($('#name-input').val() != '')) {
			name2 = $('#name-input').val();
			console.log('name input in name2 block is ' + $('#name-input').val());
			console.log('local name 2 is ' + name2);
			fire.ref().set({
				name1: snapshot.child('name1').val(),
				name2: name2
			}); // end firebase set name2
			console.log('firebase name 2 is ' + snapshot.child('name2').val());
			opponentName = snapshot.child('name1').val();
			console.log('local opponent name (1) is ' + opponentName);
		} else {
			opponentName = snapshot.child('name2').val();
			console.log('local opponent name (2) is ' + opponentName);
		}// end name set if else

		setTimeout(secondPlayer, 5000);

		// setOpponentName(snapshot);
	}); // end on value

	
} // end giveName

function secondPlayer() {
	console.log('foo');
} // end secondPlayer

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

function reset() {
	fire.ref().set({
		name1: 1,
		name2: 1
	});
	var name1 = 2;
	var name2 = 3;
	var opponentName = 4;
} // end reset names to begin

$(document).ready(function(){
	
	nameFocus();
	$('.btn-reset').click(reset);
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