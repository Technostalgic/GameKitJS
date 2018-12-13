/** an object used to create a font from a spritesheet of pre-drawn text characters */
class SpriteFont{
	/** initialize a new instance of a SpriteFont object */
	constructor(){

		/** @type {Image} */
		this.spriteSheet = null;

		this.spriteTable = [];

		this.maxSpriteWidth = 12;
		this.maxSpriteHeight = 16;
	}

	mapCharacter(/**@type {string}*/char, /**@type {rect}*/ sprite){

		this.spriteTable[char.charCodeAt[0]] = sprite;
	}

	/** render's a string using the sprite characters from the SpriteFont sprite sheet */
	drawString(/** @type {CanvasRenderingContext2D} */ ctx, /**@type {string}*/ str){

		let pos = new vec2();

		sprites = [];
		for(let i = 0; i < str.length; i++){
			let sprite = new rect(pos, )
		}
	}
}