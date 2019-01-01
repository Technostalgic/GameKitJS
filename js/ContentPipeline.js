/** an object used to deliver assets from the server to the client */
class ContentPipeline{

	/** Initializes a new content pipeline object */
	constructor(){
		
		this._loadingStart = null;
		this._onFinishLoading = function(){ };

		this.graphics = {};
		this.audio = {};
		this.fonts = {};
		this.unfinishedAssets = [];

		this.LoadContent();
	}

	/** starts loading an asset, when finished it will be sorted into the appropriate graphics/audio object */
	LoadAsset(/**@type {String}*/assetName, /**@type {String}*/sourcePath, assetType){

		// define the asset object
		var asset = {};
		asset.name = assetName;
		asset.type = assetType;

		// determine what kind of content will be loaded based on the assetType
		var content;
		switch(assetType){
			
			case AssetType.Image: 
				content = new Image();
				break;
			
			case AssetType.Audio: 
				content = new Audio();
				break;
			
			case AssetType.Font: 
				var ths = this;
				var onload = function(ff){
					ths.fonts[assetName] = ff;
					ths.unfinishedAssets.splice(ths.unfinishedAssets.indexOf(ff), 1);
					document.fonts.add(ff);
				};
				content = SpriteFont.Load(sourcePath, onload);
				break;
		}
		
		asset.content = content;
		this.unfinishedAssets.push(asset);

		if(assetType != AssetType.Font){

			// set the onfinishloading delegate and start loading the asset
			content.onload = this.getOnAssetDoneLoadingDelegate(asset, asset.type);
			content.src = sourcePath;
		}
	}
	/** virtual, starts loading all the content associated with this content pipeline */
	LoadContent(){ }

	/** tells the content pipeline to do something once it has finished loading all the assets */
	SetFinishAction(/**@type {Function}*/func){
		
		this._onFinishLoading = func;
		this.StartFinishLoadingCheck();
	}
	/** starts checking to see if the content pipeline has finished loading all the assets each tick until it is finished */
	StartFinishLoadingCheck(){

		//if the loading start timer hasn't been started, set it
		if(this._loadingStart == null)
			this._loadingStart = performance.now();

		// if it's done loading, call _onFinishLoading() and stop checking
		if(!this.isLoading){
			this._onFinishLoading();
			this._loadingStart = null;
			console.log("Loading Finished! Elapsed time: " + (performance.now() - this._loadingStart).toString() + "ms");
			return;
		}
		
		var ths = this;
		setTimeout(function(){
			ths.StartFinishLoadingCheck();
		});
	}

	/**@private @type {Function} returns a delegate function to call when the specified object is done loading */
	getOnAssetDoneLoadingDelegate(contentObj, assetType){

		// declare references to be used in the delegate
		var ths = this;
		var obj = contentObj;
		var objlist;

		// get the appropriate content object/list based in the assetType
		switch(assetType){
			case AssetType.Image:
				objlist = this.graphics;
				break;
			case AssetType.Audio:
				objlist = this.audio;
				break;
		}

		return function(){

			// adds the content to the appropriate list
			objlist[obj.name] = obj.content;
			
			// removes it from the 'unfinished loading' list
			ths.unfinishedAssets.splice(ths.unfinishedAssets.indexOf(obj), 1);
		}
	}

	/**@type {Boolean}*/
	get isLoading(){
		return this.unfinishedAssets.length > 0;
	}
}

/** enumerator for the different types of assets that can be loaded through the content pipeline */
var AssetType = {

	Image: 0,
	Audio: 1,
	Font: 2
}

class VanillaContent extends ContentPipeline{

	constructor(){
		super();
	}

	LoadContent(){

		this.LoadAsset("menus_splashscreen", "./gfx/menus/splashscreen.png", AssetType.Image);
		this.LoadAsset("FontDefault", "./gfx/fonts/default.png", AssetType.Font);
	}
}