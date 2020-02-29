"use strict";

/*****************

Character generator
Audrey Coulombe

A game where you have to generate kids caracters and titles as quick as possible to make more money.

******************/
// Variables for the image that is displayed
let leg;
let body;
let head;
// Variables for the final images that are displayed (used for the miniaturized version)
let finalLeg;
let finalBody;
let finalHead;
// Variables for the spinning timeouts
let spinningLegsTimeout;
let spinningBodiesTimeout;
let spinningHeadsTimeout;
// Variables for the timeouts that stop the spinning
let stopLegsTimeout;
let stopBodiesTimeout;
let stopHeadsTimeout;
// Variables that track state of the spinning
let spinningLegs = false;
let spinningBodies = false;
let spinningHeads = false;
// Variables that set the delay for the spinning timeout
let legsDelay;
let bodyDelay;
let headDelay;
let initialSpinningDelay = 100;
let additionalSpinningDelay = 30;
let maximalSpinningDelay = 1500;
// Variable that keeps track of the turn number
let turn = 0;
// Variable used to check if we are playing a new turn
let turnCount;
// Variable that keeps track of the score
let score = 0;
// Number of points you get when you end a turn
let scoreGain = 20;
// The frequencies for the slot machine sound
let spinningFrequencies = [880, 987.77, 554.37, 587.33, 659.25, 739.99, 783.99];
// The note that will play the frequencies above
let spinningNote = new Pizzicato.Sound({
  source: 'wave',
});
// The sounds when you gain coins
let coinSound = new Audio("assets/sounds/coinSound.wav");
let chaChingSound = new Audio("assets/sounds/chaChing.wav");
// An object literal containing the different vocal commands and the functions that are called
let commands = {
  'Spin': spinAll,
  'Stop spinning legs': stopSpinningLegs,
  'Stop spinning bodies': stopSpinningBodies,
  'Stop spinning heads': stopSpinningHeads
};

// Run setup when the page is ready
$(document).ready(setup);

// setup()
//
// Hide the body parts and draws the miniaturized character
function setup() {
  // Set the vocal commands and start listening with annyang
  handleVocalCommands();
  // Hide all the elements with the calss "bodyPartsImages"
  $('.bodyPartsImages').hide();
  // Each milisecond, checks if the player finished a turn
  setInterval(checkEndOfTurn, 1);
  // Spin the body parts
  // spinAll();
}

// handleVocalCommands()
//
// Set the vocal commands and starts listening with annyang
// * Used same function as in assignment 3
function handleVocalCommands() {
  // Add my commands to annyang
  annyang.addCommands(commands);
  // Start listening with annyang
  annyang.start();
}

// spinAll()
//
// Function called when we click on the button "spin all"
// If the body parts are not spinning, adds one to the turn number,resets the spinning delay
// and calls functions to spin the legs, bodies and heads
function spinAll() {
  // If the body parts are not spinning...
  if (spinningLegs === false && spinningBodies === false && spinningHeads === false) {
    // Add one to the turn number
    turn += 1;
    // Reset the spinning delays to the initial value
    legsDelay = initialSpinningDelay;
    bodyDelay = initialSpinningDelay;
    headDelay = initialSpinningDelay;
    // Spin the legs, the bodies and the heads
    spinLegs();
    spinBodies();
    spinHeads();
  }
}

// spinLegs()
//
// Put element with leg class in an "array"
// Hides and shows random items in that array
function spinLegs() {
  // Set the spinning state to true
  spinningLegs = true;
  // Store all the elements with the class leg in an "array"
  let legs = $('.leg');
  // Hide those elements
  legs.hide();
  // Choose a random element in the legs array and store it in a variable
  leg = legs[Math.floor(Math.random() * legs.length)];
  // Show that random element
  $(leg).show();
  // Play the spinning sound
  spinningSound();
  // Set a timeout that calls this actual function after a certain delay so it does a loop
  // Note: I have to use setTimeout that way instead of setInterval because I want to be able to change my delay variable (possible because the function is called every loop)
  spinningLegsTimeout = setTimeout(spinLegs, legsDelay);
}

