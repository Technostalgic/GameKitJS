///
///	code by Isaiah Smith
///		
///	https://technostalgic.tech  
///	twitter @technostalgicGM
///

class GUIGraphic {
	constructor() {
		/**@type {GUI}*/
		this._parentGUI = null;
		/**@type {rect}*/
		this.bounds = null;
	}

	/**@type {CanvasRenderingContext2D}*/
	get renderContext() {
		return this._parentGUI.renderContext;
	}
	get staticContext() {
		return this._parentGUI.staticContext;
	}

	/** paints the graphic on to the static GUI background Canvas, use this if the graphic is unchanging */
	DrawStatic() { }
	/** repaints the graphic onto the render context each frame, usie this if the graphic changes at all */
	DrawDynamic() { }

	/** Sets the center of the graphic to the specified location */
	SetCenter(center) {
		this.bounds.center = center;
	}
}

class GUIGraphic_IMG extends GUIGraphic {
	constructor() {
		super();

		/**@type {Image}*/
		this.texture;
		/**@type {rect}*/
		this.sourceRect;
	}

	DrawStatic(/**@type {CanvasRenderingContext2D}*/ctx) {

		ctx.drawImage(
			this.texture,
			this.sourceRect.left, this.sourceRect.top,
			this.sourceRect.width, this.sourceRect.height,
			this.bounds.left, this.bounds.top,
			this.bounds.width, this.bounds.height);
	}
}