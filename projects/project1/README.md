Artist’s Statement

With the environmental crisis going on, people get more and more concerned with their impact on nature. It is more and more common to sort your garbage, recycle and compost. In response to that and to avoid being critiqued, many companies and governmental institutions have acquired counters with holes in it made to sort your trash. But those can sometimes be misleading. Indeed, in some cases, if you open the doors under the counter, you will find out that all the sorted items go in the same big bin. I think it is a shame that the efforts people make with nothing but good intentions to sort their trash end up being worthless. The Trash Game is a critic of this particular type of green washing.

Those useless attempts is the part that made me think of the story of Sisyphus at first. To amplify the frustrating feeling of playing a Sisyphean game, I decided to make the player pick elements directly from the bin where sorted items then go, making a never-ending game where you go back to the starting point every move you make. I also ironically added a score for each section so the player knows how many useless efforts she/he made.

I decided to draw a restaurant ambiance in the background image because it is in those places that I’ve most seen that kind of situation. I also drew on the right side a door through which you can see a full garbage container next to a non-used recycle bin.

For the music, I chose a remix of Gruntilda's Lair music from the Banjo-Kazooie series I found on the Game and Sound YouTube channel (link: https://www.youtube.com/watch?v=qCRTl37ECvQ). I made this choice because I liked the fact that the rhythm is quite nonchalant, but still makes you feel as if you progress in the quest. Indeed, the nonchalant aspect goes well with the game since there is nothing else going on except the player sorting trash for nothing. On the other hand, the feeling of progress brought by the music contrasts in an interesting way with the fact that the player always goes back to the starting point.

To allow the music to play in every browser, I decided to explore JQuery-UI’s dialog function that forces the player to interact before the music starts to play. Also, to make the trash elements look more like real messy garbage, I made a function that positions and rotates each trash element randomly in the trash container. Obviously, I made these elements draggable to allow the player to drag it in the right section and made the garbage, recycle and compost sections droppable. When the right element is dragged and dropped in the corresponding section, it animates to give the illusion it slides back to the container. Else, it reverts to its previous position, shakes and plays an error sound. While sliding down, the opacity of the dropped element reduces to show it is inside the bin and not over it. I tried hiding it when it is dropped in the bin and showing it back when it exits the slide, but I found the result less appealing than just reducing its opacity.

Finally, I called it the Trash Game as a wink to the actual theme of the game, but also because I liked the negative connotation of the word “trash”, which I think goes very well with the situation I want to denounce.