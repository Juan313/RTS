import {
  game
} from './game.js';
var resourcebar = {
  init: function(){
    this.wheat = document.getElementById("wheat");
    this.timber = document.getElementById("timber");
  },

  animate: function() {
        // Display the current cash balance value
        this.updateResource(game.economy[game.userHouse]);

  },

  _resource: undefined,
  updateResource: function(r){
    if (this._resource !== r){
      this._resource = r;
      this.wheat.innerHTML = "W: "+r.wheat.toLocaleString();
      this.timber.innerHTML = "T: "+r.timber.toLocaleString();
    }

  }
}
export {resourcebar};
