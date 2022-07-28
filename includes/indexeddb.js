
let database_name = "dezynordb";
let openRequest = indexedDB.open(database_name, 1);

let max_resize_width = 1000;
let max_resize_height = 1000;

openRequest.onupgradeneeded = function() { // runs once when the app is loaded first time
	let db = openRequest.result;
	// create stores (tables)
	let dezynor_designs = db.createObjectStore("dezynor_designs", {keyPath: "design_key"});
	let dezynor_settings = db.createObjectStore("dezynor_settings", {keyPath: "setting_key"});
	let dezynor_images = db.createObjectStore("dezynor_images", {keyPath: "image_key"});
	// insert initial data
	dezynor_settings.add({setting_key: "folders", value: ["default"]});
	dezynor_settings.add({setting_key: "fonts", value: ["Anton"]});
	dezynor_settings.add({setting_key: "max_upload_width",value: max_resize_width});
	dezynor_settings.add({setting_key: "max_upload_height",value: max_resize_height});
	dezynor_settings.add({setting_key: "current_design", value: ""});
	dezynor_settings.add({setting_key: "copied_section",value: ""});
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
	
	// load app settings
	idbGetItem("dezynor_settings", "max_upload_width").then(function(result) {max_resize_width = result;});
	idbGetItem("dezynor_settings", "max_upload_height").then(function(result) {max_resize_height = result;});

};

function idbPutItem(store, object) {
	let db = openRequest.result;
	let transaction = db.transaction(store, "readwrite");
	store = transaction.objectStore(store);
	request = store.put(object);
	request.onsucess = function() {
		console.log("Saved successfully");
	};
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
			} else {
				resolve(null);
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


