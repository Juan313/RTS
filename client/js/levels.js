import {game} from './game.js';

var initialGameState = {

  "0": [
    {"type": "buildings", "name": "castle", "x": 5, "y": 5, "life": 2000},
    {"type": "buildings", "name": "stable", "x": 9, "y": 9},
    {"type": "buildings", "name": "barrack", "x": 13, "y": 5},
    {"type": "units", "name": "villager", "x": 5, "y": 5, "life": 70},
    {"type": "units", "name": "villager", "x": 2, "y": 4, "direction": 2},
    {"type": "units", "name": "militia", "x": 9, "y": 5, "direction": 2},
    {"type": "units", "name": "knight", "x": 11, "y": 5, "direction": 2},
  ],

  "1": [
    {"type": "buildings", "name": "castle", "x": 55, "y": 5},
    {"type": "buildings", "name": "stable", "x": 50, "y": 5},
    {"type": "buildings", "name": "barrack", "x": 55, "y": 10},
    {"type": "units", "name": "villager", "x": 50, "y": 3},
    {"type": "units", "name": "militia", "x": 52, "y": 3},
    {"type": "units", "name": "knight", "x": 54, "y": 3},
  ],

  "2": [
    {"type": "buildings", "name": "castle", "x": 5, "y": 50},
    {"type": "buildings", "name": "stable", "x": 10, "y": 50},
    {"type": "buildings", "name": "barrack", "x": 2, "y": 50},
    {"type": "units", "name": "villager", "x": 6, "y": 55},
    {"type": "units", "name": "militia", "x": 8, "y": 55},
    {"type": "units", "name": "knight", "x": 10, "y": 55},
  ],

  "3": [
    {"type": "buildings", "name": "castle", "x": 40, "y": 30},
    {"type": "buildings", "name": "stable", "x": 35, "y": 25},
    {"type": "buildings", "name": "barrack", "x": 35, "y": 30},
    {"type": "units", "name": "villager", "x": 42, "y": 25},
    {"type": "units", "name": "militia", "x": 44, "y": 25},
    {"type": "units", "name": "knight", "x": 46, "y": 25},
  ],

  "4": [
    {"type": "buildings", "name": "castle", "x": 70, "y": 50},
    {"type": "buildings", "name": "stable", "x": 70, "y": 47},
    {"type": "buildings", "name": "barrack", "x": 65, "y": 50},
    {"type": "units", "name": "villager", "x": 66, "y": 55},
    {"type": "units", "name": "militia", "x": 68, "y": 55},
    {"type": "units", "name": "knight", "x": 70, "y": 55},
  ],

}
export {initialGameState};
