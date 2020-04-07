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
// Variable that sets the time of the playerWalkInterval
let walkingSpeed = 120;
// Array that contains the names of the classes for the walk animation
let walkPattern = ["leftFoot", "standing", "rightFoot", "standing"];
// Variable that keeps track of the animation frame (used as index number for walkPattern array)
let currentWalkFrame = 0;
// Player velocity variables
let playerVelocityX;
let playerVelocityY;
// Player rotation angle (in radians)
let playerRotation;
let numberOfCharacters = 8;
// let character;
let characters = [];

// When the page is ready...
$(document).ready(function() {
  // Check the mouse and player positions each millisecond
  setInterval(mousePlayerPosition,1);
  // And check if it's time to walk and if so, anime the walk pattern
  setInterval(walk, walkingSpeed);
  displayCharacter();
  // setInterval(moveCharacter, walkingSpeed);
  moveCharacter();
});


function displayCharacter() {
  for (let i = 1; i<numberOfCharacters+1; i++) {
    let $characterDiv = $("<div></div>");
    $characterDiv.addClass("character");
    $characterDiv.css('background-image', 'url(../assets/images/characters-0'+i+'.png)');
    // character.css(background-position: -132px 0px;)
    let characterPosition = $characterDiv.offset();
    characterPosition.left = Math.random() * $('body').width();
    characterPosition.top = Math.random() * $('body').height();
    $characterDiv.offset({ top: characterPosition.top, left: characterPosition.left });
    $characterDiv.appendTo($('body'));
    characters.push($characterDiv);
  }
  // characters.each(moveCharacter);
  console.log(characters);
}

// $( "div" ).addClass(function( index, currentClass ) {
//   var addedClass;
//   if ( currentClass === "red" ) {
//     addedClass = "green";
//     $( "p" ).text( "There is one green div" );
//   }
//   return addedClass;
// });

function moveCharacter() {
  $(".character").each(function() {
    let maxVelocity = 30;
    let minVelocity = -30;
    let characterVelocityX;
    let characterVelocityY;
    let $character = $(this);
    setInterval(function() {
      characterVelocityX = Math.random() * (maxVelocity - minVelocity) + minVelocity;
      characterVelocityY = Math.random() * (maxVelocity - minVelocity) + minVelocity;
    }, 2000);
    setInterval(function() {
      let characterPosition = $character.offset();
      $character.offset({ top: characterPosition.top + characterVelocityY, left: characterPosition.left + characterVelocityX });
      // $('#character').css({transform: 'rotate('+playerRotation+'rad)'});
    },walkingSpeed);
  });
}

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
  // Calculate the X & Y distance between the mouse and the center of the player
  let distanceX = mousePosition.left - playerPosition.left - $("#player").width()/2;
  let distanceY = mousePosition.top - playerPosition.top - $("#player").height()/2;
  // Use pythagorean theorem to calculate the distance between the mouse and the player
  let distance = Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
  // console.log("distance: " + distance + "distanceX: " + distanceX + "distanceY: " + distanceY);
  // Set velocity X & Y according to the distance X & Y
  playerVelocityX = distanceX/10;
  playerVelocityY = distanceY/10;
  // console.log("playerVelocityX: " + playerVelocityX + ", playerVelocityY: " + playerVelocityY);
  // Set the player rotation angle according the X & Y distance with the mouse
  playerRotation = Math.atan(distanceY/distanceX) + Math.PI/2;
  // If the distanceX is negative...
  if(distanceX < 0) {
    // Add pi randians to the rotation angle (180 degrees)
    playerRotation += Math.PI;
  }
  // If the distance between player and mouse is less or equal to 50px...
  if (distance <= 50) {
    // Set the player moving state to false
    playerMoving = false;
  }
  else {
    // Else, set the player moving state to true
    playerMoving = true;
    // And rotate the player according to the mouse position
    $('#player').css({transform: 'rotate('+playerRotation+'rad)'});
  }
}

// walk()
//
// Check if the player is moving and if so change the player's class to anime the walk pattern according to the current frame
function walk() {
  // If the player has to move/is moving...
  if (playerMoving === true) {
    // Move the player by adding velocity to its top and left position
    $("#player").offset({ top: playerPosition.top + playerVelocityY, left: playerPosition.left + playerVelocityX });
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
