class InputHandler{
	
	constructor(){ 

		/**@type {Game}*/
		this.parentGame = null;
	}

	/** attaches the the input events to the callback functions with respect to the specified canvas element */
	AttachEvents(/**@type {HTMLCanvasElement}*/canvas){

		var ths = this;

		canvas.addEventListener("mousedown", function(e){ ths.OnMouseDown(e); });
		canvas.addEventListener("mouseup", function(e){ ths.OnMouseUp(e); });
		canvas.addEventListener("mousemove", function(e){ ths.OnMouseMove(e); });
		document.addEventListener("keydown", function(e){ ths.OnKeyDown(e); });
		document.addEventListener("keyup", function(e){ ths.OnKeyDown.OnKeyUp(e); });
	}
	/** detaches the input events from the callback functions */
	DetachEvents(/**@type {HTMLCanvasElement}*/canvas){

		var ths = this;

		canvas.removeEventListener("mousedown", function(){ this.OnMouseDown(); });
		canvas.removeEventListener("mouseup", function(){ this.OnMouseUp(); });
		canvas.removeEventListener("mousemove", function(){ this.OnMouseMove(); });
		document.addEventListener("keydown", function(){ this.OnKeyDown(); });
		document.addEventListener("keyup", function(){ this.OnKeyUp(); });
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
	/** called when the mouse is moved */
	OnMouseMove(e){
		
		if(this.parentGame.currentGUI)
			this.parentGame.currentGUI.OnCursorMove(new vec2(e.offsetX, e.offsetY));
	}
}