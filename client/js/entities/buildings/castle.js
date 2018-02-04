//Object defintion for castle building
import Building from './building.js';
let name = 'castle',
	//TODO: determine building sizes
	pixelWidth = 60,
	pixelHeight = 60,
	//TODO: determine base proportions
	baseWidth = 40,
	baseHeight = 40,
	//TODO: determine base offset
	pixelOffsetX = 0,
	pixelOffsetY = 20,
	//TODO: determine grid dimensions
	buildableGrid = [
                [1, 1],
                [1, 1]],
	passableGrid = [
                [1, 1],
                [1, 1]
            ],
	sight = 3,
	hitPoints = 3000,
	cost = 500,
	//TODO: get images for castle
	spriteImages = [
                { name: "healthy", count: 4 },
                { name: "damaged", count: 1 },
                { name: "constructing", count: 3 }
            ],
	defaults = {
		buildTime: 0
	}

let castle = new Building(name, pixelWidth, pixelHeight, baseWidth, baseHeight, pixelOffsetX, pixelOffsetY, buildableGrid, passableGrid, sight, hitPoints, cost, spriteImages, defaults);

export {castle};
