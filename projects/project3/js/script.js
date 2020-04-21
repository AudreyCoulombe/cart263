"use strict";

/*****************

The Social Distancing Game
Audrey Coulombe

A game where you have to avoid contact with other people in order to survive (not get infected) and collect as many toilet paper rolls as possible. Use your mouse to move the player around, pick up the hand sanitizer to decrease your level of infection and pick up the three protection items to get immunity for 10 seconds.

Used the following link as a reference for the walk pattern: https://digipiph.com/blog/creating-sprite-character-movement-javascript-and-jquery-ver-10
******************/


// Global variables
//
// Initial states of the game
let playerMoving = false;
let gotMask = false;
let gotGlove = false;
let gotOverall = false;
let playerProtected = false;
let playerIsDead = false;
// Position variables
let playerPosition; // Note to myself: I can access playerPosition.left and playerPosition.top
let mousePosition = {
  left: 1,
  top: 1
};
// Variable that sets the time of the playerWalkInterval
let walkingSpeed = 120;
// Array that contains the different position of the sprite sheet for the walk animation
let walkPattern = ["-132px 0px", "0px 0px", "-264px 0px", "0px 0px"]; // === ["leftFoot", "standing", "rightFoot", "standing"];
// Variable that keeps track of the animation frame (used as index number for walkPattern array)
let playerWalkFrame;
// Player velocity variables
let playerVelocityX;
let playerVelocityY;
// Number of characters other than the player and number of toilet paper rolls
let numberOfCharacters = 6;
let numberOfPaperRoll = 8;
// Variable that contains the player character div
let $playerCharacter;
// Variable with the score (number of paper rolls collected)
let score;
// Variable with the number of times the player touched another character (for the progressbar)
let contactWithVirus;
// Interval variables
let progressbarInterval; // Updates the progressbar
let collisionInterval; // Checks if the player touched something
let playerWalkInterval; // Moves the player
let mousePlayerInterval; // Checks distance between mouse and player
// Images that will be appended to the dialog box
let $virusImage;
let $pooImage;
// Variable with the number of paper rolls that are displayed when the game is done
let finalPaperRolls = 1000;

// When the page is ready...
$(document).ready(function() {
  // When the button with id "artistStatementButton" is clicked...
  // (referred to this example: https://stackoverflow.com/questions/19851782/how-to-open-a-url-in-a-new-tab-using-javascript-or-jquery)
  $( "#artistStatementButton" ).click(function() {
    // Open the readme.md file in another tab
    let artistStatement = window.open('https://audreycoulombe.github.io/cart263/projects/project3/README.md', '_blank');
    // If the tab did not open...
    if (!artistStatement) {
      // Display an alert telling the user he/she has to allow popups
      alert("Allow popups to read the artist's statement");
    }
  });
  // When the button with the id "startButton" is clicked...
  $( "#startButton" ).click(function() {
    // Run the instructionPage function
    instructionPage();
    // And remove the 2 buttons
    $(".titlePageButton").remove();
  });
});

// setup()
//
// The P5 function that runs once when the document is ready
// Creates a canvas and append it to the div with the id "perimeter"
// Displays ellipses of different sizes and colors that represent the perimeter around the player
function setup() {
  // Create the canvas and store it in a variable
  let canvas = createCanvas(400, 400);
  // Make the div with the id "perimeter" the parent of the canvas
  canvas.parent('perimeter');
  // Set the stroke and filling parameters for the ellipses
  noFill();
  strokeWeight(2);
  stroke(255, 0, 0);
  // Display 3 red ellipses of different sizes from the center of the cavas
  ellipse(height / 2, width / 2, 100, 100);
  ellipse(height / 2, width / 2, 150, 150);
  ellipse(height / 2, width / 2, 200, 200);
  // Set the new stroke parameters
  strokeWeight(1);
  stroke(255, 140, 0);
  // Display an orange ellipse from the center of the canvas
  ellipse(height / 2, width / 2, 250, 250);
  // Set the new stroke color
  stroke(255, 255, 0);
  // Display a yellow ellipse from the center of the canvas
  ellipse(height / 2, width / 2, 300, 300);
  // Set the new stroke color
  stroke(0, 255, 0);
  // Display a green ellipse from the center of the canvas
  ellipse(height / 2, width / 2, 350, 350);
}

