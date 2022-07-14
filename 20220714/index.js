// reload folder dezyns on tab focus since updated dezyn_id has changed to new date
document.addEventListener('visibilitychange', function(ev) { 
	if (current_folder != "" && document.visibilityState == "visible") {
		showFolderDezyns(current_folder);
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


function setCurrentDezyn(key) {
	localStorage.setItem("current_dezyn", key);
	window.open("dezyn.html");
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
			if (key.indexOf("dezyn") == 0) {
				let dezyn_html = localStorage.getItem(key);
				let dezyn_name = key.split("|")[0];
				let dezyn_folder_name = key.split("|")[1];
				if (folder_name == dezyn_folder_name) {
					dezyn_name = dezyn_name + "|" + new_folder_name;
					localStorage.setItem(dezyn_name, dezyn_html);
					localStorage.removeItem(key);
					showFolderDezyns(new_folder_name);
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
		folders_html = folders_html + "<div><span onclick=\"renameFolder('" + folders[i].trim() + "');\">" + "R</span> <a onclick=\"showFolderDezyns('" + folders[i].trim() + "');\">" + folders[i].trim() + "</a></div>";
	}
	document.getElementById("folders").innerHTML = folders_html;
}

async function showFolderDezyns(folder) {
	
	current_folder = folder;
	
	document.getElementById("disclaimer").style.display = "none";
	document.getElementById("folder_label").innerHTML = "";
	document.getElementById("message").innerHTML = "Loading...";
	
	let dezyn_keys = [];
	for (let key in localStorage) {
		if (key.indexOf("dezyn") == 0) {
			dezyn_keys.push(key);
		}
	}
	
	dezyn_keys.sort();
	dezyn_keys.reverse();
	
	let folder_dezyns = "";
	for (i = 0; i < dezyn_keys.length; i++) {
		let key = dezyn_keys[i];
		let key_folder = key.split("|")[1];
		if (folder == key_folder) {
			folder_dezyns += localStorage.getItem(key).replace("id=\"wrapper\"", "class='wrapper' id='" + key + "' onclick='setCurrentDezyn(this.id);'");
		}

	}
	
	document.getElementById("dezyns").innerHTML = folder_dezyns;

	let message = await hideMessage(); // await
	document.getElementById("message").innerHTML = message;
	document.getElementById("folder_label").innerHTML = "<h2>" + folder + "</h2>";
}

function hideMessage() {
  return new Promise(resolve => {
		setTimeout(() => {resolve("");}, 0); // setTimeOut is put at the end of the rendering queue
  });
}

