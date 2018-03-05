import {game} from './game.js';

var initialGameState = {

  "0": [
    {"type": "buildings", "name": "castle"},
    // {"type": "buildings", "name": "stable", "x": 9, "y": 9},
    // {"type": "buildings", "name": "barrack", "x": 13, "y": 5},
    {"type": "units", "name": "villager", "direction":2},
    // {"type": "units", "name": "militia", "x": 9, "y": 5, "direction": 2},
    // {"type": "units", "name": "knight", "x": 11, "y": 5, "direction": 2},
    // {"type": "units", "name": "direwolf", "x": 13, "y": 5, "direction": 2}
  ],

  "1": [
    {"type": "buildings", "name": "castle"},
    // {"type": "buildings", "name": "stable", "x": 50, "y": 5},
    // {"type": "buildings", "name": "barrack", "x": 55, "y": 10},
    {"type": "units", "name": "villager", "direction":2},
    // {"type": "units", "name": "militia", "x": 52, "y": 3},
    // {"type": "units", "name": "knight", "x": 54, "y": 3},
  ],

  "2": [
    {"type": "buildings", "name": "castle"},
    // {"type": "buildings", "name": "stable", "x": 10, "y": 50},
    // {"type": "buildings", "name": "barrack", "x": 2, "y": 50},
    {"type": "units", "name": "villager", "direction":2},
    // {"type": "units", "name": "militia", "x": 8, "y": 55, "life": 10},
    // {"type": "units", "name": "knight", "x": 10, "y": 55},
    // {"type": "units", "name": "melisandre", "x": 12, "y": 55, "direction": 2}
  ],

  "3": [
    {"type": "buildings", "name": "castle"},
    // {"type": "buildings", "name": "stable", "x": 35, "y": 25},
    // {"type": "buildings", "name": "barrack", "x": 35, "y": 30},
    {"type": "units", "name": "villager", "direction":2},
    // {"type": "units", "name": "militia", "x": 44, "y": 25},
    // {"type": "units", "name": "knight", "x": 46, "y": 25},
  ],

  "4": [
    {"type": "buildings", "name": "castle"},
    // {"type": "buildings", "name": "stable", "x": 70, "y": 47},
    // {"type": "buildings", "name": "barrack", "x": 65, "y": 50},
    {"type": "units", "name": "dragon"},
    {"type": "units", "name": "villager", "direction":2},
    // {"type": "units", "name": "militia", "x": 68, "y": 55},
    // {"type": "units", "name": "knight", "x": 70, "y": 55},
  ],
  "terrains":[
    {"type": "terrains", "name": "forest", "x": 30, "y": 20},
    // {"type": "terrains", "name": "forest", "x": 31, "y": 20},
    // {"type": "terrains", "name": "forest", "x": 32, "y": 20},
    // {"type": "terrains", "name": "forest", "x": 33, "y": 20},
    // {"type": "terrains", "name": "field", "x": 45, "y": 30},
    // {"type": "terrains", "name": "field", "x": 45, "y": 31},
    // {"type": "terrains", "name": "field", "x": 45, "y": 32},
    {"type": "terrains", "name": "field", "x": 45, "y": 33},
  ]

}
export {initialGameState};
