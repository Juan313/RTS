//array of all units
import { villager } from './villager.js';
import { knight } from './knight.js';
import { militia } from './militia.js';
import { melisandre } from './melisandre.js';
import { direwolf } from './direwolf.js';
import { warship } from './warship.js';
import { dragon } from './dragon.js';

export let units = {
  "villager": villager.add(),
  "knight": knight.add(),
  "militia": militia.add(),
	"melisandre": melisandre.add(),
	"direwolf": direwolf.add(),
	"warship": warship.add(),
	"dragon": dragon.add()
}
