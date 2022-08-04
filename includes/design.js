window.onload = function() {
	setRandomWrapperColor();
	loadSelectFolders();
	loadSelectFonts();
	showSectionPanel('box_section');
	loadDezyn();
}

let design_id = generateDeisgnId() + "|default";
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
	section.style.transition = "initial";
	document.getElementById("wrapper").appendChild(section);
	document.getElementById(section_id).style.zIndex = section_counter;
	setSectionDefaultStyles(document.getElementById(section_id));
	addHandles();
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

async function pasteSection() {

	let copied_section_string = await idbGetItem("dezynor_settings", "copied_section");
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

}


function unselectSections() {
	let all_sections = document.querySelectorAll("section");
	for (i = 0; i < all_sections.length; i++) {
		all_sections[i].style.outline = "1px dashed gray";
	}

	hideHandles();
}

function pasteText(e) {
	e.preventDefault();
	var text = (e.originalEvent || e).clipboardData.getData('text/plain');
	document.execCommand("insertHTML", false, text); 
}

function onMouseDown4Move(counter) {

	hideHandles();
	let section = document.getElementById("section" + counter);
	
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
	
	function onMouseMove(event) {
		resize_top_right.style.left = (event.pageX - 25) + "px";
		resize_top_right.style.top = (event.pageY - 25) + "px";

		section.style.width = (event.pageX - 20) - parseInt(section.style.left.replace("px", "")) + "px";

		let y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20);
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
	
	function onMouseMove(event) {
		resize_center_right.style.left = (event.pageX - 25) + "px";
		section.style.width = (event.pageX - 20) - parseInt(section.style.left.replace("px", "")) + "px";
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
	
	function onMouseMove(event) {
		resize_center_left.style.left = (event.pageX - 30) + "px";
		
		let x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20); 
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
	
	function onMouseMove(event) {
		resize_center_top.style.top = (event.pageY - 30) + "px";

		let y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20);
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
	
	function onMouseMove(event) {
		resize_top_left.style.left = (event.pageX - 25) + "px";
		resize_top_left.style.top = (event.pageY - 25) + "px";
		
		let x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20);
		section.style.width = parseInt(section.style.width.replace("px", "")) + x_diff + "px";
		section.style.left = (event.pageX - 20) + "px";
		
		let y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20);
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
	
	function onMouseMove(event) {
		resize_bottom_left.style.left = (event.pageX - 25) + "px";
		resize_bottom_left.style.top = (event.pageY - 25) + "px";
		
		let x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20);
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

function styleLayout(parameters) {
	
	let wrapper_width = parseInt(document.getElementById("wrapper").style.width.replace("px", ""));
	let wrapper_height = parseInt(document.getElementById("wrapper").style.height.replace("px", ""));

	let gutter_x = parseInt(document.getElementById("wrapper").style.width.replace("px", "")) * .04;
	let gutter_y = parseInt(document.getElementById("wrapper").style.height.replace("px", "")) * .04;


	let all_sections = document.querySelectorAll("section");
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

function preview(status) {

	let all_sections = document.querySelectorAll("section");

	if (status == "on") {
		hideHandles();
		for (i = 0; i < all_sections.length; i++) {
			all_sections[i].style.outline = "none";
		}
		document.getElementById("wrapper").style.outline = "";
	} else {
		showHandles();
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


async function saveDezyn() {
	let object = await idbGetItem("dezynor_designs", design_id);
	let created = object.created;
	let modified = new Date().getTime();
	let folder = document.getElementById("select_folders").value;
	let data = document.getElementById("container").innerHTML;
	let updated_object = {
		created:created,
		modified:modified,
		folder:folder,
		data:data,
		keywords:""
	}
	await idbPutItem("dezynor_designs", {design_key:design_id, value:updated_object});
	
	showMessage("Saved", "Green");
}

/*
function newDezyn() {
	let data = document.getElementById("container").innerHTML;
	let object = {
		created:created,
		modified:modified,
		folder:folder,
		data:data,
		keywords:""
	}	
	idbPutItem("dezynor_designs", {design_key:design_id, value:object});
	window.location.href = "index.html";
}
*/

function duplicateDezyn() {
	let folder = document.getElementById("select_folders").value;
	let new_design_id = generateDeisgnId();
	let data = document.getElementById("container").innerHTML;
	let object = {
		created:new Date().getTime(),
		modified:new Date().getTime(),
		folder:folder,
		data:data,
		keywords:""
	}	
	idbPutItem("dezynor_designs", {design_key:new_design_id, value:object});
	alert("Duplicated successfully!");
}

async function deleteDezyn() {
	if (confirm("Do you really want to delete this design?")) {
		await idbRemoveItem("dezynor_designs", design_id);
		showMessage("Deleted successfully", "Red");
		document.getElementById("container").innerHTML = "";
	}
}

async function loadDezyn() {

	let current_design_key = document.location.search.replace(/^.*?\=/, '');
	if (current_design_key != "") {
		await delay(500);
		let object = await idbGetItem("dezynor_designs", current_design_key);
		document.getElementById("container").innerHTML = object.data;
		design_id = current_design_key;
		loadWrapperStyles();
		let all_sections = document.querySelectorAll("section");
		if (all_sections.length > 0) {
			let first_section_number = all_sections[0].id.replace("section", "");
			addHandles();
			selectSection(first_section_number);
			let last_section_number = all_sections[all_sections.length -1].id.replace("section", "");
			section_counter = last_section_number;
		}
		document.getElementById("select_folders").value = object.folder;

	} else {
		styleWrapper();
	}

}


async function loadSelectFolders() {
	let select_folders = document.getElementById("select_folders");
	let folders = await idbGetItem("dezynor_settings", "folders");
	folders.sort();
	for (i = 0; i < folders.length; i++) {
		let option = document.createElement("option");
		option.text = folders[i].trim();
		select_folders.add(option);
	}
}

async function loadSelectFonts() {

	let google_fonts = "";
	let installed_fonts = "";
	
	let fonts = await idbGetItem("dezynor_settings", "fonts");
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

}



/* -------------- FORMATTING ---------------------- */


let colorable_element = "";
let colorable_control = "";
let colorable_style = "";

function styleWrapper() {
	let wrapper = document.getElementById("wrapper");

	wrapper.style.zIndex = "0";
	wrapper.style.top = "0";
	wrapper.style.left = "0";
	wrapper.style.width = document.getElementById("wrapper_width").value + "px";
	wrapper.style.height = document.getElementById("wrapper_height").value + "px";
	//document.getElementsByTagName("body")[0].style.width = parseInt(document.getElementById("wrapper_width").value) + 400 + "px";
	wrapper.style.borderWidth = document.getElementById("wrapper_border_width").value + "px";
	wrapper.style.borderStyle = document.getElementById("wrapper_border_style").value;
	wrapper.style.borderColor = document.getElementById("wrapper_border_color").value;
	wrapper.style.borderTopLeftRadius = document.getElementById("wrapper_border_radius1").value + "px";
	wrapper.style.borderTopRightRadius = document.getElementById("wrapper_border_radius2").value + "px";
	wrapper.style.borderBottomLeftRadius = document.getElementById("wrapper_border_radius3").value + "px";
	wrapper.style.borderBottomRightRadius = document.getElementById("wrapper_border_radius4").value + "px";
	
	wrapper.style.backgroundImage = "";
	wrapper.style.backgroundColor = document.getElementById("wrapper_background_color").value;

	if (wrapper.style.backgroundColor == "rgb(0, 0, 1)") { // fake color for transparent, set by background removal function
		let gradient_type = document.getElementById("wrapper_gradient_type").value;
		let gradient_direction = document.getElementById("wrapper_gradient_direction").value;
		let color1 = document.getElementById("wrapper_gradient_color1").value;
		let color2 = document.getElementById("wrapper_gradient_color2").value;
		let color3 = document.getElementById("wrapper_gradient_color3").value;
		let color4 = document.getElementById("wrapper_gradient_color4").value;
		wrapper.style.backgroundImage = gradient_type + "(" + gradient_direction + ", " + color1 + ", " + color2 + ", " + color3 + ", " + color4 + ")";

		let bg_image1 = document.getElementById("wrapper_bg_image1").value;
		let bg_image2 = document.getElementById("wrapper_bg_image2").value;
		let bg_image1_position = document.getElementById("wrapper_bg1_position").value;
		let bg_image2_position = document.getElementById("wrapper_bg2_position").value;
		if (bg_image1.length > 0 || bg_image2.length > 0) {

			document.getElementById("wrapper_bg1").style.backgroundImage = "url(" + document.getElementById("wrapper_bg_image1").value + ")";
			document.getElementById("wrapper_bg1").className = "";
			document.getElementById("wrapper_bg1").classList.add("wrapper_bg_" + bg_image1_position);
			document.getElementById("wrapper_bg2").style.backgroundImage = "url(" + document.getElementById("wrapper_bg_image2").value + ")";
			document.getElementById("wrapper_bg2").className = "";
			document.getElementById("wrapper_bg2").classList.add("wrapper_bg_" + bg_image2_position);
		} else {
			document.getElementById("wrapper_bg1").style.backgroundImage = "";
			document.getElementById("wrapper_bg2").style.backgroundImage = "";
		}
	}
}

function setRandomWrapperColor() {
	let r = Math.floor((Math.random() * 200));
	let g = Math.floor((Math.random() * 200));
	let b = Math.floor((Math.random() * 200));
	document.getElementById("wrapper").style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
	document.getElementById("wrapper_background_color").value = rgb2hex("rgb(" + r + ", " + g + ", " + b + ")");
}

function styleWrapperSameColor() {
	document.getElementById("wrapper_gradient_color2").value = document.getElementById("wrapper_gradient_color1").value;
	document.getElementById("wrapper_gradient_color3").value = document.getElementById("wrapper_gradient_color1").value;
	document.getElementById("wrapper_gradient_color4").value = document.getElementById("wrapper_gradient_color1").value;
}

function styleRemoveWrapperBackgroundColor() {
	document.getElementById("wrapper_background_color").value = "#000001";
	document.getElementById("wrapper").style.backgroundColor = "rgb(0, 0, 1)";
}

function setWrapperGradientDirection() {
	let gradient_type = document.getElementById("wrapper_gradient_type").value;
	if (gradient_type == "linear-gradient") {
		document.getElementById("wrapper_gradient_direction").value = "to bottom";
	} else {
		document.getElementById("wrapper_gradient_direction").value = "ellipse";
	}
}

function styleRemoveWrapperBackgroundImage1() {
	document.getElementById("wrapper_bg_image1").value = "";
	styleWrapper();
}

function styleRemoveWrapperBackgroundImage2() {
	document.getElementById("wrapper_bg_image2").value = "";
	styleWrapper();
}

function loadWrapperStyles() {
	let wrapper = document.getElementById("wrapper");
	document.getElementById("wrapper_width").value = wrapper.style.width.replace("px", "");
	document.getElementById("wrapper_height").value = wrapper.style.height.replace("px", "");
	document.getElementById("wrapper_border_width").value = wrapper.style.borderWidth.replace("px", "");
	document.getElementById("wrapper_border_style").value = wrapper.style.borderStyle;
	document.getElementById("wrapper_border_color").value = rgb2hex(wrapper.style.borderColor);
	document.getElementById("wrapper_border_radius1").value = wrapper.style.borderTopLeftRadius.replace("px", "");
	document.getElementById("wrapper_border_radius2").value = wrapper.style.borderTopRightRadius.replace("px", "");
	document.getElementById("wrapper_border_radius3").value = wrapper.style.borderBottomLeftRadius.replace("px", "");
	document.getElementById("wrapper_border_radius4").value = wrapper.style.borderBottomRightRadius.replace("px", "");
	document.getElementById("wrapper_background_color").value = rgb2hex(wrapper.style.backgroundColor);

	background_image = wrapper.style.backgroundImage;
	if (background_image.indexOf("gradient") > -1) {
		gradient_type = background_image.indexOf("linear") > -1 ? "linear-gradient" : "radial-gradient";
		document.getElementById("wrapper_gradient_type").value = gradient_type;
		// add missing default value
		background_image = background_image.replace("linear-gradient(", "").replace("radial-gradient(", "").replace("))", ")");
		if (gradient_type == "linear-gradient" && background_image.indexOf("rgb") == 0) {
			background_image = "to bottom, " + background_image;
		} else if (gradient_type == "radial-gradient" && background_image.indexOf("rgb") == 0) {
			background_image = "ellipse, " + background_image;
		}
		background_image = background_image.split(", rgb");
		document.getElementById("wrapper_gradient_direction").value = background_image[0];
		document.getElementById("wrapper_gradient_color1").value = rgb2hex("rgb" + background_image[1]);
		document.getElementById("wrapper_gradient_color2").value = rgb2hex("rgb" + background_image[2]);
		document.getElementById("wrapper_gradient_color3").value = rgb2hex("rgb" + background_image[3]);
		document.getElementById("wrapper_gradient_color4").value = rgb2hex("rgb" + background_image[4]);
	}

	let wrapper_bg1 = document.getElementById("wrapper_bg1");
	let wrapper_bg2 = document.getElementById("wrapper_bg2");
	document.getElementById("wrapper_bg_image1").value = wrapper_bg1.style.backgroundImage.replace("url(\"", "").replace("\")", "");
	document.getElementById("wrapper_bg_image2").value = wrapper_bg2.style.backgroundImage.replace("url(\"", "").replace("\")", "");
	document.getElementById("wrapper_bg1_position").value = wrapper_bg1.className.replace("wrapper_bg_", "");
	document.getElementById("wrapper_bg2_position").value = wrapper_bg2.className.replace("wrapper_bg_", "");
}

function styleTop(element) {
	selected_section.style.top = element.value + "px";
	reAlignSectionHandles();
}
function styleLeft(element) {
	selected_section.style.left = element.value + "px";
	reAlignSectionHandles();
}
function styleWidth(element) {
	selected_section.style.width = element.value + "px";
	reAlignSectionHandles();
}
function styleHeight(element) {
	selected_section.style.height = element.value + "px";
	reAlignSectionHandles();
}
function stylePaddingTop(element) {selected_section.style.paddingTop = element.value + "px";}
function stylePaddingRight(element) {selected_section.style.paddingRight = element.value + "px";}
function stylePaddingBottom(element) {selected_section.style.paddingBottom = element.value + "px";}
function stylePaddingLeft(element) {selected_section.style.paddingLeft = element.value + "px";}
function styleClipPath(element) {selected_section.style.clipPath = element.value;}
function styleOpacity(element) {selected_section.style.opacity = element.value;}
function styleBorderWidth(element) {selected_section.style.borderWidth = element.value + "px";}
function styleBorderStyle(element) {selected_section.style.borderStyle = element.value;}
function styleBorderColor(element) {selected_section.style.borderColor = element.value;}
function styleBorderRadius1(element) {selected_section.style.borderTopLeftRadius = element.value + "px";}
function styleBorderRadius2(element) {selected_section.style.borderTopRightRadius = element.value + "px";}
function styleBorderRadius3(element) {selected_section.style.borderBottomLeftRadius = element.value + "px";}
function styleBorderRadius4(element) {selected_section.style.borderBottomRightRadius = element.value + "px";}
function styleColumnCount(element) {selected_section.style.columnCount = element.value;}
function styleColumnGap(element) {selected_section.style.columnGap = element.value + "px";}
function styleDirection(element) {selected_section.style.direction = element.value;}
function styleFontFamily(element) {selected_section.style.fontFamily = element.value;}
function styleFontSize(element) {selected_section.style.fontSize = element.value + "px";}
function styleColor(element) {selected_section.style.color = element.value;}
function styleRandomTextColor() {
	let r = Math.floor((Math.random() * 200));
	let g = Math.floor((Math.random() * 200));
	let b = Math.floor((Math.random() * 200));
	selected_section.style.color = "rgb(" + r + ", " + g + ", " + b + ")";
	document.getElementById("color").value = rgb2hex("rgb(" + r + ", " + g + ", " + b + ")");
}
function styleWordSpacing(element) {selected_section.style.wordSpacing = element.value + "px";}
function styleLetterSpacing(element) {selected_section.style.letterSpacing = element.value + "px";}
function styleTextIndent(element) {selected_section.style.textIndent = element.value + "px";}
function styleLineHeight(element) {selected_section.style.lineHeight = element.value + "px";}
function styleTextAlign(element) {selected_section.style.textAlign = element.value;}

function setColorableElement(control_id, element_id, color_style) {
	colorable_control = document.getElementById(control_id);
	colorable_element = document.getElementById(element_id);
	colorable_style = color_style;
}

function useColorPallette(color) {
	colorable_control.value = color;
	if (colorable_style == "back") {
		if (colorable_element.id == "wrapper") colorable_element.style.backgroundImage = "";
		colorable_element.style.backgroundColor = color;
	} else if (colorable_style == "border") {
		colorable_element.style.borderColor = color;
	} else if (colorable_style == "color") {
		colorable_element.style.color = color;
	} else if (colorable_style == "textshadow") {
		styleTextShadow();
	} else if (colorable_style == "boxshadow") {
		styleBoxShadow();
	}
}

function styleBackgroundColor(element) {selected_section.style.backgroundColor = element.value;}

function styleRemoveBackgroundColor() {
	document.getElementById("background_color").value = "#000001";
	selected_section.style.backgroundColor = "";
}

function styleRandomBackgroundColor() {
	let r = Math.floor((Math.random() * 200));
	let g = Math.floor((Math.random() * 200));
	let b = Math.floor((Math.random() * 200));
	selected_section.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
	document.getElementById("background_color").value = rgb2hex("rgb(" + r + ", " + g + ", " + b + ")");
}



function styleBackgroundImage() {
	let background_image_url = document.getElementById("background_image").value;
	let background_size = document.getElementById("background_size").value;
	let background_position_x = document.getElementById("background_position_x").value;
	let background_position_y = document.getElementById("background_position_y").value;

	if (background_image_url == "") {
		let gradient_type = document.getElementById("gradient_type").value;
		let gradient_direction = document.getElementById("gradient_direction").value;
		let color1 = document.getElementById("gradient_color1").value;
		if (document.getElementById("gradient_alpha1").checked) color1 = color1 + "00"; // #FFAADD00
		let color2 = document.getElementById("gradient_color2").value;
		if (document.getElementById("gradient_alpha2").checked) color2 = color2 + "00";
		let color3 = document.getElementById("gradient_color3").value;
		if (document.getElementById("gradient_alpha3").checked) color3 = color3 + "00";
		let color4 = document.getElementById("gradient_color4").value;
		if (document.getElementById("gradient_alpha4").checked) color4 = color4 + "00";
		selected_section.style.backgroundImage = gradient_type + "(" + gradient_direction + ", " + color1 + ", " + color2 + ", " + color3 + ", " + color4 + ")";
	} else {
		selected_section.style.backgroundImage = "url(" + background_image_url + ")";
		selected_section.style.backgroundSize = background_size;
		selected_section.style.backgroundPositionX = background_position_x;
		selected_section.style.backgroundPositionY = background_position_y;
		if (document.getElementById("background_image_repeat").checked) {
			selected_section.style.backgroundRepeat = "repeat";
		} else {
			selected_section.style.backgroundRepeat = "no-repeat";
		}
	}
}

function styleBrowseImage(url_element_id, file_element_id) {

	let settings = JSON.parse(localStorage.getItem("dezynor_settings"));
	let upload_url = settings.upload_url;
	let max_upload_width = settings.max_upload_width;
	let max_upload_height = settings.max_upload_height;

	if (!upload_url) {
		alert("Provide the upload URL in the Settings,\nor paste in the URL directly.");
		return;
	}

	let file = document.getElementById(file_element_id).files[0];

	// FILE READER
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload =  function(e) {

		// RESIZE IMAGE
		let image = document.createElement("img");
		image.src = e.target.result; // file reader result
		image.onload = async function(e) {
			let width = image.width;
			let height = image.height;
			let canvas = document.createElement("canvas");
			let context = canvas.getContext("2d");
			context.drawImage(image, 0, 0);
			if (width > height) {
				if (width > max_upload_width) {
					height *= max_upload_width / width;
					width = max_upload_width;
				}
			} else {
				if (height > max_upload_height) {
					width *= max_upload_height / height;
					height = max_upload_height;
				}
			}
			canvas.width = width;
			canvas.height = height;
			context.drawImage(image, 0, 0, width, height);
			let dataurl = canvas.toDataURL(file.type);
			let arr = dataurl.split(',');
			let mime = arr[0].match(/:(.*?);/)[1];
			let bstr = atob(arr[1]);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			let resized_blob = new Blob([u8arr], { type: mime });


			// UPLOAD IMAGE
			let form = new FormData();
			form.append("image", resized_blob);
			try {
				const response = await fetch(upload_url, {
					method: 'POST',
					body: form
				});
				const result = await response.json();
				let url_element = document.getElementById(url_element_id);
				url_element.value = result.data.url;
				url_element.onchange();
				//selected_section.style.backgroundImage = "url(" + result.data.url + ")";
			} catch (e) {
				console.log(e);
			}	
		}
		// image.src = e.target.result;
	}
	// reader.readAsDataURL(file);
}

function styleBackgroundImageSameColor() {
	document.getElementById("gradient_color2").value = document.getElementById("gradient_color1").value;
	document.getElementById("gradient_color3").value = document.getElementById("gradient_color1").value;
	document.getElementById("gradient_color4").value = document.getElementById("gradient_color1").value;
}

function styleRemoveBackgroundImage() {
	document.querySelector("#browse_image").value = "";
	selected_section.style.backgroundImage = "";
}

function setGradientDirection() {
	let gradient_type = document.getElementById("gradient_type").value;
	if (gradient_type == "linear-gradient") {
		document.getElementById("gradient_direction").value = "to bottom";
	} else {
		document.getElementById("gradient_direction").value = "ellipse";
	}
}


function styleClipText() {
	selected_section.setAttribute("class", "clip_text");
}

function styleRemoveClipText() {
	selected_section.removeAttribute("class", "clip_text");
}


function styleTextShadow() {
	let text_shadow_count = document.getElementById("text_shadow_count").value;
	let text_shadow = "";
	for (let i = 1; i <= text_shadow_count; i++) {
		let h = document.getElementById("text_shadow_h").value;
		let y = document.getElementById("text_shadow_y").value;
		let blur = document.getElementById("text_shadow_blur").value;
		let color = document.getElementById("text_shadow_color").value;
		text_shadow += h + "px " + y + "px " + blur + "px " + color;
		if (i != text_shadow_count) text_shadow += ",";
	}
	selected_section.style.textShadow = text_shadow;
}

function styleBoxShadow() {
	let h = document.getElementById("box_shadow_h").value;
	let y = document.getElementById("box_shadow_y").value;
	let blur = document.getElementById("box_shadow_blur").value;
	let spread = document.getElementById("box_shadow_spread").value;
	let color = document.getElementById("box_shadow_color").value;
	let inset = document.getElementById("box_shadow_inset").checked ? "inset " : "";
	
	let background_image = document.getElementById("background_image").value;
	if (background_image.indexOf("http") > -1 || background_image.indexOf(":") > 0 || background_image.indexOf("art/") > -1 && blur > 0) {
		selected_section.style.filter = "drop-shadow(" + h + "px " + y + "px " + blur + "px " + color + ")";
		selected_section.style.boxShadow = "none";
	} else {
		selected_section.style.boxShadow = inset + h + "px " + y + "px " + blur + "px " + spread + "px " + color;
	}
}

function styleTransform() {
	let transform_type = document.getElementById("transform_type").value;
	let transform_degree1 = document.getElementById("transform_degree1").value;
	let transform_degree2 = document.getElementById("transform_degree2").value;
	if (transform_type == "rotate") {
		selected_section.style.transform = "rotate(" + transform_degree1 + "deg)";
		document.getElementById("transform_degree2").style.visibility = "hidden";
	} else if (transform_type == "skew") {
		document.getElementById("transform_degree2").style.visibility = "visible";
		selected_section.style.transform = "skew(" + transform_degree1 + "deg, " + transform_degree2 + "deg)";
	} else if (transform_type == "scale") {
		selected_section.style.transform = "scale(" + transform_degree1 + ", " + transform_degree2 + ")";
	}
}

function styleRemoveBackgroundImage() {
	document.getElementById("background_image").value = "";
	styleBackgroundImage();
}

function styleRemoveBorder() {
	selected_section.style.borderWidth = "0";
	selected_section.style.borderStyle = "solid";
	selected_section.style.borderColor = "rgb(255,255,255)";
	selected_section.style.borderTopLeftRadius = "0px";
	selected_section.style.borderTopRightRadius = "0px";
	selected_section.style.borderBottomLeftRadius = "0px";
	selected_section.style.borderBottomRightRadius = "0px";
	document.getElementById("border_width").value = "0";
	document.getElementById("border_style").value = "solid";
	document.getElementById("border_color").value = "#FFFFFF";
	document.getElementById("border_radius1").value = "0";
	document.getElementById("border_radius2").value = "0";
	document.getElementById("border_radius3").value =  "0";
	document.getElementById("border_radius4").value =  "0";
}

function styleRemoveTransform() {
	document.getElementById("transform_type").value = "skew";
	document.getElementById("transform_degree1").value = "0";
	document.getElementById("transform_degree2").value = "0";
	document.getElementById("transform_degree2").style.visibility = "visible";
	selected_section.style.transform = "skew(0deg, 0deg)";
}

function styleRemoveTextShadow() {
	selected_section.style.textShadow = "0px 0px 0px #000000";
	document.getElementById("text_shadow_count").value = "0";
	document.getElementById("text_shadow_h").value = "0";
	document.getElementById("text_shadow_y").value = "0";
	document.getElementById("text_shadow_blur").value = "0";
	document.getElementById("text_shadow_color").value = "#000000";;
}

function styleRemoveBoxShadow() {
	selected_section.style.filter = "none";
	selected_section.style.boxShadow = "0px 0px 0px 0px #000000";
	document.getElementById("box_shadow_h").value = "0";
	document.getElementById("box_shadow_y").value = "0";
	document.getElementById("box_shadow_blur").value = "0";
	document.getElementById("box_shadow_spread").value = "0";
	document.getElementById("box_shadow_color").value = "#000000";
	document.getElementById("box_shadow_inset").checked = false;
}

function setSectionDefaultStyles(section) {
	section.style.outline = "1px dashed gray";
	section.style.direction = "ltr";
	section.style.fontFamily = "Smooch";
	section.style.fontSize = "25px";
	section.style.color = "rgb(0,0,0)";
	section.style.backgroundColor = "";
	section.style.wordSpacing = "0px";
	section.style.letterSpacing = "0px";
	section.style.textIndent = "0px";
	section.style.lineHeight = "35px";
	section.style.textAlign = "center";
	section.style.textShadow = "0px 0px 0px #000000";
	section.style.width = (parseInt(document.getElementById("wrapper").style.width) * 0.7) + "px";
	section.style.height = (parseInt(document.getElementById("wrapper").style.height) * 0.5) + "px";
	section.style.padding = "0";
	section.style.backgroundImage = "linear-gradient(to top, #FFFFFF00, #FFFFFF00, #FFFFFF00, #FFFFFF00)"; // 00 at the end for alpha
	section.style.backgroundPositionX = "center";
	section.style.backgroundPositionY = "center";
	section.style.opacity = "1";
	section.style.backgroundSize = "100% 100%";
	section.style.backgroundRepeat = "no-repeat";
	section.style.borderWidth = "0";
	section.style.borderStyle = "solid";
	section.style.borderColor = "rgb(255,255,255)";
	section.style.borderTopLeftRadius = "0px";
	section.style.borderTopRightRadius = "0px";
	section.style.borderBottomLeftRadius = "0px";
	section.style.borderBottomRightRadius = "0px";
	section.style.boxShadow = "0px 0px 0px 0px #000000";
	section.style.filter = "none";
	section.style.columnCount = "1";
	section.style.columnGap = "10px";
	section.style.columnFill = "auto";
	section.style.transform = "skew(0deg, 0deg)";
	section.style.transformOrigin = "0 0";
	section.style.clipPath = "";
}

function loadSectionStyles() {
	document.getElementById("top").value = selected_section.style.top.replace("px", "");
	document.getElementById("left").value = selected_section.style.left.replace("px", "");
	document.getElementById("direction").value = selected_section.style.direction;
	document.getElementById("font_family").value = selected_section.style.fontFamily.toString().replace('"', "").replace('"', "");
	document.getElementById("font_size").value = selected_section.style.fontSize.replace("px", "");
	document.getElementById("color").value = rgb2hex(selected_section.style.color);
	if (selected_section.style.backgroundColor == "") {
		document.getElementById("background_color").value = "#000001";
	} else {
		document.getElementById("background_color").value = rgb2hex(selected_section.style.backgroundColor);
	}
	document.getElementById("word_spacing").value = selected_section.style.wordSpacing.replace("px", "");
	document.getElementById("letter_spacing").value = selected_section.style.letterSpacing.replace("px", "");
	document.getElementById("text_indent").value = selected_section.style.textIndent.replace("px", "");
	document.getElementById("line_height").value = selected_section.style.lineHeight.replace("px", "");
	document.getElementById("text_align").value = selected_section.style.textAlign;
	let text_shadow = selected_section.style.textShadow;
	if (text_shadow == "") {
		document.getElementById("text_shadow_h").value = "0";
		document.getElementById("text_shadow_y").value = "0";
		document.getElementById("text_shadow_blur").value = "0";
		document.getElementById("text_shadow_count").value = "0";
	} else {
		let text_shadow_count = text_shadow.split("rgb").length - 1;
		text_shadow = text_shadow.split(" ");
		document.getElementById("text_shadow_color").value = rgb2hex((text_shadow[0] + text_shadow[1] + text_shadow[2]));
		document.getElementById("text_shadow_h").value = text_shadow[3].replace("px", "");
		document.getElementById("text_shadow_y").value = text_shadow[4].replace("px", "");
		document.getElementById("text_shadow_blur").value = text_shadow[5].replace("px", "").replace(",", "");
		if (text_shadow[5].replace("px", "").replace(",", "") == "0") {
			document.getElementById("text_shadow_count").value = "0";
			selected_section.style.textShadow = "";		
		} else {
			document.getElementById("text_shadow_count").value = text_shadow_count;
		}
	}

	document.getElementById("z_index").value = selected_section.style.zIndex;
	document.getElementById("width").value = selected_section.style.width.replace("px", "");
	document.getElementById("height").value = selected_section.style.height.replace("px", "");
	document.getElementById("padding_top").value = selected_section.style.paddingTop.replace("px", "");
	document.getElementById("padding_right").value = selected_section.style.paddingRight.replace("px", "");
	document.getElementById("padding_bottom").value = selected_section.style.paddingBottom.replace("px", "");
	document.getElementById("padding_left").value = selected_section.style.paddingLeft.replace("px", "");
	
	// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients
	document.getElementById("background_image").value = "";
	let background_image = selected_section.style.backgroundImage;

	if (background_image.indexOf("gradient") > -1) {
		gradient_type = background_image.indexOf("linear") > -1 ? "linear-gradient" : "radial-gradient";
		document.getElementById("gradient_type").value = gradient_type;
		background_image = background_image.replace("linear-gradient(", "").replace("radial-gradient(", "").replace("))", ")");
		// add missing default values
		if (gradient_type == "linear-gradient" && background_image.indexOf("rgb") == 0) {
			background_image = "to bottom, " + background_image;
		} else if (gradient_type == "radial-gradient" && background_image.indexOf("rgb") == 0) {
			background_image = "ellipse, " + background_image;
		}
		
		background_image = background_image.split(", rgb");
		let gradient_direction = background_image[0];
		let color1 = "rgb" + background_image[1];
		let color2 = "rgb" + background_image[2];
		let color3 = "rgb" + background_image[3];
		let color4 = "rgb" + background_image[4];

		let hex1 = (color1.indexOf("rgba(") > -1) ? rgba2hex(color1) : rgb2hex(color1);
		let hex2 = (color2.indexOf("rgba(") > -1) ? rgba2hex(color2) : rgb2hex(color2);
		let hex3 = (color3.indexOf("rgba(") > -1) ? rgba2hex(color3) : rgb2hex(color3);
		let hex4 = (color4.indexOf("rgba(") > -1) ? rgba2hex(color4) : rgb2hex(color4);

		document.getElementById("gradient_direction").value = gradient_direction;

		document.getElementById("gradient_color1").value = hex1.substring(0, 7);
		document.getElementById("gradient_color2").value = hex2.substring(0, 7);
		document.getElementById("gradient_color3").value = hex3.substring(0, 7);
		document.getElementById("gradient_color4").value = hex4.substring(0, 7);

		document.getElementById("gradient_alpha1").checked = (hex1.length == 9) ? true : false;
		document.getElementById("gradient_alpha2").checked = (hex2.length == 9) ? true : false;
		document.getElementById("gradient_alpha3").checked = (hex3.length == 9) ? true : false;
		document.getElementById("gradient_alpha4").checked = (hex4.length == 9) ? true : false;

	//} else if (background_image.indexOf("http") > -1 || background_image.indexOf("art/") > -1  || background_image.indexOf("data:image") > -1) {
	} else {
		document.getElementById("background_image").value = selected_section.style.backgroundImage.replace("url(\"", "").replace("\")", "");
		document.getElementById("background_size").value = selected_section.style.backgroundSize;
		
	}

	document.getElementById("background_position_x").value = selected_section.style.backgroundPositionX;
	document.getElementById("background_position_y").value = selected_section.style.backgroundPositionY;
	document.getElementById("background_image_repeat").checked = (selected_section.style.backgroundRepeat == "repeat") ? true : false;

	document.getElementById("opacity").value = selected_section.style.opacity;
	document.getElementById("border_width").value = selected_section.style.borderWidth.replace("px", "");
	document.getElementById("border_style").value = selected_section.style.borderStyle;
	document.getElementById("border_color").value = rgb2hex(selected_section.style.borderColor);
	document.getElementById("border_radius1").value = selected_section.style.borderTopLeftRadius.replace("px", "");
	document.getElementById("border_radius2").value = selected_section.style.borderTopRightRadius.replace("px", "");
	document.getElementById("border_radius3").value = selected_section.style.borderBottomLeftRadius.replace("px", "");
	document.getElementById("border_radius4").value = selected_section.style.borderBottomRightRadius.replace("px", "");
	let filter_drop_shadow = selected_section.style.filter;
	let box_shadow = selected_section.style.boxShadow;
	if (filter_drop_shadow.length > 5) { // none
		filter_drop_shadow = filter_drop_shadow.split(" ");
		document.getElementById("box_shadow_color").value = rgb2hex((filter_drop_shadow[0].replace("drop-shadow(", "") + filter_drop_shadow[1] + filter_drop_shadow[2]));
		document.getElementById("box_shadow_h").value = filter_drop_shadow[3].replace("px", "");
		document.getElementById("box_shadow_y").value = filter_drop_shadow[4].replace("px", "");
		document.getElementById("box_shadow_blur").value = filter_drop_shadow[5].replace("px)", "");
		document.getElementById("box_shadow_spread").value = "0";
	} 	else if (box_shadow != "none") {
		box_shadow = box_shadow.split(" ");
		document.getElementById("box_shadow_color").value = rgb2hex((box_shadow[0] + box_shadow[1] + box_shadow[2]));
		document.getElementById("box_shadow_h").value = box_shadow[3].replace("px", "");
		document.getElementById("box_shadow_y").value = box_shadow[4].replace("px", "");
		document.getElementById("box_shadow_blur").value = box_shadow[5].replace("px", "");
		document.getElementById("box_shadow_spread").value = box_shadow[6].replace("px", "");
		document.getElementById("box_shadow_inset").checked = box_shadow.indexOf("inset") > -1 ? true : false;
	}
	
	document.getElementById("column_count").value = selected_section.style.columnCount;
	document.getElementById("column_gap").value = selected_section.style.columnGap.replace("px", "");
	let transform = selected_section.style.transform;
	document.getElementById("transform_degree1").value = "0";
	document.getElementById("transform_degree2").value = "0";
	document.getElementById("transform_type").value = transform.substr(0, transform.indexOf("("));
	if (transform.indexOf("rotate") > -1) {
		let transform_degree = transform.split(", ");
		document.getElementById("transform_degree1").value = transform_degree[0].replace("rotate(", "").replace("deg)", "");
		document.getElementById("transform_degree2").style.visibility = "hidden";
	} else if (transform.indexOf("skew") > -1) {
		let transform_degree = transform.split(", ");
		if (transform_degree[0]) document.getElementById("transform_degree1").value = transform_degree[0].replace("skew(", "").replace("deg", "").replace(")", "");
		if (transform_degree[1]) document.getElementById("transform_degree2").value = transform_degree[1].replace("deg)", "");
		document.getElementById("transform_degree2").style.visibility = "visible";
	}

	document.getElementById("clip_path").value = selected_section.style.clipPath;
}




function rgb2hex(rgb) {
	if (rgb.search("rgb") == -1) {
		return rgb;
	} else {
		rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
	}
}


function rgba2hex(orig) {
      let a, isPercent,
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = (rgb && rgb[4] || "").trim(),
        hex = rgb ? 
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
          if (alpha !== "") {
            a = alpha;
          } else {
            a = 01;
          }

          a = Math.round(a * 100) / 100;
            alpha = Math.round(a * 255);
            let hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
            hex = hex + hexAlpha;

      return "#" + hex;
}



/* -------------- BOXES PANEL SORT ---------------------- */

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
			
/* -------------- SHORTCUTS ---------------------- */

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

	let keyCode = {
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAUSE: 19,
      CAPS_LOCK: 20,
      ESCAPE: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      INSERT: 45,
      DELETE: 46,
      KEY_0: 48,
      KEY_1: 49,
      KEY_2: 50,
      KEY_3: 51,
      KEY_4: 52,
      KEY_5: 53,
      KEY_6: 54,
      KEY_7: 55,
      KEY_8: 56,
      KEY_9: 57,
      KEY_A: 65,
      KEY_B: 66,
      KEY_C: 67,
      KEY_D: 68,
      KEY_E: 69,
      KEY_F: 70,
      KEY_G: 71,
      KEY_H: 72,
      KEY_I: 73,
      KEY_J: 74,
      KEY_K: 75,
      KEY_L: 76,
      KEY_M: 77,
      KEY_N: 78,
      KEY_O: 79,
      KEY_P: 80,
      KEY_Q: 81,
      KEY_R: 82,
      KEY_S: 83,
      KEY_T: 84,
      KEY_U: 85,
      KEY_V: 86,
      KEY_W: 87,
      KEY_X: 88,
      KEY_Y: 89,
      KEY_Z: 90,
      LEFT_META: 91,
      RIGHT_META: 92,
      SELECT: 93,
      NUMPAD_0: 96,
      NUMPAD_1: 97,
      NUMPAD_2: 98,
      NUMPAD_3: 99,
      NUMPAD_4: 100,
      NUMPAD_5: 101,
      NUMPAD_6: 102,
      NUMPAD_7: 103,
      NUMPAD_8: 104,
      NUMPAD_9: 105,
      MULTIPLY: 106,
      ADD: 107,
      SUBTRACT: 109,
      DECIMAL: 110,
      DIVIDE: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      NUM_LOCK: 144,
      SCROLL_LOCK: 145,
      SEMICOLON: 186,
      EQUALS: 187,
      COMMA: 188,
      DASH: 189,
      PERIOD: 190,
      FORWARD_SLASH: 191,
      GRAVE_ACCENT: 192,
      OPEN_BRACKET: 219,
      BACK_SLASH: 220,
      CLOSE_BRACKET: 221,
      SINGLE_QUOTE: 222
    };
	
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
