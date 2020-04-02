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
let playerPosition; // Note to myself: I can access playerPosition.left and playerPosition.top
let mousePosition = {
  left:1,
  top: 1
};
// Variable that contains the walk interval
let playerWalkInterval;
// Variable that sets the time of the playerWalkInterval
let walkingSpeed = 120;
// Array that contains the names of the classes for the walk animation
let walkPattern = ["leftFoot", "standing", "rightFoot", "standing"];
// Variable that keeps track of the animation frame (used as index number for walkPattern array)
let currentWalkFrame = 0;
// Player velocity variables
let velocityX;
let velocityY;


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
  // Check the player position and store it in a variable (we can access playerPosition.left & playerPosition.top)
  playerPosition = $("#player").offset();
  // console.log("player left: " + playerPosition.left + ", player top: " + playerPosition.top);
  // Check the mouse position: when it moves, get the new position and store it in a variable
  $("body").mousemove(function(event){
    mousePosition.left = event.pageX;
    mousePosition.top = event.pageY;
  });
  // console.log("mouse left: " + mousePosition.left + ", mouse top: " + mousePosition.top);
  // Calculate the X & Y distance between the mouse and the player
  let distanceX = mousePosition.left - playerPosition.left;
  let distanceY = mousePosition.top - playerPosition.top;
  // Use pythagorean theorem to calculate the distance between the mouse and the player
  let distance = Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
  // console.log("distance: " + distance + "distanceX: " + distanceX + "distanceY: " + distanceY);
  // Set velocity X & Y according to the distance X & Y
  velocityX = distanceX/10;
  velocityY = distanceY/10;
  // console.log("velocityX: " + velocityX + ", velocityY: " + velocityY);
  // If the distance between player and mouse is less or equal to 10px...
  if (distance <= 10) {
    // Set the player moving state to false
    playerMoving = false;
  }
  else {
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
    // Move the player by adding velocity to its top and left position
    $("#player").offset({ top: playerPosition.top+velocityY, left: playerPosition.left+velocityX });
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
