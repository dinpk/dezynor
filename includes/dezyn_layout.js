
// console.trace(); // put before the statement that generates error

window.onload = function() {
	styleWrapper();
	setRandomWrapperColor();
	loadSelectFolders();
	loadSelectFonts();
	loadCurrentDezyn();
	showSectionPanel('box_section');
}

let dezyn_id = generateDeisgnId() + "|default";
let section_counter = 0;
let selected_section;
let move;
let resize_bottom_right;
let resize_top_right;
let resize_top_left;
let resize_bottom_left;
let resize_center_right;
let resize_center_left;
let resize_center_top;
let resize_center_bottom;

function generateDeisgnId() {
	return "dezyn-" + new Date().toISOString().replace("T", "-").replaceAll(":", "-").slice(0,19);
}


async function addHandles() {

	if (document.getElementById("move") == null) {
		
		let move_span = document.createElement("span");
		move_span.setAttribute("id", "move");
		move_span.setAttribute("class", "move");
		document.getElementById("wrapper").appendChild(move_span);
		document.getElementById("move").innerHTML = " ";
		console.log(document.getElementById("move"));

		let resize_bottom_right_span = document.createElement("span");
		resize_bottom_right_span.setAttribute("id", "resize_bottom_right");
		resize_bottom_right_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_bottom_right_span);
		document.getElementById("resize_bottom_right").innerHTML = "O";
		

		let resize_top_right_span = document.createElement("span");
		resize_top_right_span.setAttribute("id", "resize_top_right");
		resize_top_right_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_top_right_span);
		document.getElementById("resize_top_right").innerHTML = "O";

		let resize_top_left_span = document.createElement("span");
		resize_top_left_span.setAttribute("id", "resize_top_left");
		resize_top_left_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_top_left_span);
		document.getElementById("resize_top_left").innerHTML = "O";

		let resize_bottom_left_span = document.createElement("span");
		resize_bottom_left_span.setAttribute("id", "resize_bottom_left");
		resize_bottom_left_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_bottom_left_span);
		document.getElementById("resize_bottom_left").innerHTML = "O";

		let resize_center_right_span = document.createElement("span");
		resize_center_right_span.setAttribute("id", "resize_center_right");
		resize_center_right_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_center_right_span);
		document.getElementById("resize_center_right").innerHTML = "O";

		let resize_center_left_span = document.createElement("span");
		resize_center_left_span.setAttribute("id", "resize_center_left");
		resize_center_left_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_center_left_span);
		document.getElementById("resize_center_left").innerHTML = "O";

		let resize_center_top_span = document.createElement("span");
		resize_center_top_span.setAttribute("id", "resize_center_top");
		resize_center_top_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_center_top_span);
		document.getElementById("resize_center_top").innerHTML = "O";

		let resize_center_bottom_span = document.createElement("span");
		resize_center_bottom_span.setAttribute("id", "resize_center_bottom");
		resize_center_bottom_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_center_bottom_span);
		document.getElementById("resize_center_bottom").innerHTML = "O";
	}

	move = document.getElementById("move");
	resize_bottom_right = document.getElementById("resize_bottom_right");
	resize_top_right = document.getElementById("resize_top_right");
	resize_bottom_left = document.getElementById("resize_bottom_left");
	resize_top_left = document.getElementById("resize_top_left");
	resize_center_right = document.getElementById("resize_center_right");
	resize_center_left = document.getElementById("resize_center_left");
	resize_center_top = document.getElementById("resize_center_top");
	resize_center_bottom = document.getElementById("resize_center_bottom");

}

function hideHandles() {
	
	move.style.visibility = "hidden";
	resize_bottom_right.style.visibility = "hidden";
	resize_top_right.style.visibility = "hidden";
	resize_bottom_left.style.visibility = "hidden";
	resize_top_left.style.visibility = "hidden";
	resize_center_right.style.visibility = "hidden";
	resize_center_left.style.visibility = "hidden";
	resize_center_top.style.visibility = "hidden";
	resize_center_bottom.style.visibility = "hidden";
	move.style.transition = "initial";
	resize_bottom_right.style.transition = "initial";
	resize_top_right.style.transition = "initial";
	resize_bottom_left.style.transition = "initial";
	resize_top_left.style.transition = "initial";
	resize_center_right.style.transition = "initial";
	resize_center_left.style.transition = "initial";
	resize_center_top.style.transition = "initial";
	resize_center_bottom.style.transition = "initial";	
}

