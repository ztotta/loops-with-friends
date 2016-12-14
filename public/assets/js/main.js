//||||||||||||||||||||//
// CREATE INSTRUMENTS //
//||||||||||||||||||||//
var kick = new Wad({
	source: 'sine',
	env:    {
						attack: 0.0,
						decay: 0.055,
						sustain: 0.0,
						release: 0.0
					},
	volume: 1.8,
  filter  : {
        type      : 'lowpass', 
        frequency : 2000,       
        q         : 1,         
        env       : {          
            frequency : 38,     
            attack    : 0.027    
        }
  }
})

var snare = new Wad({ 
	source: 'noise',
	env: 		{
						attack  : 0.0, 
						decay   : 0.04,  
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
						decay   : 0.0125,  
						sustain : 0.0,  
						hold    : 0.0, 
						release : 0.05
					},
	volume: 0.09
})

var plunk = new Wad({
	source: 'sine',
	env:    {
						attack:  0.055,
						decay:   1.0,
						sustain: 0.0,
						release: 0.0
					},
	volume: 0.125
})

var handpan = new Wad({
    source : 'sine',
		env     : {      			 
        attack  : 0.0, 	 
        decay   : 0.2,     
        sustain : 0.15,    
        hold    : 0.0,     
        release : 0.75     
    },
		filter  : {
        type      : 'highpass', 
        frequency : 400,       
        q         : 1,         
        env       : {          
            frequency : 800,     
            attack    : 0.027    
        }
  	},
		volume: 0.55
})

//var stingray = new Wad({
//    source : 'sawtooth',
//   
//	env     : {      			 
//        attack  : 0.02, 	
//        decay   : 0.15,     
//        sustain : 0.15,     
//        hold    : 0.0,     
//        release : 0.5     
//    },
//    delay   : {
//        delayTime : .08,  
//        wet       : .50, 
//        feedback  : .75, 
//    },
//	volume: 0.12
//})

//var sine     = new Wad({ source : 'sine' })
var square   = new Wad({ 
	source : 'square', 
	env     : {      			 
        attack  : 0.50, 	
        decay   : 0.25,     
        sustain : 0.15,     
        hold    : 0.0,     
        release : 1.0     
    },
		delay   : {
        delayTime : .08,  
        wet       : .75, 
        feedback  : .50, 
    },
		volume: 0.06
})
var triangle = new Wad({ 
	source : 'triangle', 
	env     : {      			 
        attack  : 0.50, 	
        decay   : 0.25,     
        sustain : 0.15,     
        hold    : 0.0,     
        release : 1.0     
    },
	delay   : {
        delayTime : .08,  
        wet       : .75, 
        feedback  : .50, 
    },
		volume: 0.06
})

var stingray = new Wad.Poly()

stingray.add(square).add(triangle)