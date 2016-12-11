Current issues:

1) How to programmatically build the stationSchema?
2) How to retrieve station Id's to which the user belongs?
	 => why isn't this in the userService.data?
3) How to affect change on the station once it is displayed to the user?
	 => socket.io to maintain the real-time changes to the Angular components,
	    then batch saving to the db?