function showHandles() {
	move.style.visibility = "visible";
	resize_bottom_right.style.visibility = "visible";
	resize_top_right.style.visibility = "visible";
	resize_bottom_left.style.visibility = "visible";
	resize_top_left.style.visibility = "visible";
	resize_center_right.style.visibility = "visible";
	resize_center_left.style.visibility = "visible";
	resize_center_top.style.visibility = "visible";
	resize_center_bottom.style.visibility = "visible";
}

function addSection() {
	section_counter = getNewSectionCount();
	let section_id = "section" + section_counter;
	let section = document.createElement("section");
	let section_text = document.createTextNode(" ");
	section.appendChild(section_text);
	section.setAttribute("id", section_id);
	section.setAttribute("onclick", "selectSection('" + section_counter + "');");
	section.setAttribute("onpaste", "pasteText(event);");
	section.setAttribute("contenteditable", "true");
	document.getElementById("wrapper").appendChild(section);
	document.getElementById(section_id).style.zIndex = section_counter;
	setSectionDefaultStyles(document.getElementById(section_id));
	selectSection(section_counter);
	styleAlignTopLeft();
	document.getElementById(section_id).focus();
	styleAlignCenterCenter();
}

function getNewSectionCount() {
	let section_ids = [];
	let all_sections = document.querySelectorAll("section");
	for (let i = 0; i < all_sections.length; i++) {
		section_ids.push(all_sections[i].id);
	}

	let new_section_number = 1;
	if (section_ids.length > 0) {
		section_ids.reverse();
		new_section_number = section_ids[0].replace("section", "");
		new_section_number++;
	}
	return new_section_number;
}


function selectSection(counter) {

	unselectSections();
	selected_section = document.getElementById("section" + counter);
	
	//move.addEventListener("onmousedown", onMouseDown4Move(counter));
	move.setAttribute("onmousedown", "onMouseDown4Move('" + counter + "');");
	resize_bottom_right.setAttribute("onmousedown", "onMouseDown4ResizeBottomRight('" + counter + "');");
	resize_top_right.setAttribute("onmousedown", "onMouseDown4ResizeTopRight('" + counter + "');");
	resize_top_left.setAttribute("onmousedown", "onMouseDown4ResizeTopLeft('" + counter + "');");
	resize_bottom_left.setAttribute("onmousedown", "onMouseDown4ResizeBottomLeft('" + counter + "');");
	resize_center_right.setAttribute("onmousedown", "onMouseDown4ResizeCenterRight('" + counter + "');");
	resize_center_left.setAttribute("onmousedown", "onMouseDown4ResizeCenterLeft('" + counter + "');");
	resize_center_top.setAttribute("onmousedown", "onMouseDown4ResizeCenterTop('" + counter + "');");
	resize_center_bottom.setAttribute("onmousedown", "onMouseDown4ResizeCenterBottom('" + counter + "');");

	selected_section.style.outline = "4px dashed yellow"
	//selected_section.innerHTML = selected_section.innerHTML.replace(/<\/?span[^>]*>/g, "");
	colorable_element = selected_section;
	loadSectionStyles();
	reAlignSectionHandles();
	showHandles();
}

function duplicateSection() {

	if (!(selected_section)) return;

	section_counter = getNewSectionCount();

	let section_id = "section" + section_counter;
	
	let section = selected_section.cloneNode(true);
	section.setAttribute("id", section_id);
	section.setAttribute("onclick", "selectSection('" + section_counter + "');");
	document.getElementById("wrapper").appendChild(section);
	
	setTimeout(function() { 
		selectSection(section_counter);
		selected_section.style.left = parseInt(selected_section.style.left.replace("px", "")) + 10 + "px";
		reAlignSectionHandles();
	}, 100);


}

function removeSection() {
	selected_section.remove();
	hideHandles();
}

function copySection() {
	idbPutItem("dezynor_settings", {setting_key:"copied_section", value:selected_section.outerHTML});
}

function pasteSection() {
	idbGetItem("dezynor_settings", "copied_section").then(function(result) {
		let copied_section_string = result;
		let html = new DOMParser().parseFromString(copied_section_string, "text/html");
		let sections = html.body.querySelectorAll("section");
		let copied_section = sections[0];

		section_counter = getNewSectionCount();

		let section_id = "section" + section_counter;
		
		let section = copied_section;
		section.setAttribute("id", section_id);
		section.setAttribute("onclick", "selectSection('" + section_counter + "');");
		section.setAttribute("onpaste", "pasteText(event);");
		document.getElementById("wrapper").appendChild(section);
		document.getElementById(section_id).style.zIndex = section_counter;

		selectSection(section_counter);
		reAlignSectionHandles();
	});	

}


function unselectSections() {
	let all_sections = document.querySelectorAll("section");
	for (i = 0; i < all_sections.length; i++) {
		all_sections[i].style.outline = "1px dashed gray";
	}

	hideHandles();
}

