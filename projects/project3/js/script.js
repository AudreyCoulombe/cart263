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
// Array that contains the different position of the sprite sheet for the walk animation
let walkPattern = ["-132px 0px", "0px 0px", "-264px 0px", "0px 0px"];// === ["leftFoot", "standing", "rightFoot", "standing"];
// Variable that keeps track of the animation frame (used as index number for walkPattern array)
let playerWalkFrame = 0;
// Player velocity variables
let playerVelocityX;
let playerVelocityY;
// Player rotation angle (in radians)
let playerRotation;
let numberOfCharacters = 8;
// Array that contains all the characters divs (other than the player)
let characters = [];
// Variable that contains the player character div
let $playerCharacter;
let playerCollision = false;
let characterCollision;

// When the page is ready...
$(document).ready(function() {
  // Assign the player character variable to the div with the id "player"
  $playerCharacter = $('#player');
  // Display the characters other than the player randomly in the body
  displayCharacters();
  // Check the mouse and player positions each millisecond
  setInterval(mousePlayerPosition,1);
  // M
  moveCharacters();
  // And check if it's time to walk and if so, anime the walk pattern
  setInterval(playerWalk, walkingSpeed);
  setInterval(checkPlayerCollision,60);
});

// checkPlayerCollision()
//
// Uses .collision() function (from jquery-collision extension) to check if the player touches a character.
// If so, animes the player with the "explode" effect...
function checkPlayerCollision() {
  // When the player touches a character, store the character object in an "array", in a variable
  characterCollision = $($playerCharacter).collision('.character'); // function from the library extension "jquery-collision"
  // console.log(characterCollision);
  // If the characterCollision "array" contain more than 0 object...
  if (characterCollision.length > 0) {
    // Set the player collision state to true;
    playerCollision = true;
    // Anime the player with the "explode" effect and when the animation is done...
    $playerCharacter.effect( "explode", "linear", 400, function() {
      // Set the player collision state to false
      playerCollision = false;
      // Stop the animation effect
      $playerCharacter.stop(true, true);
      // Show the player character
      $playerCharacter.show();
    } );
  }
  // console.log(playerCollision);
  // console.log(characterCollision.length);
}

// displayCharacters()
//
// For each character, creates a div with character class,
// sets the background image as the character image and displays it randomly in the body
function displayCharacters() {
  // For each character...
  for (let i = 1; i<numberOfCharacters+1; i++) {
    // Create a div and store it in a variable
    let $characterDiv = $("<div></div>");
    // Add the class "character" to the new div
    $characterDiv.addClass("character");
    // Set the background image to the character number we are at
    $characterDiv.css('background-image', 'url(../assets/images/characters-0'+i+'.png)');
    // Get a random number between 0 and de width of the body for the left position
    let leftPosition = Math.random() * $('body').width();
    // Get a random number between 0 and de height of the body for the top position
    let topPosition = Math.random() * $('body').height();
    // Set the position of the new div to the random one we just created
    $characterDiv.offset({ top: topPosition, left: leftPosition });
    // Add the new div to the body
    $characterDiv.appendTo($('body'));
    // And push this div in the array that contains all the characters other than the player
    characters.push($characterDiv);
  }
}

// moveCharacters()
//
// For each character, sets a random velocity and changes it each 2 seconds
// and makes the character walk, move and rotate at the walkingSpeed
function moveCharacters() {
  // For each character...
  $(".character").each(function() {
    // Set the maximum and minimum velocity
    let maxVelocity = 30;
    let minVelocity = -30;
    // Create variables for the character velocity X and Y
    let characterVelocityX;
    let characterVelocityY;
    // Create a variable for the actual character
    let $character = $(this);
    // Set the current walk frame to 0
    let characterWalkFrame = 0;
    // Create a variable for the character's rotation angle
    let characterRotation;

    // Create an interval that sets random velocity X and Y each 2000 milliseconds
    setInterval(function() {
      // Set velocity X and Y to a random number between max and min velocity
      characterVelocityX = Math.random() * (maxVelocity - minVelocity) + minVelocity;
      characterVelocityY = Math.random() * (maxVelocity - minVelocity) + minVelocity;
    }, 2000);
    // Create an interval that makes the character walk and move at the walkingSpeed
    setInterval(function() {
      // Add 1 to the current walk frame
      characterWalkFrame ++;
      // If the current walk frame is greater or equal to the numer of element in the walk pattern...
      if (characterWalkFrame >= walkPattern.length) {
        // Set the current walk frame back to 0
        characterWalkFrame = 0;
      }
      // Make the character walk, move and and rotate
      walk($character, characterVelocityX, characterVelocityY, characterRotation, characterWalkFrame);
      handleWrapping($character);
    },walkingSpeed);
  });
}