// instructionPage()
//
// Changes the body's background image and add a click event handler
function instructionPage() {
  // Change the background image of the body to the image with instructions
  $('body').css('background-image', 'url(assets/images/instructionPage.png)');
  // After one second, when we click on the document, run the startGame function
  setTimeout(function(){
    $(document).click(startGame);
  },1000);
}

// startGame()
//
// Establishes the initial settings of the game,
// Calls functions to display the characters, the paper rolls, the sanitizer and to move characters
// Sets intervals to display the progressbar, check the player collision, move player and check its distance with the mouse
function startGame() {
  // Set the number of contact with virus and the initial score to 0
  contactWithVirus = 0;
  score = 0;
  // Make the player standing by setting its walk frame to 1
  playerWalkFrame = 1;
  // Set the following booleans to false to say the player didn't collect any protection equipment yet
  gotMask = false;
  gotGlove = false;
  gotOverall = false;
  playerProtected = false;
  // Set the player is dead variable to false
  playerIsDead = false;
  // Make the protection images transparent to say the player didn't pick it up yet
  $('.protectionCollected').css("opacity", "0.25");
  // Show the div that displays the protection items to collect
  $('#collectedProtection').show();
  // Display the initial score in the paragraph with the id "score"
  $('#score').html(score);
  // Show the score and the progressbar (hidden when the player is infected)
  $('#scoreBox').show();
  $('#progressbar').show();
  // Assign the player character variable to the div with the id "playerPerimeter"
  $playerCharacter = $('#playerPerimeter');
  // Place the player in the center of the body and show it
  $playerCharacter.css({
    "top": "50%",
    "left": "50%",
  }).show();
  // Each 1 millisecond...
  setInterval(function() {
    // Place the perimeter circles at the center of the player
    $('#perimeter').position({
      my: "center center",
      at: "center center",
      of: $playerCharacter
    });
  }, 1);
  // Show the perimeter circles on screen
  $('#perimeter').show();
  // Change the background image of the body to an image of the gound
  $('body').css('background-image', 'url(assets/images/ground.png)');
  // Hide the dialog box (shown when the player is infected/dead)
  $('#gameoverDialog').hide();
  // Delete the paper rolls that are animated at the end of the game (if there are any)
  $('.paperRollPerimeter').remove();
  // Remove the click event handler from the document
  $(document).off("click");
  // Check if a key is pressed and if so, runs the checkProtection() function
  $(document).keypress(checkProtection);
  // Display the characters other than the player randomly in the body
  displayCharacters();
  // Display the toilet paper rolls randomly in the body
  displayPaperRolls();
  // Display the hand sanitizer randomly in the body after a delay of 8 seconds
  displaySanitizer();
  // Move all charcters other than the player and change the velocity each 2 seconds
  moveCharacters();
  // Display and update the progressbar each 60 milliseconds and store the interval in a variable
  progressbarInterval = setInterval(displayProgressbar, 60);
  // After a delay of 2 seconds (2000 milliseconds)...
  setTimeout(function() {
    // Check if the player touched something each 120 milliseconds
    collisionInterval = setInterval(checkPlayerCollision, walkingSpeed);
    // Check if it's time to walk and if so, anime the walk pattern
    playerWalkInterval = setInterval(movePlayer, walkingSpeed);
    // Check the mouse and player positions each millisecond
    mousePlayerInterval = setInterval(mousePlayerPosition, 1);
  }, 2000);
}

// displayProgressbar()
//
// Displays and updates the progressbar according to the number of times the player touched another character (or the player's "level of infection").
// Runs the playerDead() function when the progressbar is complete.
function displayProgressbar() {
  // Display the div with the id "progressbar" as a progressbar...
  $("#progressbar").progressbar({
    // With a completion level (in %) according to the number of times the player touched another character
    value: contactWithVirus,
    // When the value is 100%, run the function playeDead()
    complete: playerDead,
  });
}

