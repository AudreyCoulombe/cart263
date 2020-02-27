"use strict";

/*****************

Character generator
Audrey Coulombe

A game where you have to generate kids caracters and titles as quick as possible to make more money.

******************/
// Initial states of the game
let state = "TITLE";
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
  displayButtons();
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

// displayButtons()
//
// Changes the css of the buttons so we can see it
function displayButtons() {
  // Stocking the 3 buttons in 3 variables
  let headsButton = document.getElementById("headsButton");
  let bodiesButton = document.getElementById("bodiesButton");
  let legsButton = document.getElementById("legsButton");
  // And change their display mode in css to "block"
  headsButton.style.display = "block";
  bodiesButton.style.display = "block";
  legsButton.style.display = "block";
}

// spinLegsAndStop()
//
// Checks is the legs are already spinning or not
// Spins it when not spinning and vice versa by randomly displaying legs images in the array at an interval of 100 miliseconds
// function spinLegsAndStop() {
//   // If the the legs are not spinning yet
//   if(legsSpinning === false){
//     // Set an interval and store it in a variable
//     spinningLegsInterval = setInterval(function(){
//       // Display the next images by the top left corner
//       imageMode(CORNER);
//       // Display the background image over the previous one
//       image(backgroundImage, 0, 0, width, height);
//       // Display the next images by center
//       imageMode(CENTER);
//       // Display one of the 5 first body part image (the 5 legs images) randomly
//       image(bodyParts[Math.floor(Math.random()*5)], width/2, height/2, bodyPartsWidth, bodyPartsHeight);
//       }
//     // Set the interval of repetition of the previous function to 100 miliseconds
//     , 100);
//     // And change the state of the legs spinning to true
//     legsSpinning = true;
//   }
//   // (When the button is clicked) if the legs are already moving...
//   else if (legsSpinning===true){
//     // Stop the interval so the image stays visible
//     clearInterval(spinningLegsInterval);
//     // And change the state of the legs spinning to false
//     legsSpinning = false;
//   }
// }
