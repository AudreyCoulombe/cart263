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

// Background image variable
let backgroundImage;
// Heads images
let headDora;
let headElmo;
let headMomo;
let headPeppaPig;
let headPo;
// Body images
let bodyDora;
let bodyElmo;
let bodyMinion;
let bodyPeppaPig;
let bodyWarrior;
// Legs images
let legDora;
let legElmo;
let legMickey;
let legPeggaPig;
let legSexy;

// Array with all the body body parts
let bodyParts = [];
// Position of the body parts
let bodyPartsX = 0;
let bodyPartsY = 150;
// Width and height of the body parts
let bodyPartsWidth = 440;
let bodyPartsHeight = 375;

// preload()
//
// Preloads images and put the body parts in an array
function preload() {
  // Load the background image
  backgroundImage = loadImage("assets/images/backgroundLandscape.png");
  // Load all the legs images and push them in the array with the body parts
  legDora = loadImage("assets/images/legDora.png");
  bodyParts.push(legDora);
  legElmo = loadImage("assets/images/legElmo.png");
  bodyParts.push(legElmo);
  legMickey = loadImage("assets/images/legMickey.png");
  bodyParts.push(legMickey);
  legPeggaPig = loadImage("assets/images/legPeggaPig.png");
  bodyParts.push(legPeggaPig);
  legSexy = loadImage("assets/images/legSexy.png");
  bodyParts.push(legSexy);
  // Load all the body images and push them in the array with the body parts
  bodyDora = loadImage("assets/images/bodyDora.png");
  bodyParts.push(bodyDora);
  bodyElmo = loadImage("assets/images/bodyElmo.png");
  bodyParts.push(bodyElmo);
  bodyMinion = loadImage("assets/images/bodyMinion.png");
  bodyParts.push(bodyMinion);
  bodyPeppaPig = loadImage("assets/images/bodyPeppaPig.png");
  bodyParts.push(bodyPeppaPig);
  bodyWarrior = loadImage("assets/images/bodyWarrior.png");
  bodyParts.push(bodyWarrior);
  // Load all the head images and push them in the array with the body parts
  headDora = loadImage("assets/images/headDora.png");
  bodyParts.push(headDora);
  headElmo = loadImage("assets/images/headElmo.png");
  bodyParts.push(headElmo);
  headMomo = loadImage("assets/images/headMomo.png");
  bodyParts.push(headMomo);
  headPeppaPig = loadImage("assets/images/headPeppaPig.png");
  bodyParts.push(headPeppaPig);
  headPo = loadImage("assets/images/headPo.png");
  bodyParts.push(headPo);
}

// setup()
//
// Creates Canvas and displays title page
function setup() {
  // Creates the canvas
  createCanvas(1400, 750);
  // Displays background image as title image
  image(backgroundImage, 0, 0, width, height);
  // And displays text over it
  text("Title page", width/2, height/2);
}

// draw()
//
// Description of draw()
function draw() {

}

//  mousePressed()
//
// When the mouse is pressed, checks if we are at the state TITLE.
// If so, displays the "game" arrangement
function mousePressed() {
  // If the state is "TITLE"...
  if (state === "TITLE") {
    // Display the background image
    image(backgroundImage, 0, 0, width, height);
    // And the buttons
    displayButtons();
    // And change the state to "GAME"
    state = "GAME";
  }
}

// displayButtons()
//
// Changes the css of the buttons so we can see it
function displayButtons() {
  // Stocking the 3 buttons in 3 variables
  let headsButton = document.getElementById("heads");
  let bodiesButton = document.getElementById("bodies");
  let legsButton = document.getElementById("legs");
  // And change their display mode in css to "block"
  headsButton.style.display = "block";
  bodiesButton.style.display = "block";
  legsButton.style.display = "block";
}

// spinLegsAndStop()
//
// Checks is the legs are already spinning or not
// Spins it when not spinning and vice versa
function spinLegsAndStop() {
  // If the the legs are not spinning
  if(legsSpinning === false){
    // Set an interval and store it in a variable
    spinningLegsInterval = setInterval(function(){
      // Display the next images by the top left corner
      imageMode(CORNER);
      // Display the background image over the previous one
      image(backgroundImage, 0, 0, width, height);
      imageMode(CENTER);
      image(bodyParts[Math.floor(Math.random()*5)], width/2, height/2, bodyPartsWidth, bodyPartsHeight);
    }, 100);
    legsSpinning = true;
  }
  else if (legsSpinning===true){
    clearInterval(spinningLegsInterval);
    legsSpinning = false;
  }
}
