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
// Number of characters other than the player and number of toilet paper rolls
let numberOfCharacters = 6;
// let numberOfCharacters = 8;
let numberOfPaperRoll = 8;
// Variable that contains the player character div
let $playerCharacter;
// Variable with the initial score (number of paper rolls collected)
let score = 0;
// Variable with the number of times the player touched another character (for the progressbar)
let contactWithVirus = 0;
// Variable that contains the interval that updates the progressbar
let progressbarInterval;
// Image that will be appended to the dialog box
let $virusImage;

// When the page is ready, run the documentReady() function
$(document).ready(documentReady);

// documentReady()
//
//
function documentReady() {
  // Assign the player character variable to the div with the id "player"
  $playerCharacter = $('#player');
  // Display and update the progressbar each 60 milliseconds and store the interval in a variable
  progressbarInterval = setInterval(displayProgressbar, 60);
  // Display the characters other than the player randomly in the body
  displayCharacters();
  // Display the toilet paper rolls randomly in the body
  displayPaperRolls();
  // Check the mouse and player positions each millisecond
  setInterval(mousePlayerPosition,1);
  // Move all charcters other than the player and change the velocity each 2 seconds
  moveCharacters();
  // Check if it's time to walk and if so, anime the walk pattern
  setInterval(playerWalk, walkingSpeed);
  // Check if the player touched something each 60 millisecond
  setInterval(checkPlayerCollision,120);
}

// displayProgressbar()
//
// Displays and updates the progressbar according to the number of times the player touched another character. (The progressbar represent the level of "infection", once it is complete the player is "infected" and the game is over)
// Runs the playerDead() function when the progressbar is complete
function displayProgressbar() {
  // Display the div with the id "progressbar" as a progressbar...
  $( "#progressbar" ).progressbar({
    // With a completion level (in %) according to the number of times the player touched another character
    value: contactWithVirus,
    // When the value is 100%, run the function playeDead()
    complete: playerDead,
  });
}

// playerDead()
//
// 
function playerDead() {
  // Stop and remove the interval that updates the progressbar
  clearInterval(progressbarInterval);
  // Remove all the characters and the paper rolls
  $('.character').remove();
  $('.paperRoll').remove();
  // Hide the player
  $('#player').hide();
  // Open a dialog box saying the player is infected
  playerInfectedDialog();
}

// playerInfectedDialog()
//
// Runs when player is dead.
// Adds a virus image and text to the dialog. Displays the dialog box with specified options.
function playerInfectedDialog() {
  // Add text to the div with id "gameoverDialog"
  $('#gameoverDialog').html("You have been infected by the virus");
  // Set the variable to an image tag with the path of the virus image
  $virusImage = $('<img src="assets/images/virus.png">');
  // Add the image to the div with the id "gameoverDialog"
  $virusImage.appendTo($('#gameoverDialog'));
  // Set the div with the id "gameoverDialog" as a dialog box and display it
  $('#gameoverDialog').dialog({
    modal: true, // Blur the background
    resizable: false, // Disable resizable option
    draggable: false, // Disable draggable option
    dialogClass: "dialogStyle", // Add a class
    height: 580, // Set dimensions
    width: 800,
    buttons: [{
      text: "Next",
      // When we click the button, run the goHomeDialog() function
      click: goHomeDialog,
    }],
  });
}

// goHomeDialog
//
// Runs when the "Next" button is clicked.
// Removes the virus image from the gameover dialog, changes text and some options of the dialog and displays the new dialog telling the player to go home
function goHomeDialog() {
  // Remove the virus image
  $($virusImage).remove();
  // Change the text in the div with the id "gameoverDialog"
  $('#gameoverDialog').html("Now go home and stay isolated from the rest of the world");
  // Display the dialog box with the new options
  $('#gameoverDialog').dialog({
    height: 350, // Set dimensions
    width: 600,
    buttons: [{
      text: "Go home",
      // When we click the button, run the atLeastDialog() function
      click: atLeastDialog
    }],
  });
}

