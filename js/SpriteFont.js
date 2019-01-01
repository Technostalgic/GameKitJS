/** an object used to create a font from a spritesheet of pre-drawn text characters */
class SpriteFont{
	/** initialize a new instance of a SpriteFont object */
	constructor(){

		/** @type {Image} */
		this._spriteSheet = null;

		this.spriteTable = [];

		this.maxSpriteWidth = 12;
		this.maxSpriteHeight = 16;

		/** private */
		this._loaded = false;
	}

	/** @type {SpriteFont} loads a spriteFont from a file path and returns it */
	static Load(/**@type {string}*/ path, /**@type {Function}*/ onFinishDelegate = null){

		var r = new SpriteFont();

		r.loadSpriteSheet(path, onFinishDelegate);

		return r;
	}

	/** loads a spritesheet texture into the spritefont */
	loadSpriteSheet(/**@type {string}*/ path, onFinishDelegate = null){

		this._spriteSheet = new Image();
		this._spriteSheet.src = path;

		if(onFinishDelegate != null)
			this._spriteSheet.onload = onFinishDelegate;
	}

	/** whether or not the spritesheet for this spritefont has loaded */
	get loaded(){
		return this._loaded;
	}

	get spriteSheet(){
		return this._spriteSheet;
	}

	/** maps a character to the specified sprite rectangle */
	mapCharacter(/**@type {string}*/char, /**@type {rect}*/ sprite){

		this.spriteTable[char.charCodeAt[0]] = sprite;
	}

	/** @type {HTMLCanvasElement} renders a string using the sprite characters from the SpriteFont 
	 * sprite sheet onto a canvas and returns it */
	generateTextImage(/**@type {string}*/ str, /**@type {TextRenderFormat}*/ format){

		var tcanvas = document.createElement("canvas");
		tcanvas.width = str.length * this.maxSpriteWidth;
		tcanvas.height = this.maxSpriteHeight;
		let ctx = tcanvas.getContext("2d");

		let cwidth = 0;
		for(let i = 0; i < str.length; i++){
			let sprite = this.spriteTable[str.charCodeAt[i]];
			let target = new rect(new vec2(cwidth, 0), sprite.size.clone());

			RenderHelper.DrawSprite(ctx, this.spriteSheet, target, sprite);
			cwidth += sprite.width;
		}

		tcanvas.width = cwidth;
		return tcanvas;
	}
}