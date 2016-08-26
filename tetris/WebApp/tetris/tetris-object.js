var Tile = function(_idxX,_idxY, _fillStartX,_fillStartY,_fillEndX,_fillEndY){
	this.fillStartX = _fillStartX;
	this.fillStartY = _fillStartY;
	this.fillEndX = _fillEndX;
	this.fillEndY = _fillEndY;
	this.color = {r:255,g:255,b:255};
	this.edge = [];
	
	//로직용 요소
	this.idxX = _idxX;
	this.idxY = _idxY;
	this.isStone = false;
}
Tile.prototype.fill = function(_color){
	tetris.ctx.beginPath();
	this.color = _color?_color:this.color;
	tetris.ctx.fillStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.9)";
	tetris.ctx.fillRect(this.fillStartX, this.fillStartY, this.fillEndX-this.fillStartX, this.fillEndY-this.fillStartY);
	tetris.ctx.closePath();
}

var Oblock = function(){
	//centerXY
	//oo
	//xo
	this.centerX = 3;
	this.centerY = 3;
	this.rotate = 0; // 시계방향
	this.color = {r:243,g:67,b:54};
}
Oblock.prototype.fill = function(tileArr){

	if(tileArr == null){tileArr = tetris.mainTileArr;}
	
	if(this.centerY > 0){
		if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
			tileArr[this.centerY][this.centerX].fill(this.color);
		}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
			tileArr[this.centerY-1][this.centerX].fill(this.color);
		}if(tileArr[this.centerY-1][this.centerX+1].edge.indexOf("TOP") == -1){
			tileArr[this.centerY-1][this.centerX+1].fill(this.color);
		}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
			tileArr[this.centerY][this.centerX+1].fill(this.color);
		}
	}
}
Oblock.prototype.right = function(){
	if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
	if(tetris.mainTileArr[this.centerY-1][this.centerX+2].isStone){return;}
	this.centerX++; 
}
Oblock.prototype.left = function(){
	if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
	if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
	this.centerX--; 
}
Oblock.prototype.bottom = function(){
	if(!this.isToStop()){
		this.centerY++;
		tetris.tileClear();
		this.fill();
	}else{
		this.setStone();
		tetris.tileClear();
		tetris.newBlock();
		tetris.tetris();
	}
}
Oblock.prototype.top = function(){}
Oblock.prototype.setStone = function(){
	tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
	tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
	tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone = true;
	tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
	this.fill();
}
Oblock.prototype.isToStop = function(){
	if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
	if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
	return false;
}
Oblock.prototype.space = function(){
	while(this === tetris.targetBlock){
		this.bottom();
		this.fill();
	}
	
	tetris.soundSpace();
	
	tetris.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.9)";
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(0,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.mainDiv.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(tetris.mainDiv.width*2,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.canvas.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	setTimeout(function(){
		tetris.ctx.fillStyle = "rgba(0,0,0,1)";
		tetris.ctx.fillRect(0,0,tetris.mainDiv.width, tetris.mainDiv.height);
		tetris.ctx.fillRect(tetris.mainDiv.width*2,tetris.mainDiv.height/2-50,tetris.mainDiv.width,tetris.mainDiv.height/2);
	}, 50);
}

var Zblock = function(){
	//0
	//oo
	// xo
	
	//90
	// o
	//xo
	//o
	
	//180
	//ox
	// oo
	
	//270
	// o
	//ox
	//o
	
	this.centerX = 3;
	this.centerY = 3;
	this.rotate = 0; // 시계방향
	this.color = {r:254,g:151,b:0};
}
Zblock.prototype.fill = function(tileArr){
	
	if(tileArr == null){tileArr = tetris.mainTileArr;}
	
	if(this.centerY > 0){
		if(this.rotate == 0){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}
		}else if(this.rotate == 90){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}
		}else if(this.rotate == 180){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX+1].fill(this.color);
			}
		}else if(this.rotate == 270){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}
		}
	}
}
Zblock.prototype.right = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+2].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
	}
	this.centerX++;
}
Zblock.prototype.left = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-2].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
	}
	this.centerX--;
}
Zblock.prototype.bottom = function(){
	if(!this.isToStop()){
		this.centerY++;
		tetris.tileClear();
		this.fill();
	}else{
		this.setStone();
		tetris.tileClear();
		tetris.newBlock();
		tetris.tetris();
	}
}
Zblock.prototype.top = function(){
	var tempRotate = tetris.targetBlock.rotate+90;
	if(tempRotate == 360){
		tempRotate = 0;
	}
		if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
		}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
		}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
		}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		}
		tetris.targetBlock.rotate = tempRotate;
}
Zblock.prototype.setStone = function(){
	if(this.rotate == 0){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
	}else if(this.rotate == 90){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
	}else if(this.rotate == 180){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone = true;
	}else if(this.rotate == 270){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
	}
	this.fill();
}
Zblock.prototype.isToStop = function(){
	if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return true;}
	}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
	}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
	}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX-1].isStone){return true;}
	}
	return false;
}
Zblock.prototype.space = function(){
	while(this === tetris.targetBlock){
		this.bottom();
		this.fill();
	}
	
	tetris.soundSpace();
	
	tetris.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.9)";
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(0,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.mainDiv.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(tetris.mainDiv.width*2,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.canvas.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	setTimeout(function(){
		tetris.ctx.fillStyle = "rgba(0,0,0,1)";
		tetris.ctx.fillRect(0,0,tetris.mainDiv.width, tetris.mainDiv.height);
		tetris.ctx.fillRect(tetris.mainDiv.width*2,tetris.mainDiv.height/2-50,tetris.mainDiv.width,tetris.mainDiv.height/2);
	}, 50);
}
var Zrblock = function(){
	//0
	// oo
	//ox
	
	//90
	//o
	//xo
	// o
	
	//180
	// xo
	//oo
	
	//270
	//o
	//ox
	// o
	
	this.centerX = 3;
	this.centerY = 3;
	this.rotate = 0; // 시계방향
	this.color = {r:254,g:234,b:59};
}
Zrblock.prototype.fill = function(tileArr){
	
	if(tileArr == null){tileArr = tetris.mainTileArr;}
	
	if(this.centerY > 0){
		if(this.rotate == 0){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}
		}else if(this.rotate == 90){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}
		}else if(this.rotate == 180){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX-1].fill(this.color);
			}
		}else if(this.rotate == 270){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}
		}
	}
}
Zrblock.prototype.right = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+2].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+2].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
	}
	this.centerX++;
}
Zrblock.prototype.left = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-2].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
	}
	this.centerX--;
}
Zrblock.prototype.bottom = function(){
	if(!this.isToStop()){
		this.centerY++;
		tetris.tileClear();
		this.fill();
	}else{
		this.setStone();
		tetris.tileClear();
		tetris.newBlock();
		tetris.tetris();
	}
}
Zrblock.prototype.top = function(){
	var tempRotate = tetris.targetBlock.rotate+90;
	if(tempRotate == 360){
		tempRotate = 0;
	}
	if(this.centerY > 0){
		
		if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
		}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY][this.centerX].edge.isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
		}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		}
		tetris.targetBlock.rotate = tempRotate;
		
	}
}
Zrblock.prototype.setStone = function(){
	if(this.rotate == 0){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
	}else if(this.rotate == 90){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
	}else if(this.rotate == 180){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone = true;
	}else if(this.rotate == 270){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
	}
	this.fill();
}
Zrblock.prototype.isToStop = function(){
	if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return true;}
	}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY+2][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
	}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
	}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
	}
	return false;
}
Zrblock.prototype.space = function(){
	while(this === tetris.targetBlock){
		this.bottom();
		this.fill();
	}
	
	tetris.soundSpace();
	
	tetris.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.9)";
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(0,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.mainDiv.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(tetris.mainDiv.width*2,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.canvas.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	setTimeout(function(){
		tetris.ctx.fillStyle = "rgba(0,0,0,1)";
		tetris.ctx.fillRect(0,0,tetris.mainDiv.width, tetris.mainDiv.height);
		tetris.ctx.fillRect(tetris.mainDiv.width*2,tetris.mainDiv.height/2-50,tetris.mainDiv.width,tetris.mainDiv.height/2);
	}, 50);
}
var Lblock = function(){
	//0
	//  o
	//oxo
	
	//90
	//o
	//x
	//oo
	
	//180
	//oxo
	//o
	
	//270
	//oo
	// x
	// o
	
	this.centerX = 3;
	this.centerY = 3;
	this.rotate = 0; // 시계방향
	this.color = {r:76,g:174,b:80};
}
Lblock.prototype.fill = function(tileArr){
	
	if(tileArr == null){tileArr = tetris.mainTileArr;}
	
	if(this.centerY > 0){
		if(this.rotate == 0){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX+1].fill(this.color);
			}
		}else if(this.rotate == 90){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX+1].fill(this.color);
			}
		}else if(this.rotate == 180){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX-1].fill(this.color);
			}
		}else if(this.rotate == 270){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX-1].fill(this.color);
			}
		}
	}
}
Lblock.prototype.right = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+2].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+2].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
	}
	this.centerX++;
}
Lblock.prototype.left = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-2].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX+-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
	}
	this.centerX--;
}
Lblock.prototype.bottom = function(){
	if(!this.isToStop()){
		this.centerY++;
		tetris.tileClear();
		this.fill();
	}else{
		this.setStone();
		tetris.tileClear();
		tetris.newBlock();
		tetris.tetris();
	}
}
Lblock.prototype.top = function(){
	var tempRotate = tetris.targetBlock.rotate+90;
	if(tempRotate == 360){
		tempRotate = 0;
	}
	if(this.centerY > 0){
		
		if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
		}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY][this.centerX].edge.isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
		}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		}
		tetris.targetBlock.rotate = tempRotate;
		
	}
}
Lblock.prototype.setStone = function(){
	if(this.rotate == 0){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone = true;
	}else if(this.rotate == 90){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone = true;
	}else if(this.rotate == 180){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone = true;
	}else if(this.rotate == 270){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone = true;
	}
	this.fill();
}
Lblock.prototype.isToStop = function(){
	if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
	}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX+1].isStone){return true;}
	}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX-1].isStone){return true;}
	}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
	}
	return false;
}
Lblock.prototype.space = function(){
	while(this === tetris.targetBlock){
		this.bottom();
		this.fill();
	}
	
	tetris.soundSpace();
	
	tetris.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.9)";
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(0,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.mainDiv.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(tetris.mainDiv.width*2,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.canvas.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	setTimeout(function(){
		tetris.ctx.fillStyle = "rgba(0,0,0,1)";
		tetris.ctx.fillRect(0,0,tetris.mainDiv.width, tetris.mainDiv.height);
		tetris.ctx.fillRect(tetris.mainDiv.width*2,tetris.mainDiv.height/2-50,tetris.mainDiv.width,tetris.mainDiv.height/2);
	}, 50);
}
var Lrblock = function(){
	//0
	//o
	//oxo
	
	//90
	//oo
	//x
	//o
	
	//180
	//oxo
	//  o
	
	//270
	// o
	// x
	//oo
	
	this.centerX = 3;
	this.centerY = 3;
	this.rotate = 0; // 시계방향
	this.color = {r:33,g:149,b:242};
}
Lrblock.prototype.fill = function(tileArr){
	
	if(tileArr == null){tileArr = tetris.mainTileArr;}
	
	if(this.centerY > 0){
		if(this.rotate == 0){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX-1].fill(this.color);
			}
		}else if(this.rotate == 90){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX+1].fill(this.color);
			}
		}else if(this.rotate == 180){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX+1].fill(this.color);
			}
		}else if(this.rotate == 270){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX-1].fill(this.color);
			}
		}
	}
}
Lrblock.prototype.right = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+2].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+2].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
	}
	this.centerX++;
}
Lrblock.prototype.left = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-2].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-2].isStone){return;}
	}
	this.centerX--;
}
Lrblock.prototype.bottom = function(){
	if(!this.isToStop()){
		this.centerY++;
		tetris.tileClear();
		this.fill();
	}else{
		this.setStone();
		tetris.tileClear();
		tetris.newBlock();
		tetris.tetris();
	}
}
Lrblock.prototype.top = function(){
	var tempRotate = tetris.targetBlock.rotate+90;
	if(tempRotate == 360){
		tempRotate = 0;
	}
	if(this.centerY > 0){
		
		if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
		}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY][this.centerX].edge.isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
		}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		}
		tetris.targetBlock.rotate = tempRotate;
		
	}
}
Lrblock.prototype.setStone = function(){
	if(this.rotate == 0){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone = true;
	}else if(this.rotate == 90){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone = true;
	}else if(this.rotate == 180){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone = true;
	}else if(this.rotate == 270){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone = true;
	}
	this.fill();
}
Lrblock.prototype.isToStop = function(){
	if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
	}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return true;}
	}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX+1].isStone){return true;}
	}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY+2][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
	}
	return false;
}
Lrblock.prototype.space = function(){
	while(this === tetris.targetBlock){
		this.bottom();
		this.fill();
	}
	
	tetris.soundSpace();
	
	tetris.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.9)";
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(0,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.mainDiv.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(tetris.mainDiv.width*2,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.canvas.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	setTimeout(function(){
		tetris.ctx.fillStyle = "rgba(0,0,0,1)";
		tetris.ctx.fillRect(0,0,tetris.mainDiv.width, tetris.mainDiv.height);
		tetris.ctx.fillRect(tetris.mainDiv.width*2,tetris.mainDiv.height/2-50,tetris.mainDiv.width,tetris.mainDiv.height/2);
	}, 50);
}
var Tblock = function(){
	//0
	// o
	//oxo
	
	//90
	//o
	//xo
	//o
	
	//180
	//oxo
	// o
	
	//270
	// o
	//ox
	// o
	
	this.centerX = 3;
	this.centerY = 3;
	this.rotate = 0; // 시계방향
	this.color = {r:63,g:81,b:180};
}
Tblock.prototype.fill = function(tileArr){
	
	if(tileArr == null){tileArr = tetris.mainTileArr;}
	
	if(this.centerY > 0){
		if(this.rotate == 0){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}
		}else if(this.rotate == 90){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}
		}else if(this.rotate == 180){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}
		}else if(this.rotate == 270){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}
		}
	}
}
Tblock.prototype.right = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
	}
	this.centerX++;
}
Tblock.prototype.left = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
	}
	this.centerX--;
}
Tblock.prototype.bottom = function(){
	if(!this.isToStop()){
		this.centerY++;
		tetris.tileClear();
		this.fill();
	}else{
		this.setStone();
		tetris.tileClear();
		tetris.newBlock();
		tetris.tetris();
	}
}
Tblock.prototype.top = function(){
	var tempRotate = tetris.targetBlock.rotate+90;
	if(tempRotate == 360){
		tempRotate = 0;
	}
	if(this.centerY > 0){
		
		if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
		}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY][this.centerX].edge.isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
		}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		}
		tetris.targetBlock.rotate = tempRotate;
		
	}
}
Tblock.prototype.setStone = function(){
	if(this.rotate == 0){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
	}else if(this.rotate == 90){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
	}else if(this.rotate == 180){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
	}else if(this.rotate == 270){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
	}
	this.fill();
}
Tblock.prototype.isToStop = function(){
	if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
	}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
	}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
	}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
	}
	return false;
}
Tblock.prototype.space = function(){
	while(this === tetris.targetBlock){
		this.bottom();
		this.fill();
	}
	
	tetris.soundSpace();
	
	tetris.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.9)";
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(0,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.mainDiv.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(tetris.mainDiv.width*2,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.canvas.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	setTimeout(function(){
		tetris.ctx.fillStyle = "rgba(0,0,0,1)";
		tetris.ctx.fillRect(0,0,tetris.mainDiv.width, tetris.mainDiv.height);
		tetris.ctx.fillRect(tetris.mainDiv.width*2,tetris.mainDiv.height/2-50,tetris.mainDiv.width,tetris.mainDiv.height/2);
	}, 50);
}
var Iblock = function(){
	//0
	//ooxo
	
	//90
	//o
	//o
	//x
	//o
	
	//180
	//oxoo
	
	//270
	//o
	//x
	//o
	//o
	
	this.centerX = 3;
	this.centerY = 3;
	this.rotate = 0; // 시계방향
	this.color = {r:103,g:58,b:182};
}
Iblock.prototype.fill = function(tileArr){
	
	if(tileArr == null){tileArr = tetris.mainTileArr;}
	
	if(this.centerY > 0){
		if(this.rotate == 0){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-2].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-2].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}
		}else if(this.rotate == 90){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}if(this.centerY > 1 && tetris.mainTileArr[this.centerY-2][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-2][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}
		}else if(this.rotate == 180){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY][this.centerX-1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX-1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+1].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+1].fill(this.color);
			}if(tileArr[this.centerY][this.centerX+2].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX+2].fill(this.color);
			}
		}else if(this.rotate == 270){
			if(tileArr[this.centerY][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+1][this.centerX].fill(this.color);
			}if(tileArr[this.centerY+2][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY+2][this.centerX].fill(this.color);
			}if(tileArr[this.centerY-1][this.centerX].edge.indexOf("TOP") == -1){
				tileArr[this.centerY-1][this.centerX].fill(this.color);
			}
		}
	}
}
Iblock.prototype.right = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
		if(this.centerY > 1 && tetris.mainTileArr[this.centerY-2][this.centerX+1].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX+3].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX+1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+2][this.centerX+1].isStone){return;}
	}
	this.centerX++;
}
Iblock.prototype.left = function(){
	if(this.rotate == 0){
		if(tetris.mainTileArr[this.centerY][this.centerX-3].isStone){return;}
	}else if(this.rotate == 90){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
		if(this.centerY > 1 && tetris.mainTileArr[this.centerY-2][this.centerX-1].isStone){return;}
	}else if(this.rotate == 180){
		if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
	}else if(this.rotate == 270){
		if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
		if(tetris.mainTileArr[this.centerY+2][this.centerX-1].isStone){return;}
	}
	this.centerX--;
}
Iblock.prototype.bottom = function(){
	if(!this.isToStop()){
		this.centerY++;
		tetris.tileClear();
		this.fill();
	}else{
		this.setStone();
		tetris.tileClear();
		tetris.newBlock();
		tetris.tetris();
	}
}
Iblock.prototype.top = function(){
	var tempRotate = tetris.targetBlock.rotate+90;
	if(tempRotate == 360){
		tempRotate = 0;
	}
	if(this.centerY > 0){
		
		if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY-1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return;}
		}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX+2].isStone){return;}
		}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY-1][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return;}
		}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY][this.centerX+1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-1].isStone){return;}
			if(tetris.mainTileArr[this.centerY][this.centerX-2].isStone){return;}
		}
		tetris.targetBlock.rotate = tempRotate;
		
	}
}
Iblock.prototype.setStone = function(){
	if(this.rotate == 0){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-2].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
	}else if(this.rotate == 90){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-2][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
	}else if(this.rotate == 180){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX-1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+1].isStone = true;
			tetris.mainTileArr[this.centerY][this.centerX+2].isStone = true;
	}else if(this.rotate == 270){
			tetris.mainTileArr[this.centerY][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+1][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY+2][this.centerX].isStone = true;
			tetris.mainTileArr[this.centerY-1][this.centerX].isStone = true;
	}
	this.fill();
}
Iblock.prototype.isToStop = function(){
	if(this.rotate == 0){
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-2].isStone){return true;}
	}else if(this.rotate == 90){
			if(tetris.mainTileArr[this.centerY+2][this.centerX].isStone){return true;}
	}else if(this.rotate == 180){
			if(tetris.mainTileArr[this.centerY+1][this.centerX+1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX-1].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX].isStone){return true;}
			if(tetris.mainTileArr[this.centerY+1][this.centerX+2].isStone){return true;}
	}else if(this.rotate == 270){
			if(tetris.mainTileArr[this.centerY+3][this.centerX].isStone){return true;}
	}
	return false;
}
Iblock.prototype.space = function(){
	while(this === tetris.targetBlock){
		this.bottom();
		this.fill();
	}
	
	tetris.soundSpace();
	
	tetris.ctx.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.9)";
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(0,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.mainDiv.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	tetris.ctx.beginPath();
	tetris.ctx.moveTo(tetris.mainDiv.width*2,tetris.canvas.height/2);
	tetris.ctx.lineTo(tetris.canvas.width,tetris.canvas.height/2);
	tetris.ctx.closePath();
	tetris.ctx.stroke();
	setTimeout(function(){
		tetris.ctx.fillStyle = "rgba(0,0,0,1)";
		tetris.ctx.fillRect(0,0,tetris.mainDiv.width, tetris.mainDiv.height);
		tetris.ctx.fillRect(tetris.mainDiv.width*2,tetris.mainDiv.height/2-50,tetris.mainDiv.width,tetris.mainDiv.height/2);
	}, 50);
}