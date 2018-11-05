class InputHandler{
	
	constructor(){ 

		/**@type {Game}*/
		this.parentGame = null;
		/**@type {Object} */
		this.listeners = null;
	}

	/** generates non-anonymous event listener functions */
	GenerateEventListeners(){

		this.listeners = {};
		var ths = this;

		this.listeners.mousedown = function(e){ ths.OnMouseDown(e); };
		this.listeners.mouseup = function(e){ ths.OnMouseUp(e); };
		this.listeners.mousemove = function(e){ ths.OnMouseMove(e); };
		this.listeners.keydown = function(e){ ths.OnKeyDown(e); };
		this.listeners.keyup = function(e){ ths.OnKeyDown.OnKeyUp(e); };
	}
	/** attaches the the input events to the callback functions with respect to the specified canvas element */
	AttachEvents(/**@type {HTMLCanvasElement}*/canvas){

		if(!this.listeners)
			this.GenerateEventListeners();

		canvas.addEventListener("mousedown", this.listeners.mousedown);
		canvas.addEventListener("mouseup", this.listeners.mouseup);
		canvas.addEventListener("mousemove", this.listeners.mousemove);
		document.addEventListener("keydown", this.listeners.keydown);
		document.addEventListener("keyup", this.listeners.keyup);
	}
	/** detaches the input events from the callback functions */
	DetachEvents(/**@type {HTMLCanvasElement}*/canvas){

		if(!this.listeners)
			this.GenerateEventListeners();

		canvas.removeEventListener("mousedown", this.listeners.mousedown);
		canvas.removeEventListener("mouseup", this.listeners.mouseup);
		canvas.removeEventListener("mousemove", this.listeners.mousemove);
		document.removeEventListener("keydown", this.listeners.keydown);
		document.removeEventListener("keyup", this.listeners.keyup);
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