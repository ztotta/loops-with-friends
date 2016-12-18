# [LOOPS W/ FRIENDS](https://l00ps-with-fri3nds.herokuapp.com)
a MEAN stack app
--
###Description:
After registering through a JWT-based authentication, users can build loop-based beats with 6 instruments, 384 launchpads, and as MANY friends as they like.

![homepage](https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/home.png?raw=true)



![survey] (https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/station.png?raw=true)

![survey] (https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/metronome-pad-shot.png?raw=true)

Users can then share these results with a unique URL and/or retake the survey.

They can also search for individual .gifs from the Giphy API without logging in through our homepage InstaGif feature:

![instagif] (https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/melodic.png?raw=true)

###Technologies used:

This is a full-stack app employing MongoDB, Node.js + Express, JavaScript, jQuery / AJAX / Promises, Google OAuth 2.0, Materialize, HTML, CSS and the Giphy API. Deployed via Heroku.

###Code

Our top challenges included:

- sending data to and from our Mongo database and the Giphy API using a mix of AJAX and HTTP requests, and then populating that data onto the Results page timeline in the correct order. This required writing a Promise.all that gathers the asynchronous responses into one array so that they can then be sorted into the correct order again by their index property

- generating unique, functional URLs that can be shared with non-logged-in users

- styling our site symmetrically and responsively via Materialize

###Yet to be resolved:
Although we are pleased with the progression of our project and its functionality, there are just a few things that we would add if given more time, including a direct post-to-facebook button, a responsive footer on the timeline page, and improved responsiveness for mobile devices.

###Conclusion:
Ultimately, this turned out to be an excellent project choice for our group. We intentionally chose a concept that has relatively simple funcitonality so that we could make something engaging while focusing on working congruently as a team using Agile development and Git version control. We were able to accomplish both of those goals while also overcoming a number of unforseen challenges that we worked on both as a team and as individuals. We worked extremely well as a unit and each one of us is proud of what we accomplished in the past few days. The balance between the attainability of our project's scope and the amount that it pushed us to understand new concepts was even better than we had anticipated, and the gif...it keeps on gifing.