// displayCharacters()
//
// For each character, creates a new div and appends a child to it with the character image.
// Displays the character randomly and checks if it overlays another character.
// If so, displays that character randomly again until it overlays no other character.
function displayCharacters() {
  // For each character...
  for (let i = 1; i < numberOfCharacters + 1; i++) {
    // Create a new div that contains the character and store it in a variable
    let $characterPerimeter = $("<div></div>");
    // Create a new div with the character image and store it in a variable
    let $characterImg = $("<div></div>");
    // Add the class "characterPerimeter" to the div that contains the character
    $characterPerimeter.addClass("characterPerimeter");
    // Add the class "character" to the div with the character image and append it to the div that contains the character (had issues to get accurate distance with rotated div, so $characterImg rotates and $characterPerimeter is used to check collision)
    $characterImg.addClass("character").appendTo($characterPerimeter);
    // Set a random position for the character perimeter div and a random rotation angle for the image and display the character in the body
    displayElement($characterPerimeter);
    // Set the background image to the character number we are at
    $characterImg.css('background-image', 'url(assets/images/characters-0' + i + '.png)');
  }
  // Once all the characters are set, for each one...
  $('.characterPerimeter').each(function() {
    // Store the actual character in a variable
    let $character = $(this);
    // Store characters other than the actual one in a variable
    let $otherCharacters = $('.characterPerimeter').not($character);
    // Check if the actual character overlays the other ones and if so, display it randomly until it overlays no other character
    checkOverlay($character, $otherCharacters);
  });
}

// checkOverlay()
//
// Checks if the actual character overlays another one or the player.
// If so, displays it randomly and calls checkOverlay() function again.
function checkOverlay($actualCharacter, $others) {
  // When the character touches another one, store the other character object in an "array"
  let characterCollision = $($actualCharacter).collision($others);
  // When the character touches the player, store the player object in an "array"
  let playerCollision = $($actualCharacter).collision($playerCharacter);
  // If the characterCollision or the playerCollision "array" contains more than zero object...
  if (characterCollision.length > 0 || playerCollision.length > 0) {
    // Display the actual character with a random position and rotation angle
    displayElement($actualCharacter);
    // After 100 millisecons, check again if the actual character overlays another one
    setTimeout(function() {
      checkOverlay($actualCharacter, $others);
    }, 1);
  }
}

// displayPaperRolls()
//
// For each paper roll, creates a new div and appends a child to it with the paper roll image.
// Displays the paper roll randomly in the body.
function displayPaperRolls() {
  // For each character...
  for (let i = 0; i < numberOfPaperRoll; i++) {
    // Create a div that contains the paper roll and store it in a variable
    let $paperRollPerimeter = $("<div></div>");
    // Create a div that contains the paper roll image and store it in a variable
    let $paperRollImg = $("<div></div>");
    // Add the class "paperRollPerimeter" to the div that contains the paper roll
    $paperRollPerimeter.addClass("paperRollPerimeter");
    // Add the class "paperRoll" to the div with the image and append it to the div that contains the paperRoll (had issues to get accurate distance with rotated div, so $paperRollImg rotates and $paperRollPerimeter is used to check collision)
    $paperRollImg.addClass("paperRoll").appendTo($paperRollPerimeter);
    // Set a random position for the paper roll perimeter div and a random rotation angle for the image and display the paper roll in the body
    displayElement($paperRollPerimeter);
  }
}

// displaySanitizer()
//
// After 8 seconds, creates a new div and appends a child to it with the sanitizer image.
// Displays the sanitizer randomly in the body.
function displaySanitizer() {
  // After a delay of 8 seconds...
  setTimeout(function() {
    // Create div that contains the sanitizer and store it in a variable
    let $sanitizerPerimeter = $("<div></div>");
    // Create div that contains the sanitizer image and store it in a variable
    let $sanitizerImg = $("<div></div>");
    // Add the class "sanitizerPerimeter" to the div that contains the sanitizer
    $sanitizerPerimeter.addClass("sanitizerPerimeter");
    // Add the class "sanitizer" to the div with the image and append it to the div that contains the sanitizer (had issues to get accurate distance with rotated div, so $sanitizerImg rotates and $sanitizerPerimeter is used to check collision)
    $sanitizerImg.addClass("sanitizer").appendTo($sanitizerPerimeter);
    // Set a random position for the sanitizer perimeter div and a random rotation angle for the image and display the sanitizer in the body
    displayElement($sanitizerPerimeter);
  }, 8000);
}

