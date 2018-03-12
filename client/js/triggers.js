import {
  game
} from './game.js';
import {
  buildings
} from './entities/buildings/list.js';
import {
  units
} from './entities/units/list.js';

var triggers = [
    /* Timed Events*/
    {
      "type": "timed",
      "time": 1000,
      "action": function() {
        game.showMessage("system", "You have 10 minutes to destroy the enemy's castle.\nGood luck!");
      }
    },
    {
      "type": "timed",
      "time": 600000,
      "action": function() {
        game.endGame(false);
      }
    },
    /* Conditional Event */
    {
      "type": "conditional",
      "condition": function() {
        return (!game.AICastleAlive);
      },
      "action": function() {
        game.endGame(true);
      }
    },

    {
      "type": "conditional",
      "condition": function() {
        return (game.getUserCastleUID() == -1);
      },
      "action": function() {
        game.endGame(false);
      }
    },
    // AI building stable
    {
      "type": "timed",
      "time": 10000,
      "action": function() {
        if (game.difficulty === 'hard')
          game.endGame(false);
        else{}

      }
    },
    {
      "type": "timed",
      "time": 1000,
      "repeat": false,
      "action": function() {
        if (game.AIVillagerNotHarvesting() != -1){
          var villager = game.AIVillagerNotHarvesting();
          game.sendCommand([villager], {
            type: "move",
            to: game.findRandomTerrain()
          });
        }
      }
    },
    // make sure there's are at least two villagers
    // {
    //   "type": "timed",
    //   "time": 11000,
    //   "repeat": true,
    //   "action": function() {
    //     if (game.getAIVillagerUID().length <= 1)
    //       var AIcastle = game.getAICastleUID();
    //       let details = units["villager"].add();
    //       game.sendCommand([AIcastle], {
    //         type: "construct-unit",
    //         details: details
    //       });
    //       game.sendCommand([AIcastle], { type: "construct-unit", details: details });
    //   }
    // },

    {
      "type": "timed",
      "time": 11000,
      "repeat": true,
      "action": function() {
        if (game.economy[parseInt(game.AIHouse)].wheat< 1000 || game.economy[parseInt(game.AIHouse)].timber< 1000){
          var wheat = game.economy[parseInt(game.AIHouse)].wheat;
          var timber =game.economy[parseInt(game.AIHouse)].timber;

          var target = {};
          if (wheat < timber){
            target = game.findRandomWheat();
          } else {
            target = game.findRandomTimber();
          }
          var villager = game.AIVillagerNotHarvesting();
          if (villager != -1){
            game.sendCommand([villager], {
              type: "move",
              to: target
            });
          } else {
            var AIcastle = game.getAICastleUID();
            let details = units["villager"].add();
            game.sendCommand([AIcastle], {
              type: "construct-unit",
              details: details
            });
            villager = game.AIVillagerNotHarvesting();
            if (villager != -1){
              game.sendCommand([villager], { type: "move",
              to: target});
            }

          }
        }
      }
    },

    {
      "type": "timed",
      "time": 13000,
      "repeat": true,
      "action": function() {
        if (game.hasStable() == -1){

          var AIcastle = game.getAICastleUID();
          let details = buildings["stable"].add();
          details.x = 20;
          details.y = 45;
          game.sendCommand([AIcastle], { type: "construct-building", details: details });
          return;
        }
      }
    },
    {
      "type": "timed",
      "time": 12000,
      "repeat": true,
      "action": function() {
        if (game.hasBarrack() == -1){

          var AIcastle = game.getAICastleUID();
          let details = buildings["barrack"].add();
          details.x = 25;
          details.y = 45;
          game.sendCommand([AIcastle], { type: "construct-building", details: details });
          return;
        }
      }
    },
    {
      "type": "timed",
      "time": 9000,
      "repeat": true,
      "action": function() {
        if (game.hasStable() != -1){
          var AIStable = game.hasStable();
          let details = units["knight"].add();
          game.sendCommand([AIStable], { type: "construct-unit", details: details });
          return;
        }
      }
    },
    {
      "type": "timed",
      "time": 8000,
      "repeat": true,
      "action": function() {
        if (game.hasStable() != -1){
          var AIStable = game.hasBarrack();
          let details = units["militia"].add();
          game.sendCommand([AIStable], { type: "construct-unit", details: details });
          return;
        }
      }
    },

    {
      "type": "timed",
      "time": 7000,
      "repeat": true,
      "action": function() {
        var AICombats = game.getAICombatUnits();
        if (AICombats.length > 0){
          var userVillagerUid = game.getAUserVillagerUid();
          if (userVillagerUid != -1){
            game.sendCommand([AICombats[0]], {
              type: "attack",
              toUid: userVillagerUid
            });
          }
        }
      }
    },

    {
      "type": "timed",
      "time": 31000,
      "repeat": true,
      "action": function() {
        var AICombats = game.getAICombatUnits();
        if (AICombats.length > 0){
          game.sendCommand(AICombats, {
            type: "hunt",
            details: null
          });

        }
      }
    },




  ];


  export {
    triggers
  };
