///
///	code by Isaiah Smith
///		
///	https://technostalgic.tech  
///	twitter @technostalgicGM
///

/**
 * prompts a download for a text file 'filename' that contains the specified data
 * @param {string} filename - the name of the file that will be downloaded 
 * @param {*} data - the data that is contained in the file
 */
function DownloadData(filename, data = "") {

	var blob = new Blob([data], { type: 'text/csv' });
	if (window.navigator.msSaveOrOpenBlob) {

		window.navigator.msSaveBlob(blob, filename);
	}
	else {

		var elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob);
		elem.download = filename;
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
}

/**
 * opens a file dialogue to locate saved data files, note: must be called from a user triggered event (ie "click")
 * @param {string} accept - the file type that is accepted by the loader 
 */
function LoadDataFile(accept = null) {

	var elem = document.createElement("input");
	elem.type = "file";
	elem.accept = accept;
	elem.click();

	elem.addEventListener("change", function () {

		var reader = new FileReader();
		reader.onload = function () { LoadSaveData(reader.result); };
		reader.readAsText(elem.files[0]);
	});
}