// displayProtection()
//
// Each time the player makes 5 points, display either the glove, the mask, or the overall.
// In a for loop, calculates for each protection item the scores you need to get to diplay it and push it in an array.
// For the 3 scores arrays, checks if it includes the actual score and if so, creates 2 divs for the item perimeter and the item image and display it randomly.
function displayProtection() {
  // Variables for the arrays that will contain the scores you need to have to get the protection equipment
  let gloveScores = [];
  let maskScores = [];
  let overallScores = [];
  // Variables for the score you need to have to get the protection equipment. Here the value corresponds to the score you need to have to get the item for the first time.
  let scoreForGlove = 5;
  let scoreForMask = 10;
  let scoreForOverall = 15;
  // Run the following loop 500 times
  for (let i = 0; i < 500; i++) {
    // Add the score for glove, mask and overall to their respective arrays
    gloveScores.push(scoreForGlove);
    maskScores.push(scoreForMask);
    overallScores.push(scoreForOverall);
    // Add 15 to the score for the glove, mask and overall
    scoreForGlove += 15;
    scoreForMask += 15;
    scoreForOverall += 15;
  }
  // If the actual score is in the gloveScores array...
  if (gloveScores.includes(score)) {
    // Create a div that contains the glove and store it in a variable
    let $glovePerimeter = $("<div></div>");
    // Create div that contains the glove image and store it in a variable
    let $gloveImg = $("<div></div>");
    // Add the class "glovePerimeter" to the div that contains the glove
    $glovePerimeter.addClass("glovePerimeter protection");
    // Add the class "glove" to the div with the image and append it to $glovePerimeter (had issues to get accurate distance with rotated div, so $glove rotates and $glovePerimeter is used to check collision)
    $gloveImg.addClass("glove").appendTo($glovePerimeter);
    // Set a random position for the div $glovePerimeter and rotation angle for $gloveImg
    displayElement($glovePerimeter);
  }
  // If the actual score is in the maskScores array...
  else if (maskScores.includes(score)) {
    // Create a div that contains the mask and store it in a variable
    let $maskPerimeter = $("<div></div>");
    // Create div that contains the mask image and store it in a variable
    let $maskImg = $("<div></div>");
    // Add the class "maskPerimeter" to the div that contains the mask
    $maskPerimeter.addClass("maskPerimeter protection");
    // Add the class "mask" to the div with the image and append it to $maskPerimeter (had issues to get accurate distance with rotated div, so $mask rotates and $maskPerimeter is used to check collision)
    $maskImg.addClass("mask").appendTo($maskPerimeter);
    // Set a random position for the div $maskPerimeter and rotation angle for $maskImg
    displayElement($maskPerimeter);
  }
  // If the actual score is in the overallScores array...
  else if (overallScores.includes(score)) {
    // Create a div that contains the overall and store it in a variable
    let $overallPerimeter = $("<div></div>");
    // Create div that contains the overall image and store it in a variable
    let $overallImg = $("<div></div>");
    // Add the class "glovePerimeter" to the div that contains the glove
    $overallPerimeter.addClass("overallPerimeter protection");
    // Add the class "overall" to the div with the image and append it to $overallPerimeter (had issues to get accurate distance with rotated div, so $overall rotates and $overallPerimeter is used to check collision)
    $overallImg.addClass("overall").appendTo($overallPerimeter);
    // Set a random position for the div $overallPerimeter and rotation angle for $overallImg
    displayElement($overallPerimeter);
  }
}

