var loadState ={
    preload: function(){
        var loadingLabel = game.add.text(game.world.centerX,150,"loading...", {font:"30px Arial", fill: "#ffffff"});
        loadingLabel.anchor.setTo(0.5,0.5);
        
        var progressBar = game.add.sprite(game.world.centerX,200,"progressBar");
        progressBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(progressBar);
       // game.load.image("background","assets/background.png");
       
   
        
        
        
        //load sounds
        game.load.audio('addCellSnd', ['assets/addCell.wav']);
        game.load.audio('removeCellSnd', ['assets/removeCell.wav']);
        game.load.audio('startSimSnd', ['assets/startSim.wav']);
        game.load.audio('bd01Snd', ['assets/bd01.wav']);
        game.load.audio('bd02Snd', ['assets/bd02.wav']);
        game.load.audio('deadSnd', ['assets/dead.wav']);
        game.load.audio('stringsSnd', ['assets/strings.wav']);
        game.load.audio('clapSnd', ['assets/clap.wav']);
        game.load.audio('bassSnd', ['assets/bass.wav']);
    },
    create: function(){
        game.state.start("menu");
    }
};