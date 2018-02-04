//array of all units
import { villager } from './villager.js';
import { knight } from './knight.js';
import { militia } from './militia.js';

export let units = {
  "villager": villager.add(),
  "knight": knight.add(),
  "militia": militia.add(),
}


