//Shared unit class definition file
import Entity from '../entity.js';
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
}
