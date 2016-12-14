Current issues:

3) How to affect change on the station once it is displayed to the user?
	 => socket.io to maintain the real-time changes to the Angular components,
	    then batch saving to the db?
4) can't make new users => "a user with that email already exists", yet it 
	 doesn't exist in Mongo.
	 
	 
To do:
- station renaming: put route, grabs station by its Id and updates it's name
- clean up/refactor ng-controller distribution
- namespace socket.io rooms legitimately
	=> http://bit.ly/2hjufCv
- fix navbar collapsing fiasco

Bugs:
- email form:
	- 'Email' label hangs back, or isn't there in the first place
- users can invite themselves and it just repeats the station on their list
	- when one is deleted, all the repeats disappear, as well
- rethink updating on every click?
	- makes it glitchy when changes are made mid-loop