//shared entity class defintion file
import Entity from '../entity.js';
import { units } from '../units/list.js';

export default class Building extends Entity {
	//Additional parameter defaults: set defaults of building
	constructor(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
	sight, hitPoints, cost, spriteImages, defaults){
		super(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid,
		sight, hitPoints, cost, spriteImages, defaults);
		//set the list of buildable units based on each units builtFrom property
		this.unitList = [];
		for(let u of units){
			if(u.builtFrom === this.name){
				this.unitList.push(u);
			}
		}
		//set default building specific properties
		this.defaults.type = 'buildings';
		this.defaults.unitList = this.unitList;
	}
	//construct a given unit and return it
	construct(unit){
			constructedUnit = unit.create();
			return constructedUnit;
	}
}

