///
///	code by Isaiah Smith
///		
///	https://technostalgic.tech  
///	twitter @technostalgicGM
///

/** an object used to create a font from a spritesheet of pre-drawn text characters */
class SpriteFont {
	/** initialize a new instance of a SpriteFont object */
	constructor() {

		this.fontName = "default";

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
		r._onFinishDelegate = onFinishDelegate;

		var callback = function(data){
			r.LoadJSONData(data);
			r.LoadStatusCheck();
		};
		ContentPipeline.LoadJSONASync(path, callback);

		return r;
	}

	/** @type {SpriteFont} parses a JSON spritefont configuration into a spritefont object and returns the spritefont*/
	static FromJSONObject(data){
		var r = new SpriteFont();

		r.LoadJSONData(data);
		
		return r;
	}

	/** @type {Object} converts the spriteFont to a loadable JSON object */
	ToJSONObject(){
		var r = {};

		r.spriteSheet = this._spriteSheet.src;
		r.maxSpriteWidth = this.maxSpriteWidth;
		r.maxSpriteHeight = this.maxSpriteHeight;

		r.characters = {};
		for(let chc in this.spriteTable){
			
			let chr = String.fromCharCode(chc);
			r.characters[chr] = this.spriteTable[chc].toJSONArray();
		}

		return r;
	}

	/** loads data from a JSON object and replaces all this spriteFont's data */
	LoadJSONData(data){

		this.fontName = data.fontName;

		// if the spritesheet graphic was already loaded by the content pipeline, use the graphic
		var spritesheet = null;
		if(!!Game.instance){

			var pgfx = Object.assign({}, Game.content.graphics, Game.content.unfinishedAssets)
			for(let gk in pgfx){

				let graphic = pgfx[gk];
				var iscontent = true;
				var gsrc = graphic.content.src;
				if(!!graphic.src){
					gsrc = graphic.src
					iscontent = false;
				}

				if(!!gsrc && graphic.content.src.indexOf(data.spriteSheet.substr(1)) >= 0){
					spritesheet = iscontent ? graphic.content : graphic;
					break;
				}
			}
		}

		// if it hasn't been loaded, load it.
		if(!spritesheet)
			this.LoadSpriteSheet(data.spriteSheet);
		else{
			this._spriteSheet = spritesheet;
			this._loaded = true;
		}

		this.maxSpriteWidth = data.maxSpriteWidth;
		this.maxSpriteHeight = data.maxSpriteHeight;

		for(let char in data.characters){
			let chc = char.charCodeAt(0);

			this.spriteTable[chc] = rect.FromJSONArray(data.characters[char]);
		}
	}

	/** loads a spritesheet texture into the spritefont */
	LoadSpriteSheet(/**@type {string}*/ path, onFinishDelegate = null) {

		this._spriteSheet = Game.content.LoadAsset("font_" + this.fontName, path, AssetType.Image);

		var ths = this;
		var onload = function(){

			ths._loaded = true;
			
			if(!!onFinishDelegate)
				onFinishDelegate();
			ths.LoadStatusCheck();
		};

		this._spriteSheet.addEventListener("load", onload);
	}

	LoadStatusCheck(){
		if(!this.loaded)
			return;

		if(!!this._onFinishDelegate){

			this._onFinishDelegate();
			this._onFinishDelegate = null;
		}
	}

	/** whether or not the spritesheet for this spritefont has loaded */
	get loaded() {
		return this._loaded;
	}

	get spriteSheet() {
		return this._spriteSheet;
	}

	/** @type {rect} returns the sprite of the specified character */
	SpriteOf(/**@type {string}*/char){
		return this.spriteTable[char.charCodeAt(0)] ?
			this.spriteTable[char.charCodeAt(0)] : 
			new rect(new vec2(), new vec2(this.maxSpriteWidth, this.maxSpriteHeight));
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
			cwidth += this.SpriteOf(str[i]).width * format.size + format.spacing * format.size;
		tcanvas.width = cwidth - format.spacing;
		ctx.imageSmoothingEnabled = format.smoothing;
		
		// render each character in the string onto the canvas
		cwidth = 0;
		for(let i = 0; i < str.length; i++){
			let sprite = this.SpriteOf(str[i]);
			let target = new rect(new vec2(cwidth, 0), sprite.size.Scaled(format.size))
			RenderHelper.DrawSprite(ctx, this.spriteSheet, target, sprite);
			cwidth += sprite.width * format.size + format.spacing * format.size;
		}
		
		return tcanvas;
	}
}