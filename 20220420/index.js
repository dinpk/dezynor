// reload folder designs on tab focus since updated design_id has changed to new date
document.addEventListener('visibilitychange', function(ev) { 
	if (current_folder != "" && document.visibilityState == "visible") {
		showFolderDesigns(current_folder);
	}
});

let current_folder = "";


function init() {
	if (!("dezynor_folders" in localStorage)) {
		localStorage.setItem("dezynor_folders", "default");
	}
	if (!("dezynor_fonts" in localStorage)) {
		localStorage.setItem("dezynor_fonts", "Anton|Google,Bakbak One|Google,Cabin|Google,Cookie|Google,Fredoka One|Google,Kaushan Script|Google,Libre Baskerville|Google,Lobster|Google,Pacifico|Google,Roboto|Google,Russo One|Google,Smooch|Google");
	}

	if (!("dezynor_settings" in localStorage)) {
		settings = {};
		settings.upload_url = "";
		settings.max_upload_width = 1000;
		settings.max_upload_height = 1000;
		localStorage.setItem("dezynor_settings", JSON.stringify(settings));
	}
}


function setCurrentDesign(key) {
	localStorage.setItem("current_design", key);
	window.open("design.html");
}

function selectSection(num) {
	// dummy
}

function addFolder() {
	let new_folder = document.getElementById("new_folder").value;
	new_folder = new_folder.replaceAll(",", " ");
	new_folder = new_folder.trim();
	
	if (new_folder.length < 1) return;
	let folders = localStorage.getItem("dezynor_folders").split(",");
	for (let i = 0; i < folders.length; i++) {
		if (new_folder == folders[i].trim()) {
			alert("A folder with the name '" + new_folder + "' already exists.");
			return;
		}
	}
	folders = folders + "," + new_folder;
	localStorage.setItem("dezynor_folders", folders);
	document.getElementById("new_folder").value = "";
	showMessage("'" + new_folder + "' added", "Green");
	loadFolders();
}

function renameFolder(folder_name) {
	if (folder_name == "default") {
		alert("'default' folder can not be renamed");
		return;
	}
	let new_folder_name = prompt("Enter new folder name");
	if (!new_folder_name) return;
	new_folder_name = new_folder_name.replaceAll(",", " ");
	new_folder_name = new_folder_name.trim();
	if (new_folder_name === null || new_folder_name.length == 0) return;

	// if already exists
	let folders_item = localStorage.getItem("dezynor_folders");
	let folders = folders_item.split(",");
	for (let i = 0; i < folders.length; i++) {
		if (new_folder_name == folders[i].trim()) {
			alert("A folder with the name '" + new_folder_name + "' already exists.");
			return;
		}
	}

	// rename
	if (new_folder_name !== "" && new_folder_name !== folder_name) {
		
		for (let i = 0; i < folders.length; i++) {
			if (folder_name == folders[i].trim()) {
				folders[i] = new_folder_name;
			}
		}
		localStorage.setItem("dezynor_folders", folders.toString());
		loadFolders();
		for (let key in localStorage) {
			if (key.indexOf("design") == 0) {
				let design_html = localStorage.getItem(key);
				let design_name = key.split("|")[0];
				let design_folder_name = key.split("|")[1];
				if (folder_name == design_folder_name) {
					design_name = design_name + "|" + new_folder_name;
					localStorage.setItem(design_name, design_html);
					localStorage.removeItem(key);
					showFolderDesigns(new_folder_name);
				}
			}
		}					
	}
	
	showMessage("'" + folder_name + "' renamed to '" + new_folder_name + "'", "Green");
}

function loadFolders() {
	let folders = localStorage.getItem("dezynor_folders").split(",");
	folders.sort();
	let folders_html = "";
	for (let i = 0; i < folders.length; i++) {
		folders_html = folders_html + "<div><span onclick=\"renameFolder('" + folders[i].trim() + "');\">" + "R</span> <a onclick=\"showFolderDesigns('" + folders[i].trim() + "');\">" + folders[i].trim() + "</a></div>";
	}
	document.getElementById("folders").innerHTML = folders_html;
}

async function showFolderDesigns(folder) {
	
	current_folder = folder;
	
	document.getElementById("disclaimer").style.display = "none";
	document.getElementById("folder_label").innerHTML = "";
	document.getElementById("message").innerHTML = "Loading...";
	
	let design_keys = [];
	for (let key in localStorage) {
		if (key.indexOf("design") == 0) {
			design_keys.push(key);
		}
	}
	
	design_keys.sort();
	design_keys.reverse();
	
	let folder_designs = "";
	for (i = 0; i < design_keys.length; i++) {
		let key = design_keys[i];
		let key_folder = key.split("|")[1];
		if (folder == key_folder) {
			folder_designs += localStorage.getItem(key).replace("id=\"wrapper\"", "class='wrapper' id='" + key + "' onclick='setCurrentDesign(this.id);'");
		}

	}
	
	document.getElementById("designs").innerHTML = folder_designs;

	let message = await hideMessage(); // await
	document.getElementById("message").innerHTML = message;
	document.getElementById("folder_label").innerHTML = "<h2>" + folder + "</h2>";
}

function hideMessage() {
  return new Promise(resolve => {
		setTimeout(() => {resolve("");}, 0); // setTimeOut is put at the end of the rendering queue
  });
}

