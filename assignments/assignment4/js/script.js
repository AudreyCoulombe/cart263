/*

Condiments
Audrey Coulombe

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

*/

// When the page is ready, load the data
$(document).ready(function() {
  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/data.json')
    // When the data is done loading, execute the function gotData()
    .done(gotData)
    // If there is an error loading the data, execute the function dataError()
    .fail(dataError);
});

// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {
  // Now we select random elements from the arrays inside our JSON to get a random condiment, color, cat, room and board game. Then we add those words into the paragraph with the id "sentence" by setting the text of the appropriate span.

  // First the condiment
  // Get a random condiment from the condiments array in the JSON
  let condiment = getRandomElement(data.condiments);
  // Assume it's singular
  let verb = 'is';
  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }

  // Same for the color
  let colorData = getRandomElement(data.colors);
  // Get the color name inside the color object
  let colorName = colorData.color;
  // Assume the indefinite article before the color is a
  let indefiniteArticleColor = "a";
  // A variable that contains the first letter of the color
  let colorFirstLetter = colorName.charAt(0);
  // If the first letter of the color is a voyel...
  if (colorFirstLetter === 'A' || colorFirstLetter === 'E' || colorFirstLetter === 'I' || colorFirstLetter === 'O' || colorFirstLetter === 'U' || colorFirstLetter === 'Y') {
    // Change the indefinite article to "an"
    indefiniteArticleColor = "an";
  }

  // Now the cat
  let cat = getRandomElement(data.cats);

  // Same again for room
  let room = getRandomElement(data.rooms);
  // Assume the indefinite article before the room is a
  let indefiniteArticleRoom = "a";
  // A variable that contains the first letter of the room
  let roomFirstLetter = room.charAt(0);
  // If the first letter of the room is a voyel...
  if (roomFirstLetter === 'a' || roomFirstLetter === 'e' || roomFirstLetter === 'i' || roomFirstLetter === 'o' || roomFirstLetter === 'u' || roomFirstLetter === 'y') {
    // Change the indefinite article to "an"
    indefiniteArticleRoom = "an";
  }

  // Get a random element in the games data
  let boardGame = getRandomElement(data.games);

  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  let description = `${condiment} ${verb} like ${indefiniteArticleColor} ${colorName} ${cat} in ${indefiniteArticleRoom} ${room} playing ${boardGame}.`;

  // Finally, we add it to the paragraph with the id "sentence" and hey presto!
  $("#sentence").html(description);

  // When we click on the body, execute the function gotData()
  $('body').on('click', function() {
    // (I put the function in an anonymous function to be able to call the argument)
    gotData(data);
  });
}

// dataError()
//
// Called if the JSON does not load for some reason.
// Reports the error to the console.
function dataError(request, text, error) {
  console.error(error);
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
