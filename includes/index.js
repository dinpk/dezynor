document.addEventListener('visibilitychange', function(ev) { 
	if (current_folder != "" && document.visibilityState == "visible") {
		showFolderDezyns(current_folder);
	}
});

window.onload = async function() {
	await delay(500);
	loadFolders();
}

let current_folder = "";

async function setCurrentDezyn(key) {
	//await idbPutItem("dezynor_settings", {setting_key:"current_design", value: key});
	//window.open("dezyn.html");
}

function selectSection(num) {}

async function addFolder() {

	let new_folder = document.getElementById("new_folder").value;
	new_folder = new_folder.replaceAll(",", " ");
	new_folder = new_folder.trim();
	
	if (new_folder.length < 1) return;
	
	new_folder = new_folder.replaceAll(" ", "-");
	
	let folders = await idbGetItem("dezynor_settings", "folders");
	let index = folders.indexOf(new_folder);
	if (index > -1) {
		alert("'" + new_folder + "' already exists");
		return;
	} else {
		folders.push(new_folder);
	}
	idbPutItem("dezynor_settings", {setting_key:"folders", value:folders});
	document.getElementById("new_folder").value = "";
	document.getElementById("new_folder").focus();
	showMessage("'" + new_folder + "' added", "Green");
	loadFolders();

}

async function deleteFolder(folder_name) {
	
	let all_designs = await idbGetAllItems("dezynor_designs");
	for (i = 0; i < all_designs.length; i++) {
		let design_key = all_designs[i].design_key;
		let design_data = all_designs[i].value;
		if (design_key.split("|")[1] == folder_name) {
			alert("Folder '" + folder_name + "' is not empty");
			return;
		}
	}
			
	if (confirm("Do you really want to delete folder '" + folder_name + "'?")) {
		
		let folders = await idbGetItem("dezynor_settings", "folders");
		let index = folders.indexOf(folder_name);
		if (index > -1) {
			folders.splice(index, 1);
			await idbPutItem("dezynor_settings", {setting_key:"folders", value:folders});
			loadFolders();
			showMessage("Folder '" + folder_name + "' deleted successfully", "Red");
			document.getElementById("folder_label").innerHTML = "";
		}
	}

}

async function renameFolder(folder_name) {

	// rename folder
	
	let new_folder_name = prompt("Enter new folder name");
	if (!new_folder_name || new_folder_name.trim().length == 0) return;
	
	new_folder_name = new_folder_name.replaceAll(" ", "-");

	let folders = await idbGetItem("dezynor_settings", "folders");
	
	let index = folders.indexOf(new_folder_name);
	if (index > -1) {
		alert("Folder '" + new_folder_name + "' already exists");
		return;
	}
	index = folders.indexOf(folder_name);
	if (index > -1) {
		folders.splice(index, 1);
		folders.push(new_folder_name);
	} else {
		alert("'" + folder_name + "' does not exist");
		return;
	}
	await idbPutItem("dezynor_settings", {setting_key:"folders", value:folders});
	loadFolders();
	document.getElementById("new_folder").focus();

	// update design keys
	
	let all_designs = await idbGetAllItems("dezynor_designs");
	for (i = 0; i < all_designs.length; i++) {
		let design_key = all_designs[i].design_key;
		let design_data = all_designs[i].value;
		if (design_key.split("|")[1] == folder_name) {
			await idbRemoveItem("dezynor_designs", design_key);
			let new_design_key = design_key.split("|")[0] + "|" + new_folder_name;
			await idbPutItem("dezynor_designs", {design_key:new_design_key, value:design_data});
		}
	}

	showMessage("Folder '" + folder_name + "' renamed to '" + new_folder_name + "'", "Green");
	showFolderDezyns(new_folder_name);
	
}

async function loadFolders() {
	let folders = await idbGetItem("dezynor_settings", "folders");
	folders.sort();
	let folders_html = "";
	for (let i = 0; i < folders.length; i++) {
		let folder_name = folders[i].trim();
		folders_html = folders_html + "<div><a onclick=\"showFolderDezyns('" + folder_name + "');\"> <img src='images/icon_folder.png'>" + folder_name + "</a></div>";
	}
	document.getElementById("folders").innerHTML = folders_html;		
}

async function showFolderDezyns(folder) {
	
	current_folder = folder;
	
	document.getElementById("disclaimer").style.display = "none";
	document.getElementById("folder_label").innerHTML = "";
	document.getElementById("message").innerHTML = "Loading...";
	
	let all_designs = await idbGetAllItems("dezynor_designs");

	let folder_dezyns = "";
	for (i = 0; i < all_designs.length; i++) {
		let key = all_designs[i].design_key;
		let key_folder = key.split("|")[1];
		if (folder == key_folder) {
			//let item = all_designs[i].value.replace("id=\"wrapper\"", "class='wrapper' id='" + key + "' onclick='setCurrentDezyn(this.id);'");
			let item = all_designs[i].value.replace("id=\"wrapper\"", "class='wrapper' id='" + key + "' onclick=\"window.open('dezyn.html?key=" + key + "');\"");
			item = item.replace(/((background-image: url\(.*?\);))/g, '');
			folder_dezyns += item;
		}

	}
	
	document.getElementById("dezyns").innerHTML = folder_dezyns;

	let message = await hideMessage(); // await
	document.getElementById("message").innerHTML = message;
	let folder_label = "<b>" + folder + "</b> ";
	folder_label = folder_label + " <span id='delete_folder' onclick=\"deleteFolder('" + folder + "');\" title='Delete this folder'>" + "D</span>";
	folder_label = folder_label + " <span id='rename_folder' onclick=\"renameFolder('" + folder + "');\" title='Rename this folder'>" + "R</span>";	
	document.getElementById("folder_label").innerHTML = "<div>" + folder_label + "</div>";

}

function hideMessage() {
  return new Promise(resolve => {
		setTimeout(() => {resolve("");}, 0); // setTimeOut is put at the end of the rendering queue
  });
}
