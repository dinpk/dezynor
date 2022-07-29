
window.onload = async function() {
	await delay(500);
	loadSettings();
}

function saveSettings() {
	let max_upload_width = document.getElementById("max_upload_width").value;
	let max_upload_height = document.getElementById("max_upload_height").value;
	idbPutItem("dezynor_settings", {setting_key:"max_upload_width", value:max_upload_width});
	idbPutItem("dezynor_settings", {setting_key:"max_upload_height", value:max_upload_height});
	showMessage("Saved", "DarkGreen");
}

function loadSettings() {
	idbGetItem("dezynor_settings", "max_upload_width").then(function(result) {
		document.getElementById("max_upload_width").value = result;
	});
	idbGetItem("dezynor_settings", "max_upload_height").then(function(result) {
		document.getElementById("max_upload_height").value = result;
	});

}
