var game =
{
  init: function(){
    // document.getElementById("gamecontainer").style.width = document.body.clientWidth+"px";
    // document.getElementById("gamecontainer").style.height = document.body.clientWidth/16*9+"px";
    game.canvas = document.getElementById("gamecanvas");
    game.canvas.width = 1120;
    game.canvas.height = 630 ;
    this.hideScreens();
    this.showScreen("gamestartscreen");

  },
  hideScreens: function(){
    var screens = document.getElementsByClassName("gamelayer");
    for (var i = 0; i<screens.length; i++){
      screens[i].style.display="none";
    }
  },
  showScreen:function(id){
    var screen = document.getElementById(id);
    screen.style.display="block";
  }

  showLevelScreen: function(){
    this.hideScreens();
    this.showScreen("levelselectscreen");
  }
}

// Intialize game once page has fully loaded
window.addEventListener("load", function() {
    game.init();

});
