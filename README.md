# <center>[LOOPS W/ FRIENDS](https://l00ps-with-fri3nds.herokuapp.com)
### <center> a MEAN-Stack, Single-Page, Real-Time App
##### <center> by Zach Totta
--
### ABOUT:
![about] (https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/about.png?raw=true)
--

After registering through a JWT-based authentication, users are brought to a welcome page where they can create new loop-stations and access or delete previous stations:

![welcome] (https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/list.png?raw=true)
--

Within a given station, users can start to build their beats. The percussive instruments' pads simply toggle On/Off, while the melodic instruments' cycle through the pentatonic Javanese <em>slendro</em> scale:

![melodic] (https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/melodic.png?raw=true)
--

###TECHNOLOGIES USED:

This is a full-stack, single-page app built with MongoDB, AngularJS, Node.js + Express, JavaScript, Promises, Socket.io, JSON Webtoken Authentication, Materialize, HTML, & CSS. Deployed via Heroku.

--

###CODE

##### Challenges: <br>
- building the loop-stations as reusable components, where each station has 6 instruments, and each instrument has 64 launchpads, so that they can all be manipulated, monitored, and updated predictably. This allows for simple expansion if more instruments were to be added in the future. (see Create Station snippet below). <br>
- creating unique stations that can be shared with other users and updated in real time collaboration via websockets. <br>
- getting the styling correct. I'm happy with the both the design and the UI of the stations, especially the reactive, realistic pressing of the buttons (see Yet To Be Resolved).
- triggering the loop-stations to play back in real-time and adjust for mid-loop changes to the steps. This was resolved with a Promise.all for each of the 64 steps, where for each step it cycles through the 6 instruments and calls a setTimeout on each. Once they all resolve, it cycles through again and calls 'playStep' for each instrument, triggering the correct note for the step at the current iteration (wherever 'i' is in the count), granted the instrument is unmuted (see Play Loop snippet below). Meanwhile, the next step's Promise.all is underway, granted the loop is still toggled 'On'.

##### Create Station snippet:
![create-station-code](https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/create-station.png?raw=true)
--

##### Play Loop snippet:
![play-loop] (https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/loop-code.png?raw=true)
--

###YET TO BE RESOLVED:
- As of now, the page is designed for screens at least 1000px wide. Beneath that, the header and footer start getting weird. This was initially ignored on purpose, because I didn't think the app would even be usable on a screen smaller than that, but it is actually not that bad, even on a phone. So I will have to go back and correct for that. <br>
- Also, I think it would be more fun if there were more instruments to choose from and the users had the ability to change tempo, and possibly even change the key and/or scale. <br>
- Sometimes the pads get stuck 'pressed down'. I think this happens when the websockets update is sent out before the pad has readjusted, so it gets frozen in the 'down' position. <br>
- It would also be nice if the stations could be paginated to have 4 or more sections, so you wouldn't be stuck in the same 4 measures the whole time. That could make it a better compositional tool, though right now it's kind of nice as an approachable toy that's fun and could inspire further composition in a more traditional program. <br>
- Finally, this app would feel more complete if users could communicate, so a chat feature could really do wonders for the user experience and create a more realistic environment for collaboration.

--

###CONCLUSION:
I built this app in a little over a week, and I honestly surprised myself with the result. I'm really happy with the design & UX, and I'm proud of the code that's making it all possible. I had a lot of fun building this out from concept to deployed product, even through some intense battles with the loop-station playback. After this project, I feel way more confident with Angular/MEAN, and the component-y architecture makes me excited to get into Angular 2 and React.