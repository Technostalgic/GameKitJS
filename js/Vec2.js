/** a data structure that represents a 2 dimensional vector */
class vec2 {
	// initializes the vector with specified x and y components
	constructor(x = 0, y = x) {

		this.x = x;
		this.y = y;
	}

	// adds the vector to another and returns the result
	Plus(vec) {
		return new vec2(this.x + vec.x, this.y + vec.y);
	}
	// subtracts another vector from itself and returns the result
	Minus(vec) {
		return this.Plus(vec.negated);
	}
	// scales the vector by the specified factor and returns the result
	Scaled(factor) {
		return new vec2(this.x * factor, this.y * factor);
	}

	// returns the vector fliped along both axes
	get negated() {
		return this.Scaled(-1);
	}
	// returns a vector with the same XY ratio but it's magnitude scaled to 1
	get normalized(){
		return this.Scaled(1 / this.magnitude);
	}

	// returns the direction in radians that the vector is pointing in
	get direction() {
		return Math.atan2(this.y, this.x);
	}
	// returns the distance of the vector from the origin point <0,0>
	get magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	// returns a new instance of the vector with the same values
	get clone() {
		return new vec2(this.x, this.y);
	}

	toString() {
		return "<" + this.x.toString() + "," + this.y.toString() + ">";
	}

	static get zero() {
		return new vec2(0, 0);
	}
}

/** a data structure that represents an axis aligned box */
class rect {
	// initializes the vector with the specified top left position and size
	constructor(/**@type {vec2}*/position = vec2.zero, /**@type {vec2}*/size = vec2.zero) {
		/**@type {vec2}*/
		this.position = position;
		/**@type {vec2}*/
		this.size = size;
	}

	/**@type {Number}*/
	get left(){
		return this.position.x;
	}
	/**@type {Number}*/
	set left(value){
		this.size.x = this.right - value;
		this.position.x = value;
	}
	/**@type {Number}*/
	get right(){
		return this.position.x + this.size.x;
	}
	/**@type {Number}*/
	set right(value){
		this.size.x = value - this.position.x;
	}
	/**@type {Number}*/
	get top(){
		return this.position.y;
	}
	/**@type {Number}*/
	set top(value){
		this.size.y = this.bottom - value;
		this.position.y = value;
	}
	/**@type {Number}*/
	get bottom(){
		return this.position.y + this.size.y;
	}
	/**@type {Number}*/
	set bottom(value){
		this.size.y = value - this.position.y;
	}

	/**@type {Number}*/
	get width(){
		return this.size.x;
	}
	set width(value){
		this.size.x = value;
	}
	/**@type {Number}*/
	get height(){
		return this.size.y;
	}
	set height(value){
		this.size.x = value;
	}

	/**@type {vec2}*/
	get center(){
		return this.position.Plus(this.size.Scaled(0.5));
	}
	set center(value){
		this.position = value.Minus(this.size.Scaled(0.5));
	}

	/**@type {Number}*/
	get area(){
		return this.size.x * this.size.y;
	}
	/**@type {Boolean}*/
	get isEmpty(){
		return this.area <= 0;
	}

	// returns true if this rect is overlaping the specified rect
	Overlapping(rec){
		
		return (
			this.left > rec.right &&
			this.right < rec.left &&
			this.top < rec.bottom &&
			this.bottom > rec.top
		);
	}
	// returns true if the specified point lies inside the rect (inclusive)
	ContainsPoint(vec){

		return (
			this.right >= vec.x &&
			this.left <= vec.x &&
			this.top <= vec.y &&
			this.bottom >= vec.y
		);
	}

	DrawFill( /**@type {CanvasRenderingContext2D}*/ ctx, /**@type {Color}*/color = new Color()){

		ctx.fillStyle = color.ToRGBA();
		ctx.fillRect(this.left, this.top, this.width, this.height);
	}
	DrawOutline( /**@type {CanvasRenderingContext2D}*/ ctx, /**@type {Color}*/color = new Color(), width = 1){
		
		ctx.strokeStyle = color.ToRGBA();
		ctx.lineWidth = width;
		
		ctx.beginPath();
		ctx.moveTo(this.left, this.top);
		ctx.lineTo(this.left, this.bottom);
		ctx.lineTo(this.right, this.bottom);
		ctx.lineTo(this.right, this.top);
		ctx.closePath();

		ctx.stroke();
	}

	/**@type {rect}*/
	static FromSides(left, right, top, bottom) {
		return new rect(new vec2(left, top), new vec2(right - left, bottom - top));
	}
}

/** a data structure used to represent a visual color */
class Color{
	
	constructor(/**@type {Number}*/r = 0, /**@type {Number}*/g = 0, /**@type {Number}*/b = 0, /**@type {Number}*/a = 1){

		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	/** returns a string representing the color in RGB format that can be used to format a canvasRenderingContext2d fill or line style */
	ToRGB(){

		return "rgb(" + 
			Math.round(this.r).toString() + "," + 
			Math.round(this.g).toString() + "," + 
			Math.round(this.b).toString() + ")" ;
	}
	/** returns a string representing the color in RGBA format that can be used to format a canvasRenderingContext2d fill or line style */
	ToRGBA(){
		
		return "rgba(" + 
			Math.round(this.r).toString() + "," + 
			Math.round(this.g).toString() + "," + 
			Math.round(this.b).toString() + "," +
			this.a.toString() + ")" ;
	}
}