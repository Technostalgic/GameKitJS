/** an object used to deliver assets from the server to the client */
class ContentPipeline{

	/** Initializes a new content pipeline object */
	constructor(){
		
		this.graphics = {};
		this.audio = {};
		this.fonts = {};
		this.unfinishedAssets = [];
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
				content = new FontFace(assetName, "url(" + sourcePath + ")");
				break;
		}
		
		asset.content = content;
		this.unfinishedAssets.push(asset);

		var ths = this;
		if(assetType == AssetType.Font)
			content.load().then(function(ff){
				ths.fonts[assetName] = ff;
				ths.unfinishedAssets.splice(ths.unfinishedAssets.indexOf(ff), 1);
				document.fonts.add(ff);
			}).catch(function(err){
				console.log(err);
			});

		// set the onfinishloading delegate and start loading the asset
		content.onload = this.getOnAssetDoneLoadingDelegate(asset, asset.type);
		content.src = sourcePath;
	}

	/**@private returns a delegate function to call when the specified object is done loading */
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
	get IsLoading(){
		return true;
	}
}

/** enumerator for the different types of assets that can be loaded through the content pipeline */
var AssetType = {

	Image: 0,
	Audio: 1,
	Font: 2
}