function pasteText(e) {
	e.preventDefault(); // cancel paste
	var text = (e.originalEvent || e).clipboardData.getData('text/plain'); // get text representation of clipboard
	document.execCommand("insertHTML", false, text); // insert text manually
}

function onMouseDown4Move(counter) { // move

	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	function onMouseMove(event) {
		move.style.left = (event.pageX - 30) + "px";
		move.style.top = (event.pageY - 30) + "px";
		section.style.left = (event.pageX - section.style.width.replace("px", "") / 2) - 30 + "px";
		section.style.top = (event.pageY - section.style.height.replace("px", "") / 2) - 30 + "px";
	}
	function onMouseUp() {
		reAlignSectionHandles();
		loadSectionStyles();
		showHandles();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}




function onMouseDown4ResizeTopRight(counter) {
	
	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	function onMouseMove(event) {
		resize_top_right.style.left = (event.pageX - 25) + "px";
		resize_top_right.style.top = (event.pageY - 25) + "px";

		section.style.width = (event.pageX - 20) - parseInt(section.style.left.replace("px", "")) + "px";

		let y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20); // how much moved from previous top
		resize_top_right.style.top = (event.pageY - 25) + "px";
		section.style.top = (event.pageY - 20) + "px";
		section.style.height =  parseInt(section.style.height.replace("px", "")) + y_diff + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		document.getElementById("left").value = section.style.left.replace("px", "");
		document.getElementById("width").value = section.style.width.replace("px", "");
		document.getElementById("height").value = section.style.height.replace("px", "");
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}



function onMouseDown4ResizeCenterRight(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	function onMouseMove(event) {
		//resize_center_right.style.top = (event.pageY - 25) + "px";
		resize_center_right.style.left = (event.pageX - 25) + "px";

		section.style.width = (event.pageX - 20) - parseInt(section.style.left.replace("px", "")) + "px";
		//section.style.height = (event.pageY - 20) - parseInt(section.style.top.replace("px", "")) + "px";
	}
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		document.getElementById("width").value = section.style.width.replace("px", "");
		document.getElementById("height").value = section.style.height.replace("px", "");
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}



function onMouseDown4ResizeCenterLeft(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	function onMouseMove(event) {
		resize_center_left.style.left = (event.pageX - 30) + "px";
		
		let x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20); // how much moved from previous left
		section.style.left = (event.pageX - 20) + "px";
		section.style.width =  parseInt(section.style.width.replace("px", "")) + x_diff + "px";
	}
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		document.getElementById("left").value = section.style.left.replace("px", "");
		document.getElementById("width").value = section.style.width.replace("px", "");
		document.getElementById("height").value = section.style.height.replace("px", "");
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}


function onMouseDown4ResizeCenterTop(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	function onMouseMove(event) {
		resize_center_top.style.top = (event.pageY - 30) + "px";

		let y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20); // how much moved from previous top
		section.style.height = parseInt(section.style.height.replace("px", "")) + y_diff + "px";
		section.style.top = (event.pageY - 20) + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		document.getElementById("left").value = section.style.left.replace("px", "");
		document.getElementById("width").value = section.style.width.replace("px", "");
		document.getElementById("height").value = section.style.height.replace("px", "");
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}


function onMouseDown4ResizeCenterBottom(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	
	function onMouseMove(event) {
		resize_center_bottom.style.top = (event.pageY - 30) + "px";

		section.style.height = (event.pageY - 20) - parseInt(section.style.top.replace("px", "")) - 5 + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		document.getElementById("left").value = section.style.left.replace("px", "");
		document.getElementById("width").value = section.style.width.replace("px", "");
		document.getElementById("height").value = section.style.height.replace("px", "");
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}


function onMouseDown4ResizeBottomRight(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	function onMouseMove(event) {
		resize_bottom_right.style.top = (event.pageY - 25) + "px";
		resize_bottom_right.style.left = (event.pageX - 25) + "px";

		section.style.width = (event.pageX - 20) - parseInt(section.style.left.replace("px", "")) + "px";
		section.style.height = (event.pageY - 20) - parseInt(section.style.top.replace("px", "")) + "px";
	}
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		document.getElementById("width").value = section.style.width.replace("px", "");
		document.getElementById("height").value = section.style.height.replace("px", "");
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}



function onMouseDown4ResizeTopLeft(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	
	function onMouseMove(event) {
		resize_top_left.style.left = (event.pageX - 25) + "px";
		resize_top_left.style.top = (event.pageY - 25) + "px";
		
		let x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20); // how much moved from previous left
		section.style.width = parseInt(section.style.width.replace("px", "")) + x_diff + "px";
		section.style.left = (event.pageX - 20) + "px";
		
		let y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20); // how much moved from previous top
		section.style.height = parseInt(section.style.height.replace("px", "")) + y_diff + "px";
		section.style.top = (event.pageY - 20) + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		document.getElementById("left").value = section.style.left.replace("px", "");
		document.getElementById("width").value = section.style.width.replace("px", "");
		document.getElementById("height").value = section.style.height.replace("px", "");
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}


