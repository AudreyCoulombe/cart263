"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let player = {
  x: 0,
  y: 0,
  size: 30,
  maxSize: 30,
  dead: false
}

let food = {
  x: 0,
  y: 0,
  size: 20
}

// preload()
//
// Description of preload
function preload() {
}

// setup()
//
// Description of setup

function setup() {
  createCanvas(800,800);
  background(0);
  food.x = random(0,width);
  food.y = random(0,height);
  noCursor();
}


// draw()
//
// Description of draw()

function draw() {
  background(0);
  updatePlayer();
}

function updatePlayer() {
  player.x = mouseX;
  player.y = mouseY;
  player.size -= 5;
  player.size = constrain(player.size,-1,player.maxSize);
  if(player.size<=0){
    player.dead = true;

  }
}