// displayElement()
//
// Gets a random number for the position and rotation angle and displays elements randomly in the body
// Function used to display the characters, the toilet paper rolls, the sanitizer and the protection equipment
function displayElement($elementPerimeter) {
  // Get a random number between 0 and the width of the body for the left position
  let leftPosition = Math.random() * $('body').width() - $elementPerimeter.width() / 2;
  // Get a random number between 0 and de height of the body for the top position
  let topPosition = Math.random() * $('body').height() - $elementPerimeter.height() / 2;
  // Set the position of the div to the random one we just created
  $elementPerimeter.offset({
    top: topPosition,
    left: leftPosition
  });
  // Get a random number for the rotation angle in radians
  let rotation = Math.random() * Math.PI * 2; // 2 Pi radians = 360 degrees
  // Rotate the children (the image) of the div with css according to the random rotation angle
  $elementPerimeter.children().css({
    transform: 'rotate(' + rotation + 'rad)'
  });
  // Add the div to the body
  $elementPerimeter.appendTo($('body'));
}

// moveCharacters()
//
// For each character, sets a random velocity and changes it each 2 seconds.
// Makes the character go to the opposite direction when it touches another one
// and makes the character walk, move and rotate at the walkingSpeed
function moveCharacters() {
  // For each character, run the following function...
  $('.characterPerimeter').each(function(index) {
    // Set the maximum and minimum velocity
    let maxVelocity = 20;
    let minVelocity = -20;
    // Create variables for the character velocity X and Y
    let characterVelocityX;
    let characterVelocityY;
    // Create a variable for the actual character
    let $character = $(this);
    // Create a varible for the characters other than the actual one
    let $otherCharacters = $('.characterPerimeter').not($character);
    // Set the current walk frame to 0
    let characterWalkFrame = 0;
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
      characterWalkFrame++;
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
          // After 500 * index miliseconds, set the running away state back to false
          setTimeout(function() {
            runningAway = false;
          }, index * 500); //(had to use the index in the delay or else the 2 characters would sometimes be stuck in a loop walking together and change velocity at the same time)
        }
      }
      // Make the character walk, move and and rotate
      walk($character, characterVelocityX, characterVelocityY, characterWalkFrame);
      // When the character goes out the body, make it wrap
      handleWrapping($character);
      // Make the character collect the paper rolls
      characterCollect($character);
    }, walkingSpeed);
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
    wrappingCharacter.offset({
      left: bodyWidth
    });
  }
  // If the character's left position is greater than the body width...
  else if ($position.left > bodyWidth) {
    // Wrap it to the other side of the body by setting the left position to 0
    wrappingCharacter.offset({
      left: 0
    });
  }
  // If the character's top position is less than 0...
  if ($position.top < 0) {
    // Wrap it to the other side of the body by setting the top position to the body height
    wrappingCharacter.offset({
      top: bodyHeight
    });
  }
  // If the character's top position is greater than the body height...
  else if ($position.top > bodyHeight) {
    // Wrap it to the other side of the body by setting the top position to 0
    wrappingCharacter.offset({
      top: 0
    });
  }
}

// characterCollect()
//
// When the player is not dead, checks if the collecting character touches a paper roll.
// If so, displays the paper roll randomly in the page.
function characterCollect($collectingCharacter) {
  // If the player is not dead
  if (playerIsDead === false) {
    // When the character touches another character, store the other character object in an "array", in a variable
    let touchedPaperRoll = $($collectingCharacter).collision('.paperRollPerimeter');
    // If the "array" with the touched character contains more than 0 object...
    if (touchedPaperRoll.length > 0) {
      // Change the position and roatation angle of the touched paper roll to a random one
      displayElement($(touchedPaperRoll[0]));
    }
  }
}

// mousePlayerPosition()
//
// Checks the mouse and player positions and sets the player velocity and moving state
function mousePlayerPosition() {
  // Check the player position and store it in a variable (we can access playerPosition.left & playerPosition.top)
  playerPosition = $playerCharacter.offset();
  // Check the mouse position: when it moves, get the new position and store it in a variable
  $("body").mousemove(function(event) {
    mousePosition.left = event.pageX;
    mousePosition.top = event.pageY;
  });
  // Calculate the X & Y distance between the mouse and the center of the player
  let distanceX = mousePosition.left - playerPosition.left - $playerCharacter.width() / 2;
  let distanceY = mousePosition.top - playerPosition.top - $playerCharacter.height() / 2;
  // Use pythagorean theorem to calculate the distance between the mouse and the player
  let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
  // Set velocity X & Y according to the distance X & Y
  playerVelocityX = distanceX / 10;
  playerVelocityY = distanceY / 10;
  // If the distance between player and mouse is less or equal to 50px...
  if (distance <= 50) {
    // Set the player moving state to false
    playerMoving = false;
  } else {
    // Else, set the player moving state to true
    playerMoving = true;
  }
}

