//Shared unit class definition file
import Entity from '../entity.js';
import {weapons} from '../weapons/list.js';
import {
  game
} from '../../game.js';
import {
  AStar
} from '../../astar.js';

export default class Unit extends Entity {
  /* Additional Defaults -
   * radius : map radius of unit
   * range : How far a unit can interact with buildings / units in square area
   * speed : How many map tiles can be moved by the unit per second
   * interactSpeed: how many interactions can be performed per second by unit
   * firePower: attack damage
   * builtFrom: building this item must be constructed from,
	 * weaponType: the weapon the unit uses
   */
  constructor(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY, sight, hitPoints, cost,
    spriteImages, defaults, radius, range, moveSpeed, interactSpeed, firePower, builtFrom, weaponType) {
    super(name, pixelWidth, pixelHeight, pixelOffsetX, pixelOffsetY,
      sight, hitPoints, cost, spriteImages, defaults);
    this.defaults.type = 'units';
    this.radius = radius;
    this.range = range;
    this.moveSpeed = moveSpeed;
    this.interactSpeed = interactSpeed;
    this.firePower = firePower;
    this.builtFrom = builtFrom;
		this.weaponType = weaponType;
    this.directions = 4;
    this.animationIndex = 0;
    this.imageOffset = 0;
    this.canAttack = true;
    this.canMove = true;
    this.turnSpeed = 2;
    this.speedAdjustmentWhileTurningFactor = 0.5;
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

    game.foregroundContext.fillStyle = (this.lifeCode === "alive") ? lifeBarHealthyFillColor : lifeBarDamagedFillColor;

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

  moveTo(destination, distanceFromDestination) {

    let start = [Math.floor(this.x), Math.floor(this.y)];
    let end = [Math.floor(destination.x), Math.floor(destination.y)];
    let newDirection;
    let villagerOutsideMapBounds = (start[0] < 0 || start[0] >= game.currentMap.mapGridWidth || start[1] < 0 || start[1] >= game.currentMap.mapGridHeight);

    if (!game.currentMapPassableGrid) {
      game.rebuildPassableGrid();
    }
    let villagerReachedDestinationTile = (start[0] == destination[0]) && (start[0] == destination[0]);

    if (villagerOutsideMapBounds || villagerReachedDestinationTile) {
      newDirection = this.findAngle(destination);
      this.orders.path = [
        [this.x, this.y],
        [destination.x, destination.y]
      ];
    } else {
      let grid;
      // if (destination.type == "buildings" || destination.type == "terrain") {
        if (destination.type == "buildings") {
        grid = game.makeArrayCopy(game.currentMapPassableGrid);

        grid[Math.floor(destination.x), Math.floor(destination.y)] = 0;
      } else {
        grid = game.currentMapPassableGrid;
      }

      this.orders.path = AStar(grid, start, end, "Euclidean");
      // console.log("path length "+this.orders.path.length );
      //console.log(this.orders.path);
      if (this.orders.path.length > 1) {
        let nextStep = {
          x: this.orders.path[1][0] + 0.5,
          y: this.orders.path[1][1] + 0.5
        };

        newDirection = this.findAngle(nextStep);
      } else {
        return false;
      }

      let collisionObjects = this.checkForCollisions(game.currentMapPassableGrid);

      if (this.colliding) {
        newDirection = this.steerAwayFromCollision(collisionObjects);
        // console.log("new direction: " + newDirection);
      }
      this.turnTo(newDirection);
      let maximumMovement = this.moveSpeed * (this.turning ? this.speedAdjustmentWhileTurningFactor : 1);
      let movement = Math.min(distanceFromDestination, maximumMovement);

      if (this.hardCollision) {
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

  findAngle(destination) {
    let dy = destination.y - this.y;
    let dx = destination.x - this.x;

    let angle = this.directions / 2 - (Math.atan2(dx, dy) * this.directions / (2 * Math.PI));

    angle = (angle + this.directions) % this.directions;
    return angle;
  }

  turnTo(newDirection) {
    // console.log("direction in turnTo function "+this.direction);
    let difference = this.angleDiff(newDirection);
    let turnAmount = this.turnSpeed * this.speedAdjustmentWhileTurningFactor;

    if (Math.abs(difference) > turnAmount) {
      this.direction += turnAmount * Math.abs(difference) / difference;
      this.direction = (this.direction + this.directions) % this.directions;
      this.turning = true;
      // console.log("still turning!!!!");

    } else {
      this.direction = newDirection;
      this.turning = false;
      // console.log("turned!!!!");
    }
  }

  angleDiff(newDirection) {
    let currDirection = this.direction;
    // console.log("direction in angleDiff function "+this.direction);
    let directions = this.directions;

    if (currDirection >= directions / 2) {
      currDirection -= directions;
    }

    if (newDirection >= directions / 2) {
      newDirection -= directions;
    }

    var diff = newDirection - currDirection;

    if (diff < -directions / 2) {
      diff += directions;
    }

    if (diff > directions / 2) {
      diff -= directions;
    }
    // console.log(diff);
    return diff;
  }

  checkForCollisions(grid) {
    let movement = this.moveSpeed * (this.turning ? this.speedAdjustmentWhileTurningFactor : 1);

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
    let x2 = Math.min(Math.floor(newX) + 3, game.currentMap.mapGridWidth - 1);
    let y1 = Math.max(0, Math.floor(newY) - 3);
    let y2 = Math.min(Math.floor(newY) + 3, game.currentMap.mapGridHeight - 1);

    let gridHardCollisionThreshold = Math.pow(this.radius * 0.9 / game.gridSize, 2);
    let gridSoftCollisionThreshold = Math.pow(this.radius * 1.1 / game.gridSize, 2);

    for (let j = x1; j <= x2; j++) {
      for (let i = y1; i <= y2; i++) {
        if (grid[i][j] == 1) {
          let distanceSquared = Math.pow(j + 0.5 - newX, 2) + Math.pow(i + 0.5 - newY, 2);
          if (distanceSquared < gridHardCollisionThreshold) {
            collisionObjects.push({
              collisionType: "hard",
              with: {
                type: "wall",
                x: j + 0.5,
                y: i + 0.5
              }
            });
            this.colliding = true;
            this.hardCollision = true;
          } else if (distanceSquared < gridSoftCollisionThreshold) {
            collisionObjects.push({
              collisionType: "soft",
              with: {
                type: "wall",
                x: j + 0.5,
                y: i + 0.5
              }
            });
            this.colliding = true;
          }
        }
      }
    }

    for (let i = game["units"].length - 1; i >= 0; i--) {
      let unit = game["units"][i];
      // console.log("game unit is: " + game["units"][i].x + " " + game["units"][i].y);
      if (unit != this && Math.abs(unit.x - this.x) < 3 && Math.abs(unit.y - this.y) < 3) {
        if (Math.pow(unit.x - newX, 2) + Math.pow(unit.y - newY, 2) < Math.pow((this.radius + unit.radius) / game.gridSize, 2)) {
          collisionObjects.push({
            collisionType: "hard",
            with: unit
          });
          this.colliding = true;
          this.hardCollision = true;
        } else if (Math.pow(unit.x - newX, 2) + Math.pow(unit.y - newY, 2) < Math.pow((this.radius * 1.5 + unit.radius) / game.gridSize, 2)) {
          collisionObjects.push({
            collisionType: "soft",
            with: unit
          });
          this.colliding = true;
        }
      }

    }


    return collisionObjects;

  }

  steerAwayFromCollision(collisionObjects) {
    let forceVector = {
      x: 0,
      y: 0
    };
    collisionObjects.push({
      collisionType: "attraction",
      with: {
        x: this.orders.path[1][0] + 0.5,
        y: this.orders.path[1][1] + 0.5
      }
    });

    for (let i = collisionObjects.length - 1; i >= 0; i--) {
      let collObject = collisionObjects[i];

      let objectAngle = this.findAngle(collObject.with);
      let objectAngleRadians = -(objectAngle / this.directions) * 2 * Math.PI;

      let forceMagnitude;

      switch (collObject.collisionType) {
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

    let newDirection = this.directions / 2 - (Math.atan2(forceVector.x, forceVector.y) * this.directions / (2 * Math.PI));
    // console.log("new direction: " + newDirection);
    newDirection = (newDirection + this.directions) % this.directions;

    return newDirection;

  }

  //default draw sprite for units
  drawSprite() {
    let x = this.drawingX;
    let y = this.drawingY;
    let colorIndex = this.team;
    let colorOffset = colorIndex * this.pixelHeight;
    // this.imageOffset = 0;
    game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight,
      x, y, this.pixelWidth, this.pixelHeight);
  }

  processActions() {
    let direction = Math.round(this.direction) % this.directions;
    switch (this.action) {
      case "stand":
        this.imageList = this.spriteArray["stand-" + direction];
        this.imageOffset = this.imageList.offset + this.animationIndex;
        this.animationIndex++;

        if (this.animationIndex >= this.imageList.count) {
          this.animationIndex = 0;
        }
        break;
      case "harvest_timber":
        game.economy[game.userHouse]["timber"] += .1;
        this.action = "stand";
        break;
      case "harvest_wheat":
        game.economy[game.userHouse]["wheat"] += .1;
        this.action = "stand";
        break;
    }
  }
  processOrders() {
    this.lastMovementX = 0;
    this.lastMovementY = 0;
    if (this.orders.to) {
      var distanceFromDestination = Math.pow(Math.pow(this.orders.to.x - this.x, 2) + Math.pow(this.orders.to.y - this.y, 2), 0.5);
      var radius = this.radius / game.gridSize;
    }
    // console.log(this.orders.to);
    if (this.reloadTimeLeft) {
      this.reloadTimeLeft--;
    }
    var targets;
    switch (this.orders.type) {
      case "move":
        if (distanceFromDestination < radius) {
          this.orders = {
            type: "stand"
          };
        } else {
          let moving = this.moveTo(this.orders.to, distanceFromDestination);
          if (!moving) {
            this.orders = {
              type: "stand"
            };
          }
        }
        break;

      case "sentry":
        // Look for targets upto 2 squares beyond sight range
        targets = this.findTargetsInSight(2);

        if (targets.length > 0) {
          this.orders = {
            type: "attack",
            to: targets[0],
            previousOrder: this.orders
          };
        }

        break;

      case "hunt":
        // Look for targets anywhere on the map
        targets = this.findTargetsInSight(100);

        if (targets.length > 0) {
          this.orders = {
            type: "attack",
            to: targets[0],
            previousOrder: this.orders
          };
        }

        break;

      case "attack":

        // If the target is no longer valid, cancel the current order
        if (!this.isValidTarget(this.orders.to)) {
          this.cancelCurrentOrder();
          break;
        }

        // Check if vehicle is within sight range of target
        if (this.isTargetInSight(this.orders.to)) {
          // Turn toward target and then start attacking when within range of the target
          var targetDirection = this.findAngleForFiring(this.orders.to);
          // Turn towards target direction if necessary
          this.turnTo(targetDirection);

          // Check if vehicle has finished turning
          if (!this.turning) {
            // If reloading has completed, fire bullet
            if (!this.reloadTimeLeft) {
              // this.reloadTimeLeft = bullets.list[this.weaponType].reloadTime;
              this.reloadTimeLeft = 30;

              var angleRadians = -(targetDirection / this.directions) * 2 * Math.PI;
              var bulletX = this.x - (this.radius * Math.sin(angleRadians) / game.gridSize);
              var bulletY = this.y - (this.radius * Math.cos(angleRadians) / game.gridSize);

              var newWeapon = weapons[this.weaponType].add();
              newWeapon.x = bulletX;
              newWeapon.y = bulletY;
              newWeapon.direction = targetDirection,
              newWeapon.target = this.orders.to
              game.add(newWeapon);

            }
          }

        } else {
          // Move towards the target
          this.moveTo(this.orders.to, distanceFromDestination);
        }

        break;

      case "patrol":
        targets = this.findTargetsInSight(1);

        if (targets.length > 0) {
          // Attack the target, but save the patrol order as previousOrder
          this.orders = {
            type: "attack",
            to: targets[0],
            previousOrder: this.orders
          };
          break;
        }

        // Move toward destination until it is inside of sight range
        if (distanceFromDestination < this.sight) {
          // Swap to and from locations
          var to = this.orders.to;

          this.orders.to = this.orders.from;
          this.orders.from = to;

        } else {
          // Move towards the next destination
          this.moveTo(this.orders.to, distanceFromDestination);
        }

        break;

      case "guard":
      console.log("guarding! ");

        // If the item being guarded is dead, cancel the current order
        if (this.orders.to.lifeCode === "dead") {
          this.cancelCurrentOrder();
          break;
        }
        // If the target is inside of sight range
        if (distanceFromDestination < this.sight) {
          // Find any enemies near
          targets = this.findTargetsInSight(1);
          if (targets.length > 0) {
            // Attack the nearest target, but save the guard order as previousOrder
            this.orders = {
              type: "attack",
              to: targets[0],
              previousOrder: this.orders
            };
            break;
          }
        } else {
          // Move towards the target
          this.moveTo(this.orders.to, distanceFromDestination);
        }

        break;
    }
  }

  findAngleForFiring(target) {
    var dy = target.y - this.y;
    var dx = target.x - this.x;

    // Adjust dx and dy to point towards center of target
    if (target.type === "buildings") {
      dy += target.baseWidth / 2 / game.gridSize;
      dx += target.baseHeight / 2 / game.gridSize;
    }
    // else if (target.type === "units") {
    //     dy -= target.pixelShadowHeight / game.gridSize;
    // }

    // Adjust dx and dy to start from center of source
    if (this.type === "buildings") {
      dy -= this.baseWidth / 2 / game.gridSize;
      dx -= this.baseHeight / 2 / game.gridSize;
    }
    // else if (this.type === "units") {
    //     dy += this.pixelShadowHeight / game.gridSize;
    // }

    // Convert arctan to value between (0 - directions)
    var angle = this.directions / 2 - (Math.atan2(dx, dy) * this.directions / (2 * Math.PI));

    angle = (angle + this.directions) % this.directions;

    return angle;
  }

  isValidTarget(item) {
    // Cannot target units that are dead or from the same team
    if (!item || item.lifeCode === "dead" || item.team == game.userHouse) {
      return false;
    }

    if (item.type === "buildings" || item.type === "units") {
      return this.canAttack;
    }

  }

  isTargetInSight(item, sightBonus = 0) {
    return Math.pow(item.x - this.x, 2) + Math.pow(item.y - this.y, 2) <
      Math.pow(this.sight + sightBonus, 2);
  }

  findTargetsInSight(sightBonus = 0) {
    var targets = [];
    game.items.forEach(function(item) {
      if (this.isValidTarget(item) && this.isTargetInSight(item, sightBonus)) {
        targets.push(item);
      }
    }, this);

    // Sort targets based on distance from attacker
    var attacker = this;

    targets.sort(function(a, b) {
      return (Math.pow(a.x - attacker.x, 2) + Math.pow(a.y - attacker.y, 2)) - (Math.pow(b.x - attacker.x, 2) + Math.pow(b.y - attacker.y, 2));
    });

    return targets;
  }

  // Get back to the previous order if any, otherwise just stand
  cancelCurrentOrder() {
    if (this.orders.previousOrder) {
      this.orders = this.orders.previousOrder;
    } else {
      this.orders = {
        type: "stand"
      };
    }
  }

}
