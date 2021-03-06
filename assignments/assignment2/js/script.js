"use strict";

/*****************

Raving Redactionist
Audrey Coulombbe

You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/

// The chance a span will be revealed per update
const REVEAL_POSSIBILITY = 0.1;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;
// A place to store the jQuery selection of all spans
let $spans;
// The number of secrets found
let secretsFound = 0;
// The total number of secrets
let secretsTotal;

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
// Counts the number of secrets on page and displays it
// Checks if the mouse goes over a secret
function setup() {
  // Save the selection of all spans (since we do stuff to them multiple times)
  $spans = $('span');
  // Set a click handler on the spans (so we know when they're clicked)
  $spans.on('click', spanClicked);
  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(update, UPDATE_FREQUENCY);
  // Track the number of secrets
  secretsTotal = $('.secret').length;
  // Write the number of secrets on screen
  $('#totalSecrets').text(secretsTotal);
  // When the mouse goes over a secret, execute the revealSecret function
  $('.secret').on('mouseover', revealSecret);
}

// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $spans.each(updateSpan);
}

// updateSpan()
//
// With random chance it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  let r = Math.random();
  if (r < REVEAL_POSSIBILITY) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}

// revealSecret()
//
// Add the found class to the secrets
// Tracks the number of secrets found and write it on screen
function revealSecret() {
  // Add the class found to the secrets
  $(this).addClass('found');
  // Remove the mouseover event once the secret is found
  $('.found').off('mouseover');
  // Increase by one the number of secrets found
  secretsFound += 1;
  // Write the number of secrets found on screen
  $('#foundSecrets').text(secretsFound);
}
