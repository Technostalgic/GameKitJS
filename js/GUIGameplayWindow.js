///
/// 	code by Isaiah Smith
/// 	
/// 	https://technostalgic.tech  
/// 	twitter @technostalgicGM
///

class GUI_GameplayWindow extends GUI {
	constructor(){
		super();
	}

	Update(/**@type {Number}*/dt){
		super.Update(dt);

		Game.gameState.Simulate(dt);
	}

	Draw(){
		
		Game.gameState.Render();
	}
}