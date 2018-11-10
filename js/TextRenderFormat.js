/** information to render a string according to a specific format */
class TextRenderFormat{
	constructor(){

		/**@type {String}*/
		this.font = "Munro";
		/**@type {String}*/
		this.style = "None";
		/**@type {Number}*/
		this.size = 10;
		/**@type {enum(HorizontalTextAlignment)}*/
		this.hAlign = HorizontalTextAlignment.Center;
		/**@type {enum(VerticalTextAlignment)}*/
		this.vAlign = VerticalTextAlignment.Center;
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
		ctx.textAlign = HorizontalTextAlignmentToString(this.hAlign);

		if(this.fill)
			ctx.fillStyle = this.fillColor.ToRGBA();
		if(this.outline){
			ctx.strokeStyle = this.outlineColor.ToRGBA();
			ctx.lineWidth = this.outlineWidth;
		}
	}
}

/** enumerator for different text alignment styles */
var HorizontalTextAlignment = {
	Left: 0,
	Center: 1,
	Right: 2
}
var VerticalTextAlignment = {
	Top: 0,
	Center: 1,
	Bottom: 2
}

function HorizontalTextAlignmentToString(textAlign){

	switch(textAlign){
		case HorizontalTextAlignment.Left:
			return "start";
		case HorizontalTextAlignment.Center:
			return "center";
		case HorizontalTextAlignment.Right:
			return "end";
	}
}