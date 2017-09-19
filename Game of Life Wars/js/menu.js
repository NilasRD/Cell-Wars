var menuState = {
    create: function(){
        game.stage.backgroundColor = "#F0D04D"
        
        var nameLabel01 = game.add.text(game.world.centerX, 60, "CELL",{font: "bold 40px Arial", fill: "#ffffff"});
        var nameLabel02 = game.add.text(game.world.centerX, 90, "WARS",{font: "bold 40px Arial", fill: "#ffffff"});
        
nameLabel01.anchor.setTo(0.5,0.5);
nameLabel02.anchor.setTo(0.5,0.5);
        
        var startLabel = game.add.text(game.world.centerX, game.world.height-120, "PRESS SPACE TO START",{font: "bold 25px Arial", fill: "#ffffff"});
startLabel.anchor.setTo(0.5,0.5);
               
      //  var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var tKey = game.input.keyboard.addKey(Phaser.Keyboard.T);
       // upKey.onDown.addOnce(this.start,this);
         wKey.onDown.addOnce(this.start,this);
        tKey.onDown.addOnce(this.startTest,this);
              
        //tween title
        game.add.tween(nameLabel01).from({y: -80},1000).easing(Phaser.Easing.Elastic.Out).start();
         game.add.tween(nameLabel02).from({y: -80},1100).easing(Phaser.Easing.Elastic.Out).start();
         game.add.tween(startLabel).from({y: game.height+50},1500).easing(Phaser.Easing.Elastic.Out).start();
        
        
    },
    start: function (){
        game.global.testGame = false;
        game.state.start("play");
    },
    startTest: function (){
        game.global.testGame = true;
        game.state.start("play");
    },
    toggleSound: function(){
        game.sound.mute = ! game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1 : 0;
    }
}