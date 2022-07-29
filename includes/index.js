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



function setCurrentDezyn(key) {
	idbPutItem("dezynor_settings", {setting_key:"current_design", value: key});
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

	idbGetItem("dezynor_settings", "folders").then(function(result) {
		let folders = result;
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
	});
}

function renameFolder(folder_name) {
	let new_folder_name = prompt("Enter new folder name");
	if (!new_folder_name || new_folder_name.trim().length == 0) return;

	idbGetItem("dezynor_settings", "folders").then(function(result) {
		let folders = result;
		let index = folders.indexOf(folder_name);
		if (index > -1) {
			folders.splice(index, 1);
			folders.push(new_folder_name);
		} else {
			alert("'" + folder_name + "' does not exist");
			return;
		}
		idbPutItem("dezynor_settings", {setting_key:"folders", value:folders});
		loadFolders();
		document.getElementById("new_folder").focus();
		showMessage("'" + folder_name + "' renamed to '" + new_folder_name + "'", "Green");
	});

}

function loadFolders() {
	idbGetItem("dezynor_settings", "folders").then(function(result) {
		let folders = result;
		folders.sort();
		let folders_html = "";
		for (let i = 0; i < folders.length; i++) {
			folders_html = folders_html + "<div><span onclick=\"renameFolder('" + folders[i].trim() + "');\">" + "R</span> <a onclick=\"showFolderDezyns('" + folders[i].trim() + "');\">" + folders[i].trim() + "</a></div>";
		}
		document.getElementById("folders").innerHTML = folders_html;		
	});
}

async function showFolderDezyns(folder) {
	
	current_folder = folder;
	
	document.getElementById("disclaimer").style.display = "none";
	document.getElementById("folder_label").innerHTML = "";
	document.getElementById("message").innerHTML = "Loading...";

	idbGetAllItems("dezynor_designs").then(async function(result) {
		
		let all_designs = result;

		let folder_dezyns = "";
		for (i = 0; i < all_designs.length; i++) {
			let key = all_designs[i].design_key;
			let key_folder = key.split("|")[1];
			if (folder == key_folder) {
				let item = all_designs[i].value.replace("id=\"wrapper\"", "class='wrapper' id='" + key + "' onclick='setCurrentDezyn(this.id);'");
				item = item.replace(/((background-image: url\(.*?\);))/g, '');
				folder_dezyns += item;
			}

		}
		
		document.getElementById("dezyns").innerHTML = folder_dezyns;

		let message = await hideMessage(); // await
		document.getElementById("message").innerHTML = message;
		document.getElementById("folder_label").innerHTML = "<h2>" + folder + "</h2>";
	});
}

function hideMessage() {
  return new Promise(resolve => {
		setTimeout(() => {resolve("");}, 0); // setTimeOut is put at the end of the rendering queue
  });
}