function onMouseDown4ResizeBottomLeft(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	section.style.transition = "initial";
	
	
	function onMouseMove(event) {
		resize_bottom_left.style.left = (event.pageX - 25) + "px";
		resize_bottom_left.style.top = (event.pageY - 25) + "px";
		
		let x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20); // how much moved from previous left
		section.style.width =  parseInt(section.style.width.replace("px", "")) + x_diff + "px";
		section.style.left = (event.pageX - 20) + "px";

		section.style.height = (event.pageY - 20) - parseInt(section.style.top.replace("px", "")) + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		document.getElementById("left").value = section.style.left.replace("px", "");
		document.getElementById("width").value = section.style.width.replace("px", "");
		document.getElementById("height").value = section.style.height.replace("px", "");
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}


function reAlignSectionHandles() {
	
	move.style.top = parseInt(selected_section.style.top.replace("px", "")) + (parseInt(selected_section.style.height.replace("px", "")) / 2) + "px";
	move.style.left = parseInt(selected_section.style.left.replace("px", "")) + (parseInt(selected_section.style.width.replace("px", "")) / 2) + "px";

	resize_bottom_right.style.top = parseInt(selected_section.style.top.replace("px", "")) + parseInt(selected_section.style.height.replace("px", "")) - 5 + "px";
	resize_bottom_right.style.left = parseInt(selected_section.style.left.replace("px", "")) + parseInt(selected_section.style.width.replace("px", "")) - 5 + "px";

	resize_top_right.style.top = parseInt(selected_section.style.top.replace("px", "")) - 5 + "px";
	resize_top_right.style.left = parseInt(selected_section.style.left.replace("px", "")) + parseInt(selected_section.style.width.replace("px", "")) - 5 + "px";
	
	resize_bottom_left.style.top = parseInt(selected_section.style.top.replace("px", "")) + parseInt(selected_section.style.height.replace("px", "")) - 5 + "px";
	resize_bottom_left.style.left = parseInt(selected_section.style.left.replace("px", "")) - 5 + "px";

	resize_top_left.style.top = parseInt(selected_section.style.top.replace("px", "")) - 5 + "px";
	resize_top_left.style.left = parseInt(selected_section.style.left.replace("px", "")) - 5 + "px";

	resize_center_right.style.top =  parseInt((selected_section.style.top.replace("px", ""))) + (parseInt(selected_section.style.height.replace("px", "")) / 2) - 5 + "px";
	resize_center_right.style.left = parseInt((selected_section.style.left.replace("px", ""))) + parseInt(selected_section.style.width.replace("px", "")) - 5 + "px";

	resize_center_left.style.top =  parseInt((selected_section.style.top.replace("px", ""))) + (parseInt(selected_section.style.height.replace("px", "")) / 2) - 5 + "px";
	resize_center_left.style.left = parseInt((selected_section.style.left.replace("px", ""))) - 10 + "px";
	
	resize_center_top.style.top =  parseInt(selected_section.style.top.replace("px", "")) - 10 + "px";
	resize_center_top.style.left = parseInt(selected_section.style.left.replace("px", "")) + (parseInt(selected_section.style.width.replace("px", "")) / 2) + "px";

	resize_center_bottom.style.top =  parseInt(selected_section.style.top.replace("px", "")) + parseInt(selected_section.style.height.replace("px", "")) - 5 + "px";
	resize_center_bottom.style.left = parseInt(selected_section.style.left.replace("px", "")) + (parseInt(selected_section.style.width.replace("px", "")) / 2) + "px";

}


