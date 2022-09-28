

let db_name = "dezynordb";
let db_version = "1";
let connection = indexedDB.open(db_name, db_version);

connection.onupgradeneeded = function(e) {
	let db = connection.result;
    console.log("DB updated from version " + e.oldVersion +  " to " + e.newVersion);
	switch (e.oldVersion) {
		case 0:
			console.log("Case 0: Adding database, stores and settings");
			let dezynor_settings = db.createObjectStore("dezynor_settings", {keyPath: "setting_key"});
			let dezynor_designs = db.createObjectStore("dezynor_designs", {keyPath: "design_key"});
			let dezynor_fonts = db.createObjectStore("dezynor_fonts", {keyPath: "font_key"});
			let dezynor_images = db.createObjectStore("dezynor_images", {keyPath: "image_key"});
			dezynor_settings.add({setting_key: "folders", value: ["default"]});
			dezynor_settings.add({setting_key: "fonts", value: ["Anton|Google", "Smooch|Google","Noto Kufi Arabic|Google","Noto Naskh Arabic|Google","Noto Nastaliq Urdu|Google","Nabla|Google","Bungee Spice|Google","Lobster|Google","Great Vibes|Google","Kaushan Script|Google","Creepster|Google","DynaPuff|Google"]});
			localStorage.setItem("copied_section", "");
			localStorage.setItem("show_background_images", "true");
			localStorage.setItem("duplicate_offset_x", "10");
			localStorage.setItem("duplicate_offset_y", "0");
			localStorage.setItem("resize_offset", "10");
			localStorage.setItem("move_offset", "2");
			localStorage.setItem("rotate_offset", "1");
			localStorage.setItem("font_size_change", "3");
			localStorage.setItem("line_height_change", "3");
			localStorage.setItem("word_spacing_change", "1");
			localStorage.setItem("max_upload_width", "1280");
			localStorage.setItem("max_upload_height", "1280");
			localStorage.setItem("current_folder", "default");
			localStorage.setItem("paste_result", "plain");
			localStorage.setItem("show_multiple_dash_panels", "false");
			localStorage.setItem("automatically_save", "false");
			localStorage.setItem("automatically_save_after", "30");
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
	}


};

connection.onerror = function(e) {
	console.error("Error: ", connection.error);
};

connection.onsuccess = function(e) {
	let db = connection.result;
	db.onerror = function(e) {
		console.log("Error: ", db.error);
	};
	db.onversionchange = function(e) {
		db.close();
		alert("Database is outdated, please reload the page.")
		return;
	};
};

async function idbPutItem(store, object) {
	let db = connection.result;
	let transaction = db.transaction(store, "readwrite");
	store = transaction.objectStore(store);
	return new Promise(function(resolve, reject) {
		let request = store.put(object);
        request.onsuccess = function(e) {
			resolve(true);
        }
	});
}

async function idbGetItem(store, key) {
	let db = connection.result;
	let transaction = db.transaction(store, "readonly");
	store = transaction.objectStore(store);
    return new Promise(function(resolve, reject) {
        let request = store.get(key);
        request.onsuccess = function(e) {
			// if (request.result.value == e.target.result.value) console.log("same");
			if (request.result != undefined) {
				resolve(request.result.value);
			} else {
				resolve(false);
			}
        }
    });
}

async function idbRemoveItem(store, key) {
	let db = connection.result;
	let transaction = db.transaction(store, "readwrite");
	store = transaction.objectStore(store);
    return new Promise(function(resolve, reject) {
        let request = store.delete(key);
		request.onsuccess = function(e) {
			resolve(true);
		};
    });
}

async function idbKeyExists(store, key) {
	let db = connection.result;
	let transaction = db.transaction(store, "readonly");
	store = transaction.objectStore(store);
    return new Promise(function(resolve, reject) {
        let request = store.get(key);
        request.onsuccess = function(e) {
			if (request.result != undefined) {
				resolve(true);
			} else {
				resolve(false);
			}
        }
    });
}

async function idbGetAllItems(store) {
	let db = connection.result;
	let transaction = db.transaction(store, "readonly");
	object_store = transaction.objectStore(store);
    return new Promise(function(resolve, reject) {
		let all_items = object_store.getAll();
		all_items.onsuccess = function(e) {
			resolve(all_items.result);
		}
    });	
}


