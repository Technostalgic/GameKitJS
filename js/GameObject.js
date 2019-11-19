///
/// 	code by Isaiah Smith
///
/// 	https://technostalgic.tech  
/// 	twitter @technostalgicGM
///

/** every object simulated inside a GameState should derive from this class */
class GameObject{

	constructor(){
		
		this.title = "GameObject";
	}

	/** @protected @virtual Updates every Game.Step() */
	Update(dt){}

	/** @protected @virtual Called on GameState.FixedStep() */
	FixedUpdate(fdt){}
	
	/** @param {Camera} camera the camera to render the game object to 
	 * @protected @virtual Called when the object is to be rendered to the screen */
	Render(camera){}

	/** @protected @virtual @type {Object} returns an object ready for JSON serialization, or null if object is not to be saved*/
	getInternalSaveData(){

		var r = {};
		
		for(var field in this){

			r[field] = this[field];
		}

		return r;
	}

	/** @type {GameObjectSaveData} returns a serializable data format for this object with type preservation*/
	GetSaveData(){

		return GameObjectSaveData.FromGameObject(this);
	}

	/** @protected @virtual loads save data into self (preferrably from a parsed JSON object) */
	loadFromSaveData(/**@type {Object}*/data){

		for(var field in data){

			this[field] = data[field];
		}
	}

	/** @type {GameObject} returns a new GameObject loaded from the provided data */
	static LoadFromSaveData(/**@type {GameObjectSaveData}*/ data){

		var r = eval("new " + data.GameObjectType + "()");

		r.loadFromSaveData(data);

		return r;
	}
}

/** the type that GameObject is serialized to when saving the game object */
class GameObjectSaveData{

	constructor(){

		/** @type {string} the name of GameObject's type*/
		this.GameObjectType = null;
		/** @type {Object} the JSON save data of the object */
		this.ObjectData = null;
	}

	/** @type {GameObjectSaveData} generates a data object from the specified GameObject */
	static FromGameObject(/**@type {GameObject}*/ obj){

		var r = new GameObjectSaveData();

		r.GameObjectType = obj.constructor.name;
		r.ObjectData = obj.GetSaveData();

		if(r.ObjectData == null)
			return null;

		return r;
	}

	/** @type {GameObject} returns a game object initialized from this save data */
	LoadObject(){

		return GameObject.LoadFromSaveData(this);
	}
}