// spinBodies()
//
// Put element with body class in an "array"
// Hides and shows random items in that array
function spinBodies() {
  // Set the spinning state to true
  spinningBodies = true;
  // Store all the elements with the class body in an "array"
  let bodies = $('.body');
  // Hide those elements
  bodies.hide();
  // Choose a random element in the bodies array and store it in a variable
  body = bodies[Math.floor(Math.random() * bodies.length)];
  // Show that random element
  $(body).show();
  // Play the spinning sound
  spinningSound();
  // Set a timeout that calls this actual function after a certain delay so it does a loop
  spinningBodiesTimeout = setTimeout(spinBodies, bodyDelay);
}

// spinHeads()
//
// Put element with head class in an "array"
// Hides and shows random items in that array
function spinHeads() {
  // Set the spinning state to true
  spinningHeads = true;
  // Store all the elements with the class head in an "array"
  let heads = $('.head');
  // Hide those elements
  heads.hide();
  // Choose a random element in the heads array and store it in a variable
  head = heads[Math.floor(Math.random() * heads.length)];
  // Show that random element
  $(head).show();
  // Play the spinning sound
  spinningSound();
  // Set a timeout that calls this actual function after a certain delay so it does a loop
  spinningHeadsTimeout = setTimeout(spinHeads, headDelay);
}

// stopSpinningLegs()
//
// Function called when we click on the button "stop spinning legs"
// It slows down the spinning and then stops it
function stopSpinningLegs() {
  // If the legs are spinning...
  if (spinningLegs === true) {
    // Increase the delay for the timeout
    legsDelay += additionalSpinningDelay;
    // If the delay is more than 1,5 second...
    if (legsDelay >= maximalSpinningDelay) {
      // Stop the timeout for the spinning
      clearTimeout(spinningLegsTimeout);
      // Stop the timeout that slows down the spinning
      clearTimeout(stopSpinningLegs);
      // Store the displayed leg in a variable for the miniaturized version
      finalLeg = leg;
      // Change the spinning state to false
      spinningLegs = false;
    }
    // Set a timeout that calls this actual function after a certain delay so it does a loop
    stopLegsTimeout = setTimeout(stopSpinningLegs, initialSpinningDelay);
  }
}

// stopSpinningBodies()
//
// Function called when we click on the button "stop spinning bodies"
// It slows down the spinning and then stops it
function stopSpinningBodies() {
  // If the bodies are spinning...
  if (spinningBodies === true) {
    // Increase the delay for the timeout
    bodyDelay += additionalSpinningDelay;
    // If the delay is more than 1,5 second...
    if (bodyDelay >= maximalSpinningDelay) {
      // Stop the timeout for the spinning
      clearTimeout(spinningBodiesTimeout);
      // Stop the timeout that slows down the spinning
      clearTimeout(stopSpinningBodies);
      // Store the displayed body in a variable for the miniaturized version
      finalBody = body;
      // Change the spinning state to false
      spinningBodies = false;
    }
    // Set a timeout that calls this actual function after a certain delay so it does a loop
    stopBodiesTimeout = setTimeout(stopSpinningBodies, initialSpinningDelay);
  }
}

// stopSpinningHeads()
//
// Function called when we click on the button "stop spinning heads"
// It slows down the spinning and then stops it
function stopSpinningHeads() {
  // If the heads are spinning...
  if (spinningHeads === true) {
    // Increase the delay for the timeout
    headDelay += additionalSpinningDelay;
    // If the delay is more than 1,5 second...
    if (headDelay >= maximalSpinningDelay) {
      // Stop the timeout for the spinning
      clearTimeout(spinningHeadsTimeout);
      // Stop the timeout that slows down the spinning
      clearTimeout(stopSpinningHeads);
      // Store the displayed head in a variable for the miniaturized version
      finalHead = head;
      // Change the spinning state to false
      spinningHeads = false;
    }
    // Set a timeout that calls this actual function after a certain delay so it does a loop
    stopHeadsTimeout = setTimeout(stopSpinningHeads, initialSpinningDelay);
  }
}

