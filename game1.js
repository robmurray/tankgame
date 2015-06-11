
(function () {
	'use strict'
	
	var gameConfig ={
		worldWidth: 1200,
		worldHeight: 1200,
		viewerMaxX:400,
		viewerMaxY:400
	},
	Keys = {
	        up: false,
	        down: false,
	        left: false,
	        right: false
	    },
	    viewerBackgroundCTX = background.getContext('2d'),
	    playerCTX = player.getContext('2d'),
	    boardCTX = board.getContext('2d'),
	    dx = 0,
	    dy = 0,
	    backgroundPTR,
	    playerPTR,
	    currentX,
	    currentY,
	    velocity;
		
	function initGame(){
		currentX =gameConfig.worldWidth/2,
		currentY =gameConfig.worldHeight/2,
		velocity =5;
	
		// draw playarea
		board.width = gameConfig.viewerMaxX;
	    board.height = gameConfig.viewerMaxY;

		// create tile
		viewerBackgroundCTX.fillStyle = '#2a6d27';
		viewerBackgroundCTX.fillRect(0, 0, 50, 50);
		viewerBackgroundCTX.fillStyle = 'rgba(255,255,255,0.5)';
		viewerBackgroundCTX.fillRect(0, 0, 1, 50);
		viewerBackgroundCTX.fillRect(0, 0, 50, 1);
		viewerBackgroundCTX.fillStyle = 'rgba(0,0,0,0.5)';
		viewerBackgroundCTX.fillRect(0, 39, 50, 1);
		viewerBackgroundCTX.fillRect(39, 0, 1, 50);

		backgroundPTR = viewerBackgroundCTX.createPattern(background, 'repeat');
		background.width =gameConfig.viewerMaxX;
		background.height = gameConfig.viewerMaxY;

		drawBoard();
		drawTank("west");

		viewerBackgroundCTX.fillStyle = backgroundPTR;
		render();
	}

	function drawTank(direction){
	    
	    var tankWidth = 30,
	    tankHeight = 30,
	    cannonLength = 15,
	    cannonThickness = 11;

	    var rootX,rootY,rootHeight, rootWidth;
		var playerX = (gameConfig.viewerMaxX)/2-(tankWidth/2);
	    var playerY = (gameConfig.viewerMaxY)/2-(tankHeight/2);;


	    player.width = gameConfig.viewerMaxX;;
	    player.height = gameConfig.viewerMaxY;


	    if (typeof direction == "undefined"||direction =='') {    
	        direction ="west";
	    }
	    

	    playerCTX.fillStyle = 'red';
	    playerCTX.fillRect(playerX, playerY, tankWidth,tankHeight);
	    
	    playerCTX.fillStyle = 'brown';
	    playerCTX.fillRect(playerX+5, playerY+5, tankWidth-10,tankHeight-10);
	    
	    //draw the cannon
	    if(direction =='east'){
	        rootX=(playerX+tankWidth)-5;
	        rootY = playerY+tankHeight/2;
	        rootWidth=cannonLength;
	        rootHeight =cannonThickness/2;
	    }else if(direction =='west'){
	        rootX=(playerX-cannonLength)+5;
	        rootY = (playerY+tankHeight/2);
	        rootWidth=cannonLength;
	        rootHeight =cannonThickness/2;        
	    }else if(direction =='north'){
	        rootX=playerX+tankWidth/2;        
	        rootY = (playerY-cannonLength+5);
	        rootWidth=cannonThickness/2;
	        rootHeight =cannonLength;        
	    }else if(direction =='south'){
	        rootX=playerX+(tankWidth/2);
	        rootY = (playerY+tankHeight)-5;
	        rootWidth=cannonThickness/2;
	        rootHeight =cannonLength;        
	    }

	    playerCTX.fillRect(rootX, rootY, rootWidth,rootHeight);

	    playerPTR = playerCTX.createPattern(board, 'no-repeat');

	}

	function drawBoard(){
		var borderY,borderX;

	    board.width = gameConfig.viewerMaxX;
	    board.height = gameConfig.viewerMaxY;


	    if(currentY<gameConfig.viewerMaxY/2){
	        boardCTX.fillStyle = 'gray';
	        borderY= gameConfig.viewerMaxY/2 -currentY;
	        if(borderY<0){
	            borderY=0;
	        }
	        boardCTX.fillRect(0, 0, 400,borderY);
	    }
	    if(currentX<gameConfig.viewerMaxX/2){
	        boardCTX.fillStyle = 'gray';
	        borderX = gameConfig.viewerMaxX/2 -currentX;
	        if(borderX<0){
	            borderX=0;
	        }
	        boardCTX.fillRect(0, 0, borderX,400);
	    }
	    if(currentX>gameConfig.worldWidth-gameConfig.viewerMaxX/2){
	        boardCTX.fillStyle = 'gray';
	        borderX = currentX-gameConfig.worldWidth+gameConfig.viewerMaxX/2;
	        if(borderX>400){
	            borderX=400;
	        }
	        boardCTX.fillRect(400-borderX, 0,200+borderX ,400);
	    }
	    if(currentY>gameConfig.worldHeight-gameConfig.viewerMaxY/2){
	        boardCTX.fillStyle = 'gray';
	        borderY = currentY-gameConfig.worldHeight+gameConfig.viewerMaxY/2;
	        if(borderY>400){
	            borderY=400;
	        }
	        boardCTX.fillRect(0,400-borderY,400,200+borderY);
	    }
	}

	window.onkeydown = function(e) {
	    var kc = e.keyCode;
	    e.preventDefault();

	    if (kc === 37){
	        Keys.left = true;
	        drawTank("west");
	    } else if (kc === 38){
	        Keys.up = true;
	        drawTank("north");
	    } else if (kc === 39){
	        Keys.right = true;
	        drawTank("east");
	    } else if (kc === 40){
	        Keys.down = true;
	        drawTank("south");
	    }
	};

	window.onkeyup = function(e) {
	    var kc = e.keyCode;
	    e.preventDefault();

	    if (kc === 37) Keys.left = false;
	    else if (kc === 38) Keys.up = false;
	    else if (kc === 39) Keys.right = false;
	    else if (kc === 40) Keys.down = false;
	};

	function update(param) {
	    if (Keys.up) {
	        
	        if(currentY>0){
	            dy+=velocity;
	            currentY-=velocity;
	        }   
	    }
	    else if (Keys.down) {
	        
	        if(currentY<gameConfig.worldHeight){
	            dy-=velocity;
	            currentY+=velocity;
	        }   
	    }

	    if (Keys.left) {
	        if(currentX>0){
	            dx+=velocity;
	            currentX-=velocity;
	        }  
	    }
	    else if (Keys.right) {
	        if(currentX<gameConfig.worldWidth){
	            dx-=velocity;
	            currentX+=velocity;
	        }
	    }

	}

	function render(param) {
	    drawBoard()
	    viewerBackgroundCTX.setTransform(1,0,0,1,dx,dy);
	    viewerBackgroundCTX.fillRect(-dx, -dy, 400,400);
	   

	}
 	function timestamp() {
  		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	}

	var now, dt,
    last = timestamp(),
    step=1/60;


	function frame() {
  		now   = timestamp();
  		
  		dt = Math.min(1, (now - last) / 1000); 
  	
  		while(dt > step) {
    		dt = dt - step;
    		update(step);
  		}
  		render();
		
  		last = now;
  		requestAnimationFrame(frame);
	}
	initGame();
	requestAnimationFrame(frame); 
 

})();

