///
/// 	code by Isaiah Smith
/// 	
/// 	https://technostalgic.tech  
/// 	twitter @technostalgicGM
///

class GUI_GameplayWindow extends GUI {

	/**@param {vec2} resolution the resolution that the main camera will render at */
	constructor(resolution){
		super();

		this.mainCamera = new Camera(resolution);
	}

	Update(/**@type {Number}*/dt){
		super.Update(dt);

		Game.gameState.Simulate(dt);
	}

	Draw(){
		
		Game.gameState.Render();
		Game.instance.renderContext.drawImage(this.mainCamera.renderTarget, 0, 0, Game.instance.renderTarget.width, Game.instance.renderTarget.height);
	}
}