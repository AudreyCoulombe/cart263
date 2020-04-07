// Character
//
// A class that displays and moves the different characters

class Character {

  // constructor()
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(left, top) {
    // Position
    this.left = left;
    this.top = top;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
  }
  displayCharacter() {
      let $characterDiv = $("<div></div>");
      $characterDiv.addClass("character");
      // !!!! $characterDiv.css('background-image', 'url(../assets/images/characters-0'+i+'.png)');
      let characterPosition = $characterDiv.offset();
      characterPosition.left = Math.random() * $('body').width();
      characterPosition.top = Math.random() * $('body').height();
      $characterDiv.offset({ top: characterPosition.top, left: characterPosition.left });
      $characterDiv.appendTo($('body'));
      characters.push($characterDiv);
    // characters.each(moveCharacter);
    console.log(characters);
  }

  // $( "div" ).addClass(function( index, currentClass ) {
  //   var addedClass;
  //   if ( currentClass === "red" ) {
  //     addedClass = "green";
  //     $( "p" ).text( "There is one green div" );
  //   }
  //   return addedClass;
  // });

  moveCharacter() {
    $(".character").each(function() {
      let maxVelocity = 30;
      let minVelocity = -30;
      let characterVelocityX;
      let characterVelocityY;
      let $character = $(this);
      setInterval(function() {
        characterVelocityX = Math.random() * (maxVelocity - minVelocity) + minVelocity;
        characterVelocityY = Math.random() * (maxVelocity - minVelocity) + minVelocity;
      }, 2000);
      setInterval(function() {
        let characterPosition = $character.offset();
        $character.offset({ top: characterPosition.top + characterVelocityY, left: characterPosition.left + characterVelocityX });
        // $('#character').css({transform: 'rotate('+playerRotation+'rad)'});
      },walkingSpeed);
    });
  }
}
