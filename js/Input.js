class InputHandler{
	
	constructor(){ 

		/**@type {Game}*/
		this.parentGame = null;
	}

	/** attaches the the input events to the callback functions with respect to the specified canvas element */
	AttachEvents(/**@type {HTMLCanvasElement}*/canvas){

		canvas.addEventListener("mousedown", this.OnMouseDown);
		canvas.addEventListener("mouseup", this.OnMouseUp);
		document.addEventListener("keydown", this.OnKeyDown);
		document.addEventListener("keyup", this.OnKeyDown.OnKeyUp);
	}
	/** detaches the input events from the callback functions */
	DetachEvents(/**@type {HTMLCanvasElement}*/canvas){

		canvas.removeEventListener("mousedown", this.OnMouseDown);
		canvas.removeEventListener("mouseup", this.OnMouseUp);
		document.addEventListener("keydown", this.OnKeyDown);
		document.addEventListener("keyup", this.OnKeyUp);
	}

	/** called when a keyboard key is pressed */
	OnKeyDown(e){ }
	/** called when a keyboard key is released */
	OnKeyUp(e){ }

	/** called when the mouse is pressed */
	OnMouseDown(e){
		
		if(this.parentGame.currentGUI)
			this.parentGame.currentGUI.OnCursorDown(new vec2(e.offsetX, e.offsetY));
	}
	/** called when the mouse is released */
	OnMouseUp(e){ 
		
	}
}