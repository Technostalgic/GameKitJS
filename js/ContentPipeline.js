/** an object used to deliver assets from the server to the client */
class ContentPipeline{

	/** Initializes a new content pipeline object */
	constructor(){
		
		this.loadedAssets = {};
		this.unfinishedAssets = {};
	}

	

	/**@type {Boolean}*/
	get IsLoading(){
		return true;
	}
}