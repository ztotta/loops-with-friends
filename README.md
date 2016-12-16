Current issues:
	 
To do:
- make proper README
- fix navbar & footer responsiveness
- steps getting stuck .pressed
- Gulp-ify

Bugs:
- LOOP ON (i.e. button says off) when entering station sometimes (check navbar loopToggle function)

Icebox:
- play instrument live with keyboard, or start/stop instruments with keyboard
- station renaming: put route, grabs station by its Id and updates it's name, reset with the response.data
- namespace socket.io rooms legitimately
	=> http://bit.ly/2hjufCv
- make invite more realistic for yet-to-register invitees => send email, etc.
- clean up/refactor ng-controller distribution
- rethink updating on every click?
	- makes it glitchy when changes are made mid-loop
  - glitchy playback...clipping & volume jumps