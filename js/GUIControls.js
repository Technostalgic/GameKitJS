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
		return this._parentGUI.focusControl.ID == this.ID;
	}

	/** virtual, called when control gains focus */
	OnGainFocus() { }
	/** virtual, called when control loses focus */
	OnLoseFocus() { }

	/** virtual, called when the control is selected by the user */
	Select() { }

	/** virtual, called when the control is rendered */
	Draw() { }

}

/**  */
class GUIControl_Button{
	constructor(){

	}
}