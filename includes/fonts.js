
window.onload = async function() {
	await delay(500);
	loadFonts();
}

function addNewFont() {
	let font_name = document.getElementById("font_name").value.trim();
	let font_location = document.getElementById("font_location").value;
	if (font_name.length < 1) return;
	
	idbGetItem("dezynor_settings", "fonts").then(function(result) {
		
		let fonts = result;
		for (let i = 0; i < fonts.length; i++) {
			storage_font_name = fonts[i].split("|")[0];
			if (font_name == storage_font_name) {
				alert("A font with the name '" + font_name + "' already exists.");
				document.getElementById("font_name").value = "";
				return;
			}
		}
		fonts = fonts + "," + font_name + "|" + font_location;
		idbPutItem("dezynor_settings", {setting_key:"fonts", value:fonts});
		document.getElementById("font_name").value = "";
		document.getElementById("font_name").focus();
		showMessage("'" + font_name + "' added", "Green");
		loadFonts();
		
	});

}

async function loadFonts() {
	
	idbGetItem("dezynor_settings", "fonts").then(function(result) {
		let fonts = result.split(",");
		
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
			
			fonts_html = fonts_html + "<div><span title='Delete Font' class='delete' onclick=\"deleteFont('" + font_name + "');\">" + "x</span> " + font_name + font_location + "</div>";
		}
		document.getElementById("fonts").innerHTML = fonts_html;
		document.getElementById("font_name").focus();
	});
}

function deleteFont(deleted_font) {
	if (deleted_font == "Anton") {
		alert("The 'Anton' font can not be deleted.");
		return;
	}
	
	idbGetItem("dezynor_settings", "fonts").then(function(result) {

		let fonts = result.split(",");
		let updated_fonts = "";

		for (let i = 0; i < fonts.length; i++) {
			storage_font_name = fonts[i].split("|")[0];
			storage_font_location = fonts[i].split("|")[1];
			if (deleted_font != storage_font_name) {
				updated_fonts = updated_fonts + "," + storage_font_name + "|" + storage_font_location;
			}
		}
		updated_fonts = updated_fonts.replace(",", "");
		idbPutItem("dezynor_settings", {setting_key:"fonts", value:updated_fonts});
		loadFonts();
		showMessage("'" + deleted_font + "' deleted", "Red");
		document.getElementById("font_name").focus();

	});
	
}
