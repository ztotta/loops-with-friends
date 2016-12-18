# <center>LOOPS W/ FRIENDS
### <center> a MEAN-Stack, Single-Page, Real-Time App
##### <center> by Zach Totta
##### <center> [L00ps-With-Fri3nds.herokuapp.com](https://l00ps-with-fri3nds.herokuapp.com)
###### <center> For a demo, login as: example@mail.com, password: abc123, but please touch nothing but the Loop On/Off button to preserve the demo for others. Feel free to Register if you wish to create your own loops!
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

This is a full-stack, single-page app built with MongoDB, AngularJS / UI-Router, Node.js + Express, JavaScript / Promises, Socket.io, JSON Webtoken Authentication, Materialize, HTML, & CSS. The sounds are synthesized with basic waveforms via the Web Audio API, made simpler by the Web Audio DAW library. It's deployed via Heroku / MLAB.

--

###CODE

##### Challenges: <br>
- building the loop-stations as reusable components, where each station has 6 instruments, and each instrument has 64 launchpads, so that they can all be manipulated, monitored, and updated predictably. This allows for simple expansion if more instruments were to be added in the future. (see Create Station snippet below). <br>
- creating unique stations that can be shared with other users and updated in real time collaboration via websockets. <br>
- getting the styling correct. I'm happy with the both the design and the UI of the stations, especially the reactive, realistic pressing of the buttons (see Yet To Be Resolved).
- triggering the loop-stations to play back in real-time and adjust for mid-loop changes to the steps. This was resolved with a Promise.all for each of the 64 steps, where for each step it cycles through the 6 instruments and calls a setTimeout on each. Once they all resolve, it cycles through again and calls 'playStep' for each instrument, triggering the correct note for the step at the current iteration (wherever 'i' is in the count), granted the instrument is unmuted. Meanwhile, the next step's Promise.all is underway, granted the loop is still toggled 'On' (see Play Loop snippet below).

##### Create Station snippet:
![create-station-code](https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/create-station.png?raw=true)
--

##### Play Loop snippet:
![play-loop] (https://github.com/ztotta/loops-with-friends/blob/master/public/assets/img/loop-code.png?raw=true)
--

###YET TO BE RESOLVED:
- The responsiveness of the navbar/footer could be improved with a hamburger dropdown menu. Also, on huge screens the instrument panels can get a bit out-of-whack.<br>
- I think it would be more fun if there were more instruments to choose from and the users had the ability to change tempo, and possibly even change the key and/or scale. <br>
- Sometimes the pads get stuck 'pressed down'. I think this happens when the websockets update is sent out before the pad has readjusted, so it gets frozen in the 'down' position. <br>
- It would also be nice if the stations could be paginated to have 4 or more sections, so you wouldn't be stuck in the same 4 measures the whole time. That could make it a better compositional tool, though right now it's kind of nice as an approachable toy that's fun and could inspire further composition in a more traditional program. <br>
- I should optimize with Gulp. <br>
- Sometimes the Loop On/Off button gets toggled incorrectly upon entering a station. <br>
- It would be nice to bind the instrument muting and loop playback to the keyboard for better ease of use. <br>
- Sometimes the audio playback will glitch and be painfully loud. I'm thinking I'm just asking too much of the computer to synthesize all of these sounds on the spot, over and over again. I'm not sure how to avoid this at the moment.
- Finally, this app would feel more complete if users could communicate, so a chat feature could really do wonders for the user experience and create a more realistic environment for collaboration.

--

###CONCLUSION:
I built this app in a little over a week, and I honestly surprised myself with the result. I'm really happy with the design & UX, and I'm proud of the code that's making it all possible. I had a lot of fun building this out from concept to deployed product, even through some intense battles with the loop-station playback. After this project, I feel way more confident with Angular/MEAN, and the component-y architecture makes me excited to get into Angular 2 and React.