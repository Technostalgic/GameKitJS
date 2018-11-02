class GUI{
	constructor(){
		
		/** @type {Array} */
		this._controls = [];
		/** @type {Number} */
		this._focusControl = -1;
	}

	/** adds a GUIControl to the GUI */
	AddControl(/**@type {GUIControl}*/ control){
		
		control.ID = this._controls.length;
		this._controls.push(control);
	}
	/** removes a GUIControl from the GUI */
	RemoveControl(/**@type {Number}*/controlID){

		this._controls.splice(controlID, 1);
		this.updateGUIControlIDs();
	}
	/** @private assigns all the controls ID to match their index inside _controls */
	updateGUIControlIDs(){
		
		for(var i = 0; i < this._controls.length; i++)
			this._controls[i].ID = i;
	}

	/** @type {GUIControl} returns the GUI control that currently has focus */
	get focusControl(){

		// return null if selected control is out of ID range
		if(this._focusControl < 0 || this._focusControl >= this._controls.length)
			return null;

		return this._controls[this._focusControl];
	}
	/** @type {GUIControl | Number} sets focus to specified GUIControl or ID */
	set focusControl(value){

		if(value instanceof GUIControl)
			this._focusControl = GUIControl.ID;
		else if(value instanceof Number)
			this._focusControl = value;

		else
			console.log("ERROR");
	}

	/** returns a list of GUIControls who's bounds collide with the specified point */
	GetControlsAt(/**@type {vec2}*/vec){

		var r = [];

		for(let control of this._controls)
			if(control.bounds.ContainsPoint(r.push(control)));

		return r;
	}
	/** returns a selectable control who's bounds collide with the specified position */
	GetSelectableControlAt(/**@type {vec2}*/vec){

		var colControls = this.GetControlsAt(pos);
		for(let control of colControls){

			if(!control.CanHaveFocus)
				continue;
				
			return control;
		}

		return null;
	}
	/** virtual, called when the simulated mouse cursor is moved */
	OnCursorMove(/**@type {vec2}*/pos){ 

		var control = this.GetSelectableControlAt(pos);
		if(!!control)
			this._focusControl = control;
	}
	/** virtual, called when the simulated cursor is pressed */
	OnCursorDown(/**@type {vec2}*/pos){ 
		
		var control = this.GetSelectableControlAt(pos);
		if(!!control && !!this.focusControl){

			// if the focus control is the same as the control clicked on, select it, else set focus to it.
			if(control.ID == this.focusControl.ID)
				control.Select();
			else 
				this.focusControl = control;
		}
	}

	/** virtual, used to render the GUI */
	Draw(){

		for(let control of this._controls)
			control.Draw();
	}
}