/** an object that allows interaction between the user and the interface */
class GUIControl {
	constructor() {

		/** @type {Number} */
		this.ID = 0;
		/** @type {rect} */
		this.bounds = null;
		/** @type {Boolean} */
		this.canHaveFocus = true;
		/** @type {GUI} */
		this._parentGUI = null;
	}

	get hasFocus(){

		if(this._parentGUI.focusControl == null)
			return false;
		
		return this._parentGUI.focusControl.ID == this.ID;
	}
	get renderContext(){
		return this._parentGUI.renderContext;
	}

	/** virtual, called when control gains focus */
	OnGainFocus() { }
	/** virtual, called when control loses focus */
	OnLoseFocus() { }

	/** virtual, called when the control is selected by the user */
	Select() { }

	/** virtual, called when the control is rendered */
	Draw() {

		var col = new Color(225, 225, 225);
		if(this.hasFocus)
			col = new Color(185, 185, 185);
		
		this.bounds.DrawFill(this.renderContext, col);
	}
}

/** A button control */
class GUIControl_Button extends GUIControl{
	constructor(){
		super();

		this.label = "Button";
	}

	static FromLabel(label){
		
	}
}