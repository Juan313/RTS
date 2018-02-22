//array of all units
import { villager } from './villager.js';
import { knight } from './knight.js';
import { militia } from './militia.js';
import { melisandre } from './melisandre.js';
import { direwolf } from './direwolf.js';
import { warship } from './warship.js';
import { dragon } from './dragon.js';

let direwolfUnit = direwolf.add();
direwolfUnit.special.action = direwolfUnit.special.action(direwolfUnit);
let warshipUnit = warship.add();
warshipUnit.special.transport = warshipUnit.special.transport(warshipUnit);
warshipUnit.special.release = warshipUnit.special.release(warshipUnit);
let dragonUnit = dragon.add();
dragonUnit.special.action = dragonUnit.special.action(dragonUnit);

export let units = {
  "villager": villager.add(),
  "knight": knight.add(),
  "militia": militia.add(),
	"melisandre": melisandre.add(),
	"direwolf": direwolfUnit,
	"warship": warshipUnit,
	"dragon": dragonUnit
}
