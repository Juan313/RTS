//Object defintion for direwolf unit
import Unit from './unit.js';
let name = 'direwolf',
	pixelWidth = 21,
	pixelHeight = 16,
	pixelOffsetX = 10,
	pixelOffsetY = 10,
	radius = 8,
	sight = 4,
	hitPoints = 500,
	moveSpeed = 4,
	interactSpeed = 3,
	cost = 500,
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	builtFrom  = 'stable',
	firePower = 100,
	range = 3,
	defaults = {
		buildTime : 15,
		special : {
			description: 'Once per minute the direwolf can double its attack damage for 10 seconds of play',
			ready: true,
			action: function(self){	
				if(self.special.ready && self.life > 0){
					console.log('doubling firepower');
					self.firePower *= 2;
					setTimeout(()=>{
						console.log('halving firepower');
						self.firePower /= 2;
						self.special.ready = false;
					}, 10000);
					setTimeout(()=>{
						self.special.ready = true;
						console.log('special ready');
					}, 60000);
				}
			}
		}
	};

let direwolf = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, 
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {direwolf};



