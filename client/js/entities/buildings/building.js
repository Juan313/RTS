//shared entity class defintion file
import Entity from '../entity.js';
import { units } from '../units/list.js';
import { game } from '../../game.js';

export default class Building extends Entity {
	/*	Additional parameters:
	 *	baseWidth, baseHeight - rectangluar area of building relative to map size
	 *	buildableGrid, passableGrid - grid spaces on map for pathfinding */
	constructor(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
	sight, hitPoints, cost, spriteImages, defaults, buildableGrid, passableGrid, baseWidth, baseHeight) {
		super(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, sight, hitPoints, cost, spriteImages, defaults);
		//set the list of buildable units based on each units builtFrom property
		this.unitList = [];
		//add all the units that the building can build to its unit list
		for(let unit in units) {
			if(units.hasOwnProperty(unit)) {
					if(units[unit].builtFrom === this.name){
						this.unitList.push(units[unit]);
					}
			}
		}
		this.defaults.unitList = this.unitList;
		//set default building specific properties
		this.defaults.type = 'buildings';
		this.baseWidth = baseWidth;
		this.baseHeight = baseHeight;
		this.buildableGrid = buildableGrid;
		this.passableGrid = passableGrid;
		this.imageOffset = 0;
		this.animationIndex = 0;
	}
	//construct a given unit and return it
	construct(unit){
			constructedUnit = unit.create();
			return constructedUnit;
	}

	//default drawSprite for buildings
	drawSprite(){
		let x = this.drawingX;
		let y = this.drawingY;
		let colorIndex = 0;
		let colorOffset = colorIndex * this.pixelHeight;
		this.imageOffset = 0;
		game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight);
	}
}