// movePlayer()
//
// Check if the player is moving and if so make the player walk, move and rotate
function movePlayer() {
  // If the player has to move/is moving...
  if (playerMoving === true) {
    // Add 1 to the current walk frame
    playerWalkFrame++;
    // If the current walk frame is greater or equal to the number of elements in the walk pattern...
    if (playerWalkFrame >= walkPattern.length) {
      // Set the current walk frame back to 0
      playerWalkFrame = 0;
    }
  }
  // Else, if the player is not moving...
  else {
    // Make the player standing by setting its walk frame to 1
    playerWalkFrame = 1;
    // Stop moving the player by setting its velocity to 0
    playerVelocityX = 0;
    playerVelocityY = 0;
  }
  // Make the player walk, move and rotate
  walk($playerCharacter, playerVelocityX, playerVelocityY, playerWalkFrame);
}

// Walk()
//
// Animes the character's sprite sheet, moves the character and rotates it.
// Function used for the player and the other characters
function walk($walkingCharacter, velocityX, velocityY, currentWalkFrame) {
  // Get the character position and store it un a variable
  let position = $walkingCharacter.offset();
  // Move the character by adding velocity to its top and left position
  $walkingCharacter.offset({
    top: position.top + velocityY,
    left: position.left + velocityX
  });
  // Animates the background image position according to the current walk frame
  $walkingCharacter.children().css('background-position', walkPattern[currentWalkFrame]);
  // Set the character rotation angle according ti the X & Y velocity (in radians)
  let rotationAngle = Math.atan(velocityY / velocityX) + Math.PI / 2; // Math.PI/2 radians === 90 degrees
  // If the x velocity is negative...
  if (velocityX < 0) {
    // Add pi randians to the rotation angle (180 degrees)
    rotationAngle += Math.PI;
  }
  // Rotate the character image according to the rotation angle
  $walkingCharacter.children().css({
    transform: 'rotate(' + rotationAngle + 'rad)'
  });
}

