
window.onload = async function() {
	await delay(500);
	loadFonts();
}

function addFont() {
	let font_name = document.getElementById("font_name").value.trim();
	let font_location = document.getElementById("font_location").value;
	if (font_name.length < 1) return;
	
	idbGetItem("dezynor_settings", "fonts").then(function(result) {
		
		let fonts = result;
		let index = fonts.indexOf(font_name);
		if (index > -1) {
			alert("A font with the name '" + font_name + "' already exists.");
			return;
		} else {
			fonts.push(font_name + "|" + font_location);
		}
		idbPutItem("dezynor_settings", {setting_key:"fonts", value:fonts});
		document.getElementById("font_name").value = "";
		document.getElementById("font_name").focus();
		showMessage("'" + font_name + "' added", "Green");
		loadFonts();
		
	});

}

async function loadFonts() {
	
	idbGetItem("dezynor_settings", "fonts").then(function(result) {
		let fonts = result;
		fonts.sort();
		let fonts_html = "";
		for (let i = 0; i < fonts.length; i++) {
			let font_name = fonts[i].split("|")[0];
			let font_location = fonts[i].split("|")[1];
			if (font_location == "Google") {
				font_location = " <span class='google'>(" + font_location + ")</span>";
			} else {
				font_location = " <span class='installed'>(" + font_location + ")</span>";
			}
			
			fonts_html = fonts_html + "<div><span title='Delete Font' class='delete' onclick=\"deleteFont('" + fonts[i] + "');\">" + "x</span> " + font_name + font_location + "</div>";
		}
		document.getElementById("fonts").innerHTML = fonts_html;
		document.getElementById("font_name").focus();
	});
}

function deleteFont(font_name) {
	if (font_name == "Anton|Google") {
		alert("The 'Anton' font can not be deleted.");
		return;
	}

	idbGetItem("dezynor_settings", "fonts").then(function(result) {
		let fonts = result;
		let index = fonts.indexOf(font_name);
		if (index > -1) {
			fonts.splice(index, 1);
			showMessage("'" + font_name + "' deleted successfully", "Red");
		} else {
			alert("'" + font_name + "' does not exist");
			return;
		}
		idbPutItem("dezynor_settings", {setting_key:"fonts", value:fonts});
		loadFonts();
		document.getElementById("font_name").focus();
	});
	
}
