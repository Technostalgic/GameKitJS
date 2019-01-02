/** an object used to create a font from a spritesheet of pre-drawn text characters */
class SpriteFont {
	/** initialize a new instance of a SpriteFont object */
	constructor() {

		/** @type {Image} */
		this._spriteSheet = null;

		this.spriteTable = [];

		this.maxSpriteWidth = 0;
		this.maxSpriteHeight = 0;

		/** private */
		this._loaded = false;
	}

	/** @type {SpriteFont} loads a spriteFont from a file path and returns it */
	static Load(/**@type {string}*/ path, /**@type {Function}*/ onFinishDelegate = null) {

		var r = new SpriteFont();

		r.loadSpriteSheet(path, onFinishDelegate);

		return r;
	}

	/** loads a spritesheet texture into the spritefont */
	loadSpriteSheet(/**@type {string}*/ path, onFinishDelegate = null) {

		this._spriteSheet = new Image();
		this._spriteSheet.src = path;

		if (onFinishDelegate != null)
			this._spriteSheet.onload = onFinishDelegate;
	}

	/** whether or not the spritesheet for this spritefont has loaded */
	get loaded() {
		return this._loaded;
	}

	get spriteSheet() {
		return this._spriteSheet;
	}

	/** maps a character to the specified sprite rectangle */
	MapCharacter(/**@type {string}*/char, /**@type {rect}*/ sprite) {

		var code = char.charCodeAt(0);
		this.spriteTable[code] = sprite;

		this.maxSpriteWidth = Math.max(this.maxSpriteWidth, sprite.width);
		this.maxSpriteHeight = Math.max(this.maxSpriteHeight, sprite.height);
	}

	/** @type {HTMLCanvasElement} renders a string using the sprite characters from the SpriteFont 
	 * sprite sheet onto a canvas and returns it */
	GenerateTextImage(/**@type {string}*/ str, /**@type {TextRenderFormat}*/ format) {

		// TODO: THIS WHOLE FUCKING FUNCTION IS WONKY, FIX IT!

		var tcanvas = document.createElement("canvas");
		tcanvas.width = str.length * this.maxSpriteWidth;
		tcanvas.height = this.maxSpriteHeight;
		var ctx = tcanvas.getContext("2d");

		// TODO: Fix temporary patch (ACTUALLY NEVER MIND IT TURNS OUT THE BS PATCH DOESN'T EVEN WORK)
		// this code (specifically drawing to the 'ctx' context) doesn't work unless called 
		// asynchronously for some reason and I can't figure out why. for now, I'll just call 
		// it asynchronously and hope that a solution pops into my head at some point
		var ths = this;
		setTimeout(function(){
			
			// for debugging: writing to canvas only seems to work if it doesn't go any further than these two lines
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, 100, 100);
			// return

			let cwidth = 0;
			for(let i = 0; i < str.length; i++){
				let sprite = ths.spriteTable[str.charCodeAt(i)];
				let target = new rect(new vec2(cwidth, 0), sprite.size.clone)
				RenderHelper.DrawSprite(ctx, ths.spriteSheet, target, sprite);
				cwidth += sprite.width;
			}

			tcanvas.width = cwidth;
		});
		
		return tcanvas;
	}
}