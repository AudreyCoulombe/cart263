"use strict";

/********************************************************************

Trash Game
Audrey Coulombe

A game where you have to sort garbage, recycle and compost elements by dragging them in the rigth bin, but it keeps going back to the initial container with garbage, recycle and compost all mixed up.

* I looked at this example to understand how to use ui.helper.data: https://stackoverflow.com/questions/8092771/jquery-drag-and-drop-checking-for-a-drop-outside-a-droppable

*********************************************************************/
// JQuery variable:
let $objectsToSort;

//java scricpt variable:
let garbageCount = 0;
let recycleCount = 0;
let compostCount = 0;

// Sound variables:
let droppingSound = new Audio("assets/sounds/drop.wav");
let errorSound = new Audio("assets/sounds/errorAlert.wav");
let gameMusic = new Audio("assets/sounds/gameMusic.mp3");

// Run setup when the page is ready
$(document).ready(setup);

// setup()
//
// Displays a dialog box, calls the positionObjects function, makes the objects to sort draggable and the 3 sections of the bin droppable.
function setup() {
  // Open a dialog box before the game starts
  $('.startBox').dialog({
    modal: true, // Blur the background
    resizable: false, // Disable resizable option
    draggable: false, // Disable draggable option
    dialogClass: "dialogStyle", // Add a class
    height: 400, // Set dimensions
    width: 600,
    autoOpen: true, // Open the dialog box automatically
    buttons: [{
      text: "Click here to start",
      // When we click the button...
      click: function() {
        // Destroy the dialog box,
        $(this).dialog("destroy");
        // Replace the text in the div with no text
        $('.startBox').text("");
        // And start playing the music in loop
        gameMusic.play();
        gameMusic.loop = true;
      }
    }],
  });

  // Put all objects with the "objectsToSort" class in a variable
  $objectsToSort = $('.objectsToSort');
  // For each object in the "array", execute the positionObjects function
  $objectsToSort.each(positionObjects);
  // Make the objects to sort draggable
  $objectsToSort.draggable({
    // When you begin to drag, set dropped to false*
    start: function(event, ui) {
      ui.helper.data('dropped', false);
    },
    // When you stop dragging...
    stop: function(event, ui) {
      // If the object is not dropped on a droppable*...
      if (ui.helper.data('dropped') === false) {
        // Play the error sound
        errorSound.play();
        // And shake the object
        $(this).effect("shake");
      }
    },
    // Revert the object when it is dropped outside a droppable
    revert: "invalid",
    revertDuration: 200
  });

  // Make the div with the class garbage droppable
  $('.garbage').droppable({
    // Accept only if the dropped object has a garbage id
    accept: "#garbage",
    // When dropped, execute the onDrop function
    drop: onDrop
  });

  // Make the div with the class recycle droppable
  $('.recycle').droppable({
    // Accept only if the dropped object has a recycle id
    accept: "#recycle",
    // When dropped, execute the onDrop function
    drop: onDrop
  });

  // Make the div with the class compost droppable
  $('.compost').droppable({
    // Accept only if the dropped object has a compost id
    accept: "#compost",
    // When dropped, execute the onDrop function
    drop: onDrop
  });
}

// positionObjects()
//
// Positions and rotates the objects randomly in the objects container
function positionObjects(index, value) {
  // Create a random number for the height position
  let objectsHeightPosition = Math.random() * 150 + 10;
  // Add the height position to the css of the object
  $(this).css('bottom', objectsHeightPosition + 'px');
  // Create a random number for the width position
  let objectsWidthPosition = Math.random() * 210 + 10;
  // Add the width position to the css of the object
  $(this).css('left', objectsWidthPosition + 'px');
  // Rotate the object with a random angle (so it looks more like real garbage)
  let rotationAngle = Math.random() * 360;
  // Add the rotation value to the css of the object
  $(this).css({
    'transform': 'rotate(' + rotationAngle + 'deg)'
  });
}

// onDrop()
//
// When dropped, play the a sound and animate the object
function onDrop(event, ui) {
  // Set dropped to true
  ui.helper.data('dropped', true);
  // Play the dropping sound
  droppingSound.play();
  // If the draggable object has a garbage id...
  if ($(ui.draggable[0]).attr("id") === 'garbage') {
    // Add 1 to the garbage count
    garbageCount += 1;
    // Display the garbage count as text
    $('#garbageCount').text(garbageCount);
    // Animate the object in four sequences so it goes back in the container and reduces opacity while moving
    ui.draggable
      .animate({
        opacity: [0.25, "linear"],
        top: ["+=50", "swing"],
      }, 1000)
      .animate({
        left: ["+=110", "swing"],
        top: ["+=50", "swing"],
      }, 1000)
      .animate({
        top: ["+=250", "swing"],
      }, 1000)
      .animate({
        opacity: [1.0, "linear"],
      }, 1000);
  }
  // If the draggable object has a recycle id...
  else if ($(ui.draggable[0]).attr("id") === 'recycle') {
    // Add 1 to the recycle count
    recycleCount += 1;
    // Display the recycle count as text
    $('#recycleCount').text(recycleCount);
    // Animate the object in three sequences so it goes back in the container and reduces opacity while moving
    ui.draggable
      .animate({
        opacity: [0.25, "linear"],
        top: ["+=50", "swing"],
      }, 1000)
      .animate({
        top: ["+=300", "swing"],
      }, 1000)
      .animate({
        opacity: [1.0, "linear"]
      }, 1000);
  }
  // if the draggable object has a compost id...
  else {
    // Add 1 to the compost count
    compostCount += 1;
    // Display the compost count as text
    $('#compostCount').text(compostCount);
    // Animate the object in four sequences so it goes back in the container and reduces opacity while moving
    ui.draggable
      .animate({
        opacity: [0.25, "linear"],
        top: ["+=50", "swing"],
      }, 1000)
      .animate({
        left: ["-=110", "swing"],
        top: ["+=50", "swing"],
      }, 1000)
      .animate({
        top: ["+=250", "swing"],
      }, 1000)
      .animate({
        opacity: [1.0, "linear"]
      }, 1000);
  }
}
