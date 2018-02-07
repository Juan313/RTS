//array of all units
import { villager } from './villager.js';
import { knight } from './knight.js';
import { militia } from './militia.js';
import { melisandre } from './melisandre.js';
import { direwolf } from './direwolf.js';

//set up special unit actions
let melisandreUnit = melisandre.add();
let direwolfUnit = direwolf.add();
direwolfUnit.special.action = direwolfUnit.special.action(direwolfUnit);
melisandreUnit.special.action = melisandreUnit.special.action(melisandreUnit);

export let units = {
  "villager": villager.add(),
  "knight": knight.add(),
  "militia": militia.add(),
	"melisandre": melisandreUnit,
	"direwolf": direwolfUnit
}


