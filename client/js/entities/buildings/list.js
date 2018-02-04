//array of all buildings
import { castle } from './castle.js';
import { barrack } from './barrack.js';
import { stable } from './stable.js';

export let buildings = {
  "castle": castle.add(),
  "barrack": barrack.add(),
  "stable": stable.add(),
}

//export let buildings = [ castle, barrack, stable ];
