//shared entity class defintion file
import Entity from '../entity.js';
import { units } from '../units/list.js';

export default class Building extends Entity {
	//No parameters in addition to entity parameters
	constructor(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
	sight, health, cost, buildTime, spriteImages, spriteArray = null, spriteSheet = null, directions = 1, direction = 0, 
		selected = false){
		super(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
		sight, health, cost, buildTime, spriteImages, spriteArray = null, spriteSheet = null, directions = 1, direction = 0, 
		selected = false);
		//set the list of buildable units based on each units builtFrom property
		this.unitList = [];
		for(let u of units){
			if(u.builtFrom === this.name){
				this.unitList.push(u);
			}
		}
	}

	//construct a given unit and return it
	construct(unit){
			constructedUnit = unit.create();
			return constructedUnit;
	}
}

