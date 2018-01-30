//Shared unit class definition file
import Entity from '../entity.js';
//TODO: implement player class with inventory for collection
export default class Unit extends Entity {
	/* Additional Parameters -
	 * range : How far a unit can interact with buildings / units in square area
	 * moveSpeed : How many map tiles can be moved by the unit per second
	 * interactSpeed: How many interactions (attack, construct, collect, repair) can be performed per second by unit
	 * firePower: attack damage
	 * builtFrom: building this item must be constructed from,
	 * special: Special actions unit can perform
	 */
	constructor(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
		sight, health, cost, buildTime, spriteImages, range, moveSpeed, interactSpeed, firePower, builtFrom, special){
		super(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
		sight, health, cost, buildTime, spriteImages);
		this.range = range;
		this.moveSpeed = moveSpeed;
		this.interactSpeed = interactSpeed;
		this.firePower = firePower;
		this.builtFrom = builtFrom;
		this.special = special;
	}
	//unit collects a given resource for the player interactSpeed times per second while a condition holds
	collect(type, condition, player){
		while(condition){
			setInterval(()=>{
				if(type === 'timber'){
					player.timber += this.interactSpeed;
				}else{
					player.wheat += this.interactSpeed;
				}
			}, 1000);
		}
	}
	//construct a given building at interactSpeed times per second or until the build progess is equal to the health of the building
	construct(building, condition){
		while(condition){
			setInterval(()=>{ 
				for(i = 0; i < this.interactSpeed; i++){
					building.progress = Math.min(building.health, building.progress + 5); 
					if(building.progress == building.health){
						return 0;
					}
				}
			}, 1000);
		}
	}
	//repair a given building at interactSpeed times per second or until the currentHP is equal to its max value
	repair(building, condition){
		while(condition){
			setInterval(()=>{ 
				for(i = 0; i < this.interactSpeed; i++){
					building.currentHP = Math.min(building.health, building.currentHP + 5);
					if(building.currentHP == building.health){
						return 0;
					}
				}
			}, 1000);
		}
	}
	//attack a given entity will the condition holds interactSpeed times per second or until the entities currentHP is 0
	attack(entity, condition){
		if(this.firePower){
			while(condition){
				setInterval(()=>{ 
					for(i = 0; i < this.interactSpeed; i++){
						entity.currentHP = Math.max(0, entity.currentHP - this.firePower);
						if(entity.currentHP === 0){
							return 0;
						}
					}
				}, 1000);
			}
		}
	}
}
