"use strict";

/*****************

Character generator
Audrey Coulombe

A game where you have to generate kids caracters and titles as quick as possible to make more money.

******************/
// Variables for the spinning intervals
let spinningLegsTimeout;
let spinningBodiesTimeout;
let spinningHeadsTimeout;
let stopLegsTimeout;
let stopBodiesTimeout;
let stopHeadsTimeout;

let legsDelay = 100;
let bodyDelay = 100;
let headDelay = 100;

$(document).ready(setup);

// setup()
//
//
function setup() {
  $('.bodyPartsImages').hide();
}

// spinAll()
//
// Calls functions to spin the legs, bodies and heads all at once
function spinAll() {
  spinLegs();
  spinBodies();
  spinHeads();
}

// spinLegs()
//
// Put element with leg class in an "array"
// Hides and shows random items in that array
function spinLegs() {
  // Store all the elements with the class leg in an "array"
  let legs = $('.leg');
  // Hide those elements
  legs.hide();
  // Choose a random element in the legs array and store it in a variable
  let leg = legs[Math.floor(Math.random()*legs.length)];
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
  // Store all the elements with the class body in an "array"
  let bodies = $('.body');
  // Hide those elements
  bodies.hide();
  // Choose a random element in the bodies array and store it in a variable
  let body = bodies[Math.floor(Math.random()*bodies.length)];
  // Show that random element
  $(body).show();
  // Set a timeout that calls this actual function after a certain delay so it does a loop
  // Note: I have to use setTimeout that way instead of setInterval because I want to be able to change my delay variable (possible because the function is called every loop)
  spinningBodiesTimeout = setTimeout(spinBodies, bodyDelay);
}

// spinHeads()
//
// Put element with head class in an "array"
// Hides and shows random items in that array
function spinHeads() {
  // Store all the elements with the class head in an "array"
  let heads = $('.head');
  // Hide those elements
  heads.hide();
  // Choose a random element in the heads array and store it in a variable
  let head = heads[Math.floor(Math.random()*heads.length)];
  // Show that random element
  $(head).show();
  // Set a timeout that calls this actual function after a certain delay so it does a loop
  // Note: I have to use setTimeout that way instead of setInterval because I want to be able to change my delay variable (possible because the function is called every loop)
  spinningHeadsTimeout = setTimeout(spinHeads, headDelay);
}

// stopSpinningLegs()
//
// Function called when we click on the button "stop spinning legs"
// It slows down the spinning and then stops it
function stopSpinningLegs() {
  // Increase the delay for the timeout
  legsDelay+=50;
  // If the delay is more than 1,5 second...
  if(legsDelay >= 1500) {
    // Stop the timeout for the spinning
    clearTimeout(spinningLegsTimeout);
    // Stop the timeout that slows down the spinning
    clearTimeout(stopSpinningLegs);
  }
  // Set a timeout that calls this actual function after a certain delay so it does a loop
  stopLegsTimeout = setTimeout(stopSpinningLegs,100);
}

// stopSpinningBodies()
//
// Function called when we click on the button "stop spinning bodies"
// It slows down the spinning and then stops it
function stopSpinningBodies() {
  // Increase the delay for the timeout
  bodyDelay+=50;
  // If the delay is more than 1,5 second...
  if(bodyDelay >= 1500) {
    // Stop the timeout for the spinning
    clearTimeout(spinningBodiesTimeout);
    // Stop the timeout that slows down the spinning
    clearTimeout(stopSpinningBodies);
  }
  // Set a timeout that calls this actual function after a certain delay so it does a loop
  stopBodiesTimeout = setTimeout(stopSpinningBodies,100);
}

// stopSpinningHeads()
//
// Function called when we click on the button "stop spinning heads"
// It slows down the spinning and then stops it
function stopSpinningHeads() {
  // Increase the delay for the timeout
  headDelay+=50;
  // If the delay is more than 1,5 second...
  if(headDelay >= 1500) {
    // Stop the timeout for the spinning
    clearTimeout(spinningHeadsTimeout);
    // Stop the timeout that slows down the spinning
    clearTimeout(stopSpinningHeads);
  }
  // Set a timeout that calls this actual function after a certain delay so it does a loop
  stopHeadsTimeout = setTimeout(stopSpinningHeads,100);
}
