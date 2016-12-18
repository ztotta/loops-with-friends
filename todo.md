Current issues:
	 
To do:
- make proper README
- fix navbar & footer responsiveness
- failed login still creates error, doesn't inform user (login_controller 23)
- DRY-ify clearMetronome()
- Gulp-ify

Bugs:
- LOOP ON (i.e. button says off) when entering station sometimes (check navbar loopToggle function)

Icebox:
- play instrument live with keyboard, or start/stop instruments with keyboard
- station renaming: put route, grabs station by its Id and updates it's name, reset with the response.data
- namespace socket.io rooms legitimately
	=> http://bit.ly/2hjufCv
- make invite more realistic for yet-to-register invitees => send email, etc.
- clean up/refactor ng-controller distribution (?)
- glitchy playback...clipping & volume jumps