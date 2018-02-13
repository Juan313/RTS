//Object defintion for direwolf unit
import Unit from './unit.js';
let name = 'direwolf',
	pixelWidth = 16,
	pixelHeight = 16,
	//TODO: determine base proportions
	baseWidth = 0,
	baseHeight = 0,
	//TODO: determine base offset
	pixelOffsetX = 0,
	pixelOffsetY = 0,
	//TODO: determine grid dimensions
	buildableGrid = 0,
	passableGrid = 0,
	sight = 4,
	hitPoints = 500,
	cost = 500,
	//TODO: get sprite images
	spriteImages = null,
	defaults = {
		house: 'Stark',
		buildTime : 15,
		range : 3,
		moveSpeed : 4,
		interactSpeed : 3,
		firePower : 100,
		builtFrom : 'stable',
	};
	defaults.special = {
		description: 'Once per minute the direwolf can double its attack damage for 10 seconds of play',
		ready: true,
		//set this.special.action = this.special.action(this) when adding direwolves
		action: function(self){	
			return function(){
				console.log('direwolf action works');
				if(self.lifeCode === 'alive'){
					self.firePower *= 2;
					setTimeout(()=>{
						self.firePower /= 2;
						self.special.ready = false;
					}, 10000);
					setTimeout(()=>{self.special.ready = true;}, 60000);
				}
			}
		}
	}

let direwolf = new Unit(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, 
pixelOffsetY, buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {direwolf};



