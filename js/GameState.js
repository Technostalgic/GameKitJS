///
/// 	code by Isaiah Smith
///
/// 	https://technostalgic.tech  
/// 	twitter @technostalgicGM
///

/** the current state of the GamePlay */
class GameState{

	constructor(){

		/** how often this.FixedUpdate is called */
		this.fixedDeltaTime = 0.016;
		/** how quickly time passes by. 1 for real-world time, 0 for paused time. And everything in between */
		this.timeScale = 1;
		
		/** @private how much time has passed by in the game world */
		this._currentGameTime = 0;
		/** @private used to keep track of the current time that FixedUpdate is stopped at */
		this._currentFixedUpdateTime = 0;
		/** @private the amount of time passed from the perspective of the game */
		this._gameTimePassed = 0;
		/** @private the amount of time that has passed according to the user's computer */
		this._realTimePassed = 0;
		/** @private @type {Array<GameObject>)} an array containing all the game objects to be simulated */
		this._gameObjects = [];
	}

	/** Called from GUI.Step() to simulate the GameState by the specified amount of time */
	Simulate(dt){
		
		// handles time keeping
		this._realTimePassed = dt;
		let gameTimePassed = dt * this.timeScale;
		this._gameTimePassed = gameTimePassed;
		this._currentGameTime += gameTimePassed;

		this.Update(gameTimePassed);

		// handles this.FixedUpdate
		while(this._currentGameTime >= this._currentFixedUpdateTime){

			this.FixedUpdate(this.fixedDeltaTime);
			this._currentFixedUpdateTime += this.fixedDeltaTime;
		}

		this.Render();
	}

	/** @protected @virtual updates each logic step */
	Update(dt) {
		
		for(var ob of _gameObjects){

			ob.Update(dt);
		}
	}

	/** @protected @virtual FixedUpdate only updates once every this.fixedDeltaTime */
	FixedUpdate(fdt){ 

		for(var ob of _gameObjects){

			ob.FixedUpdate(fdt);
		}
	}

	/** @protected @virtual called inside of GUI.Draw() */
	Render(){ 

		for(var ob of _gameObjects){

			ob.Render();
		}
	}
}