"use strict";

/********************************************************************

Assignment 1: Pixel Painter Pro
Audrey Coulombe

Description here

*********************************************************************/
// Loads the setup function once when we open the window in the browser
window.onload = setup;

// setup()
//
function setup() {

  console.log("setting up");

  // Displays 1000 "pixels" (divs)
  // Checks for each pixel if the mouse is over and executes the paint function if so
  for (let i = 0; i < 1000; i++) {
    // Create a div
    let pixel = document.createElement('div');
    // Give a class to the div
    pixel.setAttribute('class', 'pixel');
    // When the mouse is over the pixel, execute the paint function
    pixel.addEventListener('mouseover', paint); // Question: Doesn't the setup run only once when we load the page (because of window.onload)? Why does the program keeps checking if the mouse is over??
    // Add the pixel to the page's body
    document.body.appendChild(pixel);
  }
}

  setTimeout(resetPixel,1000, pixel);//last pixel called attribute the actual pixel to the parameter inside reset pixel function
//
function paint(e) {
  // Create a new variable and store event parameter (e) in it
  let pixel = e.target;
  // Set the pixel rgb colors to random
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  // Change the pixel color to rgb with random values
  pixel.style.backgroundColor = `rgb(${r},${g},${b})`;
  // After 1000 miliseconds, reset pixel
  setTimeout(resetPixel, 1000, pixel);
}

// resetPixel()
//
function resetPixel(pixel) {
  // Change the pixel color to white
  pixel.style.backgroundColor = 'white';
}
