Current issues:
	 
To do:
- station renaming: put route, grabs station by its Id and updates it's name, reset with the response.data
- clean up/refactor ng-controller distribution
- namespace socket.io rooms legitimately
	=> http://bit.ly/2hjufCv
- fix navbar & footer responsiveness
- add instructions
- steps getting stuck .pressed

Bugs:
- users can invite themselves and it just repeats the station on their list
	- when one is deleted, all the repeats disappear, as well
- rethink updating on every click?
	- makes it glitchy when changes are made mid-loop
  - glitchy playback...clipping & volume jumps
- if user leaves page without stopping loop, it keeps going...