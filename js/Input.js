///
///	code by Isaiah Smith
///		
///	https://technostalgic.tech  
///	twitter @technostalgicGM
///

class InputHandler{
	
	constructor(){ 

		/**@type {Game}*/
		this.parentGame = null;
		/**@type {Object} */
		this.listeners = null;
		/**@type {HTMLCanvasElement}*/
		this.canvasListener = null;

		/**@type {Array}*/
		this._keysPressed = [];
	}

	/** generates non-anonymous event listener functions */
	GenerateEventListeners(){

		this.listeners = {};
		var ths = this;

		this.listeners.mousedown = function(e){ ths.OnMouseDown(e); };
		this.listeners.mouseup = function(e){ ths.OnMouseUp(e); };
		this.listeners.mousemove = function(e){ ths.OnMouseMove(e); };
		this.listeners.keydown = function(e){ ths.OnKeyDown(e); };
		this.listeners.keyup = function(e){ ths.OnKeyUp(e); };
	}
	/** attaches the the input events to the callback functions with respect to the specified canvas element */
	AttachEvents(/**@type {HTMLCanvasElement}*/canvas){

		if(!!this.canvasListener){
			console.log("Input handler already hooked to canvas element");
			return;
		}

		this.canvasListener = canvas;
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

		if(this.canvasListener == canvas)
			this.canvasListener = null;

		if(!this.listeners)
			this.GenerateEventListeners();

		canvas.removeEventListener("mousedown", this.listeners.mousedown);
		canvas.removeEventListener("mouseup", this.listeners.mouseup);
		canvas.removeEventListener("mousemove", this.listeners.mousemove);
		document.removeEventListener("keydown", this.listeners.keydown);
		document.removeEventListener("keyup", this.listeners.keyup);
	}

	/** called when a keyboard key is pressed */
	OnKeyDown(e){ 
		
		this._keysPressed[e.keyCode] = true;
	}
	/** called when a keyboard key is released */
	OnKeyUp(e){ 
		
		this._keysPressed[e.keyCode] = false;
	}

	/** @type {Boolean} returns true if the key is being pressed */
	IsKeyPressed(/**@type {Number}*/ keyCode){

		if(!this._keysPressed[keyCode])
			return false;

		return _keysPressed[keyCode];
	}
	/** @type {Array} returns an array of all the codes of the keys that are currently being pressed*/
	GetPressedKeys(){

		var r = [];
		for(let i in this._keysPressed){
			if(this._keysPressed[i])
				r.push(Number.parseInt(i));
		}

		return r;
	}

	/** called when the mouse is pressed */
	OnMouseDown(e){
		
		var mpos = this.getCorrectedScreenPos(new vec2(e.offsetX, e.offsetY));

		if(this.parentGame.currentGUI)
			this.parentGame.currentGUI.OnCursorDown(mpos);
	}
	/** called when the mouse is released */
	OnMouseUp(e){ 

		var mpos = this.getCorrectedScreenPos(new vec2(e.offsetX, e.offsetY));
	}
	/** called when the mouse is moved */
	OnMouseMove(e){
		
		var mpos = this.getCorrectedScreenPos(new vec2(e.offsetX, e.offsetY));

		if(this.parentGame.currentGUI)
			this.parentGame.currentGUI.OnCursorMove(mpos);
	}

	/**@private @type {vec2} takes into account the ratio of the game resolution compared to the viewport size and position */
	getCorrectedScreenPos(screenpos){

		// calculate the mouse position offset and scale to the game's native resolution
		var mperc = this.parentGame.viewport.CalculateContainedVector(screenpos);
		mperc = mperc.Scaled(this.parentGame.resolution);

		return mperc;
	}
}

/** an object that defines a scheme of controls for the game to react to user input */
class ControlScheme{
	constructor(){
		this.controls = [];
	}
}

/** an object that links a user input to an action to be performed by the game */
class Control{
	constructor(){

		this.id = 0;
		this.name = "Control";
		this.action = null;
	}
}

/** an enumerator for the types of input that a control can accept */
var ControlType = {
	keyboard: 0,
	mouse: 1,
	controller: 2
}

/** an extended enumeration class for enumerating what controls the user is trying to trigger */
class ControlAction{
	
	static get _nextActionNumber(){
		
		if(!ControlAction._nextNum)
		ControlAction._nextNum = 0;
		else
		ControlAction._nextNum += 1;
		
		return ControlAction._nextNum;
	}

	/**@type {Array} a list of all the actions that the ControlAction object holds*/
	static get allActions(){

		if(!ControlAction._actions)
			ControlAction._actions = [];

		return ControlAction._actions;
	}
	
	/** adds a control action to the @see ControlAction enumerator that can be tested for on control input events */
	static AddControlAction(/**@type {String}*/controlName){

		var num = ControlAction._nextActionNumber;
		ControlAction[controlName] = num;
		ControlAction.allActions.push({
			name: controlName,
			actionNumber: num
		});
	}
}