// atLeastDialog()
//
// Runs when the "Go home" button is clicked.
// Hides the progressbar and the sore and changes the background image of the body
// Changes text and some options of the gameover dialog and displays the new dialog telling the player how many paper rolls he collected.
// After 2 seconds, displays a thousand paper rolls in the body
function atLeastDialog() {
  // Hide the progressbar and the score
  $('#progressbar').hide();
  $('#scoreBox').hide();
  // Change the background image of the body to an image of the player at home
  $('body').css('background-image', 'url(../assets/images/playerHome.png)');
  // Change the text in the div with the id "gameoverDialog"
  $('#gameoverDialog').html("What a shitty situation! At least you collected " + score + " rolls of toilet paper!");
  // Display the dialog box with the new options
  $('#gameoverDialog').dialog({
    position: { my: "right center", at: "right center", of: "body" }, // Set position
    height: 400, // Set dimensions
    width: 500,
    buttons: [{
      id: "newGameButton", // Add an id that's set to hide the button
      text: "New game",
      // When we click the button, run the documentReady() function
      click: documentReady
    }],
  });
  // After a delay of 2 seconds (2000 milliseconds)...
  setTimeout(function(){
    // Show the button by changing the display mode with css
    $('#newGameButton').css('display', 'block');
    // And execute the following steps a thousand times
    for (let i = 0; i<1000; i++) {
      // After a delay related to the number of times we ran the loop...
      setTimeout(function(){
        // Create a new div and store it in a variable
        let $paperRollDiv = $("<div></div>");
        // Add the class "paperRoll" to the new div
        $paperRollDiv.addClass("paperRoll");
        // Set a random position and rotation angle for the new div and display it in the body
        displayElement($paperRollDiv);
      },i*20); // Used "i" for the delay so the paper rolls are displayed one after the other
    }
  },2000);
}

// checkPlayerCollision()
//
// Uses .collision() function (from jquery-collision extension) to check if the player touches a character.
// If so, animes the player with the "explode" effect...
function checkPlayerCollision() {
  // When the player touches a character, store the character object in an "array", in a variable
  let touchedCharacter = $($playerCharacter).collision('.character'); // function from the library extension "jquery-collision"
  // When the player touches a paper roll, store the paper roll object in an "array", in a variable
  let touchedPaperRoll = $($playerCharacter).collision('.paperRoll');
  // If the "array" with the touched character contains more than 0 object...
  if (touchedCharacter.length > 0) {
      // Anime the player with the "explode" effect and when the animation is done...
      $playerCharacter.effect( "explode", "linear", 400, function() {
        // Stop the animation effect
        $playerCharacter.stop(true, true);
        // Show the player character
        $playerCharacter.show();
        contactWithVirus += 20;
      } );
  }
  // If the "array" with the touched toilet paper rolls contains more than 0 object...
  if (touchedPaperRoll.length > 0) {
    // Add 1 to the score
    score += 1;
    // And change its position and roatation angle to a random one
    displayElement($(touchedPaperRoll[0]));
    // Display the new score
    $('#score').html(score);
  }
}

// displayCharacters()
//
// For each character, creates a new div, displays it randomly, adds the class "character",
// sets the background image as the character image and checks if it overlays another character.
// If so, displays that character randomly again until it overlays no other character
function displayCharacters() {
  // For each character...
  for (let i = 1; i<numberOfCharacters+1; i++) {
    // Create a new div and store it in a variable
    let $characterDiv = $("<div></div>");
    // Set a random position and rotation angle for the new div and display it in the body
    displayElement($characterDiv);
    // Add the class "character" to the new div
    $characterDiv.addClass("character");
    // Set the background image to the character number we are at
    $characterDiv.css('background-image', 'url(../assets/images/characters-0'+i+'.png)');
  }
  // Once all the characters are set, for each one...
  $('.character').each(function() {
    // Store the actual character in a variable
    let $character = $(this);
    // Store characters other than the actual one in a variable
    let $otherCharacters = $('.character').not($character);
    // Check if the actual character overlays the other ones and if so, display it randomly until it overlays no other character
    checkOverlay($character, $otherCharacters);
  });
}

// checkOverlay()
//
// Checks if the actual character overlays another one.
// If so, displays it randomly and calls checkOverlay() function again.
function checkOverlay($actualCharacter, $others) {
  // When the character touches another one, store the other character object in an "array"
  let characterCollision = $($actualCharacter).collision($others);
  // If the characterCollision "array" contains more than zero object...
  if (characterCollision.length > 0) {
    // Display the actual character with a random position and rotation angle
    displayElement($actualCharacter);
    // After 100 millisecons, check again if the actual character overlays another one
    setTimeout(function() {
      checkOverlay($actualCharacter, $others);
    }, 100);
  }
}

