//array of all buildings
import { castle } from './castle.js';
import { barrack } from './barrack.js';
import { stable } from './stable.js';
import { dock } from './dock.js';


export let buildings = {
  "castle": castle.add(),
  "barrack": barrack.add(),
  "stable": stable.add(),
	"dock": dock.add()
}