// checkPlayerCollision()
//
// Uses .collision() function (from jquery-collision extension) to check if the player touches a character, a paper roll, a sanitizer, glove, mask or overall.
// If the player touches a character, increase the level of contact with the virus. If he touches a paper roll, change the score, display it randomly and check if it's time to display a protection item. If he touches the sanitizer, remove it, display a new one and decrease the level of contact with virus. If he touches a protection equipment, change the "got" state and make the image of it in the box opaque
function checkPlayerCollision() {
  // When the player touches a character, store the character object in an "array", in a variable
  let touchedCharacter = $($playerCharacter).collision('.characterPerimeter'); // function from the library extension "jquery-collision"
  // When the player touches a paper roll, store the paper roll object in an "array", in a variable
  let touchedPaperRoll = $($playerCharacter).collision('.paperRollPerimeter');
  // When the player touches a hand sanitizer, store it in an "array", in a variable
  let touchedSanitizer = $($playerCharacter).collision('.sanitizerPerimeter');
  // When the player touches a glove, store it in an "array", in a variable
  let touchedGlove = $($playerCharacter).collision('.glovePerimeter');
  // When the player touches a mask, store it in an "array", in a variable
  let touchedMask = $($playerCharacter).collision('.maskPerimeter');
  // When the player touches an overall, store it in an "array", in a variable
  let touchedOverall = $($playerCharacter).collision('.overallPerimeter');

  // If the "array" with the touched character contains more than 0 object...
  if (touchedCharacter.length > 0) {
    if (playerProtected === false) {
      contactWithVirus += 10;
    }
  }

  // If the "array" with the touched toilet paper rolls contains more than 0 object...
  if (touchedPaperRoll.length > 0) {
    // Add 1 to the score
    score += 1;
    // And change its position and roatation angle to a random one
    displayElement($(touchedPaperRoll[0]));
    // Display the new score
    $('#score').html(score);
    // Display protection equipment according to the score
    displayProtection();
  }

  // If the "array" with the touched hand sanitizer contains more than 0 object...
  if (touchedSanitizer.length > 0) {
    // Remove the sanitizer
    $('.sanitizerPerimeter').remove();
    // After a delay of 8 seconds, display another sanitizer randomly in the body
    displaySanitizer();
    // Lower the level of contact with the virus
    contactWithVirus -= 20;
  }

  // If the "array" with the touched glove contains more than 0 object...
  if (touchedGlove.length > 0) {
    // Set the gotGlove state to true;
    gotGlove = true;
    // Remove the glove
    $('.glovePerimeter').remove();
    // Change the opacity of the glove image in the protection items box
    $('#protectionGlove').css("opacity", "1");
  }

  // If the "array" with the touched mask contains more than 0 object...
  if (touchedMask.length > 0) {
    // Set the gotMask state to true;
    gotMask = true;
    // Remove the mask
    $('.maskPerimeter').remove();
    // Change the opacity of the mask image in the protection items box
    $('#protectionMask').css("opacity", "1");
  }

  // If the "array" with the touched overall contains more than 0 object...
  if (touchedOverall.length > 0) {
    // Set the gotOverall state to true;
    gotOverall = true;
    // Remove the overall
    $('.overallPerimeter').remove();
    // Change the opacity of the overall image in the protection items box
    $('#protectionOverall').css("opacity", "1");
  }

  // If the player collected the glove, the mask and the overall...
  if (gotGlove === true && gotMask === true && gotOverall === true) {
    // Set the timer bar (green div) opacity to 0.8
    $('#timerBar').css("opacity", "0.8");
    // Write text in the timer bar to tell the player he has to press a key
    $('#timerBar').html("Press any key for immunity");
    $('.protectionCollected').css("opacity", "0.25");
  }
}

// checkProtection()
//
// Checks if the player collected the 3 protection items. If so, change the protection state to true, remove the the keypress event handler, change css of the box with the protection items, change the image of the player and decrease the height of the timer bar.
// After 10 seconds, set the "got" booleans to false, give the player his initial image and set the timer bar style back to what it was.
function checkProtection() {
  // If the player collected the glove, the mask and the overall...
  if (gotGlove === true && gotMask === true && gotOverall === true) {
    // Change the protection state to true
    playerProtected = true;
    // Remove the keypress event handler
    $(document).off("keypress");
    // Remove the text in the timer bar
    $('#timerBar').html("");
    // Set the opacity of the protection equipment collected back to 0.25
    $('.protectionCollected').css("opacity", "0.25");
    // Change the image of the player for an image of the player with protection
    $('#player').css("background", "url(assets/images/playerProtected.png)");
    // Each 100 milliseconds, reduce the height of the timer bar by 3 pixels and store the interval in a variable
    let playerProtectedInterval = setInterval(function() {
      $('#timerBar').css("height", "-=3");
    }, 100);

    // After a delay of 10 seconds (10000 milliseconds)...
    setTimeout(function() {
      // Set the following booleans to false to say the player didn't collect any protection equipment yet
      gotGlove = false;
      gotMask = false;
      gotOverall = false;
      // Set the protection state to false
      playerProtected = false;
      // Clear the interval that reduces the height of the timer bar
      clearInterval(playerProtectedInterval);
      // Change the player image to the regular one
      $('#player').css("background", "url(assets/images/player.png)");
      // Set the opacity of the timer bar back to 0
      $('#timerBar').css("opacity", "0");
      // Set the height of the timer bar back to 300 pixels
      $('#timerBar').css("height", "300px");
      // Add a keypress event handler that checks if the player is ready to get protection
      $(document).keypress(checkProtection);
    }, 10000);
  }
}

