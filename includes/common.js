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
