///
///	code by Isaiah Smith
///		
///	https://technostalgic.tech  
///	twitter @technostalgicGM
///

/** information to render a string according to a specific format */
class TextRenderFormat{
	constructor(){

		/**@type {String}*/
		this.font = "Default";
		/**@type {Number}*/
		this.size = 1;
		/**@type {Number} */
		this.spacing = -1;
		/**@type {enum(HorizontalTextAlignment)}*/
		this.hAlign = HorizontalTextAlignment.Center;
		/**@type {enum(VerticalTextAlignment)}*/
		this.vAlign = VerticalTextAlignment.Center;
		/**@type {Color}*/
		this.fillColor = new Color();
		/**@type {Number}*/
		this.outlineWidth = 1;
		/**@type {Boolean}*/
		this.outline = false;
		/**@type {Boolean} */
		this.smoothing = false;
	}

	static get default(){
		return new TextRenderFormat();
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