///
///	code by Isaiah Smith
///		
///	https://technostalgic.tech  
///	twitter @technostalgicGM
///

// prompts a download for a text file 'filename' that contains the specified data
function DownloadData(filename, data = "") {
	filename += ".zgf2";

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

// opens a file dialogue to locate saved data files, note: must be called from a user triggered event (ie "click")
function LoadDataFile() {

	var elem = document.createElement("input");
	elem.type = "file";
	elem.accept = ".zgf2";
	elem.click();

	elem.addEventListener("change", function () {

		var reader = new FileReader();
		reader.onload = function () { LoadSaveData(reader.result); };
		reader.readAsText(elem.files[0]);
	});
}

// sets the current gamestate to the specified save data
function LoadSaveData(data) {

	console.log(data);
}