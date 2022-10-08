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
