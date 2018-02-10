//Shared unit class definition file
import Entity from '../entity.js';
import {game} from '../../game.js';

//TODO: implement player class with inventory for collection
export default class Unit extends Entity {
	/* Additional Defaults -
	 * range : How far a unit can interact with buildings / units in square area
	 * moveSpeed : How many map tiles can be moved by the unit per second
	 * interactSpeed: How many interactions (attack, construct, collect, repair) can be performed per second by unit
	 * firePower: attack damage
	 * builtFrom: building this item must be constructed from,
	 * special: Special actions unit can perform
	 */
	constructor(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
	sight, hitPoints, cost, spriteImages, defaults){
		super(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
		sight, hitPoints, cost, spriteImages, defaults);
		this.defaults.type = 'units';
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

	drawSelection() {
		let x = this.drawingX + this.pixelOffsetX;
    let y = this.drawingY + this.pixelOffsetY;

    game.foregroundContext.strokeStyle = "rgba(255,255,0,0.5)";
    game.foregroundContext.lineWidth = 1;

    // Draw a filled circle around the vehicle
    game.foregroundContext.beginPath();
    game.foregroundContext.arc(x, y, this.radius, 0, Math.PI * 2, false);
    game.foregroundContext.fillStyle = "rgba(255,215,0,0.2)";
    game.foregroundContext.fill();
    game.foregroundContext.stroke();
		// console.log("draw selection");
	}
	drawLifeBar() {
		let lifeBarHeight = 5;
		let lifeBarHealthyFillColor = "rgba(0,255,0,0.5)";
		let lifeBarBorderColor = "rgba(0,0,0,0.8)";
		let lifeBarDamagedFillColor = "rgba(255,0,0,0.5)";

    let x = this.drawingX;
    let y = this.drawingY - 2 * lifeBarHeight;

    game.foregroundContext.fillStyle = (this.lifeCode === "healthy") ? lifeBarHealthyFillColor : lifeBarDamagedFillColor;

    game.foregroundContext.fillRect(x, y, this.pixelWidth * this.life / this.hitPoints, lifeBarHeight);

    game.foregroundContext.strokeStyle = lifeBarBorderColor;
    game.foregroundContext.lineWidth = 1;

    game.foregroundContext.strokeRect(x, y, this.pixelWidth, lifeBarHeight);
}

}
