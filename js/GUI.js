class GUI {

	constructor() {

		/** @type {Game} */
		this.parentGame = null;
		/** @type {Boolean} */
		this.initialized = false;

		/** @private @type {Number} */
		this._elapsedTime = 0;
		/** @private @type {HTMLCanvasElement} */
		this._background = null;
		/** @private @type {CanvasRenderingContext2D} */
		this._bgContext = null;
		/** @private @type {Array}*/
		this._graphics = [];
		/** @private @type {Array} */
		this._controls = [];
		/** @private @type {Number} */
		this._focusControl = -1;
	}

	/** adds a GUIGraphic to the GUI */
	AddGraphic(/**@type {GUIGraphic}*/graphic) {

		this._graphics._parentGUI = this; // TODO: Fix missuse of private accessor
		this._graphics.push(graphic);

		// add the graphic to the background if the background has already been generated
		if (!!this._background)
			graphic.DrawStatic();
	}
	/** adds a GUIControl to the GUI */
	AddControl(/**@type {GUIControl}*/ control) {

		control.ID = this._controls.length;
		control._parentGUI = this; // TODO: Fix missuse of private accessor
		this._controls.push(control);
	}
	/** removes a GUIControl from the GUI */
	RemoveControl(/**@type {Number}*/controlID) {

		this._controls.splice(controlID, 1);
		this.updateGUIControlIDs();
	}
	/** @private assigns all the controls ID to match their index inside _controls */
	updateGUIControlIDs() {

		for (var i = 0; i < this._controls.length; i++)
			this._controls[i].ID = i;
	}

	/** @private generates the background canvas and paints all the graphics onto it */
	generateBackground() {

		this._background = document.createElement("canvas");
		this._background.width = this.parentGame.resolution.x;
		this._background.height = this.parentGame.resolution.y;

		this._bgContext = this._background.getContext("2d");
		for (let graphic of this._graphics) {
			graphic.DrawStatic();
		}
	}

	/**@type {CanvasRenderingContext2D}*/
	get renderContext() {
		return this.parentGame.renderContext;
	}
	/**@type {CanvasRenderingContext2D}*/
	get staticContext() {
		return this._bgContext;
	}
	/**@type {Number}*/
	get elapsedTime() {
		return this._elapsedTime;
	}

	/** @type {GUIControl} returns the GUI control that currently has focus */
	get focusControl() {

		// return null if selected control is out of ID range
		if (this._focusControl < 0 || this._focusControl >= this._controls.length)
			return null;

		return this._controls[this._focusControl];
	}
	/** @type {GUIControl | Number} sets focus to specified GUIControl or ID */
	set focusControl(value) {

		if (value instanceof GUIControl)
			this._focusControl = value.ID;
		else if (value instanceof Number)
			this._focusControl = value;

		else
			console.log("ERROR");
	}

	/** returns a list of GUIControls who's bounds collide with the specified point */
	GetControlsAt(/**@type {vec2}*/vec) {

		var r = [];

		for (let control of this._controls)
			if (control.bounds.ContainsPoint(vec))
				r.push(control);

		return r;
	}
	/** returns a selectable control who's bounds collide with the specified position */
	GetSelectableControlAt(/**@type {vec2}*/vec) {

		var colControls = this.GetControlsAt(vec);
		for (let control of colControls) {

			if (!control.canHaveFocus)
				continue;

			return control;
		}

		return null;
	}
	/** @virtual, called when the simulated mouse cursor is moved */
	OnCursorMove(/**@type {vec2}*/pos) {

		var control = this.GetSelectableControlAt(pos);
		if (!!control)
			this.focusControl = control;
	}
	/** @virtual, called when the simulated cursor is pressed */
	OnCursorDown(/**@type {vec2}*/pos) {

		var control = this.GetSelectableControlAt(pos);
		if (!!control && !!this.focusControl) {

			// if the focus control is the same as the control clicked on, select it, else set focus to it.
			if (control.ID == this.focusControl.ID)
				control.Select();
			else
				this.focusControl = control;
		}
	}

	/** called when the gui is first updated */
	Initialize() {

		this.initialized = true;
		
		if (!this._background)
			this.generateBackground();
	}

	/** @virtual, called once every game step */
	Update(/**@type {Number}*/dt) {
		if (!this.initialized)
			this.Initialize();

		this._elapsedTime += dt;
	}

	/** @virtual, used to render the GUI */
	Draw() {

		this.parentGame.renderContext.drawImage(this._background, 0, 0);

		for (let control of this._controls)
			control.Draw();
	}
}

class GUI_SplashScreen extends GUI {
	constructor() {
		super();
	}

	generateBackground(){
		super.generateBackground();

		this._bgContext.fillStyle = new Color(0,0,0).ToRGBA();
		this._bgContext.fillRect(0, 0, this._background.width, this._background.height);

		RenderHelper.DrawImage(this._bgContext, this.parentGame.content.graphics.menus_splashscreen, this.parentGame.resolution.Scaled(0.5));
	}

	OnCursorDown(){

		this.parentGame.SetCurrentGUI(GUI_Menu.Menu_MainMenu);
	}

	Update(dt) {
		super.Update(dt);

		if(this.elapsedTime >= 3.5)
			this.parentGame.SetCurrentGUI(GUI_Menu.Menu_MainMenu);
	}

	static get Default() {
		var r = new GUI_SplashScreen();

		return r;
	}
}

class GUI_Menu extends GUI {

	constructor() {
		super();

		/**@type {rect}*/
		this._selectionCursor = null;
	}

	/** @type {rect} the rect that the selectionCursor is approaching */
	get selectionCursorTarget() {

		var r = null;
		if (!!this.focusControl)
			r = this.focusControl.bounds;
		else
			r = new rect(new vec2(), this.parentGame.resolution.clone);

		return r;
	}
	/** @type {rect} returns the initialized selection cursor */

	/** updates the selection Cursor so it's closer to it's target */
	updateSelectionCursor(dt) {

		// the speed at which the cursor approches it's target
		var weight = 15;
		weight *= dt;

		// weighted average = (startRect + targetRect * weight) / (1 + weight)
		var frect = new rect();
		frect.position = this.selectionCursorTarget.position.Scaled(weight).Plus(this._selectionCursor.position).Scaled(1 / (1 + weight));
		frect.size = this.selectionCursorTarget.size.Scaled(weight).Plus(this._selectionCursor.size).Scaled(1 / (1 + weight));

		this._selectionCursor = frect;
	}

	Initialize() {
		super.Initialize();

		if (this._selectionCursor == null)
			this._selectionCursor = new rect(new vec2(), this.parentGame.resolution.clone);
	}

	Update(dt) {
		super.Update(dt);

		this.updateSelectionCursor(dt);
	}

	Draw() {
		super.Draw();

		this._selectionCursor.DrawOutline(this.renderContext, new Color(0, 0, 0, 0.5), 2);
	}

	static get Menu_MainMenu() {
		var r = new GUI_Menu();

		var startButton = GUIControl_Button.FromLabel("Start Game").AtPosition(new vec2(150, 150));
		var optionsButton = GUIControl_Button.FromLabel("Options").AtPosition(new vec2(150, 200));
		var extrasButton = GUIControl_Button.FromLabel("Extras").AtPosition(new vec2(150, 250));

		r.AddControl(startButton);
		r.AddControl(optionsButton);
		r.AddControl(extrasButton);

		return r;
	}
}