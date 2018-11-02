class InputHandler{
	
	constructor(){ }

	/** called when a keyboard key is pressed */
	OnKeyDown(e){ }
	/** called when a keyboard key is released */
	OnKeyUp(e){ }

	/** called when the mouse is pressed */
	OnMouseDown(e){
		LoadDataFile();
	}
	/** called when the mouse is released */
	OnMouseUp(e){ }
}