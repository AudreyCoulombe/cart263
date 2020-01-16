"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
window.onload = setup;
function setup() {
  console.log("setting up");
  for(let i = 0; i<1000; i++){
    //crete a div
    let pixel = document.createElement('div');
    //give a class to the div
    pixel.setAttribute('class','pixel');
    //add an event listener to each pixel
    pixel.addEventListener('mouseover',paint);
    // add the new element to the page's body
    document.body.appendChild(pixel);

  }
}

function paint(e){
  //create a new variable and store e.target in it
  let pixel= e.target;
  //set the pixel color to white
  pixel.style.backgroundColor = 'white';
  //After 1000 miliseconds, reset pixel
  setTimeout(resetPixel,1000, pixel);//last pixel called attribute the actual pixel to the parameter inside reset pixel function
}

function resetPixel(pixel){
  pixel.style.backgroundColor = 'green';
}
