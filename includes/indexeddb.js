

let database_name = "dezynordb";
let openRequest = indexedDB.open(database_name, 1);

openRequest.onupgradeneeded = function() {
	let db = openRequest.result;

	let dezynor_designs = db.createObjectStore("dezynor_designs", {keyPath: "design_key"});
	let dezynor_settings = db.createObjectStore("dezynor_settings", {keyPath: "setting_key"});
	let dezynor_images = db.createObjectStore("dezynor_images", {keyPath: "image_key"});

	dezynor_settings.add({setting_key: "folders", value: ["default"]});
	dezynor_settings.add({setting_key: "fonts", value: ["Anton|Google", "Smooch|Google", "Arial|Installed", "Verdana|Installed"]});
	dezynor_settings.add({setting_key: "max_upload_width",value: "1000"});
	dezynor_settings.add({setting_key: "max_upload_height",value: "1000"});
	localStorage.setItem("copied_section", "");
	localStorage.setItem("show_background_image", "1");
	localStorage.setItem("duplicate_offset_x", "10");
	localStorage.setItem("duplicate_offset_y", "0");
	localStorage.setItem("move_offset", "2");
	localStorage.setItem("rotate_offset", "1");
};

openRequest.onerror = function() {
	console.error("Error: ", openRequest.error);
};

openRequest.onsuccess = function() {
	let db = openRequest.result;
	db.onerror = function() {console.log("Error: ", db.error);};
	db.onversionchange = function() {
		db.close();
		alert("Database is outdated, please reload the page.")
		return
	};
};

async function idbPutItem(store, object) {
	let db = openRequest.result;
	let transaction = db.transaction(store, "readwrite");
	store = transaction.objectStore(store);
	return new Promise(function(resolve, reject) {
		let request = store.put(object);
        request.onsuccess = function() {
			resolve(true);
        }
	});
}

async function idbGetItem(store, key) {
	let db = openRequest.result;
	let transaction = db.transaction(store, "readonly");
	store = transaction.objectStore(store);
    return new Promise(function(resolve, reject) {
        let request = store.get(key);
        request.onsuccess = function() {
			if (request.result != undefined) {
				resolve(request.result.value);
			}
        }
    });
}

async function idbRemoveItem(store, key) {
	let db = openRequest.result;
	let transaction = db.transaction(store, "readwrite");
	store = transaction.objectStore(store);
    return new Promise(function(resolve, reject) {
        let request = store.delete(key);
		request.onsuccess = function(evt) {
			resolve(true);
		};
    });
}

async function idbKeyExists(store, key) {
	let db = openRequest.result;
	let transaction = db.transaction(store, "readonly");
	store = transaction.objectStore(store);
    return new Promise(function(resolve, reject) {
        let request = store.get(key);
        request.onsuccess = function() {
			if (request.result != undefined) {
				resolve(true);
			} else {
				resolve(false);
			}
        }
    });
}

async function idbGetAllItems(store) {
	let db = openRequest.result;
	let transaction = db.transaction(store, "readonly");
	store = transaction.objectStore(store);
    return new Promise(function(resolve, reject) {
		let all_items = store.getAll();
		all_items.onsuccess = function() {
			resolve(all_items.result);
		}
    });	
}


