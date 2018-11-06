class GUIGraphic {
	constructor() {
		/**@type {GUI}*/
		this._parentGUI = null;
		/**@type {rect}*/
		this.bounds = null;
	}

	/**@type {CanvasRenderingContext2D}*/
	get renderContext() {
		return this._parentGUI.parentGame.renderContext;
	}

	/** paints the graphic on to the initial GUI Canvas, use this if the graphic is unchanging */
	DrawStatic(/**@type {CanvasRenderingContext2D}*/ctx) { }
	/** repaints the graphic onto the render context each fram */
	DrawDynamic(/**@type {CanvasRenderingContext2D}*/ctx) { }

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

	DrawStatic(/**@type {CanvasRenderingContext2D}*/ctx){
		
		ctx.drawImage(
			this.texture, 
			this.sourceRect.left, this.sourceRect.top,
			this.sourceRect.width, this.sourceRect.height,
			this.bounds.left, this.bounds.top,
			this.bounds.width, this.bounds.height);
	}
}