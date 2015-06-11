
//var board = document.getElementById("board");
//var players = document.getElementById("players");
// setup canvas
var worldWidth = 1200;
var worldHeight = 1200;
var currentX= worldWidth/2;
var currentY= worldHeight/2;
var velocity=5;
var Keys = {
        up: false,
        down: false,
        left: false,
        right: false
    },
    ctx = background.getContext('2d'),
    playerCTX = player.getContext('2d'),
    boardCTX = board.getContext('2d'),
    dx = 0,
    dy = 0,
    ptr,
    playerPTR;

// create tile
ctx.fillStyle = '#2a6d27';
ctx.fillRect(0, 0, 50, 50);
ctx.fillStyle = 'rgba(255,255,255,0.5)';
ctx.fillRect(0, 0, 1, 50);
ctx.fillRect(0, 0, 50, 1);
ctx.fillStyle = 'rgba(0,0,0,0.5)';
ctx.fillRect(0, 39, 50, 1);
ctx.fillRect(39, 0, 1, 50);
ptr = ctx.createPattern(background, 'repeat');

background.width =background.height = 400;
drawBoard();
drawTank("west");

ctx.fillStyle = ptr;
render();

function drawTank(direction){
    
    if (typeof direction == "undefined"||direction =='') {    
        direction ="west";
    }
    


    player.width = player.height = 400;

    // add the player
    // create tile
    tankWidth = 30;
    tankHeight = 30;
    cannonLength = 15;
    cannonThickness = 11;
    // find the center
    playerX = (background.width)/2-(tankWidth/2);
    playerY = (background.height)/2-(tankHeight/2);;

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
    board.width =board.height = 400;


    if(currentY<board.height/2){
        boardCTX.fillStyle = 'gray';
        borderY= board.height/2 -currentY;
        if(borderY<0){
            borderY=0;
        }
        boardCTX.fillRect(0, 0, 400,borderY);
    }
    if(currentX<board.width/2){
        boardCTX.fillStyle = 'gray';
        borderX = board.width/2 -currentX;
        if(borderX<0){
            borderX=0;
        }
        boardCTX.fillRect(0, 0, borderX,400);
    }
    if(currentX>worldWidth-board.width/2){
        boardCTX.fillStyle = 'gray';
        borderX = currentX-worldWidth+board.width/2;
        if(borderX>400){
            borderX=400;
        }
        boardCTX.fillRect(400-borderX, 0,200+borderX ,400);
    }
    if(currentY>worldHeight-board.height/2){
        boardCTX.fillStyle = 'gray';
        borderY = currentY-worldHeight+board.height/2;
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

var isDirty = false;

function update() {
    if (Keys.up) {
        
        if(currentY>0){
            isDirty = true;
            dy+=velocity;
            currentY-=velocity;
        }   
    }
    else if (Keys.down) {
        
        if(currentY<worldHeight){
            isDirty = true;
            dy-=velocity;
            currentY+=velocity;
        }   
    }

    if (Keys.left) {
        if(currentX>0){
            dx+=velocity;
            isDirty = true;
            currentX-=velocity;
        }  
    }
    else if (Keys.right) {
        if(currentX<worldWidth){
            dx-=velocity;
            isDirty = true;
            currentX+=velocity;
        }
    }

    if (isDirty) render();
    requestAnimationFrame(update);
}
requestAnimationFrame(update);


function render() {
    drawBoard()
    ctx.setTransform(1,0,0,1,dx,dy);
    ctx.fillRect(-dx, -dy, 400,400);
    isDirty= false;

}

