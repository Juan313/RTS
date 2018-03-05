import {
  game
} from './game.js';
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
        return (!game.userCastleAlive);
      },
      "action": function() {
        game.endGame(false);
      }
    },

  ];
  export {
    triggers
  };
