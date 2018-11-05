class GUI{
	
	constructor(){
		
		/** @type {Game} */
		this.parentGame = null;
		/** @type {Array} */
		this._controls = [];
		/** @type {Number} */
		this._focusControl = -1;
	}

	/** adds a GUIControl to the GUI */
	AddControl(/**@type {GUIControl}*/ control){
		
		control.ID = this._controls.length;
		control._parentGUI = this; // TODO: Fix missuse of private accessor
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

	get renderContext(){
		return this.parentGame.renderContext;
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
			this._focusControl = value.ID;
		else if(value instanceof Number)
			this._focusControl = value;

		else
			console.log("ERROR");
	}

	/** returns a list of GUIControls who's bounds collide with the specified point */
	GetControlsAt(/**@type {vec2}*/vec){

		var r = [];

		for(let control of this._controls)
			if(control.bounds.ContainsPoint(vec))
				r.push(control);

		return r;
	}
	/** returns a selectable control who's bounds collide with the specified position */
	GetSelectableControlAt(/**@type {vec2}*/vec){

		var colControls = this.GetControlsAt(vec);
		for(let control of colControls){

			if(!control.canHaveFocus)
				continue;
				
			return control;
		}

		return null;
	}
	/** virtual, called when the simulated mouse cursor is moved */
	OnCursorMove(/**@type {vec2}*/pos){

		var control = this.GetSelectableControlAt(pos);
		if(!!control)
			this.focusControl = control;
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

	/** virtual, called once every game step */
	Update(/**@type {Number}*/dt) { }

	/** virtual, used to render the GUI */
	Draw(){

		for(let control of this._controls)
			control.Draw();
	}
}

class GUI_Menu extends GUI{
	
	constructor(){
		super();

		/**@type {rect}*/
		this._selectionCursor = null;
	}

	/** @type {rect} the rect that the selectionCursor is approaching */
	get selectionCursorTarget(){

		var r = null;
		if(!!this.focusControl)
			r = this.focusControl.bounds;
		else 
			r = new rect(new vec2(), this.parentGame.resolution.clone);

		return r;
	}
	/** @type {rect} returns the initialized selection cursor */
	get selectionCursor(){
		
		if(this._selectionCursor == null)
			this._selectionCursor = new rect(new vec2(), this.parentGame.resolution.clone);

		return this._selectionCursor;
	}

	/** updates the selection Cursor so it's closer to it's target */
	updateSelectionCursor(dt){

		// the speed at which the cursor approches it's target
		var weight = 15;
		weight *= dt;

		// weighted average = (startRect + targetRect * weight) / (1 + weight)
		var frect = new rect();
		frect.position = this.selectionCursorTarget.position.Scaled(weight).Plus(this.selectionCursor.position).Scaled(1 / (1 + weight));
		frect.size = this.selectionCursorTarget.size.Scaled(weight).Plus(this.selectionCursor.size).Scaled(1 / (1 + weight));

		this._selectionCursor = frect;
	}

	Update(dt){
		super.Update(dt);

		this.updateSelectionCursor(dt);
	}

	Draw(){
		super.Draw();
		
		this.selectionCursor.DrawOutline(this.renderContext, new Color(0, 0, 0, 0.5));
	}

	static get Menu_MainMenu(){
		var r = new GUI_Menu();

		var button = new GUIControl_Button();
		button.bounds = new rect(new vec2(150), new vec2(100));
		r.AddControl(button);
		
		return r;
	}
}