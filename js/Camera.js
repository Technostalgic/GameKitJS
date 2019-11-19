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

		/**@private @type {HTMLCanvasElement} the canvas that the camera draws to */
		this._renderTarget = document.createElement("canvas");
		this._renderTarget.width = resolution.x;
		this._renderTarget.height = resolution.y;

		/**@private @type {CanvasRenderingContext2D} */
		this._renderContext = this._renderTarget.getContext('2d');
	}

	/** @type {HTMLCanvasElement} the canvas that the camera renders to */
	get renderTarget(){
		return this._renderTarget;
	}

	/** @type {CanvasRenderingContext2D} */
	get renderContext(){
		return this._renderContext;
	}

	/** @param {vec2} worldPoint the point to transform
	 * @type {vec2} transforms a point in the world into a viewport position transformed by the camera's orientation*/
	WorldToViewportPos(worldPoint){
		
		/** @type {vec2} */
		// apply the translation
		let tpos = worldPoint.clone.Minus(this.position);

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

	/** @param {vec2} veiwportPoint the point to tranform
	 * @type {vec2} transforms a point in the camera's viewport to the world position*/
	ViewportToWorldPos(veiwportPoint){
		
		// set the return variable
		let tpos = veiwportPoint.clone;

		// revert the rotation from the camera, if the camera has any rotation
		if(this.rotation != 0){

			// calculate the magnitude and direction of the vector
			let mag = tpos.magnitude;
			let ang = tpos.direction;

			// subtract the camera's rotation from the vector angle
			ang -= this.rotation;

			// calculate the the rotation from the camera and set the vector to the result
			tpos = new vec2(Math.cos(ang), Math.sin(ang)) * mag;
		}
	}

	/** @param {vec2} resolution the target resolution to set the canvas to
	 * @param {Boolean} resizeRenderTarget whether or not the canvas should be scaled up/down with the new resolution
	 * @type {void} sets the resolution to the specified resolution*/
	SetResolution(resolution, resizeRenderTarget = true){

		if(resizeRenderTarget){

			// store the previous canvas in cv
			/**@type {HTMLCanvasElement} */
			let cv = document.createElement("canvas");
			cv.width = resolution.x;
			cv.height = resolution.y;
			cv.getContext('2d').drawImage(this._renderTarget, 0, 0, cv.width, cv.height);
			
			// resize the render target canvas
			this._renderTarget.width = resolution.x;
			this._renderTarget.height = resolution.y;

			// re-draw the old canvas on to the new canvas' resolution
			this._renderContext = _renderTarget.getContext('2d');
			_renderContext.drawImage(cv, 0, 0);
		}
		else{

			// resize the render target canvas
			this._renderTarget.width = resolution.x;
			this._renderTarget.height = resolution.y;
		}
	}
}