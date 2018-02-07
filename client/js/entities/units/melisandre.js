//Object defintion for Melisandre special unit
import Unit from './unit.js';
import {game} from '../../game.js';

let name = 'melisandre',
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
	sight = 5,
	hitPoints = 500,
	cost = 500,
	//TODO: get sprite images
	spriteImages = null,
	defaults = {
		buildTime : 5,
		range : 1,
		moveSpeed : 1,
		interactSpeed : 1,
		firePower : 0,
		builtFrom : 'castle',
		//TODO: implement house check in game so that only Baratheon can add melisandre
		house: 'Baratheon'
	};

	//Melisandre's special abilities and description
	defaults.special = {
		description: 'Melisandre can heal any militia unit within a 2 block distance from her at a rate of 10 life every 5 seconds',
		action: function(self){
			return function(){
				console.log('melisandre action works');
				while(self.lifeCode === 'alive'){
					setInterval(()=>{
						let x = self.drawingX, y = self.drawingY;
						for(i = x; i < x + 2; i++){
							for(j = y; j < y + 2; j++){
								for(let item of game.items){
									if(!item.healing && item.house == 'Baratheon' && 
										item.name === 'militia' && item.lifeCode === 'alive' && (item.life < item.hitPoints)){
										//If an alive, unhealthy militia is within a radius of 2 from Melisandre, heal them
										if(Math.pow(x - item.drawingX, 2) + Math.pow(y - item.drawingY, 2) <  4){
											item.healing === true;
											item.life = Math.min(item.life + 10, item.hitPoints);
										}
									}
								}
							}
						}
					}, 5000);
				}
			}
		}
	}

let melisandre = new Unit(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, 
pixelOffsetY, buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {melisandre};