// width and height
function styleResizeFullWidth() {
	selected_section.style.width = document.getElementById("wrapper").style.width;
	selected_section.style.left = document.getElementById("wrapper").style.left;
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleResizeFullHeight() {
	selected_section.style.height = document.getElementById("wrapper").style.height;
	selected_section.style.top = document.getElementById("wrapper").style.top;
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleResizeHalfWidth() {
	selected_section.style.width = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2) + "px";
	selected_section.style.height = document.getElementById("wrapper").style.height;
	selected_section.style.top = document.getElementById("wrapper").style.top;
	selected_section.style.left = document.getElementById("wrapper").style.left;
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleResizeHalfHeight() {
	selected_section.style.height = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2) + "px";
	selected_section.style.width = document.getElementById("wrapper").style.width;
	selected_section.style.left = document.getElementById("wrapper").style.left;
	selected_section.style.top = document.getElementById("wrapper").style.top;
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleResizeQuarter() {
	selected_section.style.width = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2) + "px";
	selected_section.style.height = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2) + "px";
	selected_section.style.left = document.getElementById("wrapper").style.left;
	selected_section.style.top = document.getElementById("wrapper").style.top;
	reAlignSectionHandles();
	loadSectionStyles();
}

// align
function styleAlignTopLeft() {
	selected_section.style.top = document.getElementById("wrapper").style.top;
	selected_section.style.left = document.getElementById("wrapper").style.left;
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignTopRight() {
	selected_section.style.top = document.getElementById("wrapper").style.top;
	let new_left = parseInt(document.getElementById("wrapper").style.width.replace("px", "")) - parseInt(selected_section.style.width.replace("px", ""));
	selected_section.style.left = parseInt(new_left) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignBottomLeft() {
	selected_section.style.left = document.getElementById("wrapper").style.left;
	let new_top = parseInt(document.getElementById("wrapper").style.height.replace("px", "")) - parseInt(selected_section.style.height.replace("px", ""));
	selected_section.style.top = parseInt(new_top) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignBottomRight() {
	let new_left = parseInt(document.getElementById("wrapper").style.width.replace("px", "")) - parseInt(selected_section.style.width.replace("px", ""));
	selected_section.style.left = parseInt(new_left) + "px";
	let new_top = parseInt(document.getElementById("wrapper").style.height.replace("px", "")) - parseInt(selected_section.style.height.replace("px", ""));
	selected_section.style.top = parseInt(new_top) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignTopCenter() {
	selected_section.style.top = document.getElementById("wrapper").style.top;
	let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
	selected_section.style.left = parseInt(new_left) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignRightCenter() {
	let new_left = parseInt(document.getElementById("wrapper").style.width.replace("px", "")) - parseInt(selected_section.style.width.replace("px", ""));
	selected_section.style.left = parseInt(new_left) + "px";
	let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
	selected_section.style.top = parseInt(new_top) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignLeftCenter() {
	selected_section.style.left = document.getElementById("wrapper").style.left;
	let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
	selected_section.style.top = parseInt(new_top) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignBottomCenter() {
	let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
	selected_section.style.left = parseInt(new_left) + "px";
	let new_top = parseInt(document.getElementById("wrapper").style.height.replace("px", ""))   -  parseInt(selected_section.style.height.replace("px", ""));
	selected_section.style.top = parseInt(new_top) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignCenterCenter() {
	let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
	selected_section.style.left = parseInt(new_left) + "px";
	let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
	selected_section.style.top = parseInt(new_top) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignHCenter() {
	let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
	selected_section.style.left = parseInt(new_left) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignHLeft() {
	selected_section.style.left = document.getElementById("wrapper").style.left;
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignHRight() {
	let new_left = parseInt(document.getElementById("wrapper").style.width.replace("px", ""))  -   parseInt(selected_section.style.width.replace("px", ""));
	selected_section.style.left = parseInt(new_left) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignVCenter() {
	let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
	selected_section.style.top = parseInt(new_top) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignVTop() {
	selected_section.style.top = document.getElementById("wrapper").style.top;
	reAlignSectionHandles();
	loadSectionStyles();
}

function styleAlignVBottom() {
	let new_top = parseInt(document.getElementById("wrapper").style.height.replace("px", ""))   -  parseInt(selected_section.style.height.replace("px", ""));
	selected_section.style.top = parseInt(new_top) + "px";
	reAlignSectionHandles();
	loadSectionStyles();
}

// layout
function styleLayout(parameters) {
	
	let wrapper_width = parseInt(document.getElementById("wrapper").style.width.replace("px", ""));
	let wrapper_height = parseInt(document.getElementById("wrapper").style.height.replace("px", ""));

	let gutter_x = parseInt(document.getElementById("wrapper").style.width.replace("px", "")) * .04;
	let gutter_y = parseInt(document.getElementById("wrapper").style.height.replace("px", "")) * .04;


	let all_sections = document.querySelectorAll("section"); // node list
	let section_ids = [];
	for (d = 0; d < all_sections.length; d++) {
		section_ids.push(all_sections[d].id);
		
		all_sections[d].style.left = wrapper_width + 50 + "px";
		selectSection(all_sections[d].id.replace("section", ""));
		reAlignSectionHandles();
	}

	let gutter = document.getElementById("layout_gutter").value;

	let boxes = parameters.split(",");
	for (let k = 0; k < boxes.length; k++) {
		let attributes = boxes[k].split("|");
		
		if (gutter == "no") {
			var x = (attributes[0].trim() * wrapper_width / 100) - (gutter_x / 2);
			var y = (attributes[1] * wrapper_height / 100) - (gutter_y / 2);
			var width = (attributes[2] * wrapper_width / 100) + (gutter_x);
			var height = (attributes[3] * wrapper_height / 100) + (gutter_y);
		} else if (gutter == "min") {
			var x = (attributes[0].trim() * wrapper_width / 100) - (gutter_x / 3.5);
			var y = (attributes[1] * wrapper_height / 100) - (gutter_y / 3.5);
			var width = (attributes[2] * wrapper_width / 100) + (gutter_x / 2);
			var height = (attributes[3] * wrapper_height / 100) + (gutter_y / 2);
		} else if (gutter == "max") {
			var x = (attributes[0].trim() * wrapper_width / 100);
			var y = (attributes[1] * wrapper_height / 100);
			var width = (attributes[2] * wrapper_width / 100);
			var height = (attributes[3] * wrapper_height / 100);
		}

		let section_id = section_ids.splice(0, 1);
		let section = document.getElementById(section_id);
		
		if (section) {
			section.style.left = x + "px";
			section.style.top = y + "px";
			section.style.width = width + "px";
			section.style.height = height + "px";
			selectSection(section.id.replace("section", ""));
			reAlignSectionHandles();
		}
	}
}


// preview
function preview(status) {

	hideHandles();

	let all_sections = document.querySelectorAll("section");

	if (status == "on") {
		for (i = 0; i < all_sections.length; i++) {
			all_sections[i].style.outline = "none";
		}
		document.getElementById("wrapper").style.outline = "";
	} else {
		for (i = 0; i < all_sections.length; i++) {
			all_sections[i].style.outline = "1px dashed gray";
		}
		if (selected_section) selected_section.style.outline = "4px dashed yellow";
	}
}

let boxes_panel_toggle = false;
function boxesPanelToggle() {
	if (boxes_panel_toggle) {
		document.getElementById("boxes_panel").style.left = "-320px";
		boxes_panel_toggle = false;
	} else {
		document.getElementById("boxes_panel").style.left = "0";
		boxes_panel_toggle = true;
	}
}


let dash_panel_toggle = true;
function dashPanelToggle() {
	if (dash_panel_toggle) {
		document.getElementById("dash_panel_wrapper").style.right = "-500px";
		document.getElementById("dash_panel_toggle").innerHTML = "◄";
		dash_panel_toggle = false;
		preview("on");
		hidePopupPanel();
		//hideSectionPanels();
	} else {
		document.getElementById("dash_panel_wrapper").style.right = "0";
		document.getElementById("dash_panel_toggle").innerHTML = "►";
		dash_panel_toggle = true;
		preview("off");
	}
}

function hideSectionPanels() {
	let all_sections = document.querySelectorAll("#dash_panel div");
	for (i = 0; i < all_sections.length; i++) {
		all_sections[i].style.opacity = "0";
		all_sections[i].style.maxHeight = "0";
	}
}


function showSectionPanel(panel) {
	hideSectionPanels();
	setTimeout(function () {
		let opacity = document.getElementById(panel).style.opacity;
		document.getElementById(panel).style.opacity = "1";
		document.getElementById(panel).style.maxHeight = "1000px";
	}, 100);
}

function hideSectionPanel(panel) {
	document.getElementById(panel).style.opacity = "0";
	document.getElementById(panel).style.maxHeight = "0";
}


function showPopupPanel(panel_id) {
	hidePopupPanel();
	let popup_panel = document.getElementById("popup_panel");
	popup_panel.style.bottom = "0";
	document.getElementById(panel_id).style.display = "block";
}

function hidePopupPanel() {
	let popup_panel = document.getElementById("popup_panel");
	popup_panel.style.bottom = "-200px";
	let sub_panels = popup_panel.querySelectorAll("div + div");
	for (let i = 0; i < sub_panels.length; i++) {
		sub_panels[i].style.display = "none";
	}
}

function addGraphic(url) {
	document.getElementById("background_image").value = url;
	styleBackgroundImage();
}

function setShape(value) {
	if (!(selected_section)) return;
	selected_section.style.clipPath = value;
	document.getElementById("clip_path").value = value;
}

function setZIndex(element) {
	selected_section.style.zIndex = element.value;
}


function saveDezyn() {
	idbRemoveItem("dezynor_designs", dezyn_id).then(function(result) {
		let selected_folder = document.getElementById("select_folders").value;
		dezyn_id = dezyn_id.split("|")[0] + "|" + selected_folder;
		idbPutItem("dezynor_designs", {design_key:dezyn_id, value:document.getElementById("container").innerHTML});
		showMessage("Saved", "Green");
	});
}

function newDezyn() {
	idbPutItem("dezynor_designs", {design_key:dezyn_id, value:document.getElementById("container").innerHTML});
	window.location.href = "index.html";
}

function duplicateDezyn() {
	let selected_folder = document.getElementById("select_folders").value;
	let new_dezyn_id = generateDeisgnId() + "|" + selected_folder;
	idbPutItem("dezynor_designs", {design_key:new_dezyn_id, value:document.getElementById("container").innerHTML});
	alert("Duplicated successfully!");
}

function deleteDezyn() {
	if (confirm("Do you really want to delete this dezyn?")) {
		idbRemoveItem("dezynor_designs", dezyn_id).then(function(result) {
			showMessage("Deleted successfully", "Red");
			document.getElementById("container").innerHTML = "";
		});
	}
}

function loadCurrentDezyn() {
	
	idbGetItem("dezynor_settings", "current_design").then(function(result) {
		let current_dezyn_key = result;
		if (current_dezyn_key != "") {
			idbGetItem("dezynor_designs", current_dezyn_key).then(function(result) {
				document.getElementById("container").innerHTML = result;
				dezyn_id = current_dezyn_key;
				idbPutItem("dezynor_settings", {setting_key:"current_design", value:""});
				loadWrapperStyles();
				let all_sections = document.querySelectorAll("section");
				if (all_sections.length > 0) {
					let first_section_number = all_sections[0].id.replace("section", "");
					addHandles();
					selectSection(first_section_number);
					let last_section_number = all_sections[all_sections.length -1].id.replace("section", "");
					section_counter = last_section_number;
				}
				//document.getElementsByTagName("title")[0].innerText = dezyn_id.split("|")[0];
				document.getElementById("select_folders").value = dezyn_id.split("|")[1];
			});
		} else {
			
		}
	});
}


function changetab(num) {
	
	let all_tabs = document.querySelectorAll(".tab_panels aside");
	for (let i = 1; i <= all_tabs.length; i++) {
		document.getElementById("tab_btn" + i).style.backgroundColor = "#FFF";
		document.getElementById("tab_panel" + i).style.display = "none";
	}

	document.getElementById("tab_btn" + num).style.backgroundColor = "PowderBlue";
	document.getElementById("tab_panel" + num).style.display = "block";
}

function loadSelectFolders() {
	idbGetItem("dezynor_settings", "folders").then(function(result) {
		let select_folders = document.getElementById("select_folders");
		let folders = result;
		folders.sort();
		for (i = 0; i < folders.length; i++) {
			let option = document.createElement("option");
			option.text = folders[i].trim();
			select_folders.add(option);
		}
	});	
}

function loadSelectFonts() {

	idbGetItem("dezynor_settings", "fonts").then(function(result) {
		let google_fonts = "";
		let installed_fonts = "";
		
		let fonts = result;
		fonts.sort();
		let fonts_list = "";
		for (i = 0; i < fonts.length; i++) {
			let storage_font_name = fonts[i].split("|")[0];
			let storage_font_location = fonts[i].split("|")[1];
			if (storage_font_location == "Google") {
				fonts_list = fonts_list + "@import url('https://fonts.googleapis.com/css?family=" + storage_font_name + "&display=swap');";
				google_fonts = google_fonts + "<option>" + storage_font_name + "</option>";
			} else if (storage_font_location == "Installed") {
				installed_fonts = installed_fonts + "<option>" + storage_font_name + "</option>";
			}
		}

		let style = document.createElement("style");
		let fonts_node = document.createTextNode(fonts_list);
		style.appendChild(fonts_node);
		document.getElementsByTagName("head")[0].appendChild(style);
		
		document.getElementById("google_fonts").innerHTML = google_fonts;
		document.getElementById("installed_fonts").innerHTML = installed_fonts;
	});

}

/* -------------- Boxes Panel Sort ---------------------- */

var _el;

function dragOver(e) {
  if (isBefore(_el, e.target))
	 e.target.parentNode.insertBefore(_el, e.target);
  else
	 e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null);
  _el = e.target;
  _el.style.border = "2px solid orange";
}

function dragEnd(e) {
  _el = e.target;
  _el.style.border = "none";
}

function isBefore(el1, el2) {
  if (el2.parentNode === el1.parentNode)
	 for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
		if (cur === el2)
		  return true;
  return false;
}
			
/* -------------- Shortcuts ---------------------- */

onkeydown = function(e){

	if (
	(e.ctrlKey && e.keyCode == 96)  // numpad 0
	|| (e.ctrlKey && e.keyCode == 107)  // numpad +
	|| (e.ctrlKey && e.keyCode == 109)  // numpad -
	|| (e.keyCode == 112)  // F1
	|| (e.keyCode == 113)  // F2
	|| (e.keyCode == 114)  // F3
	|| (e.keyCode == 115)  // F4
	|| (e.keyCode == 116)  // F5
	|| (e.keyCode == 117)  // F6
	|| (e.keyCode == 118)  // F7
	|| (e.keyCode == 119)  // F8
	|| (e.keyCode == 120)  // F9
	|| (e.keyCode == 121)  // F10
	)
	{e.preventDefault();}

}

document.onkeyup = function(e) {
	let key = e.which || e.keyCode;
	//console.log(key);
	
	// http://gcctech.org/csc/javascript/javascript_keycodes.htm
	
	// ALT +
	if (e.altKey && key == 80) {
		showSectionPanel('wrapper_section'); // Alt + p
	} else if (e.altKey && key == 66) {
		showSectionPanel('box_section'); // Alt + b
	} else if (e.altKey && key == 83) {
		showSectionPanel('size_section'); // Alt + s
	} else if (e.altKey && key == 84) {
		showSectionPanel('font_section'); // Alt + t
	} else if (e.altKey && key == 67) {
		showSectionPanel('color_section'); // Alt + c
	} else if (e.altKey && key == 73) {
		showSectionPanel('art_section'); // Alt + i
	} else if (e.altKey && key == 82) {
		showSectionPanel('border_section'); // Alt + r
	} else if (e.altKey && key == 88) {
		showSectionPanel('text_shadow_section'); // Alt + x
	} else if (e.altKey && key == 87) {
		showSectionPanel('box_shadow_section'); // Alt + w
	} else if (e.altKey && key == 77) {
		showSectionPanel('transform_section'); // Alt + m
	} else if (e.altKey && key == 79) { 
		showSectionPanel('layout_section'); // Alt + o
	} else if (e.altKey && key == 72) { 
		showSectionPanel('shape_section'); // Alt + h
	} else if (e.altKey && key == 85) { 
		showSectionPanel('utility_section'); // Alt + u
	}
	
	// CTRL + 
	if (key == 112) {
		saveDezyn(); // f1
	} else if (e.ctrlKey && e.altKey && key == 65) {
		addSection(); // Ctrl + Shift + a
	} else if (e.ctrlKey && e.altKey && key == 90) {
		duplicateSection(); // Ctrl + Shift + z
	}
	
	// NUM PAD
	if (e.ctrlKey && key == 107) { // +
		let element = document.getElementById("font_size");
		element.value = parseInt(element.value) + 3;
		element.dispatchEvent(new Event("change"));
		element = document.getElementById("line_height");
		element.value = parseInt(element.value) + 4;
		element.dispatchEvent(new Event("change"));
	} else if (e.ctrlKey && key == 109) { // -
		let element = document.getElementById("font_size");
		element.value = parseInt(element.value) - 3;
		element.dispatchEvent(new Event("change"));
		element = document.getElementById("line_height");
		element.value = parseInt(element.value) - 4;
		element.dispatchEvent(new Event("change"));
	} else if (e.ctrlKey && key == 13) { // Enter
		styleAlignHCenter();
	} else if (e.ctrlKey && key == 111) { // /
		let element = document.getElementById("word_spacing");
		element.value = parseInt(element.value) + 3;
		element.dispatchEvent(new Event("change"));
	} else if (e.ctrlKey && key == 106) { // *
		let element = document.getElementById("word_spacing");
		element.value = parseInt(element.value) - 3;
		element.dispatchEvent(new Event("change"));
	} else if (e.ctrlKey && key == 96) { // 0
		let element = document.getElementById("direction");
		if (element.value == "rtl") {
			element.value = "ltr";
		} else {
			element.value = "rtl";
		}
		element.dispatchEvent(new Event("change"));
	} else if (e.ctrlKey && key == 110) { // .
		let element = document.getElementById("text_align");
		if (element.value == "left") {
			element.value = "center";
		} else if (element.value == "center") {
			element.value = "right";
		} else if (element.value == "right") {
			element.value = "justify";
		} else if (element.value == "justify") {
			element.value = "left";
		}
		element.dispatchEvent(new Event("change"));
	}
	
	
};
