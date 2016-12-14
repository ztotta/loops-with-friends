//||||||||||||||||||||||||||--
// CREATE INSTRUMENTS
//||||||||||||||||||||||||||--
var kick = new Wad({
	source: 'sine',
	env:    {
						attack: 0.0,
						decay: 0.055,
						sustain: 0.0,
						release: 0.0
					},
	volume: 1.2
})

var snare = new Wad({ 
	source: 'noise',
	env: 		{
						attack  : 0.0, 
						decay   : 0.05,  
						sustain : 0.0,  
						hold    : 0.0, 
						release : 0.05
					},
	volume: 0.25
})

var hihat = new Wad({ 
	source: 'noise',
	env: 		{
						attack  : 0.0, 
						decay   : 0.025,  
						sustain : 0.0,  
						hold    : 0.0, 
						release : 0.05
					},
	volume: 0.12
})

var plunk = new Wad({
	source: 'sine',
	env:    {
						attack: 0.0,
						decay: 2.0,
						sustain: 0.0,
						release: 0.0
					},
	volume: 0.3
})

var handpan = new Wad({
    source : 'sine',
//    tuna   : {
//						Chorus : {
//								intensity: 0.25,  //0 to 1
//								rate: 4,         //0.001 to 8
//								stereoPhase: 0,  //0 to 180
//								bypass: 0
//						}
//    },
		env     : {      			 // This is the ADSR envelope.
        attack  : 0.075, 	 // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
        decay   : 0.1,     // Time in seconds from peak volume to sustain volume.
        sustain : 0.15,     // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
        hold    : 0.0,     // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
        release : 0.5      // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
    },
		volume: 0.75
})

var stingray = new Wad({
    source : 'sawtooth',
   
	env     : {      			 
        attack  : 0.02, 	
        decay   : 0.15,     
        sustain : 0.15,     
        hold    : 0.0,     
        release : 0.5     
    },
    delay   : {
        delayTime : .08,  // Time in seconds between each delayed playback.
        wet       : .25, // Relative volume change between the original sound and the first delayed playback.
        feedback  : .75, // Relative volume change between each delayed playback and the next.
    },
	volume: 0.2
})



//var sine     = new Wad({ source : 'sine' })
//var square   = new Wad({ source : 'square' })
//var triangle = new Wad({ source : 'triangle' })
//
//var tripleOscillator = new Wad.Poly()
//
//tripleOscillator.add(sine).add(square).add(triangle) // Many methods are chainable for convenience.
//