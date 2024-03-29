

let db_name = "dezynordb";
let db_version = "1";
let connection = indexedDB.open(db_name, db_version);

connection.onupgradeneeded = function(e) {
	let db = connection.result;
    console.log("DB updated from version " + e.oldVersion +  " to " + e.newVersion);
	switch (e.oldVersion) {
		case 0:
			console.log("Case 0: Adding database, stores and settings");
			let dezynor_designs = db.createObjectStore("dezynor_designs", {keyPath: "design_key"});
			let dezynor_fonts = db.createObjectStore("dezynor_fonts", {keyPath: "font_key"});
			let dezynor_images = db.createObjectStore("dezynor_images", {keyPath: "image_key"});
			let dezynor_styles = db.createObjectStore("dezynor_styles", {keyPath: "style_key"});
			let dezynor_settings = db.createObjectStore("dezynor_settings", {keyPath: "setting_key"});
			dezynor_settings.add({setting_key: "folders", value: ["default"]});
			dezynor_settings.add({setting_key: "fonts", value: ["Anton|Google", "Smooch|Google","Noto Kufi Arabic|Google","Noto Naskh Arabic|Google","Noto Nastaliq Urdu|Google","Nabla|Google","Bungee Spice|Google","Lobster|Google","Great Vibes|Google","Kaushan Script|Google","Creepster|Google","DynaPuff|Google"]});
			// localstorage values are set in index.js
			
		case 1:
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


