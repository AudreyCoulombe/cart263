"use strict";

/********************************************************************

Assignment 1: Pixel Painter Pro
Audrey Coulombe

Dispays black pixels over the screen and changes their color when the mouse goes over. The colored pixels turn white after a delay. When the right or left arrow is pressed, rotates all the pixels.

*********************************************************************/

// Loads the setup function (once? clearly not...) when we open the window in the browser
window.onload = setup;
// Global variable
let rotation = 0;

// setup()
//
// Displays pixels over the screen, and checks mouse and keys input for paint and rotate functions
function setup() {
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
  // When a certain key is down, execute the rotate fuction
  document.addEventListener('keydown', rotate);
}

// paint(e)
//
// Paints the pixels with random colors and resets it after a certain time
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
// Change the pixel color
function resetPixel(pixel) {
  // Change the pixel color to grey
  pixel.style.backgroundColor = 'grey';
}

// rotate()
//
// Depending on which key is pressed, rotates all the pixels
function rotate(e) {
  // Put all the elements that has the class "pixel" in a variable
  let pixels = document.getElementsByClassName('pixel');
  // If the left arrow is pressed...
  if (e.keyCode === 37) {
    // Decrease the rotation by 1 degree
    rotation -= 1;
  }
  // If the right arrow is pressed...
  else if (e.keyCode === 39) {
    // Increase the rotation by 1 degree
    rotation += 1;
  }
  // Track the rotation value (in degrees) on console
  console.log("rotation:" + rotation);
  // For each element stored in the "pixels" variable...
  for (let i = 0; i < pixels.length; i++) {
    // Rotate it according to the "rotation" value
    pixels[i].style.transform = `rotate(${rotation}deg)`;
  }
}
