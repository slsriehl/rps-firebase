// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCoP2rutXDNtMkqSleshn31PiY-NxjSbrk",
    authDomain: "rps-7-9cc1d.firebaseapp.com",
    databaseURL: "https://rps-7-9cc1d.firebaseio.com",
    storageBucket: "rps-7-9cc1d.appspot.com",
  };
  firebase.initializeApp(config);

var name, play;
var fire = firebase.database();

function giveName() {
	$('.row-start').slideUp(2000);
	$('.row-play-choice').slideDown(2000);
	name = $('#name-input').val();
	fire.ref().push({
		name: name
	}); // end firebase push name
} // end giveName
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

$(document).ready(function(){
	nameFocus();
	$('#name-submit').click(giveName);
	$(document).onkeypress(function(e) {
		if(e.which == 13) {
			giveName();
		}
}); // end doc onkeypress

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