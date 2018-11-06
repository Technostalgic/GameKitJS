/** information to render a string according to a specific format */
class TextRenderFormat{
	constructor(){

		/**@type {String}*/
		this.font = "Sans-Serif";
		/**@type {String}*/
		this.style = "None";
		/**@type {Number}*/
		this.size = 16;
		/**@type {enum(TextAlignment)}*/
		this.alignment = TextAlignment.Center;
		/**@type {Color}*/
		this.fillColor = new Color();
		/**@type {Color}*/
		this.outlineColor = new Color();
		/**@type {Number}*/
		this.outlineWidth = 1;
		/**@type {Boolean}*/
		this.fill = true;
		/**@type {Boolean}*/
		this.outline = false;
	}

	/** applies the render format styling information to the specified context */
	SetToContext(/**@type {CanvasRenderingContext2D}*/ctx){

		ctx.font = this.size.toString() + "px " + this.font;
		ctx.textAlign = TextAlignmentToString(this.alignment);

		if(this.fill)
			ctx.fillStyle = this.fillColor.ToRGBA();
		if(this.outline){
			ctx.strokeStyle = this.outlineColor.ToRGBA();
			ctx.lineWidth = this.outlineWidth;
		}
	}
}

/** enumerator for different text alignment styles */
var TextAlignment = {
	Left: 0,
	Center: 1,
	Right: 2
}

function TextAlignmentToString(textAlign){

	switch(textAlign){
		case TextAlignment.Left:
			return "start";
		case TextAlignment.Center:
			return "center";
		case TextAlignment.Right:
			return "end";
	}
}