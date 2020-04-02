"use strict";

/*****************

The Social Distancing Game
Audrey Coulombe

This is a template. You must fill in the title,
author, and this description to match your project!

Used the following link as a reference for the walk pattern: https://digipiph.com/blog/creating-sprite-character-movement-javascript-and-jquery-ver-10
******************/

// Global variables
//
// Initial states of the game
let playerMoving = false;
// Position variables
let mousePosition = {
  left:1,
  top: 1
};
let playerPosition; // Note to myself: I can access playerPosition.left and playerPosition.top;
// Variable that contains the walk interval
let playerWalkInterval;
// Variable that sets the time of the playerWalkInterval
let walkingSpeed = 120;
// Array that contains the names of the classes for the walk animation
let walkPattern = ["leftFoot", "standing", "rightFoot", "standing"];
// Variable that keeps track of the animation frame (used as index number for walkPattern array)
let currentWalkFrame = 0;

// When the page is ready...
$(document).ready(function() {
  // Check the mouse and player positions each millisecond
  setInterval(mousePlayerPosition,1);
  // And check if it's time to walk and if so, anime the walk pattern
  setInterval(walk, walkingSpeed);
});

// mousePlayerPosition()
//
// Checks the mouse and player positions and sets the player moving state
function mousePlayerPosition() {
  // Check the player position and store it in a variable
  playerPosition = $("#player").offset();
  // console.log("player left: " + playerPosition.left + ", player top: " + playerPosition.top);
  // Check the mouse position: when it moves, get the new position and store it in a variable
  $("body").mousemove(function(event){
    mousePosition.left = event.pageX;
    mousePosition.top = event.pageY;
  });
  // console.log("mouse left: " + mousePosition.left + ", mouse top: " + mousePosition.top);
  // If the player has the same position as the mouse...
  if (playerPosition.left === mousePosition.left && playerPosition.top === mousePosition.top) {
    // Set the player moving state to false
    playerMoving = false;
  } else {
    // Else, set the player moving state to true
    playerMoving = true;
  }
}

// walk()
//
// Check if the player is moving and if so change the player's class to anime the walk pattern according to the current frame
function walk() {
  // If the player has to move/is moving...
  if (playerMoving === true) {
    // Remove the player's class
    $('#player').removeAttr('class');
    // And add a new class corresponding to the current walk frame
    $('#player').addClass(walkPattern[currentWalkFrame]);
    // Add 1 to the current wlak frame
    currentWalkFrame ++;
    // If the current walk frame is greater or equal to the numer of element in the walk pattern...
    if (currentWalkFrame >= walkPattern.length) {
      // Set the current walk frame back to 0
      currentWalkFrame = 0;
    }
  }
  // Else, if the player is not moving...
  else {
    // Remove the player class
    $('#player').removeAttr('class');
    // And add the second element of the walk pattern as the new class
    $('#player').addClass(walkPattern[1]);
  }
}
