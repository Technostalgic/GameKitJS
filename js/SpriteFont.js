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

		// create the canvas object that will contain the text image
		var tcanvas = document.createElement("canvas");
		tcanvas.width = str.length * this.maxSpriteWidth * format.size + (str.length - 1 * format.spacing * format.size);
		tcanvas.height = this.maxSpriteHeight * format.size;
		var ctx = tcanvas.getContext("2d");
		
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, 100, 100);
		
		// determine the width of the canvas and set it before anything is rendered onto the canvas
		var cwidth = 0;
		for(let i = 0; i < str.length; i++)
			cwidth += this.spriteTable[str.charCodeAt(i)].width * format.size + format.spacing * format.size;
		tcanvas.width = cwidth - format.spacing;
		ctx.imageSmoothingEnabled = format.smoothing;
		
		// render each character in the string onto the canvas
		cwidth = 0;
		for(let i = 0; i < str.length; i++){
			let sprite = this.spriteTable[str.charCodeAt(i)];
			let target = new rect(new vec2(cwidth, 0), sprite.size.Scaled(format.size))
			RenderHelper.DrawSprite(ctx, this.spriteSheet, target, sprite);
			cwidth += sprite.width * format.size + format.spacing * format.size;
		}
		
		return tcanvas;
	}
}