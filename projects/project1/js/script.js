"use strict";

/********************************************************************

Garbage Game
Audrey Coulombe

A game where you have to sort garbage, recycle and compost elements by dragging them in the rigth bin, but it keeps going back to the initial container with garbage, recycle and compost all mixed up.

*********************************************************************/
// JQuery variable:
let $objectsToSort;

//java scricpt variable:
let garbageCount=0;
let recycleCount=0;
let compostCount=0;

// Sound variables:
// let chewingSound = new Audio("assets/sounds/crunch.wav");
// let buzzSound = new Audio("assets/sounds/buzz.mp3");

// Runs setup only once the page Document Object Model is ready
$(document).ready(setup);

// setup()
//
function setup() {
  // Put all objects with the specific class in a variable
  $objectsToSort = $('.objectsToSort');
  // For each object in the "array", execute the positionObjects function
  $objectsToSort.each(positionObjects);
  // Make the objects to sort draggable
  $objectsToSort.draggable({
    // When you begin to drag, play a sound
    start: function() {
      // buzzSound.play();
    },
    // When you stop dragging, play another sound
    stop: function() {
      // buzzSound.pause();
    }
  });
  // Make the objects with the class garbage droppable
  $('.garbage').droppable({
    // Accept only if the object has a garbage id
    accept: "#garbage",
    // out: function(event,ui) {
    // $(this).effect( "shake");
    // },
    // accept: "#garbage", function( event, ui ) {
    //   if ($(this).attr("id") === 'garbage') {
    //     $('#garbage').effect( "shake");
    //     return true;
    //     console.log("match");
    //   }
    //   else {
    //     $('#garbage').effect( "shake");
    //     return false
    //     $(this).effect( "shake");
    //     console.log("no match");
    //   }
      // if ($(this).attr("id") === 'garbage') {
      //   return false;
      // }
      // else {
      //   $(this).effect( "shake");
      // }
    // },
    // When dropped, execute the onDrop function
    drop: onDrop
  });
  // Make the objects with the class recycle droppable
  $('.recycle').droppable({
    // Accept only if the object has a recycle id
    accept: "#recycle",
    // When dropped, execute the onDrop function
    drop: onDrop
  });
  // Make the objects with the class compost droppable
  $('.compost').droppable({
    // Accept only if the object has a compost id
    accept: "#compost",
    // When dropped, execute the onDrop function
    drop: onDrop
  });
  // Play a sound in loop
  // buzzSound.loop = true;
}

// positionObjects()
// Positions the objects randomly in the objects container
function positionObjects(index, value) {
  // Create a random number for the height position
  let objectsHeightPosition = Math.random() * 150;
  // Add the height position to the css of the object
  $(this).css('bottom', objectsHeightPosition + 'px');
  // Create a random number for the width position
  let objectsWidthPosition = Math.random() * 220;
  // Add the width position to the css of the object
  $(this).css('left', objectsWidthPosition + 'px');
  // console.log("height position: " + objectsHeightPosition);
  // console.log("width position: " + objectsWidthPosition);
}

// onDrop()
// Animates the object when dropped
function onDrop(event, ui) {
  console.log(ui.draggable[0]);
  // if the draggable object has a garbage id...
  if ($(ui.draggable[0]).attr("id") === 'garbage') {
    console.log("garbage dropped");
    // Add 1 to the garbage count
    garbageCount += 1;
    // Display the garbage count as text
    $('#garbageCount').text(garbageCount);
    // Animate the object in four sequences so it goes back in the container and reduces opacity while moving
    ui.draggable
      .animate({
        opacity: [ 0.25, "linear" ],
        top: ["+=70", "swing"],
      }, 1000)
      .animate({
        left: ["+=90", "swing"],
        top: ["+=70", "swing"],
      }, 1000)
      .animate({
        top: ["+=200", "swing"],
      }, 1000)
      .animate({
        opacity: [ 1.0, "linear" ]
        //height: "toggle"
      }, 1000, function() {
        // Animation complete.
      });
  }
  // if the draggable object has a recycle id...
  else if ($(ui.draggable[0]).attr("id") === 'recycle') {
    console.log("recycle dropped");
    // Add 1 to the recycle count
    recycleCount += 1;
    // Display the recycle count as text
    $('#recycleCount').text(recycleCount);
    // Animate the object in three sequences so it goes back in the container and reduces opacity while moving
    ui.draggable
      .animate({
        opacity: [ 0.25, "linear" ],
        top: ["+=70", "swing"],
      }, 1000)
      .animate({
        top: ["+=200", "swing"],
      }, 1000)
      .animate({
        opacity: [ 1.0, "linear" ]
      }, 1000, function() {
        // Animation complete.
      });
  }
  // if the draggable object has a compost id...
  else {
    console.log("compost dropped");
    // Add 1 to the compost count
    compostCount += 1;
    // Display the compost count as text
    $('#compostCount').text(compostCount);
    // Animate the object in four sequences so it goes back in the container and reduces opacity while moving
    ui.draggable
      .animate({
        opacity: [ 0.25, "linear" ],
        top: ["+=70", "swing"],
      }, 1000)
      .animate({
        left: ["-=90", "swing"],
        top: ["+=70", "swing"],
      }, 1000)
      .animate({
        top: ["+=200", "swing"],
      }, 1000)
      .animate({
        opacity: [ 1.0, "linear" ]
      }, 1000, function() {
        // Animation complete.
      });
  }
}