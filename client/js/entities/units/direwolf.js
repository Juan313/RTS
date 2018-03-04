//Object defintion for direwolf unit
import Unit from './unit.js';
let name = 'direwolf',
	pixelWidth = 16,
	pixelHeight = 16,
	pixelOffsetX = 10,
	pixelOffsetY = 10,
	radius = 8,
	sight = 4,
	hitPoints = 500,
	moveSpeed = 2.5,
	interactSpeed = 3,
	cost = 500,
	spriteImages = [{name: 'stand', count: 1, directions: 4}],
	builtFrom  = 'stable',
	firePower = 100,
	range = 3,
	defaults = {
		buildTime : 15,
		canAttack: true,
    canMove: true,
		special : {
			type: 'active',
			description: 'Double attack for 10 seconds (Available: once per minute)',
			ready: true,
			action: function(self){
				if(self.special.ready === true && self.life > 0){
					self.special.ready = false;
					console.log('doubling direwolf ' + self.uid + ' firepower');
					self.firePower *= 2;
					setTimeout(()=>{
						console.log('halving direwolf ' + self.uid + ' firepower');
						self.firePower /= 2;
					}, 10000);
					setTimeout(()=>{
						self.special.ready = true;
					}, 60000);
				}
			}
		}
	};

let direwolf = new Unit(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
    sight, hitPoints, cost, spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom);

export {direwolf};
