// An object that handles game related logic
class Game {
	constructor() {

		// the target resolution of the application
		this.resolution = new vec2(600, 600);

		// the canvas that everything will be rendered onto
		this.renderTarget = document.createElement("canvas");
		this.renderTarget.width = this.resolution.x;
		this.renderTarget.height = this.resolution.y;
		this.renderContext = this.renderTarget.getContext("2d");

		// the webpage canvas to render the game to
		/** @type {HTMLCanvasElement} */
		this.canvasTarget = null;
		/** @type {CanvasRenderingContext2D} */
		this.canvasTargetContext = null;

		/** @type {Number} */
		this.elapsedTime;
		/** @type {Number} */
		this.trueElapsedTime;
		/** @type {Number} */
		this.timescale = 1;
		/** @type {InputHandler} */
		this.inputHandler = null;
		/** @type {Boolean} */
		this._isRunning = false;
		/** @type {Number} */
		this._lastStep = 0;
	}
	
	/** attaches an @type {InputHandler} object to the game */
	SetInputHandler(/** @type {InputHandler} */handler){
		this.inputHandler = handler;
	}

	/** sets the canvas that the game will be rendered onto */
	SetPaintingTarget(canvas) {
		
		this.canvasTarget = canvas;
		this.canvasTargetContext = this.canvasTarget.getContext("2d");
	}

	/** starts running the game */
	StartRunning(){

		this.inputHandler.AttachEvents(this.canvasTarget);

		this._lastStep = performance.now();
		this._isRunning = true;
		
		this.step();
	}
	/** stops running the game */
	StopRunning(){

		this.inputHandler.DetachEvents(this.canvasTarget);
		this._isRunning = false;
	}

	/** @private handles a full game cycle and sets up another to be called */
	step() {

		// calculate the delta time and update the game accordingly
		var now = performance.now();
		var dt = now - this._lastStep();
		this._lastStep = now;
		this.Update(dt);

		// renders the game to the specified painting target
		this.RenderToCanvas(this.canvasTarget, this.canvasTargetContext);

		// sets up the next step to be called if the game is running
		if (this._isRunning)
			requestAnimationFrame(this.step);
	}
	/** updates the game world by the specified delta time in seconds */
	Update(/**@type {Number}*/ dt) {

		// increment the elapsed time counters
		trueElapsedTime += dt;
		dt *= this.timescale;
		elapsedTime += dt;
	}
	
	/** clears the canvas to a solid color */
	ClearCanvas(/** @type {Color}*/color = new Color(255, 255, 255)){
		
		this.canvasTargetContext.fillStyle = color.ToRGB();
		this.canvasTargetContext.fillRect(0, 0, this.canvasTarget.width, this.canvasTarget.height);
	}
	/** paints the renderTarget to the specified canvas */
	RenderToCanvas(/**@type {HTMLCanvasElement}*/canvas, /**@type {CanvasRenderingContext2D}*/ context) {

		this.ClearCanvas();
		var drawTarget = new rect(vec2.zero, this.resolution.clone);
		context.drawImage(this.renderTarget, drawTarget.left, drawTarget.top, drawTarget.width, drawTarget.height);
	}
}