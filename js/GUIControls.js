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
	Select() {
		console.log(this.constructor.name + " ID#" + this.ID.toString() + " Selected");
	}

	/** virtual, called when the control is rendered */
	Draw() { }

	/**@type {GUIControl} sets the bounds of the control and then returns itself*/
	AtRect(/**@type {rect}*/rec){

		this.bounds = rec;
		return this;
	}
	/**@type {GUIControl} sets the center of the bounds and then returns the cotnrol*/
	AtPosition(/**@type {vec2}*/pos){
		
		this.bounds.center = pos;
		return this;
	}
}

/** A button control */
class GUIControl_Button extends GUIControl{
	constructor(){
		super();

		/**@type {function}*/
		this.action = null;
		/**@type {TextRenderFormat}*/
		this.textFormat = new TextRenderFormat();
		/**@type {String}*/
		this.label = "Button";
	}

	Select(){
		super.Select();

		if(!!this.action)
			this.action();
	}

	Draw(){
		super.Draw();

		RenderHelper.DrawText(this.renderContext, this.label, this.bounds, this.textFormat);
	}

	/**@type {GUIControl_Button} creates a button with the specified label*/
	static FromLabel(/**@type {String}*/label, /**@type {TextRenderFormat}*/textFormat = new TextRenderFormat()){

		var r = new GUIControl_Button();
		r.label = label;
		r.textFormat = textFormat;

		var measureContext = document.createElement("canvas").getContext("2d");
		r.textFormat.SetToContext(measureContext);

		var lwidth = Math.round(measureContext.measureText(r.label).width);
		var bounds = new rect(new vec2(), new vec2(lwidth, r.textFormat.size))
		bounds.AddPadding(10);
		r.bounds = bounds;

		return r;
	}


}