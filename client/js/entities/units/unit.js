//Shared unit class definition file
import Entity from '../entity.js';
import {
  game
} from '../../game.js';
import {AStar} from '../../astar.js'

//TODO: implement player class with inventory for collection
export default class Unit extends Entity {
  /* Additional Defaults -
	 * radius : map radius of unit
   * range : How far a unit can interact with buildings / units in square area
   * speed : How many map tiles can be moved by the unit per second
	 * interactSpeed: how many interactions can be performed per second by unit
   * firePower: attack damage
   * builtFrom: building this item must be constructed from,
   */
  constructor(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, sight, hitPoints, cost,
		spriteImages, defaults, radius, range, speed, interactSpeed, firePower, builtFrom){
    super(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
      sight, hitPoints, cost, spriteImages, defaults);
    this.defaults.type = 'units';
		this.radius = radius;
		this.range = range;
		this.speed = speed;
		this.interactSpeed = interactSpeed;
		this.firePower = firePower;
		this.builtFrom = builtFrom;
  }
  //unit collects a given resource for the player interactSpeed times per second while a condition holds
  collect(type, condition, player) {
    while (condition) {
      setInterval(() => {
        if (type === 'timber') {
          player.timber += this.interactSpeed;
        } else {
          player.wheat += this.interactSpeed;
        }
      }, 1000);
    }
  }
  //construct a given building at interactSpeed times per second or until the build progess is equal to the health of the building
  construct(building, condition) {
    while (condition) {
      setInterval(() => {
        for (i = 0; i < this.interactSpeed; i++) {
          building.progress = Math.min(building.health, building.progress + 5);
          if (building.progress == building.health) {
            return 0;
          }
        }
      }, 1000);
    }
  }
  //repair a given building at interactSpeed times per second or until the currentHP is equal to its max value
  repair(building, condition) {
    while (condition) {
      setInterval(() => {
        for (i = 0; i < this.interactSpeed; i++) {
          building.currentHP = Math.min(building.health, building.currentHP + 5);
          if (building.currentHP == building.health) {
            return 0;
          }
        }
      }, 1000);
    }
  }
  //attack a given entity will the condition holds interactSpeed times per second or until the entities currentHP is 0
  attack(entity, condition) {
    if (this.firePower) {
      while (condition) {
        setInterval(() => {
          for (i = 0; i < this.interactSpeed; i++) {
            entity.currentHP = Math.max(0, entity.currentHP - this.firePower);
            if (entity.currentHP === 0) {
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

  // moveTo(destination, distanceFromDestination){
	// 	// console.log("moving to x: "+destination.x + " y: "+destination.y);
	// 	let newDirection = this.findAngle(destination);
	// 	console.log("direction in moveTo function "+this.direction);
	// 	this.turnTo(newDirection);
  //
	// 	let maximumMovement = this.moveSpeed * (this.turning ? this.speedAdjustmentWhileTurningFactor:1);
	// 	let movement = Math.min(distanceFromDestination,maximumMovement);
  //
	// 	let angleRadians = -(this.direction / this.directions) * 2 * Math.PI;
  //
	// 	this.lastMovementX = -(movement * Math.sin(angleRadians));
	// 	this.lastMovementY = -(movement * Math.cos(angleRadians));
	// 	// console.log(newDirection);
	// 	this.x = this.x + this.lastMovementX;
	// 	this.y = this.y + this.lastMovementY;
	// }

  moveTo(destination, distanceFromDestination){
    let start = [Math.floor(this.x), Math.floor(this.y)];
    let end = [Math.floor(destination.x), Math.floor(destination.y)];

    let newDirection;
    let villagerOutsideMapBounds = (start[0] < 0 || start[0] >=game.currentMap.mapGridWidth || start[1] < 0 || start[1] >= game.currentMap.mapGridHeight);

    if (!game.currentMapPassableGrid){
      game.rebuildPassableGrid();
    }

    let villagerReachedDestinationTile = (start[0] == destination[0]) && (start[0] == destination[0]);

    if (villagerOutsideMapBounds || villagerReachedDestinationTile){
      newDirection = this.findAngle(destination);
      this.orders.path = [[this.x,this.y],[destination.x, destination.y]];
    }
    else {
      let grid;
      if (destination.type == "buildings" || destination.type == "terrain"){
        grid = game.makeArrayCopy(game.currentMapPassableGrid);

        grid[Math.floor(destination.x), Math.floor(destination.y)] = 0;
      }
      else {
        grid = game.currentMapPassableGrid;
      }
      this.orders.path = AStar(grid,start,end, "Euclidean");
      //console.log(this.orders.path);
      if (this.orders.path.length > 1){
        let nextStep = {x: this.orders.path[1][0]+0.5, y: this.orders.path[1][1]+0.5};

        newDirection = this.findAngle(nextStep);
      } else {
        return false;
      }

      let collisionObjects = this.checkForCollisions(game.currentMapPassableGrid);

      if (this.colliding){
        newDirection = this.steerAwayFromCollision(collisionObjects);
        // console.log("new direction: " + newDirection);
      }
      this.turnTo(newDirection);
      let maximumMovement = this.moveSpeed * (this.turning ? this.speedAdjustmentWhileTurningFactor:1);
      let movement = Math.min(distanceFromDestination,maximumMovement);

      if (this.hardCollision){
        movement = 0;
      }
      let angleRadians = -(this.direction / this.directions) * 2 * Math.PI;

      this.lastMovementX = -(movement * Math.sin(angleRadians));
      this.lastMovementY = -(movement * Math.cos(angleRadians));
      // console.log(newDirection);
      this.x = this.x + this.lastMovementX;
      this.y = this.y + this.lastMovementY;

      return true;
    }

  }

	findAngle(destination){
		let dy = destination.y - this.y;
		let dx = destination.x - this.x;

		let angle = this.directions/2 - (Math.atan2(dx,dy) * this.directions / (2 * Math.PI));

		angle = (angle + this.directions) % this.directions;
		return angle;
	}

	turnTo(newDirection){
		// console.log("direction in turnTo function "+this.direction);
		let difference = this.angleDiff(newDirection);
		let turnAmount = this.turnSpeed * this.speedAdjustmentWhileTurningFactor;

		if (Math.abs(difference) > turnAmount){
			this.direction += turnAmount * Math.abs(difference)/difference;
			this.direction = (this.direction + this.directions) % this.directions;
			this.turning = true;
			// console.log("still turning!!!!");

		}
		else {
			this.direction = newDirection;
			this.turning = false;
			// console.log("turned!!!!");
		}
	}

	angleDiff(newDirection){
		let currDirection = this.direction;
		// console.log("direction in angleDiff function "+this.direction);
		let directions = this.directions;

		if (currDirection >= directions / 2){
			currDirection -= directions;
		}

		if (newDirection >= directions / 2){
			newDirection -= directions;
		}

		var diff = newDirection - currDirection;

		if (diff < -directions / 2){
			diff += directions;
		}

		if (diff > directions / 2){
			diff -= directions;
		}
		// console.log(diff);
		return diff;
	}

  checkForCollisions(grid){
    let movement = this.moveSpeed * (this.turning ? this.speedAdjustmentWhileTurningFactor:1);

    let angleRadians = -(this.direction / this.directions) * 2 * Math.PI;

    this.lastMovementX = -(movement * Math.sin(angleRadians));
    this.lastMovementY = -(movement * Math.cos(angleRadians));
    // console.log(newDirection);
    let newX = this.x + this.lastMovementX;
    let newY = this.y + this.lastMovementY;

    this.colliding = false;
    this.hardCollision = false;

    let collisionObjects = [];

    let x1 = Math.max(0, Math.floor(newX) - 3);
    let x2 = Math.min(Math.floor(newX) + 3, game.currentMap.mapGridWidth-1);
    let y1 = Math.max(0, Math.floor(newY) - 3);
    let y2 = Math.min(Math.floor(newY) + 3, game.currentMap.mapGridHeight-1);

    let gridHardCollisionThreshold = Math.pow(this.radius * 0.9 / game.gridSize , 2);
    let gridSoftCollisionThreshold = Math.pow(this.radius * 1.1 / game.gridSize , 2);

    for (let j = x1; j<=x2; j++){
      for (let i = y1; i<=y2; i++){
        if (grid[i][j] == 1){
          let distanceSquared = Math.pow(j+0.5-newX,2) + Math.pow(i+0.5-newY,2);
          if (distanceSquared  < gridHardCollisionThreshold){
            collisionObjects.push({collisionType: "hard", with: {type: "wall", x: j+0.5, y: i+0.5}});
            this.colliding = true;
            this.hardCollision = true;
          }
          else if (distanceSquared < gridSoftCollisionThreshold){
            collisionObjects.push({collisionType: "soft", with: {type: "wall", x: j+0.5, y: i+0.5}});
            this.colliding = true;
          }
        }
      }
    }

    for (let i = game["units"].length -1 ; i>=0; i--){
      let unit = game["units"][i];
      // console.log("game unit is: " + game["units"][i].x + " " + game["units"][i].y);
      if (unit != this && Math.abs(unit.x - this.x) < 3 && Math.abs(unit.y-this.y) < 3){
        if (Math.pow(unit.x - newX, 2) + Math.pow(unit.y - newY,2) < Math.pow((this.radius + unit.radius) / game.gridSize, 2)){
          collisionObjects.push({collisionType: "hard", with: unit});
          this.colliding = true;
          this.hardCollision = true;
        } else if (Math.pow(unit.x - newX, 2) + Math.pow(unit.y - newY,2) < Math.pow((this.radius*1.5 + unit.radius) / game.gridSize, 2)) {
          collisionObjects.push({collisionType: "soft", with: unit});
          this.colliding = true;
        }
      }

    }


  return collisionObjects;

  }

  steerAwayFromCollision(collisionObjects){
    let forceVector = {x: 0, y: 0};
    collisionObjects.push({collisionType: "attraction", with: {x:this.orders.path[1][0]+0.5, y:this.orders.path[1][1]+0.5}});

    for (let i = collisionObjects.length - 1; i >=0 ; i--){
      let collObject = collisionObjects[i];

      let objectAngle = this.findAngle(collObject.with);
      let objectAngleRadians = -(objectAngle/this.directions) * 2 * Math.PI;

      let forceMagnitude;

      switch (collObject.collisionType){
        case "hard":
              forceMagnitude = 2;
              break;
        case "soft":
              forceMagnitude = 1;
              break;
        case "attraction":
              forceMagnitude = -0.25;
              break;
      }
      forceVector.x += (forceMagnitude * Math.sin(objectAngleRadians));
      forceVector.y += (forceMagnitude * Math.cos(objectAngleRadians));
    }

    let newDirection = this.directions / 2 - (Math.atan2(forceVector.x, forceVector.y) * this.directions / (2*Math.PI));
    // console.log("new direction: " + newDirection);
    newDirection = (newDirection + this.directions) % this.directions;

    return newDirection;

  }

}
