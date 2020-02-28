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

// Run setup when the page is ready
$(document).ready(setup);

// setup()
//
// Hide the body parts and draws the miniaturized character
function setup() {
  // Hide all the elements with the calss "bodyPartsImages"
  $('.bodyPartsImages').hide();
  // Each milisecond, checks if it is time to draw the miniaturized character
  setInterval(drawMiniaturizedCharacter, 1);
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
  leg = legs[Math.floor(Math.random()*legs.length)];
  // Show that random element
  $(leg).show();
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
  body = bodies[Math.floor(Math.random()*bodies.length)];
  // Show that random element
  $(body).show();
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
  head = heads[Math.floor(Math.random()*heads.length)];
  // Show that random element
  $(head).show();
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
    legsDelay+=additionalSpinningDelay;
    // If the delay is more than 1,5 second...
    if(legsDelay >= maximalSpinningDelay) {
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
    stopLegsTimeout = setTimeout(stopSpinningLegs,initialSpinningDelay);
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
    bodyDelay+=additionalSpinningDelay;
    // If the delay is more than 1,5 second...
    if(bodyDelay >= maximalSpinningDelay) {
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
    stopBodiesTimeout = setTimeout(stopSpinningBodies,initialSpinningDelay);
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
    headDelay+=additionalSpinningDelay;
    // If the delay is more than 1,5 second...
    if(headDelay >= maximalSpinningDelay) {
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
    stopHeadsTimeout = setTimeout(stopSpinningHeads,initialSpinningDelay);
  }
}

// drawMiniaturizedCharacter()
//
// At the end of each new turn, clone the final body parts, remove their classes and add them in a div your created.
// Then, prepend that div to the one that has the id "results"
function drawMiniaturizedCharacter() {
  // If the body parts are not spinning and if it's not the turn 0...
  if (spinningLegs === false && spinningBodies === false && spinningHeads === false && turn !== 0) {
    // If we changed turn (the turn count is different from the turn number)...
    if (turnCount !== turn) {
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
    // Set the turn count to the turn number
    turnCount = turn;
  }
}
