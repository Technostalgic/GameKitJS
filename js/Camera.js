///
/// 	code by Isaiah Smith
///
/// 	https://technostalgic.tech  
/// 	twitter @technostalgicGM
///

/** an object that handles transforming object positions, rotations and scale based on the camera's orientation */
class Camera{

	/**@param {vec2} resolution the resolution that the camera renders at */
	constructor(resolution){

		/** @type {vec2} the position of the camera */
		this.position = vec2.zero;

		/** @type {Number} the zoom level of the camera */
		this.zoom = 0.1;

		/** @type {Number} the rotation of the camera in radians */
		this.rotation = 0;

		/**@type {HTMLCanvasElement} the canvas that the camera draws to */
		this.canvas = new HTMLCanvasElement();
		this.canvas.width = resolution.x;
		this.canvas.height = resolution.y;

		/**@type {CanvasRenderingContext2D} */
		this._context = this.canvas.getContext('2d');
	}

	/**@type {CanvasRenderingContext2D} */
	get context(){
		return this._context;
	}

	/** @type {vec2} transforms a point in the world into a viewport position transformed by the camera's orientation*/
	WorldToViewportPos(worldPoint){
		
		/**@type {vec2} */
		// apply the translation
		let tpos = worldPoint - this.position;

		// apply the zoom
		tpos *= this.zoom;

		// apply the rotation, if any
		if(this.rotation != 0){
			
			// calculate magnitude(mag) and the direction(ang) of the vector
			let mag = tpos.magnitude;
			let ang = tpos.direction;

			// add the camera's rotation to the vector angle
			ang += this.rotation;

			// calculate the new position based off the rotated vector
			tpos = new vec2(Math.cos(ang), Math.sin(ang)) * mag;
		}

		return tpos;
	}
}