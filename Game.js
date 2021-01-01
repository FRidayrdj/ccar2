class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('GameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
    GameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var data=await database.ref('PlayerCount').once('value')
     if( data.exists())
     {
       playerCount=data.val();
       player.getCount();
     }
     
      form = new Form()
      form.display();
    }
  }

  play(){
    if(gameState===1)
    {
      form.hide();
      textSize(30);
      text(" Game Start ", 120,100);
      Player.getpInfo();
      if(allPlayers != undefined )
      {
        var Display_position=130;
      for(var i in allPlayers)
      {
        if(i === "player"+player.index){
         fill("red"); 
        }
        else
        {
          fill("black");
        }
        textSize(15)
        text(allPlayers[i].name+": "+allPlayers[i].distance,120,Display_position);
        Display_position+=20;
        
      }
      }
      if (keyIsDown(UP_ARROW)&&player.index != null)
      {
        player.distance += 50;
        player.update();
      }
      
    }
  }

}
