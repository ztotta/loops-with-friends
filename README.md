Current issues:

3) How to affect change on the station once it is displayed to the user?
	 => socket.io to maintain the real-time changes to the Angular components,
	    then batch saving to the db?
4) can't make new users => "a user with that email already exists", yet it 
	 doesn't exist in Mongo.
	 
	 
To do:
- retrieve and display only the stations to which the user belongs
	=> the stations with Id's matching the Id's in the user's stationIds array
- invite friend: grabs current station Id and adds it to the invited friend's 
	stationIds array
- rename station: put route, grabs station by its Id and updates it's name
- sockets to listen for updates and update the stations_controller in the public
	folder.
	=> then make batch saves on an interval to the DB
- clean up ng-controller distribution

Bugs:
- email form:
	- 'Email' label hangs back, or isn't there in the first place
	- need a way to inform the user if that friend hasn't registered yet, or if the
		invite was successful
- users can invite themselves and it just repeats the station on their list
	- when one is deleted, all the repeats disappear, as well