"use strict";

/********************************************************************

Trash Game
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
let droppingSound = new Audio("assets/sounds/drop.wav");
let gameMusic = new Audio("assets/sounds/gameMusic.mp3");

// Runs setup only once the page Document Object Model is ready
$(document).ready(setup);

// setup()
//
//
function setup() {
  // Open a dialog box before the starts
  $( '.startBox' ).dialog({
    modal: true,
    resizable: false,
    draggable: false,
    dialogClass: "dialogStyle",
    height: 400,
    width: 600,
    autoOpen: true,
    buttons: [{
      text: "Click here to start",
      click: function() {
        $( this ).dialog( "destroy" );
        $('.startBox').text("");
        playMusic();
      }
    }],
  });

  // Put all objects with the specific class in a variable
  $objectsToSort = $('.objectsToSort');

  // For each object in the "array", execute the positionObjects function
  $objectsToSort.each(positionObjects);

  // Make the objects to sort draggable
  $objectsToSort.draggable({
    revert: "invalid",
    // When you begin to drag, play a sound
    start: function() {
      // buzzSound.play();
    },
    // When you stop dragging, play another sound
    stop: function() {
      droppingSound.play();
      // droppingSound.pause();
    }
  });

  // Make the objects with the class garbage droppable
  $('.garbage').droppable({
    // Accept only if the object has a garbage id
    accept: "#garbage",
    // accept: function (ui,event) {
    //     if ($(ui.droppable[0]).attr("id") === 'garbage') {
    //       return true;
    //     }
    //     else {
    //       return false;
    //       $(ui.droppable[0]).effect( "shake");
    //     }
    //   },
    // When dropped, execute the onDrop function
    drop: onDrop,
  });
  console.log($('.garbage').droppable( "option" ));

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
}

// positionObjects()
//
// Positions the objects randomly in the objects container
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
  $(this).css({'transform' : 'rotate(' + rotationAngle + 'deg)'});
}

// onDrop()
//
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
        left: ["+=110", "swing"],
        top: ["+=50", "swing"],
      }, 1000)
      .animate({
        top: ["+=250", "swing"],
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
        top: ["+=300", "swing"],
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
        left: ["-=110", "swing"],
        top: ["+=50", "swing"],
      }, 1000)
      .animate({
        top: ["+=250", "swing"],
      }, 1000)
      .animate({
        opacity: [ 1.0, "linear" ]
      }, 1000, function() {
        // Animation complete.
      });
  }
}
// playMusic()
//

function playMusic(){
  // Play a sound in loop
  gameMusic.play();
  gameMusic.loop = true;
}