// playerDead()
//
// When the player is infected, clear the intervals that updates the progressbar, that checks the player collisions, that makes the player walk and that checks his distance with mouse.
// Remove the characters, paper rolls, sanitizer and protection equipment.
// Hide the player and his perimeter ellipses, change the dead state to true and display a dialog box
function playerDead() {
  // Stop the interval that updates the progressbar
  clearInterval(progressbarInterval);
  // Stop the interval that checks if the player touched something
  clearInterval(collisionInterval);
  // Stop the interval that moves the player
  clearInterval(playerWalkInterval);
  // Stop the interval that checks the distance between mouse and player
  clearInterval(mousePlayerInterval);
  // Remove all the characters, paper rolls the protection equipment and the sanitizer
  $('.characterPerimeter').remove();
  $('.paperRollPerimeter').remove();
  $('.protection').remove();
  $('.sanitizerPerimeter').remove();
  // Remove the keypress event handler
  $(document).off("keypress");
  // Hide the player and its perimeter ellipses
  $('#playerPerimeter').hide();
  $('#perimeter').hide();
  // Change the death state to true
  playerIsDead = true;
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
    // Create a button with the home icon and specified text on it
    buttons: [{
      icon: "ui-icon-home",
      text: "Go home",
      // When we click the button, run the atLeastDialog() function
      click: atLeastDialog
    }],
  });
}

// atLeastDialog()
//
// Runs when the "Go home" button is clicked.
// Removes the sanitizerm hides the progressbar, the score and the box with collected protection and changes the background image of the body.
// Create an image tag for the pile of poo and append it to the dialog box.
// Changes text and some options of the gameover dialog and displays the new dialog telling the player how many paper rolls he collected.
// After 2 seconds, displays a thousand paper rolls randomly in the body
function atLeastDialog() {
  // Remove the sanitizer
  $('.sanitizerPerimeter').remove();
  // Hide the progressbar, score and the box with the items to collect for protection
  $('#progressbar').hide();
  $('#scoreBox').hide();
  $('#collectedProtection').hide();
  // Change the background image of the body to an image of the player at home
  $('body').css('background-image', 'url(assets/images/playerHome.png)');
  // Change the text in the div with the id "gameoverDialog"
  $('#gameoverDialog').html("What a shitty situation! At least you collected " + score + " rolls of toilet paper!");
  // Set the variable to an image tag with the path of the pile of poo image
  $pooImage = $('<img src="assets/images/pileOfPoo.png">');
  // Add the image to the div with the id "gameoverDialog"
  $pooImage.appendTo($('#gameoverDialog'));
  // Display the dialog box with the new options
  $('#gameoverDialog').dialog({
    modal: false, // Don't blur the background
    position: {
      my: "right center",
      at: "right center",
      of: "body"
    }, // Set position
    height: 600, // Set dimensions
    width: 500,
    buttons: [{
      id: "newGameButton", // Add an id that's set to hide the button
      text: "New game",
      // When we click the button...
      click: function() {
        // Destroy this dialog
        $('#gameoverDialog').dialog("destroy");
        // And run the startGame() function
        startGame();
      }
    }],
  });
  // After a delay of 2 seconds (2000 milliseconds)...
  setTimeout(function() {
    // Execute the following steps a thousand times
    for (let i = 0; i < finalPaperRolls; i++) {
      // After a delay related to the number of times we ran the loop...
      setTimeout(function() {
        // Create a new div for the paper roll and store it in a variable
        let $paperRollPerimeter = $("<div></div>");
        // Create a new div for the paper roll image and store it in a variable
        let $paperRollImg = $("<div></div>");
        // Add the class "paperRollPerimeter" to the div that contains the paper roll
        $paperRollPerimeter.addClass("paperRollPerimeter");
        // Add the class "paperRoll" to the div with the paper roll image and append it to the div that contains the paper roll (had issues to get accurate distance with rotated div, so $paperRollImg rotates and $paperRollPerimeter is used to check collision)
        $paperRollImg.addClass("paperRoll").appendTo($paperRollPerimeter);
        // Set a random position and rotation angle for the div that contains the paper roll and display it in the body
        displayElement($paperRollPerimeter);
        // If we are displaying the last paper roll of the loop...
        if (i === finalPaperRolls - 1) {
          // Show the "new game" button by changing its display mode with css
          $('#newGameButton').css('display', 'block');
        }
      }, i); // Used "i" for the delay so the paper rolls are displayed one after the other
    }
  }, 2000);
}