// displayPaperRolls()
//
// For each paper roll, creates a new div, displays it randomly and adds the class "paperRoll"
function displayPaperRolls() {
  // For each character...
  for (let i = 0; i<numberOfPaperRoll; i++) {
    // Create a new div and store it in a variable
    let $paperRollDiv = $("<div></div>");
    // Set a random position and rotation angle for the new div and display it in the body
    displayElement($paperRollDiv);
    // Add the class "paperRoll" to the new div
    $paperRollDiv.addClass("paperRoll");
  }
}
// displayElement()
//
// Gets a random number for the position and rotation angle and displays elements randomly in the body
// Function used to display the characters other than the player and for toilet paper rolls
function displayElement($newDiv) {
  // Get a random number between 0 and the width of the body for the left position
  let leftPosition = Math.random() * $('body').width();
  // Get a random number between 0 and de height of the body for the top position
  let topPosition = Math.random() * $('body').height();
  // Set the position of the new div to the random one we just created
  $newDiv.offset({ top: topPosition, left: leftPosition });
  // gat a random number for the rotation angle in radians
  let rotation = Math.random() * Math.PI *2;// 2 Pi radians = 360 degrees
  $newDiv.css({transform: 'rotate('+rotation+'rad)'});
  // Add the new div to the body
  $newDiv.appendTo($('body'));
}

// moveCharacters()
//
// For each character, sets a random velocity and changes it each 2 seconds.
// Makes the character go to the opposite direction when it touches another one
// and makes the character walk, move and rotate at the walkingSpeed
function moveCharacters() {
  // For each character...
  $('.character').each(function(index) {
    // Set the maximum and minimum velocity
    let maxVelocity = 20;
    let minVelocity = -20;
    // Create variables for the character velocity X and Y
    let characterVelocityX;
    let characterVelocityY;
    // Create a variable for the actual character
    let $character = $(this);
    // Create a virable for the characters other than the actual one
    let $otherCharacters = $('.character').not($character);
    // Set the current walk frame to 0
    let characterWalkFrame = 0;
    // Create a variable for the character's rotation angle
    let characterRotation;
    // Set the running away state to false
    let runningAway = false;

    // Create an interval that sets random velocity X and Y each 2000 milliseconds
    // if the character is not running away
    setInterval(function() {
      // If the character is not running away form another character...
      if (runningAway === false) {
        // Set velocity X and Y to a random number between max and min velocity
        characterVelocityX = Math.random() * (maxVelocity - minVelocity) + minVelocity;
        characterVelocityY = Math.random() * (maxVelocity - minVelocity) + minVelocity;
      }
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
      // If the character is not running away from another character
      if (runningAway === false) {
        // When the character touches another character, store the other character object in an "array", in a variable
        let characterCollision = $($character).collision($otherCharacters);
        // If the "array" with the touched character contains more than 0 object...
        if (characterCollision.length > 0) {
          // Set the running away state to true
          runningAway = true;
          // Make the player go to the opposite direction by multiplying its velocity by -1
          characterVelocityX *= -1;
          characterVelocityY *= -1;
          // After 100 * index miliseconds, set the running away state back to false
          setTimeout(function() {
            runningAway = false;
          },index*500); //(had to use the index in the delay or else the 2 characters would sometimes be stuck in a loop walking together and change velocity at the same time)
        }
      }
      // Make the character walk, move and and rotate
      walk($character, characterVelocityX, characterVelocityY, characterWalkFrame);
      // When the character goes out the body, make it wrap
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
    walk($playerCharacter, playerVelocityX, playerVelocityY, playerWalkFrame);
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
function walk($walkingCharacter, velocityX, velocityY, currentWalkFrame) {
  // Get the character position and store it un a variable
  let position = $walkingCharacter.offset();
  // Move the character by adding velocity to its top and left position
  $walkingCharacter.offset({ top: position.top + velocityY, left: position.left + velocityX });
  // Animates the character's background position according to the current walk frame
  $walkingCharacter.css('background-position',walkPattern[currentWalkFrame]);
  // Set the character rotation angle according ti the X & Y velocity (in radians)
  let rotationAngle = Math.atan(velocityY/velocityX) + Math.PI/2;// Math.PI/2 radians === 90 degrees
  // If the distanceX is negative...
  if(velocityX < 0) {
    // Add pi randians to the rotation angle (180 degrees)
    rotationAngle += Math.PI;
  }
  // And rotate the character according to the rotation angle
  $walkingCharacter.css({transform: 'rotate('+rotationAngle+'rad)'});
}
