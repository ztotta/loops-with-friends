Current issues:
	 
To do:
- add instructions (homepage, hellopage, aboutpage)
- fix navbar & footer responsiveness
- steps getting stuck .pressed
- .catch errors on all $http requests

Bugs:
- users can invite themselves and it just repeats the station on their list
	- when one is deleted, all the repeats disappear, as well
	  - also deletes it for the other user!!
- rethink updating on every click?
	- makes it glitchy when changes are made mid-loop
  - glitchy playback...clipping & volume jumps
- if user leaves page without stopping loop, it keeps going...

Icebox:
- play instrument live with keyboard, or start/stop instruments with keyboard
- station renaming: put route, grabs station by its Id and updates it's name, reset with the response.data
- namespace socket.io rooms legitimately
	=> http://bit.ly/2hjufCv
- make invite more realistic, with email, etc.
- clean up/refactor ng-controller distribution