//array of all units
import { villager } from './villager.js';
import { knight } from './knight.js';
import { militia } from './militia.js';
import { melisandre } from './melisandre.js';

export let units = {
  "villager": villager.add(),
  "knight": knight.add(),
  "militia": militia.add(),
	"melisandre": melisandre.add()
}