// checkEndOfTurn()
// A function that checks if the player finished a turn
// If so, updates the score and draw the miniaturized version of the character
function checkEndOfTurn() {
  // If the body parts are not spinning and if it's not the turn 0...
  if (spinningLegs === false && spinningBodies === false && spinningHeads === false && turn !== 0) {
    // Stop playing the spinning notes
    spinningNote.stop();
    // And if we changed turn (the turn count is different from the turn number)...
    if (turnCount !== turn) {
      // Display the new score and animate the coins
      updateScore();
      // Draw the miniaturized version of the final character
      drawMiniaturizedCharacter();
    }
    // Set the turn count to the turn number
    turnCount = turn;
  }
}

// drawMiniaturizedCharacter()
//
// At the end of each new turn, clone the final body parts, remove their classes and add them in a div your created.
// Then, prepend that div to the one that has the id "results"
function drawMiniaturizedCharacter() {
  // Create a new div and store it in a variable
  let $characterContainer = document.createElement("DIV");
  // Clone the final body parts, append them to the new div and store the clones in variables
  let $miniLeg = $(finalLeg).clone(false).appendTo($characterContainer);
  let $miniBody = $(finalBody).clone(false).appendTo($characterContainer);
  let $miniHead = $(finalHead).clone(false).appendTo($characterContainer);
  // Remove the classes from the clones
  $($miniLeg).removeClass();
  $($miniBody).removeClass();
  $($miniHead).removeClass();
  // And insert the new div at the beginning of the one with the id "results"
  $($characterContainer).prependTo('#results');
}

// updateScore()
//
//
function updateScore() {
  // For each point gained...
  for (let i = 0; i < scoreGain; i++) {
    // Create an image tag with the class "animatedCoin" that contains the coin image
    let coinImg = $('<img/>', {
      class: 'animatedCoin',
      src: 'assets/images/coin.png'
    });
    // Add this image to the div with the id "animatedCoin"
    coinImg.appendTo($('#animatedCoin'));
    // Declare a variable for the duration of the animation of the coin
    let animationDuration = 100;
    // Declare a variable that will set a delay to animate the coin images and sounds one after the other. Inspired by this example: https://stackoverflow.com/questions/21572326/jquery-animate-multiple-elements-with-delay
    let coinDelay = i * animationDuration;
    // Animate the image after the coin delay (related to i)
    coinImg.delay(coinDelay).animate({
      // Move to the left
      left: ["-=470", "swing"],
      // And to the top
      top: ["-=312", "swing"],
      // The animation lasts 100 miliseconds
    }, animationDuration);
    // Play the coin sound after a delay (related to i)
    setTimeout(playCoinSound, coinDelay);
    // After a delay related to i (so the score animates)...
    setTimeout(function() {
      // Add one to the score
      score += 1;
      // And display the new score
      $('#score').text(score);
    }, coinDelay);
  }
}

// spinningSound()
//
// Generates a sound similar to a slot machine with Pizzicato by playing random frequencies
// * Used the code of the Music Box activity
function spinningSound() {
  // Pick a random frequency from the array
  let frequency = spinningFrequencies[Math.floor(Math.random() * spinningFrequencies.length)];
  // Set that frequency to our note variable that produces a wave
  spinningNote.frequency = frequency;
  // Play the note
  spinningNote.play();
}

// playCoinSound()
//
// Plays the sound of a coin dropping and the sound of a cash register
function playCoinSound() {
  // Play the sound of a coin dropping
  coinSound.play();
  // And play the "cha ching" sound of a cash register
  chaChingSound.play();
}
