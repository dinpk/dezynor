function showStorageSpace() {
	let total_space = 0;
	for (let key in localStorage) {
		if (key.indexOf("dezyn") == 0 || key.indexOf("dezynor_folders") == 0 || key.indexOf("dezynor_fonts") == 0) {
			total_space = total_space + localStorage.getItem(key).length;
		}
	}
	total_space = total_space / 1048576;
	document.getElementById("space_usage").innerHTML = "<h2>Used: " + total_space.toFixed(2) + "<small>mb</small> of 5mb</h2>";
}


function saveSettings() {
	let upload_url = document.getElementById("upload_url").value;
	let max_upload_width = document.getElementById("max_upload_width").value;
	let max_upload_height = document.getElementById("max_upload_height").value;
	settings = {};
	settings.upload_url = upload_url;
	settings.max_upload_width = max_upload_width;
	settings.max_upload_height = max_upload_height;
	localStorage.setItem("dezynor_settings", JSON.stringify(settings));
	showMessage("Saved", "DarkGreen");
}

function loadSettings() {
	let settings = JSON.parse(localStorage.getItem("dezynor_settings"));
	document.getElementById("upload_url").value = settings.upload_url;
	document.getElementById("max_upload_width").value = settings.max_upload_width;
	document.getElementById("max_upload_height").value = settings.max_upload_height;
}
