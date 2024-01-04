

function writeHeader() {
	document.write(
		"<header> " + 
		"<div>" +
			"<a href='index.html'> <img id='logo' src='images/logo.png'></a> " + 
			"<img src='images/loading.gif' id='loader'>" + 
		"</div>" +
		"<div id='menu_items'>" +
			"<a href='design.html' target='_blank'>New Design</a> " + 
			"<a href='browse.html'>Browse</a> " + 
			"<a href='fonts.html'>Fonts</a> " + 
			"<a href='styles.html'>Styles</a> " + 
			"<a href='import-export.html'>Backup</a> " + 
		"</div>" + 
		"<div>" + 
			"<a href='settings.html'><img src='images/header_icon_settings.png'></a>" + 
		"</div>" + 
		"</header>"
		);
}

function showMessage(msg, color) {
	let message = document.createElement("div");
	let message_text = document.createTextNode(msg);
	message.appendChild(message_text);
	message.setAttribute("style", "z-index:5000;width:400px;position:fixed;top:10px;left:50%;margin-left:-200px;font-family:Arial;font-weight:bold;font-size:15px;text-align:center;padding:5px 10px 5px 10px;border:1px solid " + color + ";border-radius:5px;color:" + color + ";background-color:lightyellow;");
	document.getElementsByTagName("body")[0].appendChild(message);
	setTimeout(function() {document.getElementsByTagName("body")[0].removeChild(message);},3000);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}



function rgb2hex(rgb) {
	if (rgb.search("rgb") == -1) {
		return rgb;
	} else {
		rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
	}
}


function rgba2hex(orig) {
      let a, isPercent,
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = (rgb && rgb[4] || "").trim(),
        hex = rgb ? 
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
          if (alpha !== "") {
            a = alpha;
          } else {
            a = 01;
          }

          a = Math.round(a * 100) / 100;
            alpha = Math.round(a * 255);
            let hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
            hex = hex + hexAlpha;

      return "#" + hex;
}

async function loadSelectFolders() {
	let select_folders = document.getElementById("select_folders");
	let option = document.createElement("option");
	option.text = "default";
	select_folders.add(option);	
	let folders = await idbGetItem("dezynor_settings", "folders");
	folders.sort();
	for (i = 0; i < folders.length; i++) {
		let folder_name = folders[i].trim();
		if (folder_name == "default") continue;
		let option = document.createElement("option");
		option.text = folder_name;
		select_folders.add(option);
	}
}

async function loadSelectFonts() {

	let google_fonts_options = "";
	let online_fonts = await idbGetItem("dezynor_settings", "fonts");
	online_fonts.sort();
	let online_fonts_list = "";
	for (i = 0; i < online_fonts.length; i++) {
		let storage_font_name = online_fonts[i].split("|")[0];
		let storage_font_location = online_fonts[i].split("|")[1];
		if (storage_font_location == "Google") {
			online_fonts_list = online_fonts_list + "@import url('https://fonts.googleapis.com/css?family=" + storage_font_name + "&display=swap');";
			google_fonts_options = google_fonts_options + "<option>" + storage_font_name + "</option>";
		} else if (storage_font_location == "Installed") {
			
		}
	}

	let uploaded_fonts_list = "";
	let uploaded_fonts = await idbGetAllItems("dezynor_fonts");
	let uploaded_fonts_options = "";
	for (i = 0; i < uploaded_fonts.length; i++) {
		let font_key = uploaded_fonts[i].font_key;
		let font = uploaded_fonts[i].value;
		font_name = font_key.replaceAll("_", " ");
		uploaded_fonts_list = uploaded_fonts_list + "@font-face {font-family:'" + font_key + "';font-style:normal;font-weight:400;font-display:swap;src:url(" + URL.createObjectURL(font) + ") format('truetype');}";
		uploaded_fonts_options = uploaded_fonts_options + "<option value='" + font_key + "'>" + font_name + "</option>";
	}
	let style = document.createElement("style");
	let fonts_node = document.createTextNode(online_fonts_list + uploaded_fonts_list);
	style.appendChild(fonts_node);
	document.getElementsByTagName("head")[0].appendChild(style);
	
	let google_fonts_select = document.getElementById("google_fonts");
	if (google_fonts_select) google_fonts_select.innerHTML = google_fonts_options;
	let uploaded_fonts_select = document.getElementById("uploaded_fonts");
	if (uploaded_fonts_select) uploaded_fonts_select.innerHTML = uploaded_fonts_options;
}

function valueInArray(value, values_array) {
	for (i = 0; i < values_array.length; i++) {
		if (values_array[i] == value) return true;
	}
	return false;
}
