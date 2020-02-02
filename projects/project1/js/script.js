"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let $objectsToSort;
// let chewingSound = new Audio("assets/sounds/crunch.wav");
// let buzzSound = new Audio("assets/sounds/buzz.mp3");
$(document).ready(setup);

function setup() {
  $objectsToSort = $('.objectsToSort');

  // $objectsToSort.each(positionObjects);

  $('.objectsToSort').draggable({
    start: function() {
      // buzzSound.play();
    },
    stop: function() {
      // buzzSound.pause();
    }
  });
  $('#bin').droppable({
    drop: onDrop
  });
  // buzzSound.loop = true;
}

function positionObjects() {
  // let objectsHeightPosition = Math.random()*200;
  // $(this).css('top', 'objectsPosition');
  // let objectsWidthPosition = Math.random()*300;
  // $(this).css('left', 'objectsPosition');
}

function onDrop(event, ui) {
  console.log("dropped");
  // // $fly.remove(); // or:
  ui.draggable.remove();
  // // $animal.attr('src', 'assets/images/chewing.gif'); // or:
  // $(this).attr('src', 'assets/images/chewing.gif');
}
