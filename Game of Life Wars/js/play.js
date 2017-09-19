var playState = {
    create: function(){
 
        game.stage.backgroundColor = "#F0D04D";
        //add sounds
        this.addSound = game.add.audio("addCellSnd");
        this.removeSound = game.add.audio("removeCellSnd");
         this.startSound = game.add.audio("startSimSnd");
        this.bd01Sound = game.add.audio("bd01Snd");
        this.bd02Sound = game.add.audio("bd02Snd");
        this.deadSound = game.add.audio("deadSnd");
        this.stringsSound = game.add.audio("stringsSnd");
        this.clapSound = game.add.audio("clapSnd");
        this.bassSound = game.add.audio("bassSnd");
        
        
        this.addSound.volume = 0.5;
        this.removeSound.volume = 0.5;
        this.bd01Sound.volume = 0.9;
        this.bd02Sound.volume = 0.9;
        this.deadSound.volume = 0.8;
        this.stringsSound.volume = 0.5;
        this.clapSound.volume = 0.3;
        //beat
        this.bd1Beat = [1,0,0,0,    1,0,0,0,    0,0,0,0,    1,0,0,0,
                       1,0,0,0,     1,0,0,0,    0,0,0,1,    1,0,0,0];
        this.bd2Beat = [0,0,0,0,    0,0,0,0,    1,0,0,0,    0,0,0,0,
                       0,0,0,0,     0,0,0,0,    1,0,0,0,    0,0,0,0];
        
        this.stringsBeat = [1,0,0,0,    0,0,0,1,    0,0,0,0,    0,0,0,0,
                        1,0,0,0,     0,0,0,1,    0,0,0,0,    0,0,0,0];
        this.clapBeat = [0,0,0,0,    1,0,0,0,    0,0,0,0,    1,0,0,0,
                       0,0,0,0,     1,0,0,0,    0,0,0,0,    1,0,0,0];
        this.bassBeat = [1,0,0,0,    0,0,0,0,    0,0,1,0,    0,0,0,0,
                       1,0,0,0,     0,0,1,0,    0,0,0,0,    0,0,0,0];
        
        this.beat = 1;
        
        this.progression = 1;
        
        //time
        this.bpm = 100;
        this.time = 1000/(this.bpm/15);
        this.swing = this.time/6;
        
         game.time.events.add(this.time-this.swing,this.playBeat, this);
        
        //some stuff
        this.alive = true;
        
        this.stepX = 1;
        this.stepY = 1;
        
        this.active = false;
        
        this.textStyle = { font: "bold 20px Arial", fill: "#fff", boundsAlignH: "center"};
        
        //define size
        this.gridx = 130;
        this.gridy = 76;
        
        this.gridWidth = 8;
        this.gridHeight = 8;
        
        //place
        this.boardPosX = 200;
        this.boardPosY = 20;
        
        //mouse on grid
        this.mouseX = game.input.mousePointer.x;
        this.mouseY = game.input.mousePointer.y;
        
        this.gridCellX = (this.mouseX+this.boardPosX);
        this.gridCellY = (this.mouseY+this.boardPosY);
        
        //draw mouse over rectangle
        this.activeCell = new Phaser.Rectangle(this.gridCellX*8+this.boardPosX,this.gridCellY*8+this.boardPosY,8,8);
        
        this.pointerReact = {thick:2};
        
        //create stages
        this.stageNow = [];
        this.stageNext = [];
        this.stageAdd = [];
        this.isHeart = [];
        
           for (x = 1; x <= this.gridx ; x++) {
                     this.stageNow[x] = [];
                    this.stageNext[x] = [];
                    this.stageAdd[x] = [];
                    this.isHeart[x] = [];
           
                }
            
           for (x = 1; x <= this.gridx ; x++) {
                    for (y = 1; y <= this.gridy ; y++) {
                         this.stageNow[x][y] = 0;
                        this.stageNext[x][y] = 0;
                        this.stageAdd[x][y] = 0;
                        this.isHeart[x][y] = 0;
                      
                    }   
                }
             
        //Gameplay variables
        this.maxGen = 50;
        this.curGen = this.maxGen;
        
        this.roundBricks = 5;
        this.player1Bricks = this.roundBricks;
        this.player2Bricks = 0;
        
        this.currentPlayer = 1;
        
        this.heartSizeX = 5;
        this.heartSizeY = 5;
        
        this.heartColor = "0xED9D56"
        this.heartColorBrick ="0xffddff";
        this.gardenColor = "0xC1DF45"
        this.gardenColorBrick = "0x3297BD";
        this.gridColor = 0xB06420
        
        this.player1HeartPosX = 10;
        this.player1HeartPosY = 5;
        
        this.player2HeartPosX = this.gridx-10;
        this.player2HeartPosY = this.gridy-5;
        
        this.heartTween = {x1: this.player1HeartPosX*this.gridWidth, y1: this.player1HeartPosY*this.gridHeight, width1: this.heartSizeX*this.gridWidth, height1: this.heartSizeY*this.gridHeight , x2: (this.player2HeartPosX-this.heartSizeX)*this.gridWidth, y2: (this.player2HeartPosY-this.heartSizeY)*this.gridHeight, width2: this.heartSizeX*this.gridWidth , height2: this.heartSizeY*this.gridHeight};
    
        
        this.gardenSizeX = 20;
        this.gardenSizeY = 10;
        
        this.player1GardenPosX = this.gridx-10-this.gardenSizeX;
        this.player1GardenPosY = 5;
        
        this.player2GardenPosX = 10;
        this.player2GardenPosY = this.gridy-5-this.gardenSizeY;
                
        this.player1Life = 1;
        this.player2Life = 1;
        
        this.player1Life = this.checkPlayer1Life();
        
        //draw UI
        this.UIposX = 10;
        this.UItween = {y: (this.boardPosX-this.UIposX)/this.maxGen*this.curGen};
        this.UIx = 0;
        this.UIy = 0;
        
        this.UI = game.add.graphics(this.UIposX, this.boardPosY);
        this.UI.beginFill(this.heartColor);
        this.UI.lineStyle(1, this.heartColor, 1);
        this.UI.drawRect(this.UIx,this.UIy,this.UItween.y,this.gridHeight*this.gridy/2);
        
        game.add.tween(this.UI).from({x: -500},1100).easing(Phaser.Easing.Elastic.Out).start();
        
        this.UIPlayerState = game.add.text(10,30,'PLAYER 1',this.textStyle);
        this.UIPlayer1Bricks = game.add.text(10,30,'\n CELLS LEFT: '+this.player1Bricks,this.textStyle);
        
        this.UIPlayer1Bricks.setTextBounds(0,0,this.boardPosX-10,100); 
        this.UIPlayer1Bricks.y = this.UIy+this.gridHeight*this.gridy/4
        this.UIPlayerState.y = this.UIy+this.gridHeight*this.gridy/4
        this.UIPlayerState.setTextBounds(0,0,this.boardPosX-10,100); 
        
        
        
        game.add.tween(this.UIPlayer1Bricks).from({x: -500},900).easing(Phaser.Easing.Elastic.Out).start();
         game.add.tween(this.UIPlayerState).from({x: -500},950).easing(Phaser.Easing.Elastic.Out).start();
        // draw hearts
        this.graphics = game.add.graphics(this.boardPosX, this.boardPosY);
        this.graphics.beginFill(this.heartColor);
        this.graphics.drawRect(this.player1HeartPosX*this.gridWidth,this.player1HeartPosY*this.gridHeight, this.heartSizeX*this.gridWidth,this.heartSizeY*this.gridHeight);
        this.graphics.drawRect((this.player2HeartPosX-this.heartSizeX)*this.gridWidth,(this.player2HeartPosY-this.heartSizeY)*this.gridHeight, this.heartSizeX*this.gridWidth,this.heartSizeY*this.gridHeight);
        // draw gardens
        this.graphics.beginFill(this.gardenColor);
        
        this.graphics.drawRect(this.player1GardenPosX*this.gridWidth,this.player1GardenPosY*this.gridHeight, this.gardenSizeX*this.gridWidth,this.gardenSizeY*this.gridHeight);
        
        this.graphics.drawRect(this.player2GardenPosX*this.gridWidth,this.player2GardenPosY*this.gridHeight, this.gardenSizeX*this.gridWidth,this.gardenSizeY*this.gridHeight);
        
        //draw text/board
         var style = { font: "10px Courier", fill: "#fff"};
         
        
        this.textDraw = game.add.text(this.boardPosX,this.boardPosY,'',style);
        
        //drawBoard
        this.boardGFX = game.add.graphics(this.boardPosX, this.boardPosY);
        this.boardGFX.lineStyle(2, 0xFFFFFF, 1);
        
        this.boardGrid = game.add.graphics(this.boardPosX, this.boardPosY);
        this.boardGrid.lineStyle(1, this.gridColor, 1);
        
        game.add.tween(this.boardGFX).from({x: -500},800).easing(Phaser.Easing.Elastic.Out).start()
        game.add.tween(this.boardGrid).from({x: -500},1150).easing(Phaser.Easing.Elastic.Out).start()
        game.add.tween(this.graphics).from({x: -500},750).easing(Phaser.Easing.Elastic.Out).start()
        
        this.boardDebug01 = game.add.graphics(this.boardPosX, this.boardPosY);
        this.boardDebug01.alpha = 0.5;
        
         for (y = 0; y <= this.gridy ; y++) {
 /*            if (y%5 === 0){
                 this.boardGrid.lineStyle(2, this.gridColor, 1);
             }
             else {
                 this.boardGrid.lineStyle(1, this.gridColor, 1);
             }
 */            
            this.boardGrid.moveTo(0, y*this.gridHeight); 
            this.boardGrid.lineTo(this.gridx*this.gridWidth,y*this.gridHeight);        
         }
        
        for (x = 0; x <= this.gridx ; x++) {
 /*               
            if (x%5 === 0){
                 this.boardGrid.lineStyle(2, this.gridColor, 1);
             }
             else {
                 this.boardGrid.lineStyle(1, this.gridColor, 1);
             }
*/         
            this.boardGrid.moveTo(x*this.gridWidth, 0); 
            this.boardGrid.lineTo(x*this.gridWidth,this.gridy*this.gridHeight);     
        }
        
        //determin heart position
         //is this the heart position???
                  for (x = 0; x < this.heartSizeX ; x++) {
                    for (y = 0; y < this.heartSizeY ; y++) {
                         this.isHeart[x+this.player1HeartPosX+1][y+this.player1HeartPosY+1] = 1;
                    }   
                }  
        
              for (x = 0; x < this.heartSizeX ; x++) {
                    for (y = 0; y < this.heartSizeY ; y++) {
                         this.isHeart[this.player2HeartPosX-x][this.player2HeartPosY-y] = 1;
                    }   
                } 
        
        
        //text stuff
        this.textDraw.lineSpacing = -8;      
        
        line1 = new Phaser.Line(this.boardPosX-1,this.boardPosY+this.gridy*this.gridHeight/2+1,this.boardPosX+(this.gridx*this.gridWidth),this.boardPosY+this.gridy*this.gridHeight/2+1);
        
        this.graphics.lineStyle(5, this.heartColor, 1);
        this.graphics.moveTo(0, this.gridy*this.gridHeight/2); 
        this.graphics.lineTo(this.gridx*this.gridWidth,this.gridy*this.gridHeight/2);  
        
         this.resultStyle = { font: "bold 30px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
        this.resultText = game.add.text(this.boardPosX,this.boardPosY,"",this.resultStyle);
        
        this.resultText.setTextBounds(0,0,this.gridWidth*this.gridx,this.gridHeight*this.gridy);
        
        //draw default stage
        //player 1 heart
        this.stageNow[1+this.player1HeartPosX][1+this.player1HeartPosY] = 1;
        this.stageNow[1+this.player1HeartPosX][2+this.player1HeartPosY] = 1;
        this.stageNow[2+this.player1HeartPosX][1+this.player1HeartPosY] = 1;
        this.stageNow[2+this.player1HeartPosX][2+this.player1HeartPosY] = 1;
        
        this.stageNow[4+this.player1HeartPosX][1+this.player1HeartPosY] = 1;
        this.stageNow[5+this.player1HeartPosX][1+this.player1HeartPosY] = 1;
        this.stageNow[4+this.player1HeartPosX][2+this.player1HeartPosY] = 1;
        this.stageNow[5+this.player1HeartPosX][2+this.player1HeartPosY] = 1;
        
        this.stageNow[1+this.player1HeartPosX][4+this.player1HeartPosY] = 1;
        this.stageNow[1+this.player1HeartPosX][5+this.player1HeartPosY] = 1;
        this.stageNow[2+this.player1HeartPosX][4+this.player1HeartPosY] = 1;
        this.stageNow[2+this.player1HeartPosX][5+this.player1HeartPosY] = 1;
        
        this.stageNow[4+this.player1HeartPosX][4+this.player1HeartPosY] = 1;
        this.stageNow[5+this.player1HeartPosX][4+this.player1HeartPosY] = 1;
        this.stageNow[4+this.player1HeartPosX][5+this.player1HeartPosY] = 1;
        this.stageNow[5+this.player1HeartPosX][5+this.player1HeartPosY] = 1;
        
        //player 1 barricades
        this.stageNow[this.player1HeartPosX][15+this.player1HeartPosY] = 1;
        this.stageNow[1+this.player1HeartPosX][15+this.player1HeartPosY] = 1;
        this.stageNow[2+this.player1HeartPosX][15+this.player1HeartPosY] = 1;
        
        this.stageNow[8+this.player1HeartPosX][15+this.player1HeartPosY] = 1;
        this.stageNow[9+this.player1HeartPosX][15+this.player1HeartPosY] = 1;
        this.stageNow[10+this.player1HeartPosX][15+this.player1HeartPosY] = 1;

        this.stageNow[16+this.player1HeartPosX][15+this.player1HeartPosY] = 1;
        this.stageNow[17+this.player1HeartPosX][15+this.player1HeartPosY] = 1;
        this.stageNow[18+this.player1HeartPosX][15+this.player1HeartPosY] = 1;
        
        this.stageNow[24+this.player1HeartPosX][12+this.player1HeartPosY] = 1;
        this.stageNow[24+this.player1HeartPosX][11+this.player1HeartPosY] = 1;
        this.stageNow[24+this.player1HeartPosX][10+this.player1HeartPosY] = 1;
        
        this.stageNow[24+this.player1HeartPosX][7+this.player1HeartPosY] = 1;
        this.stageNow[24+this.player1HeartPosX][6+this.player1HeartPosY] = 1;
        this.stageNow[24+this.player1HeartPosX][5+this.player1HeartPosY] = 1;
        
        this.stageNow[24+this.player1HeartPosX][2+this.player1HeartPosY] = 1;
        this.stageNow[24+this.player1HeartPosX][1+this.player1HeartPosY] = 1;
        this.stageNow[24+this.player1HeartPosX][0+this.player1HeartPosY] = 1;
       
        
        //player 2 heart
        this.stageNow[this.player2HeartPosX-0][this.player2HeartPosY-0] = 1;
        this.stageNow[this.player2HeartPosX-0][this.player2HeartPosY-1] = 1;
        this.stageNow[this.player2HeartPosX-1][this.player2HeartPosY-0] = 1;
        this.stageNow[this.player2HeartPosX-1][this.player2HeartPosY-1] = 1;
        
        this.stageNow[this.player2HeartPosX-3][this.player2HeartPosY-0] = 1;
        this.stageNow[this.player2HeartPosX-4][this.player2HeartPosY-0] = 1;
        this.stageNow[this.player2HeartPosX-3][this.player2HeartPosY-1] = 1;
        this.stageNow[this.player2HeartPosX-4][this.player2HeartPosY-1] = 1;
        
        this.stageNow[this.player2HeartPosX-0][this.player2HeartPosY-3] = 1;
        this.stageNow[this.player2HeartPosX-0][this.player2HeartPosY-4] = 1;
        this.stageNow[this.player2HeartPosX-1][this.player2HeartPosY-3] = 1;
        this.stageNow[this.player2HeartPosX-1][this.player2HeartPosY-4] = 1;
        
        this.stageNow[this.player2HeartPosX-3][this.player2HeartPosY-3] = 1;
        this.stageNow[this.player2HeartPosX-4][this.player2HeartPosY-3] = 1;
        this.stageNow[this.player2HeartPosX-3][this.player2HeartPosY-4] = 1;
        this.stageNow[this.player2HeartPosX-4][this.player2HeartPosY-4] = 1;
        
        //player 2 barricades
        this.stageNow[this.player2HeartPosX+1][this.player2HeartPosY-14] = 1;
        this.stageNow[this.player2HeartPosX][this.player2HeartPosY-14] = 1;
        this.stageNow[this.player2HeartPosX-1][this.player2HeartPosY-14] = 1;
        
        this.stageNow[this.player2HeartPosX-7][this.player2HeartPosY-14] = 1;
        this.stageNow[this.player2HeartPosX-8][this.player2HeartPosY-14] = 1;
        this.stageNow[this.player2HeartPosX-9][this.player2HeartPosY-14] = 1;

        this.stageNow[this.player2HeartPosX-15][this.player2HeartPosY-14] = 1;
        this.stageNow[this.player2HeartPosX-16][this.player2HeartPosY-14] = 1;
        this.stageNow[this.player2HeartPosX-17][this.player2HeartPosY-14] = 1;
        
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY-11] = 1;
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY-10] = 1;
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY-9] = 1;
        
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY-6] = 1;
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY-5] = 1;
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY-4] = 1;
        
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY-1] = 1;
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY] = 1;
        this.stageNow[this.player2HeartPosX-23][this.player2HeartPosY+1] = 1;
        
        //this.textUpdate();
        this.graphicsUpdate();
        
        this.player1Life = this.checkPlayer1Life();
        this.player1Life = this.checkPlayer2Life();
        
       //keyboard input
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // spaceKey.onDown.addOnce(this.doSomething,this);
        this.spaceKey.onDown.addOnce(this.startSim,this);
        
         game.time.events.add(50,this.doSomething, this);
    },
   update: function(){
       document.addEventListener('contextmenu', event => event.preventDefault());
       
     // DEBUG MODE
       /* 
      this.boardDebug01.clear();
       
                    for (y = 1; y <= this.gridy ; y++) {
                   for (x = 1; x <= this.gridx ; x++) {
                        
                                                 
                       if (this.stageNext[x][y] === 1){
                           
                           this.boardDebug01.beginFill(0x000000);
                             this.boardDebug01.lineStyle(1, 0x000000, 1);
                           
                           
                          this.boardDebug01.drawRect(x*this.gridWidth-this.gridWidth,y*this.gridHeight-this.gridHeight,this.gridWidth,this.gridHeight);
                           this.boardDebug01.endFill();
                       }
                }
                    }
       */
       
       if (this.alive){
       this.mouseX = game.input.mousePointer.x;
       this.mouseY = game.input.mousePointer.y;
       this.gridCellX = ~~((this.mouseX-this.boardPosX)/this.gridWidth)+1,5;
       this.gridCellY = ~~((this.mouseY-this.boardPosY)/this.gridHeight)+1,5;
       this.activeCell.x = this.gridCellX*this.gridWidth+2;
       this.activeCell.y = this.gridCellY*this.gridHeight+2;
       
       if (this.currentPlayer === 1){
       if (this.gridCellX > this.gridx){
           this.gridCellX = this.gridx;
       }
       if (this.gridCellY > this.gridy/2){
           this.gridCellY = this.gridy/2;
       }
       if (this.gridCellX < 1){
           this.gridCellX = 1;
       }
       if (this.gridCellY < 1){
           this.gridCellY = 1;
       }
       }
         
        if (this.currentPlayer === 2){
            if (this.gridCellX > this.gridx){
           this.gridCellX = this.gridx;
            }
            if (this.gridCellY > this.gridy){
           this.gridCellY = this.gridy;
            }
            if (this.gridCellX < 1){
           this.gridCellX = 1;
            }
            if (this.gridCellY < this.gridy/2+1){
           this.gridCellY = this.gridy/2+1;
            }
       }
       
             if(this.active){
        this.UI.drawRect(0,this.UIy,(this.boardPosX-this.UIposX)/this.maxGen*this.curGen,this.gridHeight*this.gridy/2);
            }
            else{
                this.UI.drawRect(0,this.UIy,this.UItween.y,this.gridHeight*this.gridy/2);
            }
           
       if (!this.active){
       if (game.input.activePointer.leftButton.isDown){
           this.addCell();
            }
           else if (game.input.activePointer.rightButton.isDown){
           this.removeCell();
            }
           
       }
       
        if(!this.active){
                this.boardGFX.lineStyle(this.pointerReact.thick, 0x000000, 1);
                this.boardGFX.drawRect(this.gridCellX*this.gridWidth-this.gridWidth,this.gridCellY*this.gridHeight-this.gridHeight,this.gridWidth,this.gridHeight);
        }
       this.drawTest = this.textDraw.text;
       }
       else {
           this.graphics.clear();
        this.graphics.beginFill(this.heartColor);
        this.graphics.drawRect(this.heartTween.x1,this.heartTween.y1,this.heartTween.width1,this.heartTween.height1);
       this.graphics.drawRect(this.heartTween.x2,this.heartTween.y2,this.heartTween.width2,this.heartTween.height2);
       }
   },
     nextStep: function(){
         
           for (y = 1; y <= this.gridy ; y++) {
                   for (x = 1; x <= this.gridx ; x++) {
                        
                       var liveCells = 0;
                       
                       if (x > 1){
                          liveCells += this.stageNow[x-1][y] 
                       }
                       
                       if (x > 1 & y > 1){
                          liveCells += this.stageNow[x-1][y-1] 
                       }
                       
                       if (x > 1 & y < this.gridy){
                          liveCells += this.stageNow[x-1][y+1] 
                       }
                       
                       if (y > 1){
                          liveCells += this.stageNow[x][y-1] 
                       }
                       
                       if (y < this.gridy){
                          liveCells += this.stageNow[x][y+1] 
                       }
                       
                          if (x < this.gridx){
                          liveCells += this.stageNow[x+1][y] 
                       }
                       
                       if (x < this.gridx & y > 1){
                          liveCells += this.stageNow[x+1][y-1] 
                       }
                       
                       if (x < this.gridx & y < this.gridy){
                          liveCells += this.stageNow[x+1][y+1] 
                       }
                       
                    if(liveCells < 2 || liveCells > 3){
                       this.stageNext[x][y] = 0;
                    }
                       else if (liveCells === 3){
                           this.stageNext[x][y] = 1;
                       }
                    else if (liveCells === 3 || liveCells === 2){
                           if (this.stageNow[x][y] === 1) 
                           {this.stageNext[x][y] = 1;}
                       }
                    } 
           }
         
   },
    nextToNow: function(){
               
             for (y = 1; y <= this.gridy ; y++) {
                   for (x = 1; x <= this.gridx ; x++) {
                        
                         this.stageNow[x][y] = this.stageNext[x][y];
                        }
                    }   
                
    },
    textUpdate: function(){
        this.textDraw.text = '';
        
             for (y = 1; y <= this.gridy ; y++) {
                   for (x = 1; x <= this.gridx ; x++) {
                        
                       if (x !== this.gridCellX ||  y !== this.gridCellY){
                       
                          
                           
                       if (this.stageNow[x][y] === 1){
                           this.textDraw.text += "O"
                       }
                       else {
                           if (this.stageAdd[x][y] === 1){
                         this.textDraw.text += "+"
                        } else {
                            this.textDraw.text += ":"
                            }
                       }
                       }
                       else {
                            this.textDraw.text += "Ø"
                       }
                       //  this.textDraw.text += this.stageNow[x][y];
                        if (x === this.gridx){
                            this.textDraw.text += "\n"
                        }
                    }   
                }
       
        
        
        //UI
       // this.UIGen.text = "Generations left: "+this.curGen;
    },
    doSomething: function(){
        
        if (this.curGen > 0){
            
            if (this.active){
                this.curGen -= 1;
                this.nextStep();
                this.nextToNow();  
            }
        }
            else {
                this.runSim();
                this.curGen = this.maxGen;
            }
//           this.textUpdate();
        this.graphicsUpdate();
        game.time.events.add(50,this.doSomething, this);
    },
    render: function(){
    
        //game.debug.text( this.gridCellY, 80, 100 );
        //game.debug.text(this.player1Life,50,100);
        //game.debug.text(this.player2Life,50,130);
        //game.debug.geom(line1);
        //game.debug.geom(this.activeCell, 'rgba(200,0,0,0.5)');
},
    runSim: function(){
    this.active = !this.active;
        
        if (this.active){
        //    this.UIActive.text = "Simulation on";
            
            
        }
        else {
        //    this.UIActive.text = "Simulation off";
           this.progression += 1;
            if (this.progression > 8){
                this.progression = 1;
            }
            
            if (this.currentPlayer === 1){
                this.currentPlayer = 2;
                this.player2Bricks = this.roundBricks;
                this.UIPlayer1Bricks.text = "\n CELLS LEFT: "+this.player2Bricks;
                 this.UIPlayerState.text = "PLAYER 2"
                this.UIy = this.gridHeight*this.gridy/2;
                
                var tweenPrev = this.UIPlayer1Bricks.y;
                
                this.UIPlayer1Bricks.y = this.UIy+this.gridHeight*this.gridy/4;
                this.UIPlayerState.y = this.UIy+this.gridHeight*this.gridy/4;
                tweenPrev = this.UIPlayer1Bricks.y - tweenPrev;
                
                game.add.tween(this.UIPlayer1Bricks).from({y: tweenPrev/2},1000).easing(Phaser.Easing.Sinusoidal.InOut).start()
                game.add.tween(this.UIPlayerState).from({y: tweenPrev/2},1200).easing(Phaser.Easing.Sinusoidal.InOut).start()
                game.add.tween(this.UI).from({y: -(this.gridHeight*this.gridy/2)},1000).easing(Phaser.Easing.Sinusoidal.InOut).start()
                
                game.add.tween(this.UItween).from({y: 0},1000).easing(Phaser.Easing.Sinusoidal.InOut).start()
                
                   for (x = 0; x < this.gardenSizeX ; x++) {
                    for (y = 0; y < this.gardenSizeY ; y++) {
                        var xCor = x+this.player2GardenPosX+1;
                        var yCor = y+this.player2GardenPosY+1;
                        
                         this.stageAdd[xCor][yCor] = this.stageNow[xCor][yCor];
                        this.stageNow[xCor][yCor] = 0;
                       this.stageNext[xCor][yCor] = 0;
                    }   
                }  
                                
            } else if (this.currentPlayer === 2){
                this.currentPlayer = 1
                this.player1Bricks = this.roundBricks;
                this.UIPlayer1Bricks.text = "\n CELLS LEFT: "+this.player1Bricks;
                this.UIPlayerState.text = "PLAYER 1"
                 this.UIy = 0;
                
                var tweenPrev = this.UIPlayer1Bricks.y;
                
                this.UIPlayerState.y = this.UIy+this.gridHeight*this.gridy/4;
                this.UIPlayer1Bricks.y = this.UIy+this.gridHeight*this.gridy/4;
                
                tweenPrev = this.UIPlayer1Bricks.y - tweenPrev;
                
                 game.add.tween(this.UIPlayer1Bricks).from({y: -tweenPrev+(this.UIy+this.gridHeight*this.gridy/4)},1200).easing(Phaser.Easing.Sinusoidal.InOut).start()
                game.add.tween(this.UI).from({y: +(this.gridHeight*this.gridy/2)},1000).easing(Phaser.Easing.Sinusoidal.InOut).start()
                
                game.add.tween(this.UIPlayerState).from({y: -tweenPrev+(this.UIy+this.gridHeight*this.gridy/4)},    1000).easing(Phaser.Easing.Sinusoidal.InOut).start()
                
                game.add.tween(this.UItween).from({y: 0},1000).easing(Phaser.Easing.Sinusoidal.InOut).start()
                
                 for (x = 0; x < this.gardenSizeX ; x++) {
                    for (y = 0; y < this.gardenSizeY ; y++) {
                        var xCor = x+this.player1GardenPosX+1;
                        var yCor = y+this.player1GardenPosY+1;
                        
                         this.stageAdd[xCor][yCor] = this.stageNow[xCor][yCor];
                        this.stageNow[xCor][yCor] = 0;
                        this.stageNext[xCor][yCor] = 0;
                    }   
                }  
            }
        //    this.UICurrentPlayer.text = "Current player: "+this.currentPlayer;
            
            this.player1Life = this.checkPlayer1Life();
            this.player2Life = this.checkPlayer2Life();
            
            if (this.player1Life != 0 & this.player2Life != 0){
                this.spaceKey.onDown.addOnce(this.startSim,this);
            }
            else if (this.player1Life ===  0 & this.player2Life === 0){
                this.stageDead()
                
                this.resultText.text = "DRAW";
                
                game.add.tween(this.heartTween).to({x1: this.heartTween.x1+this.heartTween.width1/2},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({y1: this.heartTween.y1+this.heartTween.height1/2},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({x2: this.heartTween.x2+this.heartTween.width2/2},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({y2: this.heartTween.y2+this.heartTween.height2/2},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({width1: 0},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({height1: 0},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({width2: 0},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({height2: 0},1000).easing(Phaser.Easing.Elastic.InOut).start();
            }
            else if (this.player1Life ===  0 ) {
                
                this.stageDead()
                this.resultText.text = "PLAYER 2 WINS";
                game.add.tween(this.heartTween).to({x1: this.heartTween.x1+this.heartTween.width1/2},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({y1: this.heartTween.y1+this.heartTween.height1/2},1000).easing(Phaser.Easing.Elastic.InOut).start();
                
                game.add.tween(this.heartTween).to({width1: 0},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({height1: 0},1000).easing(Phaser.Easing.Elastic.InOut).start();
            }
            else if (this.player2Life ===  0){
                 this.stageDead()
                
                this.resultText.text = "PLAYER 1 WINS";
                
                  game.add.tween(this.heartTween).to({x2: this.heartTween.x2+this.heartTween.width2/2},1000).easing(Phaser.Easing.Elastic.InOut).start();
                 game.add.tween(this.heartTween).to({y2: this.heartTween.y2+this.heartTween.height2/2},1000).easing(Phaser.Easing.Elastic.InOut).start();
                 game.add.tween(this.heartTween).to({width2: 0},1000).easing(Phaser.Easing.Elastic.InOut).start();
                game.add.tween(this.heartTween).to({height2: 0},1000).easing(Phaser.Easing.Elastic.InOut).start();
            }   
        }
},
    addCell: function(){
    
        
    if (this.currentPlayer === 1){
    if (this.player1Bricks > 0){
    if (this.stageNow[this.gridCellX][this.gridCellY] === 0){
        if (this.stageAdd[this.gridCellX][this.gridCellY] === 0){
    this.player1Bricks -=1;
    this.UIPlayer1Bricks.text = "\n CELLS LEFT: "+this.player1Bricks;
    this.stageAdd[this.gridCellX][this.gridCellY] = 1;
            this.pointerReact.thick = 2;
            game.add.tween(this.pointerReact).from({thick: 5},100).easing(Phaser.Easing.Sinusoidal.InOut).start()
            this.addSound.play();
        }
    }
    }
    }
        
    if (this.currentPlayer === 2){
    if (this.player2Bricks > 0){
    if (this.stageNow[this.gridCellX][this.gridCellY] === 0){
        if (this.stageAdd[this.gridCellX][this.gridCellY] === 0){
    this.player2Bricks -=1;
    this.UIPlayer1Bricks.text = "\n CELLS LEFT: "+this.player2Bricks;
    this.stageAdd[this.gridCellX][this.gridCellY] = 1;
            this.pointerReact.thick = 2;
            game.add.tween(this.pointerReact).from({thick: 5},100).easing(Phaser.Easing.Sinusoidal.InOut).start()
            this.addSound.play();
        }
    }
    }
    }
},
    removeCell: function(){
    if (this.currentPlayer === 1){
        if (this.stageAdd[this.gridCellX][this.gridCellY] === 1){
            this.player1Bricks +=1;
            this.UIPlayer1Bricks.text = "\n CELLS LEFT: "+this.player1Bricks;
            this.stageAdd[this.gridCellX][this.gridCellY] = 0;
            this.pointerReact.thick = 2;
            game.add.tween(this.pointerReact).from({thick: 0},100).easing(Phaser.Easing.Sinusoidal.InOut).start()
            this.removeSound.play();
            }
    }
    
    if (this.currentPlayer === 2){
        if (this.stageAdd[this.gridCellX][this.gridCellY] === 1){
            this.player2Bricks +=1;
            this.UIPlayer1Bricks.text = "\n CELLS LEFT: "+this.player2Bricks;
            this.stageAdd[this.gridCellX][this.gridCellY] = 0;
            this.pointerReact.thick = 2;
            game.add.tween(this.pointerReact).from({thick: 0},100).easing(Phaser.Easing.Sinusoidal.InOut).start()
             this.removeSound.play();
        }
    }
    },
    checkPlayer1Life: function(){
        this.player1Life = 0;
         for (x = 0; x < this.heartSizeX ; x++) {
                    for (y = 0; y < this.heartSizeY ; y++) {
                         this.player1Life += this.stageNow[x+this.player1HeartPosX+1][y+this.player1HeartPosY+1];
                    }   
                }
        return this.player1Life;
    },
    checkPlayer2Life: function(){
        this.player2Life = 0;
         for (x = 0; x < this.heartSizeX ; x++) {
                    for (y = 0; y < this.heartSizeY ; y++) {
                         this.player2Life += this.stageNow[this.player2HeartPosX-x][this.player2HeartPosY-y];
                    }   
                }
        return this.player2Life;
    },
    gotoMenu: function(){
        game.state.start("menu");
    },
    graphicsUpdate: function(){
        if (this.alive){
        this.boardGFX.clear();
        this.UI.clear();
        
         this.UI.beginFill(this.heartColor);
        this.UI.lineStyle(1, this.heartColor, 1);
            
          
                    for (y = 1; y <= this.gridy ; y++) {
                   for (x = 1; x <= this.gridx ; x++) {
                        
                                                 
                       if (this.stageNow[x][y] === 1){
                           //this.textDraw.text += "O"
                           if (this.isHeart[x][y] === 1){
                               this.boardGFX.beginFill(this.heartColorBrick);
                             this.boardGFX.lineStyle(1, this.heartColorBrick, 1);
                           } else {
                           this.boardGFX.beginFill(0xFFFFFF);
                             this.boardGFX.lineStyle(1, 0xFFFFFF, 1);
                           }
                           
                          this.boardGFX.drawRect(x*this.gridWidth-this.gridWidth,y*this.gridHeight-this.gridHeight,this.gridWidth,this.gridHeight);
                           this.boardGFX.endFill();
                       }
                       else {
                           if (this.stageAdd[x][y] === 1){
                         //this.textDraw.text += "+"
                               this.boardGFX.beginFill(this.gardenColorBrick);
                               this.boardGFX.lineStyle(1, this.gardenColorBrick, 1);
                          this.boardGFX.drawRect(x*this.gridWidth-this.gridWidth,y*this.gridHeight-this.gridHeight,this.gridWidth,this.gridHeight);
                               this.boardGFX.endFill();
                        } else {
                            //this.textDraw.text += ":"
                       
                            }
                       }         
                       
                       //  this.textDraw.text += this.stageNow[x][y];
                        if (x === this.gridx){
                            //this.textDraw.text += "\n"
                        }
                    }   
                }
       
            //this.textDraw.text += "Ø"
       
        //UI
            //  this.UIGen.text = "Generations left: "+this.curGen;
        }
    },
    stageDead: function(){
        this.UIPlayerState.alpha = 0;
        this.UIPlayer1Bricks.alpha = 0;
         this.alive = false;
        game.stage.backgroundColor = "#cccccc"
        this.spaceKey.onDown.addOnce(this.gotoMenu,this);
         game.add.tween(this.resultText).from({y: -this.gridHeight*this.gridy/2-50},800).easing(Phaser.Easing.Elastic.InOut).start();
    },
    startSim: function(){
        for (y = 1; y <= this.gridy ; y++) {
                   for (x = 1; x <= this.gridx ; x++) {
                        if (this.stageAdd[x][y] === 1){
                         this.stageNow[x][y] = this.stageAdd[x][y];
                        this.stageAdd[x][y] = 0;
                        }
                        }
                    }
        
        game.add.tween(this.boardGFX).from({y: this.boardGFX.y+20},1000).easing(Phaser.Easing.Elastic.Out).start()
        game.add.tween(this.boardGrid).from({y: this.boardGrid.y+20},1000).easing(Phaser.Easing.Elastic.Out).start()
        game.add.tween(this.graphics).from({y: this.graphics.y+20},1000).easing(Phaser.Easing.Elastic.Out).start()
        
        this.startSound.play();
        this.runSim();
    },
    playBeat: function(){
        if (this.alive){
            
        if (this.progression != 6){
            if(this.bd1Beat[this.beat-1] === 1){
                this.bd01Sound.play();
            }
        }
         if(this.bd2Beat[this.beat-1] === 1){
            this.bd02Sound.play();
        }
        
        if (this.progression > 2){
            if(this.stringsBeat[this.beat-1] === 1){
                this.stringsSound.play();
            }
        }
            
        if (this.progression > 2){
      if(this.bassBeat[this.beat-1] === 1){
            this.bassSound.play();
        }
        }
        if (this.progression > 4){
            if(this.clapBeat[this.beat-1] === 1){
            this.clapSound.play();
        }
        }
        
         switch (this.beat%4){
            case 2:
                game.time.events.add(this.time+this.swing,this.playBeat, this);
                break;
            case 3:
                game.time.events.add(this.time-this.swing,this.playBeat, this);
                break;
            case 0:
                game.time.events.add(this.time+this.swing,this.playBeat, this);
                break;
            case 1:
                game.time.events.add(this.time-this.swing,this.playBeat, this);
                break;
    }
              }
        else {
            this.deadSound.play();
        }
        
        this.beat+=1;
        if (this.beat > 32){
            this.beat = 1;
        }
    }
};

