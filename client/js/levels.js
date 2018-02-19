import {game} from './game.js';

var initialGameState = {

  "0": [
    {"type": "buildings", "name": "castle", "x": 5, "y": 5, "life": 2000},
    {"type": "buildings", "name": "stable", "x": 9, "y": 9},
    {"type": "buildings", "name": "barrack", "x": 13, "y": 5},
    {"type": "units", "name": "villager", "x": 5, "y": 5, "life": 70},
    {"type": "units", "name": "villager", "x": 2, "y": 4, "direction": 2},
  ],

  "1": [
    {"type": "buildings", "name": "castle", "x": 15, "y": 15},
    {"type": "buildings", "name": "stable", "x": 19, "y": 19},
    {"type": "buildings", "name": "stable", "x": 23, "y": 15},
    {"type": "buildings", "name": "barrack", "x": 19, "y": 19},
    {"type": "units", "name": "villager", "x": 15, "y": 15},
  ],

  "2": [
    {"type": "buildings", "name": "castle", "x": 25, "y": 25},
    {"type": "buildings", "name": "stable", "x": 29, "y": 29},
    {"type": "buildings", "name": "stable", "x": 33, "y": 25},
    {"type": "buildings", "name": "barrack", "x": 29, "y": 29},
    {"type": "units", "name": "villager", "x": 25, "y": 25},
  ],

  "3": [
    {"type": "buildings", "name": "castle", "x": 40, "y": 40},
    {"type": "buildings", "name": "stable", "x": 35, "y": 35},
    {"type": "buildings", "name": "stable", "x": 38, "y": 40},
    {"type": "buildings", "name": "barrack", "x": 35, "y": 35},
    {"type": "units", "name": "villager", "x": 30, "y": 30},
  ],

  "4": [
    {"type": "buildings", "name": "castle", "x": 45, "y": 45},
    {"type": "buildings", "name": "stable", "x": 40, "y": 40},
    {"type": "buildings", "name": "stable", "x": 43, "y": 45},
    {"type": "buildings", "name": "barrack", "x": 40, "y": 40},
    {"type": "units", "name": "villager", "x": 35, "y": 35},
  ],

}
export {initialGameState};
