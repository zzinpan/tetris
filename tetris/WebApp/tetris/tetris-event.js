function keydown(e){
	if(tetris.targetBlock){
		if(e.keyCode == 37){
			tetris.soundMove();
			tetris.targetBlock.left();
		}
		if(e.keyCode == 38){
			tetris.soundChange();
			tetris.targetBlock.top();
		}
		if(e.keyCode == 39){
			tetris.soundMove();
			tetris.targetBlock.right();
		}
		if(e.keyCode == 40){
			tetris.soundMove();
			tetris.targetBlock.bottom();
		}
		if(e.keyCode == 32){
			tetris.targetBlock.space();
		}
		tetris.tileClear();
		tetris.targetBlock.fill();
		tetris.previewBlock.fill(tetris.previewTileArr);
	}
}