// handleWrapping()
//
// Checks if the character has gone off the body and wraps it to the other side if so
function handleWrapping(wrappingCharacter) {
  // Variables for body width and height
  let bodyWidth = $('body').width();
  let bodyHeight = $('body').height();
  // Variable for the character's position
  let $position = wrappingCharacter.offset();
  // If the character's left position is less than 0...
  if ($position.left < 0) {
    // Wrap it to the other side of the body by setting the left position to the body width
    wrappingCharacter.offset({ left: bodyWidth });
  }
  // If the character's left position is greater than the body width...
  else if ($position.left > bodyWidth) {
    // Wrap it to the other side of the body by setting the left position to 0
    wrappingCharacter.offset({ left: 0 });
  }
  // If the character's top position is less than 0...
  if ($position.top < 0) {
    // Wrap it to the other side of the body by setting the top position to the body height
    wrappingCharacter.offset({ top: bodyHeight });
  }
  // If the character's top position is greater than the body height...
  else if ($position.top > bodyHeight) {
    // Wrap it to the other side of the body by setting the top position to 0
    wrappingCharacter.offset({ top: 0 });
  }
}

// mousePlayerPosition()
//
// Checks the mouse and player positions and sets the player moving state
function mousePlayerPosition() {
  // Check the player position and store it in a variable (we can access playerPosition.left & playerPosition.top)
  playerPosition = $playerCharacter.offset();
  // console.log("player left: " + playerPosition.left + ", player top: " + playerPosition.top);
  // Check the mouse position: when it moves, get the new position and store it in a variable
  $("body").mousemove(function(event){
    mousePosition.left = event.pageX;
    mousePosition.top = event.pageY;
  });
  // console.log("mouse left: " + mousePosition.left + ", mouse top: " + mousePosition.top);
  // Calculate the X & Y distance between the mouse and the center of the player
  let distanceX = mousePosition.left - playerPosition.left - $playerCharacter.width()/2;
  let distanceY = mousePosition.top - playerPosition.top - $playerCharacter.height()/2;
  // Use pythagorean theorem to calculate the distance between the mouse and the player
  let distance = Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
  // console.log("distance: " + distance + "distanceX: " + distanceX + "distanceY: " + distanceY);
  // Set velocity X & Y according to the distance X & Y
  playerVelocityX = distanceX/10;
  playerVelocityY = distanceY/10;
  // If the distance between player and mouse is less or equal to 50px...
  if (distance <= 50) {
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
// Check if the player is moving and if so make the player walk, move and rotate
function playerWalk() {
  // If the player has to move/is moving...
  if (playerMoving === true) {
    // Add 1 to the current wlak frame
    playerWalkFrame ++;
    // If the current walk frame is greater or equal to the number of elements in the walk pattern...
    if (playerWalkFrame >= walkPattern.length) {
      // Set the current walk frame back to 0
      playerWalkFrame = 0;
    }
    // Make the player walk, move and rotate
    walk($playerCharacter, playerVelocityX, playerVelocityY, playerRotation, playerWalkFrame);
  }
  // Else, if the player is not moving...
  else {
    // Add the second element of the walk pattern as the background position (standing)
    $playerCharacter.css('background-position',walkPattern[1]);
  }
}

// Walk()
// Animes the character's sprite sheet, moves the character and rotates it.
// Function used for the player and the other characters
function walk($walkingCharacter, velocityX, velocityY, rotationAngle, currentWalkFrame) {
  // Get the character position and store it un a variable
  let position = $walkingCharacter.offset();
  // Move the character by adding velocity to its top and left position
  $walkingCharacter.offset({ top: position.top + velocityY, left: position.left + velocityX });
  // Animates the character's background position according to the current walk frame
  $walkingCharacter.css('background-position',walkPattern[currentWalkFrame]);
  // Set the character rotation angle according ti the X & Y velocity (in radians)
  rotationAngle = Math.atan(velocityY/velocityX) + Math.PI/2;// Math.PI/2 radians === 90 degrees
  // If the distanceX is negative...
  if(velocityX < 0) {
    // Add pi randians to the rotation angle (180 degrees)
    rotationAngle += Math.PI;
  }
  // And rotate the character according to the rotation angle
  $walkingCharacter.css({transform: 'rotate('+rotationAngle+'rad)'});
}
