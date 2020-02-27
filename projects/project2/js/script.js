"use strict";

/*****************

Character generator
Audrey Coulombe

A game where you have to generate kids caracters and titles as quick as possible to make more money.

******************/
// Initial states of the game
let legsSpinning = false;
let bodiesSpinning = false;
let headsSpinning = false;

// Variables for the spinning intervals
let spinningLegsInterval;
let spinningBodiesInterval;
let spinningHeadsInterval;


$(document).ready(setup);

// setup()
//
// Creates Canvas and displays title page
function setup() {
  $('.bodyPartsImages').hide();
}

//  mousePressed()
//
// When the mouse is pressed, checks if we are at the state TITLE.
// If so, displays the "game" arrangement
// function mousePressed() {
//   // If the state is "TITLE"...
//   if (state === "TITLE") {
//     // Display the background image
//     image(backgroundImage, 0, 0, width, height);
//     // And the buttons
//     displayButtons();
//     // And change the state to "GAME"
//     state = "GAME";
//   }
// }

// spinLegsAndStop()
//
// Checks if the legs are already spinning or not
// Spins it when not spinning and vice versa by randomly displaying legs images in the array at an interval of 100 miliseconds
function spinLegsAndStop() {
  // If the the legs are not spinning yet
  if(legsSpinning === false){
    // Set an interval and store it in a variable
    spinningLegsInterval = setInterval(function(){
      let legs = $('.leg');
      legs.hide();
      let leg = legs[Math.floor(Math.random()*legs.length)];
      $(leg).show();
    }
    // Set the interval of repetition of the previous function to 100 miliseconds
    , 100);
    // And change the state of the legs spinning to true
    legsSpinning = true;
  }
  // (When the button is clicked) if the legs are already moving...
  else if (legsSpinning===true){
    // Stop the interval so the image stays visible
    clearInterval(spinningLegsInterval);
    // And change the state of the legs spinning to false
    legsSpinning = false;
  }
}

// spinBodiesAndStop()
//
// Checks if the bodies are already spinning or not
// Spins it when not spinning and vice versa by randomly displaying legs images in the array at an interval of 100 miliseconds
function spinBodiesAndStop() {
  // If the the bodies are not spinning yet
  if(bodiesSpinning === false){
    // Set an interval and store it in a variable
    spinningBodiesInterval = setInterval(function(){
      let bodies = $('.body');
      bodies.hide();
      let body = bodies[Math.floor(Math.random()*bodies.length)];
      $(body).show();
    }
    // Set the interval of repetition of the previous function to 100 miliseconds
    , 100);
    // And change the state of the bodies spinning to true
    bodiesSpinning = true;
  }
  // (When the button is clicked) if the bodies are already moving...
  else if (bodiesSpinning===true){
    // Stop the interval so the image stays visible
    clearInterval(spinningBodiesInterval);
    // And change the state of the bodies spinning to false
    bodiesSpinning = false;
  }
}
