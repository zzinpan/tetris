var Tetris = function(){
	this.canvas = null;
	this.ctx = null;
	this.mainDiv = null;
	this.mainTileArr = null;
	this.previewTileArr = null;
	this.targetBlock = null;
	this.interval = null;
	this.intervalTimer = 1;
	this.tetrisCnt = 0;
	this.sound = {
			move: new Audio("sound/move.mp3"),
			change: new Audio("sound/change.mp3"),
			tetris: new Audio("sound/tetris.mp3"),
			gameover: new Audio("sound/gameover.mp3")
	};
};
Tetris.prototype.userInterfaceInit = function(){
	//배경색
	var backgroundColor = "#000000";
	this.ctx.fillStyle = backgroundColor;
	this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
	
	//메인
	this.mainDiv = {color: {r:50,g:50,b:50}, height: this.canvas.height, width: this.canvas.width/3};
	this.ctx.fillStyle = this.mainDiv.color;
	this.ctx.fillRect(this.mainDiv.width,0,this.mainDiv.width, this.mainDiv.height);
	
}
Tetris.prototype.tileInit = function(){
	var tileWidth = this.mainDiv.width/12;
	var tileHeight = this.mainDiv.height/22;
	var fillStartY = 0;
	
	//메인
	var mainTileArr = new Array();
	for(var i=0; i<22; i++){

		var tileXarr = new Array();
		var fillStartX = this.mainDiv.width;
		
		for(var j=0; j<12; j++){
			var fillEndX = fillStartX + tileWidth;
			var fillEndY = fillStartY + tileHeight;
			var tile = new Tile(j, i, fillStartX, fillStartY, fillEndX, fillEndY);
			tile.fill();
			if(i == 0){
				tile.edge.push("TOP");
				tile.isStone = false;
				tile.isEdge = true;
				tile.fill({r:0,g:0,b:0});
			}if(j == 0){
				tile.edge.push("LEFT");
				tile.isStone = true;
				tile.isEdge = true;
				tile.fill({r:0,g:0,b:0});
			}if(i == 21){
				tile.edge.push("BOTTOM");
				tile.isStone = true;
				tile.isEdge = true;
				tile.fill({r:0,g:0,b:0});
			}if(j == 11){
				tile.edge.push("RIGHT");
				tile.isStone = true;
				tile.isEdge = true;
				tile.fill({r:0,g:0,b:0});
			}
			tileXarr.push(tile);
			fillStartX = fillEndX;
		}
		mainTileArr.push(tileXarr);
		fillStartY = fillStartY+tileHeight;
	}
	
	this.mainTileArr = mainTileArr;
	
	//미리보기
	var previewTileArr = new Array();
	fillStartY = 0;
	for(var i=0; i<6; i++){
		
		var tileXarr = new Array();
		var fillStartX = this.mainDiv.width*2;
		
		for(var j=0; j<7; j++){
			var fillEndX = fillStartX + tileWidth;
			var fillEndY = fillStartY + tileHeight;
			var tile = new Tile(j, i, fillStartX, fillStartY, fillEndX, fillEndY);
			tileXarr.push(tile);
			fillStartX = fillEndX;
		}
		previewTileArr.push(tileXarr);
		fillStartY = fillStartY+tileHeight;
	}
	this.previewTileArr = previewTileArr;
	
}
Tetris.prototype.tileAnimateClear = function(){
	var tetris = this;
	var mainTileArr = tetris.mainTileArr;
	var i=0;
	var j=0;
	var fillBack = setInterval(function(){
		if(!mainTileArr[i][j].isEdge){
			mainTileArr[i][j].fill(tetris.mainDiv.color);
			mainTileArr[i][j].isStone = false;
		}
		j++;
		if(j == 12){
			j = 0;
			i++;
			if(i == 22){
				clearInterval(fillBack);
			}
		}
	},5);
}
Tetris.prototype.tileClear = function(){
	var mainTileArr = this.mainTileArr;
	for(var i=0; i<22; i++){
		for(var j=0; j<12; j++){
			if(!mainTileArr[i][j].isStone && mainTileArr[i][j].edge.length == 0){
				mainTileArr[i][j].fill(this.mainDiv.color);
			}
		}
	}
	var previewTileArr = this.previewTileArr;
	for(var i=0; i<6; i++){
		for(var j=0; j<7; j++){
			previewTileArr[i][j].fill({r:0,g:0,b:0});
		}
	}
}
Tetris.prototype.newBlock = function(){
	
	if(this.mainTileArr[1][5].isStone){
		this.gameOver();
		TETRIS_CB_GAME_OVER();
		return;
	}
	
	this.targetBlock = this.previewBlock;
	this.targetBlock.centerX = 5;
	this.targetBlock.centerY = 1;
	this.targetBlock.fill();
	
	//0:Oblock, 1:Zblock, 2:Zrblock, 3:Lblock, 4:Lrblock, 5:Tblock, 6:Iblock
	var randNo = parseInt(Math.random()*7);
	if(randNo == 0){
		this.previewBlock = new Oblock();
	}else if(randNo == 1){
		this.previewBlock = new Zblock();
	}else if(randNo == 2){
		this.previewBlock = new Zrblock();
	}else if(randNo == 3){
		this.previewBlock = new Lblock();
	}else if(randNo == 4){
		this.previewBlock = new Lrblock();
	}else if(randNo == 5){
		this.previewBlock = new Tblock();
	}else{
		this.previewBlock = new Iblock();
	}
	this.previewBlock.fill(this.previewTileArr);
	
}
Tetris.prototype.startGame = function(){
	
	parent.window.addEventListener("keydown", keydown);
	window.addEventListener("keydown", keydown);
	
	var tetris = this;
	
	//0:Oblock, 1:Zblock, 2:Zrblock, 3:Lblock, 4:Lrblock, 5:Tblock, 6:Iblock
	var randNo = parseInt(Math.random()*7);
	if(randNo == 0){
		tetris.previewBlock = new Oblock();
	}else if(randNo == 1){
		tetris.previewBlock = new Zblock();
	}else if(randNo == 2){
		tetris.previewBlock = new Zrblock();
	}else if(randNo == 3){
		tetris.previewBlock = new Lblock();
	}else if(randNo == 4){
		tetris.previewBlock = new Lrblock();
	}else if(randNo == 5){
		tetris.previewBlock = new Tblock();
	}else{
		tetris.previewBlock = new Iblock();
	}
	tetris.previewBlock.fill(tetris.previewTileArr);
	
	tetris.newBlock();
	tetris.tileClear();
	
	tetris.interval = setInterval(function(){
		
		if(tetris.targetBlock.isToStop()){
			tetris.targetBlock.setStone();
			tetris.tileClear();
			tetris.newBlock();
			tetris.tetris();
		}else{
			tetris.targetBlock.centerY++;
			tetris.tileClear();
			tetris.targetBlock.fill();
			tetris.previewBlock.fill(tetris.previewTileArr);
		}
		
	}, 1000);
	
}
Tetris.prototype.gameOver = function(){
	tetris.targetBlock = null;
	parent.window.removeEventListener("keydown", keydown);
	window.removeEventListener("keydown", keydown);
	if(this.interval){
		clearInterval(this.interval);
	}
	var sound = this.sound.gameover;
	sound.play();
	sound.currentTime = 0;
	this.tileAnimateClear();
}
Tetris.prototype.tetris = function(){
	
	//마지막줄부터 검사
	//해당 줄의 타일이 모두 스톤이면, 모든 줄의 바로 윗줄을 복사하여 아랫줄에 추가
	//첫번째는 흰타일로 설정
	label:
	for(var i=20; i>1; i--){
		
		var row = this.mainTileArr[i];
		var beforeRow = this.mainTileArr[i-1];
		
		for(var j=1; j<11; j++){
			if(!row[j].isStone){
				continue label;
			}
		}
		
		//해당 줄의 타일이 모두 스톤이면, 모든 줄의 바로 윗줄을 복사하여 아랫줄에 추가
		for(var m=i; m>1; m--){
			for(var n=1; n<11; n++){
				var beforeStone = this.mainTileArr[m-1][n].isStone;
				var beforeColor = this.mainTileArr[m-1][n].color;
				this.mainTileArr[m][n].isStone = beforeStone;
				this.mainTileArr[m][n].fill(beforeColor);
			}
		}
		
		//첫번째는 흰타일로 설정
		for(var b=1; b<11; b++){
			this.mainTileArr[1][b].isStone = false;
			this.mainTileArr[1][b].fill(this.mainDiv.color);
		}
		
		this.tetrisCnt++;
		i++;
		
	}
	
	if(this.tetrisCnt > 0){
		this.soundTetris();
		TETRIS_CB_TETRIS(this.tetrisCnt);
		this.tetrisCnt = 0; 
	}
	
}
Tetris.prototype.soundSpace = function(){
	var sound = this.sound.move;
	sound.play();
	setTimeout(function(){
		sound.pause();
		sound.currentTime = 0;
	},100);
}
Tetris.prototype.soundMove = function(){
	var sound = this.sound.move;
	sound.volume = 0.5;
	sound.currentTime = 0.68;
	sound.play();
	setTimeout(function(){
		sound.pause();
		sound.currentTime = 0;
		sound.volume = 1;
	},100);
}
Tetris.prototype.soundChange = function(){
	var sound = this.sound.move;
	sound.volume = 0.5;
	sound.currentTime = 0.68;
	sound.play();
	setTimeout(function(){
		sound.pause();
		sound.currentTime = 0;
		sound.volume = 1;
	},100);
}
Tetris.prototype.soundTetris = function(){
	var sound = this.sound.tetris;
	sound.volume = 0.3;
	sound.currentTime = 0.3;
	sound.play();
	sound.currentTime = 0;
}