window.onload = function() {
	loadSelectValues();
	loadDezyn();
	styleRandomWrapperBackgroundColor();
	showSectionPanel('box_section');

	if (localStorage.getItem("automatically_save") == "true") {
		setInterval(function () {
			saveDezyn("no");
			console.log("saving");
		}, parseInt(localStorage.getItem("automatically_save_after")) * 1000);
	}
	
}

let design_id = generateDeisgnId();
let design_object;
let formatted_elements = ["","Heading 1","Heading 2","Heading 3","Heading 4","Heading 5","Paragraph 1","Paragraph 2","Paragraph 3","Paragraph 4","Paragraph 5", "Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];
let selected_section;
let last_selected_section;
let move;
let resize_bottom_right;
let resize_top_right;
let resize_top_left;
let resize_bottom_left;
let resize_center_right;
let resize_center_left;
let resize_center_top;
let resize_center_bottom;
let revert_states = [];


function saveCurrentState() {
	revert_states.push(document.getElementById("container").innerHTML);
}

function revertToLastState() {
	if (revert_states.length > 0) {
		document.getElementById("container").innerHTML = revert_states.pop();
		let all_sections = document.querySelectorAll("section");
		if (all_sections.length > 0) {
			let first_section_number = all_sections[0].id.replace("section", "");
			selectSection(first_section_number);
		}
	}
}


function generateDeisgnId() {
	return "dezyn-" + new Date().getTime();
}

async function addHandles() {

	if (document.getElementById("move") == null) {
		let move_span = document.createElement("span");
		move_span.setAttribute("id", "move");
		move_span.setAttribute("class", "move");
		document.getElementById("wrapper").appendChild(move_span);
		document.getElementById("move").innerHTML = " ";
	}

	if (document.getElementById("resize_bottom_right") == null) {
		let resize_bottom_right_span = document.createElement("span");
		resize_bottom_right_span.setAttribute("id", "resize_bottom_right");
		resize_bottom_right_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_bottom_right_span);
		document.getElementById("resize_bottom_right").innerHTML = " ";
	}

	if (document.getElementById("resize_top_right") == null) {
		let resize_top_right_span = document.createElement("span");
		resize_top_right_span.setAttribute("id", "resize_top_right");
		resize_top_right_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_top_right_span);
		document.getElementById("resize_top_right").innerHTML = " ";
	}

	if (document.getElementById("resize_top_left") == null) {
		let resize_top_left_span = document.createElement("span");
		resize_top_left_span.setAttribute("id", "resize_top_left");
		resize_top_left_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_top_left_span);
		document.getElementById("resize_top_left").innerHTML = " ";
	}

	if (document.getElementById("resize_bottom_left") == null) {
		let resize_bottom_left_span = document.createElement("span");
		resize_bottom_left_span.setAttribute("id", "resize_bottom_left");
		resize_bottom_left_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_bottom_left_span);
		document.getElementById("resize_bottom_left").innerHTML = " ";
	}

	if (document.getElementById("resize_center_right") == null) {
		let resize_center_right_span = document.createElement("span");
		resize_center_right_span.setAttribute("id", "resize_center_right");
		resize_center_right_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_center_right_span);
		document.getElementById("resize_center_right").innerHTML = " ";
	}

	if (document.getElementById("resize_center_left") == null) {
		let resize_center_left_span = document.createElement("span");
		resize_center_left_span.setAttribute("id", "resize_center_left");
		resize_center_left_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_center_left_span);
		document.getElementById("resize_center_left").innerHTML = " ";
	}

	if (document.getElementById("resize_center_top") == null) {
		let resize_center_top_span = document.createElement("span");
		resize_center_top_span.setAttribute("id", "resize_center_top");
		resize_center_top_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_center_top_span);
		document.getElementById("resize_center_top").innerHTML = " ";
	}

	if (document.getElementById("resize_center_bottom") == null) {
		let resize_center_bottom_span = document.createElement("span");
		resize_center_bottom_span.setAttribute("id", "resize_center_bottom");
		resize_center_bottom_span.setAttribute("class", "resize");
		document.getElementById("wrapper").appendChild(resize_center_bottom_span);
		document.getElementById("resize_center_bottom").innerHTML = " ";
	}

	assignHandles();

}

function assignHandles() {
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

	assignHandles();
		
	move.style.visibility = "hidden";
	resize_bottom_right.style.visibility = "hidden";
	resize_top_right.style.visibility = "hidden";
	resize_bottom_left.style.visibility = "hidden";
	resize_top_left.style.visibility = "hidden";
	resize_center_right.style.visibility = "hidden";
	resize_center_left.style.visibility = "hidden";
	resize_center_top.style.visibility = "hidden";
	resize_center_bottom.style.visibility = "hidden";
}

function showHandles() {
	
	/*
	let transform1 = parseInt(document.getElementById("transform_degree1").value);
	let transform2 = parseInt(document.getElementById("transform_degree2").value);
	if (transform1 > 0 || transform2 > 0) {
		selected_section.style.resize = "both";
		selected_section.style.overflow = "auto";
		hideHandles();
		move.style.visibility = "visible";
		return;
	} else {
		selected_section.style.resize = "none";
		selected_section.style.overflow = "visible";
	}
	*/
	
		
	
	assignHandles();
		
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
	section_number = getNewSectionNumber();
	let section_id = "section" + section_number;
	let section = document.createElement("section");
	let section_text = document.createTextNode(" ");
	section.appendChild(section_text);
	section.setAttribute("id", section_id);
	section.setAttribute("onclick", "selectSection('" + section_number + "');");
	section.setAttribute("onpaste", "pasteText(event);");
	section.setAttribute("contenteditable", "true");
	document.getElementById("wrapper").appendChild(section);
	document.getElementById(section_id).style.zIndex = section_number;
	setSectionDefaultStyles(document.getElementById(section_id));
	selectSection(section_number);
	document.getElementById(section_id).focus();
	alignSection('centerCenter');

}

function getNewSectionNumber() {
	let new_section_number = 1;
	if (document.getElementById("wrapper").dataset.last_section) { // new way
		new_section_number = parseInt(document.getElementById("wrapper").dataset.last_section);
		new_section_number++;
	} else { // old way
		let section_ids = [];
		let all_sections = document.querySelectorAll("section");
		for (let i = 0; i < all_sections.length; i++) {
			section_ids.push(all_sections[i].id);
		}

		if (section_ids.length > 0) {
			section_ids.reverse();
			new_section_number = section_ids[0].replace("section", "");
			new_section_number++;
		}
	}
	document.getElementById("wrapper").dataset.last_section = new_section_number;
	return new_section_number;
}


function selectSection(counter) {

	last_selected_section = selected_section;

	let new_selected_id = "section" + counter;
	let section_count = document.querySelectorAll("section").length;
	if (selected_section && selected_section.id == new_selected_id && section_count > 1) {
		// console.log("selecting same session " + new_selected_id);
		return;
	}
	
	unselectSections();
	selected_section = document.getElementById(new_selected_id);
	
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
	document.getElementById("select_formatted_elements").value = "";
}

function duplicateSection() {
	
	if (!(selected_section)) return;
	
	let original_section = selected_section;
	
	// duplicate section
	section_number = getNewSectionNumber();
	let duplicated_section_id = "section" + section_number;
	let duplicated_section = selected_section.cloneNode(true);
	duplicated_section.setAttribute("id", duplicated_section_id);
	duplicated_section.setAttribute("onclick", "selectSection('" + section_number + "');");
	document.getElementById("wrapper").appendChild(duplicated_section);
	selectSection(section_number);
	selected_section.style.left = parseInt(selected_section.style.left.replace("px", "")) + parseInt(localStorage.getItem("duplicate_offset_x")) + "px";
	selected_section.style.top = parseInt(selected_section.style.top.replace("px", "")) + parseInt(localStorage.getItem("duplicate_offset_y")) + "px";
	
	moveDuplicatedContainedSections(original_section);

	reAlignSectionHandles();

}



function moveDuplicatedContainedSections(original_section) {

	if (original_section.dataset.contained_sections) {
		
		// move duplicated section out of original section to avoid contained sections confusion
		selected_section.style.top = parseInt(original_section.style.top.replace("px", "")) + parseInt(original_section.style.height.replace("px", "")) + "px";
		selected_section.style.left = parseInt(original_section.style.left.replace("px", "")) + "px";
		
		let contained_sections = original_section.dataset.contained_sections.trim().split(" ");
		let top = parseInt(original_section.style.top.replace("px", ""));
		let left = parseInt(original_section.style.left.replace("px", ""));
		let sections_list = ""
		for (i = 0; i < contained_sections.length; i++) {
			let original_contained_section = document.getElementById(contained_sections[i]);
			let this_section = original_contained_section.cloneNode(true);
			let this_section_number = getNewSectionNumber();
			let this_section_id = "section" + this_section_number;
			this_section.setAttribute("id", this_section_id);
			this_section.setAttribute("onclick", "selectSection('" + this_section_number + "');");
			document.getElementById("wrapper").appendChild(this_section);
			let left_diff = parseInt(this_section.style.left.replace("px", "")) - left;
			let top_diff = parseInt(this_section.style.top.replace("px", "")) - top;
			let new_left = parseInt(selected_section.style.left.replace("px", ""));
			let new_top = parseInt(selected_section.style.top.replace("px", ""));
			this_section.style.left = new_left + left_diff + "px";
			this_section.style.top = new_top + top_diff + "px";
			sections_list = sections_list + this_section_id + " ";
		}
		selected_section.dataset.contained_sections = sections_list; // duplicated is now selected

		updateContainerSections();
	}
}

function updateContainerSections() {
	let section_ids = [];
	let all_sections = document.querySelectorAll("section");
	for (i = 0; i < all_sections.length; i++) {
		section_ids.push(all_sections[i].id);
	}
	
	for (k = 0; k < section_ids.length; k++) {
		let section = document.getElementById(section_ids[k]);
		if (section.dataset.contained_sections) {
			setContainerSection(section);
		}
	}
}


function removeSection() {
	if (!(selected_section)) return;
	if (confirm("Do you really want to delete this box?")) {
		selected_section.remove();
		hideHandles();
		selected_section = null;
	}
}

function copySection() {
	localStorage.setItem("copied_section", selected_section.outerHTML);
}

async function pasteSection() {

	let copied_section_string = localStorage.getItem("copied_section");
	let html = new DOMParser().parseFromString(copied_section_string, "text/html");
	let sections = html.body.querySelectorAll("section");
	let copied_section = sections[0];

	section_number = getNewSectionNumber();

	let section_id = "section" + section_number;
	
	let section = copied_section;
	section.setAttribute("id", section_id);
	section.setAttribute("onclick", "selectSection('" + section_number + "');");
	section.setAttribute("onpaste", "pasteText(event);");
	document.getElementById("wrapper").appendChild(section);
	document.getElementById(section_id).style.zIndex = section_number;

	selectSection(section_number);
	reAlignSectionHandles();

}


function unselectSections() {
	let all_sections = document.querySelectorAll("section");
	for (i = 0; i < all_sections.length; i++) {
		all_sections[i].style.outline = "1px dashed gray";
	}

	hideHandles();
}

function toggleContainerSection() {
	if (!selected_section) return;
	
	if (document.getElementById("container_section").checked) {
		setContainerSection(selected_section);
	} else {
		delete selected_section.dataset.contained_sections;
	}
}

function setContainerSection(section) {
	
	let dimensions = getSectionDimensions(section);
	let top = dimensions.top
	let bottom = dimensions.bottom
	let left = dimensions.left
	let right = dimensions.right
	
	let sections_list = "";
	let all_sections = document.querySelectorAll("section");
	for (i = 0; i < all_sections.length; i++) {
		let this_section = all_sections[i];
		if (this_section !== section) {
			let section_width = parseInt(this_section.style.width.replace("px", ""));
			let section_height = parseInt(this_section.style.height.replace("px", ""));
			let section_top = parseInt(this_section.style.top.replace("px", ""));
			let section_left = parseInt(this_section.style.left.replace("px", ""));
			let section_bottom = parseInt(this_section.style.top.replace("px", "")) + section_height;
			let section_right = parseInt(this_section.style.left.replace("px", "")) + section_width;
			if ((section_top > top && section_bottom < bottom)    &&   (section_left > left && section_right < right)) {
				sections_list = sections_list + this_section.id + " ";
			}
		}
	}	
	section.dataset.contained_sections = sections_list;

}

function getSectionDimensions(section) {
	let width = parseInt(section.style.width.replace("px", ""));
	let height = parseInt(section.style.height.replace("px", ""));
	let top = parseInt(section.style.top.replace("px", ""));
	let bottom = parseInt(section.style.top.replace("px", "")) + parseInt(section.style.height.replace("px", ""));
	let left = parseInt(section.style.left.replace("px", ""));
	let right = parseInt(section.style.left.replace("px", "")) + parseInt(section.style.width.replace("px", ""));
	return {
		top:top,
		bottom:bottom,
		left:left,
		right:right,
		width:width,
		height:height
	};
}

function pasteText(e) {
	// if (e.clipboardData.files.length > 0) return; // image
	e.preventDefault();
	let data = (e.clipboardData || window.clipboardData).getData('text/html');
	let selection = window.getSelection();
	if (!selection.rangeCount) {
		return;
	}

	let paste_result = localStorage.getItem("paste_result");
	if (paste_result == "plain") {
		data = data.replace(/(<([^>]+)>)/gi, "");
		selection.getRangeAt(0).insertNode(document.createTextNode(data));
		return;
	} else if (paste_result == "plain_with_lines") {
		data = data.replaceAll("\n","");
		data = data.replaceAll("</p>","\n");	
		data = data.replaceAll("</div>","\n");	
		data = data.replaceAll("</td>","\n");	
		data = data.replaceAll("<br>","\n");	
		data = data.replace(/(<([^>]+)>)/gi, "");
		data = data.replaceAll("\n", "</div><div>");
		data = "<div>" + data + "</div>";
	} else if (paste_result == "html_without_styles") {
		data = data.replace(/<\s*(\w+).*?>/ig, '<$1>');
	}
	let data_element = document.createElement("div");
	data_element.innerHTML = data;
	selection.deleteFromDocument();
	selection.getRangeAt(0).insertNode(data_element);
}

function onMouseDown4Move(counter) {

	hideHandles();
	let section = document.getElementById("section" + counter);
	
	let top, bottom, left, right;
	
	function onMouseMove(event) {
		top = parseInt(section.style.top.replace("px", ""));
		bottom = parseInt(section.style.top.replace("px", "")) + parseInt(section.style.height.replace("px", ""));
		left = parseInt(section.style.left.replace("px", ""));
		right = parseInt(section.style.left.replace("px", "")) + parseInt(section.style.width.replace("px", ""));

		move.style.left = (event.pageX - 25) + "px";
		move.style.top = (event.pageY - 25) + "px";
		section.style.left = (event.pageX - section.style.width.replace("px", "") / 2) - 25 + "px";
		section.style.top = (event.pageY - section.style.height.replace("px", "") / 2) - 25 + "px";

		if (section.dataset.contained_sections) {
			moveContainedSections(top, left);
		}		
	}
	function onMouseUp() {
		reAlignSectionHandles();
		loadSectionDimensions();
		showHandles();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);

	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}

function moveContainedSections(top, left) {
	if (!selected_section.dataset.contained_sections) return;
	let contained_sections = selected_section.dataset.contained_sections.trim().split(" ");
	for (i = 0; i < contained_sections.length; i++) {
		let this_section = document.getElementById(contained_sections[i]);
		if (!this_section || this_section === selected_section) continue;
		let left_diff = parseInt(this_section.style.left.replace("px", "")) - left;
		let top_diff = parseInt(this_section.style.top.replace("px", "")) - top;
		let new_left = parseInt(selected_section.style.left.replace("px", ""));
		let new_top = parseInt(selected_section.style.top.replace("px", ""));
		this_section.style.left = new_left + left_diff + "px";
		this_section.style.top = new_top + top_diff + "px";
	}
}


function onMouseDown4ResizeTopRight(counter) {
	
	hideHandles();
	let section = document.getElementById("section" + counter);
	let y_diff = 0;
	
	function onMouseMove(event) {
		resize_top_right.style.left = (event.pageX - 25) + "px";
		resize_top_right.style.top = (event.pageY - 25) + "px";

		section.style.width = (event.pageX - 20) - parseInt(section.style.left.replace("px", "")) + "px";

		y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20);
		resize_top_right.style.top = (event.pageY - 25) + "px";
		section.style.top = (event.pageY - 20) + "px";
		section.style.height =  parseInt(section.style.height.replace("px", "")) + y_diff + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		loadSectionDimensions();
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
		loadSectionDimensions();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}



function onMouseDown4ResizeCenterLeft(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	let x_diff = 0;
	
	function onMouseMove(event) {
		resize_center_left.style.left = (event.pageX - 30) + "px";
		
		x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20); 
		section.style.left = (event.pageX - 20) + "px";
		section.style.width =  parseInt(section.style.width.replace("px", "")) + x_diff + "px";
	}
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		loadSectionDimensions();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}


function onMouseDown4ResizeCenterTop(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	let y_diff = 0;
	
	function onMouseMove(event) {
		resize_center_top.style.top = (event.pageY - 30) + "px";

		y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20);
		section.style.height = parseInt(section.style.height.replace("px", "")) + y_diff + "px";
		section.style.top = (event.pageY - 20) + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		loadSectionDimensions();
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
		loadSectionDimensions();
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
		loadSectionDimensions();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}



function onMouseDown4ResizeTopLeft(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	let x_diff = 0;
	
	function onMouseMove(event) {
		resize_top_left.style.left = (event.pageX - 25) + "px";
		resize_top_left.style.top = (event.pageY - 25) + "px";
		
		x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20);
		section.style.width = parseInt(section.style.width.replace("px", "")) + x_diff + "px";
		section.style.left = (event.pageX - 20) + "px";
		
		let y_diff = parseInt(section.style.top.replace("px", "")) - (event.pageY - 20);
		section.style.height = parseInt(section.style.height.replace("px", "")) + y_diff + "px";
		section.style.top = (event.pageY - 20) + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		loadSectionDimensions();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}


function onMouseDown4ResizeBottomLeft(counter) {
	hideHandles();
	let section = document.getElementById("section" + counter);
	let x_diff = 0;
	
	function onMouseMove(event) {
		resize_bottom_left.style.left = (event.pageX - 25) + "px";
		resize_bottom_left.style.top = (event.pageY - 25) + "px";
		
		x_diff = parseInt(section.style.left.replace("px", "")) - (event.pageX - 20);
		section.style.width =  parseInt(section.style.width.replace("px", "")) + x_diff + "px";
		section.style.left = (event.pageX - 20) + "px";

		section.style.height = (event.pageY - 20) - parseInt(section.style.top.replace("px", "")) + "px";
	}
	
	function onMouseUp() {
		reAlignSectionHandles();
		showHandles();
		loadSectionDimensions();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}


function reAlignSectionHandles() {

	let section_top = parseInt(selected_section.style.top.replace("px", ""));
	let section_left = parseInt(selected_section.style.left.replace("px", ""));
	let section_height = parseInt(selected_section.style.height.replace("px", ""));
	let section_width = parseInt(selected_section.style.width.replace("px", ""));

	move.style.top = section_top + (section_height / 2) - 5 + "px";
	move.style.left = section_left + (section_width / 2) - 5 + "px";

	resize_bottom_right.style.top = section_top + section_height - 5 + "px";
	resize_bottom_right.style.left = section_left + section_width - 5 + "px";

	resize_top_right.style.top = section_top - 5 + "px";
	resize_top_right.style.left = section_left + section_width - 5 + "px";
	
	resize_bottom_left.style.top = section_top + section_height - 5 + "px";
	resize_bottom_left.style.left = section_left - 5 + "px";

	resize_top_left.style.top = section_top - 5 + "px";
	resize_top_left.style.left = section_left - 5 + "px";

	resize_center_right.style.top =  section_top + (section_height / 2) - 5 + "px";
	resize_center_right.style.left = section_left + section_width - 5 + "px";

	resize_center_left.style.top =  section_top + (section_height / 2) - 5 + "px";
	resize_center_left.style.left = section_left - 10 + "px";
	
	resize_center_top.style.top =  section_top - 10 + "px";
	resize_center_top.style.left = section_left + (section_width / 2) - 5 + "px";

	resize_center_bottom.style.top =  section_top + section_height - 5 + "px";
	resize_center_bottom.style.left = section_left + (section_width / 2) - 5 + "px";

	/*
	if (selected_section.style.transform.indexOf("rotate") > -1) {
		let center_x = section_left + (section_width/2);
		let center_y = section_top + (section_height/2);
		let angle = parseInt(selected_section.style.transform.replace("rotate(", "").replace("deg)", ""));
		//angle = -(angle);
		
		//resize_top_left_x =    center_x    -     (((section_width/2) * Math.cos(7))     -     ((section_height/2) * Math.sin(7)));
		//resize_top_left_y =    center_y    -     (((section_width/2) * Math.sin(7))     +     ((section_height/2) * Math.cos(7)));
		//console.log("center_x:" + center_x + " center_y:" + center_y + " Angle:" + angle);
		//console.log("resize_top_left_y:" + resize_top_left_y + " resize_top_left_x:" + resize_top_left_x);
	
		
		let x = parseInt(resize_bottom_left.style.left);
		let y = parseInt(resize_bottom_left.style.top);
	
		let rotated_x = (x * Math.cos(angle))  - (y * Math.sin(angle));
		let rotated_y = (x * Math.sin(angle)) + (y * Math.cos(angle));
		console.log(x, y, rotated_x, rotated_y, angle);
		resize_top_left.style.top = rotated_x + "px";
		resize_top_left.style.left = rotated_y + "px";
		
		console.log(`SectionTop:${section_top} SectionLeft:${section_left}`);
		console.log(`CenterX:${center_x} CenterY:${center_y} Angle:${angle} Width:${section_width} Height:${section_height}`);
	}
	*/

}


function resizeSection(type) {
	if (!selected_section) return;

	let align_to = document.getElementById("align_to").value;
	let element;

	switch (type) {
		case "fullWidth":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.width = document.getElementById("wrapper").style.width;
				selected_section.style.left = document.getElementById("wrapper").style.left;
			} else {
				selected_section.style.width = last_selected_section.style.width;
			}
			break;
		case "fullHeight":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.height = document.getElementById("wrapper").style.height;
				selected_section.style.top = document.getElementById("wrapper").style.top;
			} else {
				selected_section.style.height = last_selected_section.style.height;
			}
			break;
		case "halfWidth":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.width = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2) + "px";
				selected_section.style.height = document.getElementById("wrapper").style.height;
				selected_section.style.top = document.getElementById("wrapper").style.top;
				selected_section.style.left = document.getElementById("wrapper").style.left;
			} else {
				selected_section.style.width = (parseInt(last_selected_section.style.width.replace("px", "")) / 2) + "px";
				selected_section.style.height = last_selected_section.style.height;
			}
			break;
		case "halfHeight":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.height = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2) + "px";
				selected_section.style.width = document.getElementById("wrapper").style.width;
				selected_section.style.left = document.getElementById("wrapper").style.left;
				selected_section.style.top = document.getElementById("wrapper").style.top;
			} else {
				selected_section.style.height = (parseInt(last_selected_section.style.height.replace("px", "")) / 2) + "px";
				selected_section.style.width = last_selected_section.style.width;
			}
			break;
		case "quarter":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.width = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2) + "px";
				selected_section.style.height = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2) + "px";
				selected_section.style.left = document.getElementById("wrapper").style.left;
				selected_section.style.top = document.getElementById("wrapper").style.top;
			} else {
				selected_section.style.width = (parseInt(last_selected_section.style.width.replace("px", "")) / 2) + "px";
				selected_section.style.height = (parseInt(last_selected_section.style.height.replace("px", "")) / 2) + "px";
			}
			break;
		case "widthDown":
			let width_down = parseInt(selected_section.style.width.replace("px", "")) -  parseInt(localStorage.getItem("resize_offset"));
			element = document.getElementById("width");
			element.value = width_down;
			element.onchange();
			break;
		case "widthUp":
			let width_up = parseInt(selected_section.style.width.replace("px", "")) +  parseInt(localStorage.getItem("resize_offset"));
			element = document.getElementById("width");
			element.value = width_up;
			element.onchange();
			break;
		case "heightUp":
			let height_down = parseInt(selected_section.style.height.replace("px", "")) -  parseInt(localStorage.getItem("resize_offset"));
			element = document.getElementById("height");
			element.value = height_down;
			element.onchange();
			break;
		case "heightDown":
			let height_up = parseInt(selected_section.style.height.replace("px", "")) +  parseInt(localStorage.getItem("resize_offset"));
			element = document.getElementById("height");
			element.value = height_up;
			element.onchange();
			break;
	}
	
	reAlignSectionHandles();
	loadSectionDimensions();

}

function alignSection(type) {
	if (!selected_section) return;

	let dimensions = getSectionDimensions(selected_section);
	let align_to = document.getElementById("align_to").value;
	let element;

	switch (type) {
		case "topLeft":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.top = document.getElementById("wrapper").style.top;
				selected_section.style.left = document.getElementById("wrapper").style.left;
			} else {
				selected_section.style.top = last_selected_section.style.top;
				selected_section.style.left = last_selected_section.style.left;
			}
			break;
		case "topRight":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.top = document.getElementById("wrapper").style.top;
				let new_left = parseInt(document.getElementById("wrapper").style.width.replace("px", "")) - parseInt(selected_section.style.width.replace("px", ""));
				selected_section.style.left = parseInt(new_left) + "px";
			} else {
				selected_section.style.top = last_selected_section.style.top;
				let last_selected_section_left = parseInt(last_selected_section.style.left.replace("px", ""));
				let last_selected_section_width = parseInt(last_selected_section.style.width.replace("px", ""));
				let new_left =  (last_selected_section_left + last_selected_section_width) - parseInt(selected_section.style.width.replace("px", ""));
				selected_section.style.left = parseInt(new_left) + "px";
			}
			break;
		case "bottomLeft":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.left = document.getElementById("wrapper").style.left;
				let new_top = parseInt(document.getElementById("wrapper").style.height.replace("px", "")) - parseInt(selected_section.style.height.replace("px", ""));
				selected_section.style.top = parseInt(new_top) + "px";
			} else {
				selected_section.style.left = last_selected_section.style.left;
				let last_selected_section_top = parseInt(last_selected_section.style.top.replace("px", ""));
				let last_selected_section_height = parseInt(last_selected_section.style.height.replace("px", ""));
				let new_top = (last_selected_section_top + last_selected_section_height) - parseInt(selected_section.style.height.replace("px", ""));
				selected_section.style.top = parseInt(new_top) + "px";
			}
		
			break;
		case "bottomRight":
			if (align_to == "page" || !last_selected_section) {
				let new_left = parseInt(document.getElementById("wrapper").style.width.replace("px", "")) - parseInt(selected_section.style.width.replace("px", ""));
				selected_section.style.left = parseInt(new_left) + "px";
				let new_top = parseInt(document.getElementById("wrapper").style.height.replace("px", "")) - parseInt(selected_section.style.height.replace("px", ""));
				selected_section.style.top = parseInt(new_top) + "px";
			} else {
				let last_selected_section_left = parseInt(last_selected_section.style.left.replace("px", ""));
				let last_selected_section_width = parseInt(last_selected_section.style.width.replace("px", ""));
				let new_left =  (last_selected_section_left + last_selected_section_width) - parseInt(selected_section.style.width.replace("px", ""));
				selected_section.style.left = parseInt(new_left) + "px";
				let last_selected_section_top = parseInt(last_selected_section.style.top.replace("px", ""));
				let last_selected_section_height = parseInt(last_selected_section.style.height.replace("px", ""));
				let new_top = (last_selected_section_top + last_selected_section_height) - parseInt(selected_section.style.height.replace("px", ""));
				selected_section.style.top = parseInt(new_top) + "px";
			}
			break;
		case "topCenter":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.top = document.getElementById("wrapper").style.top;
				let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
				selected_section.style.left = parseInt(new_left) + "px";
			} else {
				selected_section.style.top = last_selected_section.style.top;
				let last_selected_section_left = parseInt(last_selected_section.style.left.replace("px", ""));
				let new_left = last_selected_section_left + (parseInt(last_selected_section.style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
				selected_section.style.left = parseInt(new_left) + "px";
			}
			break;
		case "rightCenter":
			if (align_to == "page" || !last_selected_section) {
				let new_left = parseInt(document.getElementById("wrapper").style.width.replace("px", "")) - parseInt(selected_section.style.width.replace("px", ""));
				selected_section.style.left = parseInt(new_left) + "px";
				let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
				selected_section.style.top = parseInt(new_top) + "px";
			} else {
				let last_selected_section_left = parseInt(last_selected_section.style.left.replace("px", ""));
				let last_selected_section_width = parseInt(last_selected_section.style.width.replace("px", ""));
				let new_left =  (last_selected_section_left + last_selected_section_width) - parseInt(selected_section.style.width.replace("px", ""));
				selected_section.style.left = parseInt(new_left) + "px";
				let last_selected_section_top = parseInt(last_selected_section.style.top.replace("px", ""));
				let new_top = last_selected_section_top + (parseInt(last_selected_section.style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
				selected_section.style.top = parseInt(new_top) + "px";
			}
			break;
		case "leftCenter":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.left = document.getElementById("wrapper").style.left;
				let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
				selected_section.style.top = parseInt(new_top) + "px";
			} else {
				selected_section.style.left = last_selected_section.style.left;
				let last_selected_section_top = parseInt(last_selected_section.style.top.replace("px", ""));
				let new_top = last_selected_section_top + (parseInt(last_selected_section.style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
				selected_section.style.top = parseInt(new_top) + "px";
			}
			break;
		case "bottomCenter":
			if (align_to == "page" || !last_selected_section) {
				let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
				selected_section.style.left = parseInt(new_left) + "px";
				let new_top = parseInt(document.getElementById("wrapper").style.height.replace("px", ""))   -  parseInt(selected_section.style.height.replace("px", ""));
				selected_section.style.top = parseInt(new_top) + "px";
			} else {
				let last_selected_section_top = parseInt(last_selected_section.style.top.replace("px", ""));
				let last_selected_section_height = parseInt(last_selected_section.style.height.replace("px", ""));
				let new_top = last_selected_section_top + last_selected_section_height - parseInt(selected_section.style.height.replace("px", ""));
				selected_section.style.top = parseInt(new_top) + "px";
				let last_selected_section_left = parseInt(last_selected_section.style.left.replace("px", ""));
				let new_left = last_selected_section_left + (parseInt(last_selected_section.style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
				selected_section.style.left = parseInt(new_left) + "px";
			}
			break;
		case "centerCenter":
			if (align_to == "page" || !last_selected_section) {
				let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
				selected_section.style.left = parseInt(new_left) + "px";
				let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
				selected_section.style.top = parseInt(new_top) + "px";
			} else {
				selected_section.style.left = last_selected_section.style.left;
				let last_selected_section_top = parseInt(last_selected_section.style.top.replace("px", ""));
				let new_top = last_selected_section_top + (parseInt(last_selected_section.style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
				selected_section.style.top = parseInt(new_top) + "px";
				let last_selected_section_left = parseInt(last_selected_section.style.left.replace("px", ""));
				let new_left = last_selected_section_left + (parseInt(last_selected_section.style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
				selected_section.style.left = parseInt(new_left) + "px";
			}
			break;
		case "hCenter":
			if (align_to == "page" || !last_selected_section) {
				let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
				selected_section.style.left = parseInt(new_left) + "px";
			} else {
				let last_selected_section_left = parseInt(last_selected_section.style.left.replace("px", ""));
				let new_left = last_selected_section_left + (parseInt(last_selected_section.style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
				selected_section.style.left = parseInt(new_left) + "px";
			}
			break;
		case "hLeft":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.left = document.getElementById("wrapper").style.left;
			} else {
				selected_section.style.left = last_selected_section.style.left;
			}
			break;
		case "hRight":
			if (align_to == "page" || !last_selected_section) {
				let new_left = parseInt(document.getElementById("wrapper").style.width.replace("px", ""))  -   parseInt(selected_section.style.width.replace("px", ""));
				selected_section.style.left = parseInt(new_left) + "px";
			} else {
				let last_selected_section_left = parseInt(last_selected_section.style.left.replace("px", ""));
				let last_selected_section_width = parseInt(last_selected_section.style.width.replace("px", ""));
				let new_left =  (last_selected_section_left + last_selected_section_width) - parseInt(selected_section.style.width.replace("px", ""));
				selected_section.style.left = parseInt(new_left) + "px";
			}
			break;
		case "vCenter":
			if (align_to == "page" || !last_selected_section) {
				let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
				selected_section.style.top = parseInt(new_top) + "px";
			} else {
				let last_selected_section_top = parseInt(last_selected_section.style.top.replace("px", ""));
				let new_top = last_selected_section_top + (parseInt(last_selected_section.style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
				selected_section.style.top = parseInt(new_top) + "px";
			}
			break;
		case "vTop":
			if (align_to == "page" || !last_selected_section) {
				selected_section.style.top = document.getElementById("wrapper").style.top;
			} else {
				selected_section.style.top = last_selected_section.style.top;
			}
			break;
		case "vBottom":
			if (align_to == "page" || !last_selected_section) {
				let new_top = parseInt(document.getElementById("wrapper").style.height.replace("px", ""))   -  parseInt(selected_section.style.height.replace("px", ""));
				selected_section.style.top = parseInt(new_top) + "px";
			} else {
				let last_selected_section_top = parseInt(last_selected_section.style.top.replace("px", ""));
				let last_selected_section_height = parseInt(last_selected_section.style.height.replace("px", ""));
				let new_top = last_selected_section_top + last_selected_section_height - parseInt(selected_section.style.height.replace("px", ""));
				selected_section.style.top = parseInt(new_top) + "px";
			}
			break;
		case "":
		
			break;
		case "":
		
			break;
	}

	moveContainedSections(dimensions.top, dimensions.left);
	reAlignSectionHandles();
	loadSectionDimensions();
}


function shiftSection(type) {
	if (!selected_section) return;

	let dimensions = getSectionDimensions(selected_section);
	let element, value;

	switch (type) {
		case "right":
			value = parseInt(selected_section.style.left.replace("px", "")) +  parseInt(localStorage.getItem("move_offset"));
			element = document.getElementById("left");
			element.value = value;
			element.onchange();
			break;
		case "left":
			value = parseInt(selected_section.style.left.replace("px", "")) -  parseInt(localStorage.getItem("move_offset"));
			element = document.getElementById("left");
			element.value = value;
			element.onchange();
			break;
		case "up":
			value = parseInt(selected_section.style.top.replace("px", "")) -  parseInt(localStorage.getItem("move_offset"));
			element = document.getElementById("top");
			element.value = value;
			element.onchange();
			break;
		case "down":
			value = parseInt(selected_section.style.top.replace("px", "")) +  parseInt(localStorage.getItem("move_offset"));
			element = document.getElementById("top");
			element.value = value;
			element.onchange();
			break;

	}	
	
	moveContainedSections(dimensions.top, dimensions.left);
	reAlignSectionHandles();
}


function styleRotateRight() {
	document.getElementById("transform_type").value = "rotate";
	let element = document.getElementById("transform_degree1");
	element.onchange();
	let transform = selected_section.style.transform;
	let transform_degree = transform.split(", ");
	let new_rotate = parseInt(transform_degree[0].replace("rotate(", "").replace("deg)", "")) +  parseInt(localStorage.getItem("rotate_offset"));
	element.value = new_rotate;
	element.onchange();
}

function styleRotateLeft() {
	document.getElementById("transform_type").value = "rotate";
	let element = document.getElementById("transform_degree1");
	element.onchange();
	let transform = selected_section.style.transform;
	let transform_degree = transform.split(", ");
	let new_rotate = parseInt(transform_degree[0].replace("rotate(", "").replace("deg)", "")) -  parseInt(localStorage.getItem("rotate_offset"));
	element.value = new_rotate;
	element.onchange();
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
		let x, y, width, height;
		if (gutter == "no") {
			x = (attributes[0].trim() * wrapper_width / 100) - (gutter_x / 2);
			y = (attributes[1] * wrapper_height / 100) - (gutter_y / 2);
			width = (attributes[2] * wrapper_width / 100) + (gutter_x);
			height = (attributes[3] * wrapper_height / 100) + (gutter_y);
		} else if (gutter == "min") {
			x = (attributes[0].trim() * wrapper_width / 100) - (gutter_x / 3.5);
			y = (attributes[1] * wrapper_height / 100) - (gutter_y / 3.5);
			width = (attributes[2] * wrapper_width / 100) + (gutter_x / 2);
			height = (attributes[3] * wrapper_height / 100) + (gutter_y / 2);
		} else if (gutter == "max") {
			x = (attributes[0].trim() * wrapper_width / 100);
			y = (attributes[1] * wrapper_height / 100);
			width = (attributes[2] * wrapper_width / 100);
			height = (attributes[3] * wrapper_height / 100);
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
		for (i = 0; i < all_sections.length; i++) {
			all_sections[i].style.outline = "1px dashed gray";
		}
		if (selected_section) {
			selected_section.style.outline = "4px dashed yellow";
			showHandles();
		}
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


function showSectionPanel(panel_id) {
	if (localStorage.getItem("show_multiple_dash_panels") == "false") hideSectionPanels();
	setTimeout(function () {
		let panel = document.getElementById(panel_id);
		panel.scrollIntoView();
		panel.style.opacity = "1";
		panel.style.maxHeight = "1000px";
	}, 100);
}

function hideSectionPanel(panel_id) {
	let panel = document.getElementById(panel_id);
	panel.style.opacity = "0";
	panel.style.maxHeight = "0";
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

function splitSectionOnSpaces() {
	if (!(selected_section)) return;
	
	saveCurrentState();
	
	let text_array = selected_section.innerText.split(" ");
	let direction = selected_section.style.direction;
	let section_top = parseInt(document.getElementById("top").value);
	let section_width = parseInt(document.getElementById("width").value);
	let section_height = parseInt(document.getElementById("height").value);
	let section_left = parseInt(document.getElementById("left").value) + section_width;
	let each_width = parseInt(section_width / text_array.length);
	
	for (i = 0; i < text_array.length; i++) {
		section_number = getNewSectionNumber();
		let section_id = "section" + section_number;
		let section = selected_section.cloneNode(true);
		section.setAttribute("id", section_id);
		section.setAttribute("onclick", "selectSection('" + section_number + "');");
		document.getElementById("wrapper").appendChild(section);
		let new_section = document.getElementById(section_id);
		if (direction == "rtl") {
			new_section.innerText = text_array[i];
		} else {
			new_section.innerText = text_array[text_array.length-i-1];
		}
		new_section.style.width = each_width + "px";
		section_left = section_left - each_width;
		new_section.style.left = section_left + "px";
	}
	
	selected_section.style.top = section_top + section_height + "px";
	reAlignSectionHandles();
}

function duplicateTransformEnables() {

	let duplicate_x_copies = document.getElementById("duplicate_x_copies");
	let duplicate_y_copies = document.getElementById("duplicate_y_copies");
	let duplicate_circular_radius = document.getElementById("duplicate_circular_radius");
	let duplicate_linear_x_distance = document.getElementById("duplicate_linear_x_distance");
	let duplicate_linear_y_distance = document.getElementById("duplicate_linear_y_distance");
	
	duplicate_x_copies.setAttribute("disabled", "");
	duplicate_y_copies.setAttribute("disabled", "");
	duplicate_circular_radius.setAttribute("disabled", "");
	duplicate_linear_x_distance.setAttribute("disabled", "");
	duplicate_linear_y_distance.setAttribute("disabled", "");

	let duplicate_type = document.getElementById("duplicate_type").value;
	if (duplicate_type == "circular") {
		duplicate_x_copies.removeAttribute("disabled");
		duplicate_circular_radius.removeAttribute("disabled");
	} else if (duplicate_type == "linear_one_sided") {
		duplicate_x_copies.removeAttribute("disabled");
		duplicate_linear_x_distance.removeAttribute("disabled");
		duplicate_linear_y_distance.removeAttribute("disabled");
	} else if (duplicate_type == "linear_two_sided") {
		duplicate_x_copies.removeAttribute("disabled");
		duplicate_linear_x_distance.removeAttribute("disabled");
		duplicate_linear_y_distance.removeAttribute("disabled");
	} else if (duplicate_type == "linear_rows_columns") {
		duplicate_x_copies.removeAttribute("disabled");
		duplicate_y_copies.removeAttribute("disabled");
		duplicate_y_copies.removeAttribute("disabled");
		duplicate_linear_x_distance.removeAttribute("disabled");
		duplicate_linear_y_distance.removeAttribute("disabled");
	}
	
}

function duplicateTransform() {
	
	let duplicate_type = document.getElementById("duplicate_type").value;
	if (duplicate_type == "circular") {
		duplicateCircular();
	} else if (duplicate_type == "linear_one_sided") {
		duplicateLinearOneSided();
	} else if (duplicate_type == "linear_two_sided") {
		duplicateLinearTwoSided();
	} else if (duplicate_type == "linear_rows_columns") {
		duplicateLinearRowsColumns();
	}
}

function duplicateCircular() {
	
	if (!(selected_section)) return;
	
	saveCurrentState();
	
	let center_x = parseInt(document.getElementById("left").value);
	let center_y = parseInt(document.getElementById("top").value);
	let copies = parseInt(document.getElementById("duplicate_x_copies").value);
	let radius = parseInt(document.getElementById("duplicate_circular_radius").value) / 2;
    let slice = 2 * Math.PI / copies;
    for (i = 0; i < copies; i++) {
		section_number = getNewSectionNumber();
		let section_id = "section" + section_number;
		let section = selected_section.cloneNode(true);
		section.setAttribute("id", section_id);
		section.setAttribute("onclick", "selectSection('" + section_number + "');");
		document.getElementById("wrapper").appendChild(section);
        let angle = slice * i;
        let new_x = parseInt(center_x + radius * Math.cos(angle));
        let new_y = parseInt(center_y + radius * Math.sin(angle));
		section.style.left = new_x + "px";
		section.style.top = new_y + "px";
    }	
}

function duplicateLinearOneSided() {
	if (!selected_section) return;
	saveCurrentState();
	let copies = parseInt(document.getElementById("duplicate_x_copies").value);
	let left = parseInt(document.getElementById("left").value);
	let top = parseInt(document.getElementById("top").value);
	let x_distance = parseInt(document.getElementById("duplicate_linear_x_distance").value);
	let y_distance = parseInt(document.getElementById("duplicate_linear_y_distance").value);

	let new_left = left;
	let new_top = top;
    for (i = 0; i < copies; i++) {
		section_number = getNewSectionNumber();
		let section_id = "section" + section_number;
		let section = selected_section.cloneNode(true);
		section.setAttribute("id", section_id);
		section.setAttribute("onclick", "selectSection('" + section_number + "');");
		document.getElementById("wrapper").appendChild(section);
		new_left = new_left + x_distance;
		new_top = new_top + y_distance;
		section.style.left = new_left + "px";
		section.style.top = new_top + "px";
    }
	reAlignSectionHandles();
	
}

function duplicateLinearTwoSided() {
	if (!selected_section) return;
	saveCurrentState();
	let copies = parseInt(document.getElementById("duplicate_x_copies").value);
	let left = parseInt(document.getElementById("left").value);
	let top = parseInt(document.getElementById("top").value);
	let x_distance = parseInt(document.getElementById("duplicate_linear_x_distance").value);
	let y_distance = parseInt(document.getElementById("duplicate_linear_y_distance").value);

	let new_left = left;
	let new_top = top;
    for (i = 0; i < copies/2; i++) {
		section_number = getNewSectionNumber();
		let section_id = "section" + section_number;
		let section = selected_section.cloneNode(true);
		section.setAttribute("id", section_id);
		section.setAttribute("onclick", "selectSection('" + section_number + "');");
		document.getElementById("wrapper").appendChild(section);
		new_left = new_left + x_distance;
		new_top = new_top + y_distance;
		section.style.left = new_left + "px";
		section.style.top = new_top + "px";
    }

	new_left = left;
	new_top = top;
    for (i = 0; i < copies/2; i++) {
		section_number = getNewSectionNumber();
		let section_id = "section" + section_number;
		let section = selected_section.cloneNode(true);
		section.setAttribute("id", section_id);
		section.setAttribute("onclick", "selectSection('" + section_number + "');");
		document.getElementById("wrapper").appendChild(section);
		new_left = new_left - x_distance;
		new_top = new_top - y_distance;
		section.style.left = new_left + "px";
		section.style.top = new_top + "px";
    }


	
}


function duplicateLinearRowsColumns() {
	if (!selected_section) return;
	saveCurrentState();
	let x_copies = parseInt(document.getElementById("duplicate_x_copies").value);
	let y_copies = parseInt(document.getElementById("duplicate_y_copies").value);
	let left = parseInt(document.getElementById("left").value);
	let top = parseInt(document.getElementById("top").value);
	let x_distance = parseInt(document.getElementById("duplicate_linear_x_distance").value);
	let y_distance = parseInt(document.getElementById("duplicate_linear_y_distance").value);

	let new_left = left;
	let new_top = top - y_distance;
    for (i = 0; i < y_copies; i++) {
		new_left = left - x_distance;
		new_top = new_top + y_distance;
		for (k = 0; k < x_copies; k++) {
			section_number = getNewSectionNumber();
			let section_id = "section" + section_number;
			let section = selected_section.cloneNode(true);
			section.setAttribute("id", section_id);
			section.setAttribute("onclick", "selectSection('" + section_number + "');");
			document.getElementById("wrapper").appendChild(section);
			new_left = new_left + x_distance;
			section.style.left = new_left + "px";
			section.style.top = new_top + "px";
		}
    }
	reAlignSectionHandles();
	
}


function setZIndex(element) {
	if (parseInt(element.value) < 0) return;
	selected_section.style.zIndex = element.value;
}


async function saveDezyn(show_message = "yes") {

	let modified = new Date().getTime();
	let folder = document.getElementById("select_folders").value;
	localStorage.setItem("current_folder", folder);
	let data = document.getElementById("container").innerHTML;

	if (design_object) { // set in loadDezyn()
		design_object = await idbGetItem("dezynor_designs", design_id);
		let created = design_object.created;
		let updated_object = {
			created:created,
			modified:modified,
			folder:folder,
			data:data,
			keywords:""
		}
		await idbPutItem("dezynor_designs", {design_key:design_id, value:updated_object});
		design_object = updated_object;
		if (show_message == "yes") showMessage("Updated design", "Green");

	} else {

		let created = new Date().getTime();
		let new_object = {
			created:created,
			modified:modified,
			folder:folder,
			data:data,
			keywords:""
		}
		await idbPutItem("dezynor_designs", {design_key:design_id, value:new_object});
		design_object = new_object;
		if (show_message == "yes") showMessage("Saved design", "Green");
	}
}

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

async function exportDezyn() {

	let zip_items = new JSZip();
	// design
	let data = document.getElementById("container").innerHTML;
	let folder = document.getElementById("select_folders").value;
	let created = new Date().getTime();
	let modified = created;
	let new_object = {
		created:created,
		modified:modified,
		folder:folder,
		data:data,
		keywords:""
	}
	zip_items.file(design_id + ".backup", JSON.stringify(new_object));

	let font_keys = [];
	let all_sections = document.querySelectorAll("section");
	for (i = 0; i < all_sections.length; i++) {
		let section = all_sections[i];
		let image_key = section.dataset.image_key;
		if (image_key && image_key != "") {
			let image_blob = await idbGetItem("dezynor_images", image_key);
			if (image_blob && section) {
				zip_items.file(image_key + ".backup", image_blob);		
			}
		}
		
		let font_key = section.style.fontFamily;
		if (await idbKeyExists("dezynor_fonts", font_key)) {
			font_keys.push(font_key);
		}
	}

	for (f = 0; f < font_keys.length; f++) {
		let font_key = font_keys[f];
		let font_blob = await idbGetItem("dezynor_fonts", font_key);
		zip_items.file("font-" + font_key + ".backup", font_blob);
	}
	
	let file_name = "dezynor-single-design-backup-" + new Date().toISOString().replace("T", "-").replaceAll(":", "-").slice(0,19);
	zip_items.generateAsync({type:"blob",
		compression: "DEFLATE",
		compressionOptions: {
			level: 9 /* 1 (best speed) to 9 (best compression) */
		}}).then(function(content) {
			saveAs(content, file_name + ".zip");
		});
		console.log(4);
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
		
	
		idbGetItem("dezynor_designs", current_design_key).then(function(result) {

			let object = result
			design_object = object;
			
			let data = object.data;
			data = data.replace(/((background-image: url\(&quot;blob:.*?\);))/g, ''); // remove expired object urls of sections
			document.getElementById("container").innerHTML = data;
			design_id = current_design_key;
			loadWrapperStyles();
			let all_sections = document.querySelectorAll("section");
			if (all_sections.length > 0) {
				let first_section_number = all_sections[0].id.replace("section", "");
				addHandles();
				selectSection(first_section_number);
			}
			document.getElementById("select_folders").value = object.folder;
			
		}).then(function() { // add fresh object URLs to sections

			let all_sections = document.querySelectorAll("section");
			for (i = 0; i < all_sections.length; i++) {
				let section = all_sections[i];
				let image_key = section.dataset.image_key;
				if (image_key && image_key != "") {
					idbGetItem("dezynor_images", image_key).then(function(result) {
						if (result && section) section.style.backgroundImage = "url(" + URL.createObjectURL(result) + ")";
					});
				}
			}
		});
		

	} else {
		document.getElementById("wrapper").dataset.last_section = "1";
		styleWrapper();
		addHandles();
		addSection();
	}


}

function setFormattedElement(action) {
	let selected_formatting = document.getElementById("select_formatted_elements").value;
	if (!selected_section || selected_formatting.length == 0) return;
	let selected_formatting_label = selected_formatting;
	selected_formatting = selected_formatting.replaceAll(" ", "_").toLowerCase();

	if (action == "save") {
		localStorage.setItem(selected_formatting, selected_section.getAttribute("style"));
		showMessage("Saved as: " + selected_formatting_label, "Green");
	} else if (selected_formatting in localStorage) {
		selected_section.setAttribute("style", localStorage.getItem(selected_formatting));
		reAlignSectionHandles();
	}
}

async function loadSelectValues() {

	// ------------------------- folders
	let select_folders = document.getElementById("select_folders");
	let option = document.createElement("option");
	option.text = "default";
	select_folders.add(option);	
	let folders = await idbGetItem("dezynor_settings", "folders");
	folders.sort();
	for (i = 0; i < folders.length; i++) {
		let folder_name = folders[i].trim();
		if (folder_name == "default") continue;
		let option = document.createElement("option");
		option.text = folder_name;
		select_folders.add(option);
	}

	// ------------------------- fonts
	let google_fonts_options = "";
	let online_fonts = await idbGetItem("dezynor_settings", "fonts");
	online_fonts.sort();
	let online_fonts_list = "";
	for (i = 0; i < online_fonts.length; i++) {
		let storage_font_name = online_fonts[i].split("|")[0];
		let storage_font_location = online_fonts[i].split("|")[1];
		if (storage_font_location == "Google") {
			online_fonts_list = online_fonts_list + "@import url('https://fonts.googleapis.com/css?family=" + storage_font_name + "&display=swap');";
			google_fonts_options = google_fonts_options + "<option>" + storage_font_name + "</option>";
		} else if (storage_font_location == "Installed") {
			
		}
	}

// try uploaded_fonts_list with fontface and objecturl
	let uploaded_fonts_list = "";
	let uploaded_fonts = await idbGetAllItems("dezynor_fonts");
	let uploaded_fonts_options = "";
	for (i = 0; i < uploaded_fonts.length; i++) {
		let font_key = uploaded_fonts[i].font_key;
		let font = uploaded_fonts[i].value;
		font_name = font_key.replaceAll("_", " ");
		uploaded_fonts_list = uploaded_fonts_list + "@font-face {font-family:'" + font_key + "';font-style:normal;font-weight:400;font-display:swap;src:url(" + URL.createObjectURL(font) + ") format('truetype');}";
		uploaded_fonts_options = uploaded_fonts_options + "<option value='" + font_key + "'>" + font_name + "</option>";
	}


	let style = document.createElement("style");
	let fonts_node = document.createTextNode(online_fonts_list + uploaded_fonts_list);
	style.appendChild(fonts_node);
	document.getElementsByTagName("head")[0].appendChild(style);
	
	document.getElementById("google_fonts").innerHTML = google_fonts_options;
	document.getElementById("uploaded_fonts").innerHTML = uploaded_fonts_options;

	// ------------------------- formatted elements
	let formatted_elements_options = "";
	for (i = 0; i < formatted_elements.length; i++) {
		formatted_elements_options = formatted_elements_options + "<option>" + formatted_elements[i] + "</option>";
	}
	document.getElementById("select_formatted_elements").innerHTML = formatted_elements_options;

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
	wrapper.style.overflow = document.getElementById("wrapper_overflow").checked ? "visible" : "hidden";
	
	wrapper.style.backgroundImage = "";
	wrapper.style.backgroundColor = document.getElementById("wrapper_background_color").value;

}

function styleRandomWrapperBackgroundColor() {
	let random_color = getRandomRGBColor(document.getElementById("wrapper_random_range").value);
	document.getElementById("wrapper").style.backgroundColor = random_color;
	document.getElementById("wrapper_background_color").value = rgb2hex(random_color);
}


function removeWrapperBackgroundColor() {
	document.getElementById("wrapper_background_color").value = "#000001";
	document.getElementById("wrapper").style.backgroundColor = "rgb(0, 0, 1)";
}

function loadWrapperStyles() {
	let wrapper = document.getElementById("wrapper");
	document.getElementById("wrapper_width").value = wrapper.style.width.replace("px", "");
	document.getElementById("wrapper_height").value = wrapper.style.height.replace("px", "");

	document.getElementById("wrapper_background_color").value = rgb2hex(wrapper.style.backgroundColor);
}

function setSectionStyle(style, element, value = null) {
	
	if (!selected_section) return;
	
	if (!value) value = element.value;
	
	switch (style) {
		case "top":
			selected_section.style.top = value + "px";
			reAlignSectionHandles();		
			break;
		case "left":
			selected_section.style.left = value + "px";
			reAlignSectionHandles();		
			break;
		case "width":
			selected_section.style.width = value + "px";
			reAlignSectionHandles();		
			break;
		case "height":
			selected_section.style.height = value + "px";
			reAlignSectionHandles();		
			break;
		case "paddingTop":
			selected_section.style.paddingTop = value + "px";
			break;
		case "paddingRight":
			selected_section.style.paddingRight = value + "px";
			break;
		case "paddingBottom":
			selected_section.style.paddingBottom = value + "px";
			break;
		case "paddingLeft":
			selected_section.style.paddingLeft = value + "px";
			break;
		case "direction":
			selected_section.style.direction = value;
			break;
		case "fontFamily":
			selected_section.style.fontFamily = value;
			break;
		case "fontSize":
			selected_section.style.fontSize = value + "px";
			break;
		case "color":
			selected_section.style.color = value;
			break;
		case "backgroundColor":
			selected_section.style.backgroundColor = value;
			break;
		case "wordSpacing":
			selected_section.style.wordSpacing = value + "px";
			break;
		case "letterSpacing":
			selected_section.style.letterSpacing = value + "px";
			break;
		case "textIndent":
			selected_section.style.textIndent = value + "px";
			break;
		case "lineHeight":
			selected_section.style.lineHeight = value + "px";
			break;
		case "textAlign":
			selected_section.style.textAlign = value;
			break;
		case "opacity":
			selected_section.style.opacity = value;
			break;
		case "borderWidth":
			selected_section.style.borderWidth = value + "px";
			break;
		case "borderStyle":
			selected_section.style.borderStyle = value;
			break;
		case "borderColor":
			selected_section.style.borderColor = value;
			break;
		case "borderTopLeftRadius":
			selected_section.style.borderTopLeftRadius = value + "px";
			break;
		case "borderTopRightRadius":
			selected_section.style.borderTopRightRadius = value + "px";
			break;
		case "borderBottomLeftRadius":
			selected_section.style.borderBottomLeftRadius = value + "px";
			break;
		case "borderBottomRightRadius":
			selected_section.style.borderBottomRightRadius = value + "px";
			break;
		case "columnCount":
			selected_section.style.columnCount = value;
			break;
		case "columnGap":
			selected_section.style.columnGap = value + "px";
			break;
		case "columnRuleWidth":
			selected_section.style.columnRuleWidth = value + "px";
			break;
		case "columnRuleStyle":
			selected_section.style.columnRuleStyle = value;
			break;
		case "columnRuleColor":
			selected_section.style.columnRuleColor = value;
			break;
		case "clipPath":
			selected_section.style.clipPath = value;
			break;
		case "clipPathStyle":
			value = element.querySelector('span').getAttribute('style');
			console.log(value);
			value = value.replace("clip-path:", "");
			selected_section.style.clipPath = value;
			document.getElementById("clip_path").value = value;
			break;
		case "transform":
			let transform_type = document.getElementById("transform_type").value;
			let transform_degree1 = document.getElementById("transform_degree1").value;
			let transform_degree2 = document.getElementById("transform_degree2").value;
			if (transform_type == "rotate") {
				selected_section.style.transform = "rotate(" + transform_degree1 + "deg)";
				document.getElementById("transform_degree2").style.display = "none";
			} else if (transform_type == "skew") {
				document.getElementById("transform_degree2").style.display = "inline";
				selected_section.style.transform = "skew(" + transform_degree1 + "deg, " + transform_degree2 + "deg)";
			} else if (transform_type == "scale") {
				selected_section.style.transform = "scale(" + transform_degree1 + ", " + transform_degree2 + ")";
			}
			break;
		case "backgroundImage":
			if (!selected_section.dataset.image_key) return;
			idbGetItem("dezynor_images", selected_section.dataset.image_key).then(function(result) {
				if (!result) {
					console.log("Image not found");
					return;
				}				
				let image = URL.createObjectURL(result);
				selected_section.style.backgroundImage = "url(" + image + ")";
			});
			if (document.getElementById("background_image_repeat").checked) {
				selected_section.style.backgroundRepeat = "repeat";
				document.getElementById("background_size").value = "auto";
			} else {
				selected_section.style.backgroundRepeat = "no-repeat";
			}
			selected_section.style.backgroundSize = document.getElementById("background_size").value;
			selected_section.style.backgroundPositionX = document.getElementById("background_position_x").value;
			selected_section.style.backgroundPositionY = document.getElementById("background_position_y").value;
			break;
		case "backgroundImageGradient":
			let gradient_type = document.getElementById("gradient_type").value;
			let gradient_direction = document.getElementById("gradient_direction").value;
			let color1 = document.getElementById("gradient_color1").value;
			if (!document.getElementById("gradient_alpha1").checked) color1 = color1 + "00"; // #FFAADD00
			let color2 = document.getElementById("gradient_color2").value;
			if (!document.getElementById("gradient_alpha2").checked) color2 = color2 + "00";
			let color3 = document.getElementById("gradient_color3").value;
			if (!document.getElementById("gradient_alpha3").checked) color3 = color3 + "00";
			let color4 = document.getElementById("gradient_color4").value;
			if (!document.getElementById("gradient_alpha4").checked) color4 = color4 + "00";
			selected_section.style.backgroundImage = gradient_type + "(" + gradient_direction + ", " + color1 + ", " + color2 + ", " + color3 + ", " + color4 + ")";	
			break;
		case "backgroundImageURL":
			let image_url = prompt("Provide an image URL");
			if (!image_url || image_url.trim().length == 0) return;
			selected_section.style.backgroundImage = "url(" + image_url + ")";
			break;
		case "textShadow":
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
			break;
		case "boxShadow":
			let h = document.getElementById("box_shadow_h").value;
			let y = document.getElementById("box_shadow_y").value;
			let blur = document.getElementById("box_shadow_blur").value;
			let spread = document.getElementById("box_shadow_spread").value;
			let color = document.getElementById("box_shadow_color").value;
			let inset = document.getElementById("box_shadow_inset").checked ? "inset " : "";
			
			if (selected_section.dataset.image_key && inset.length == 0) {
				selected_section.style.filter = "drop-shadow(" + h + "px " + y + "px " + blur + "px " + color + ")";
				selected_section.style.boxShadow = "none";
			} else {
				selected_section.style.boxShadow = inset + h + "px " + y + "px " + blur + "px " + spread + "px " + color;
				selected_section.style.filter = "none";
			}
			break;

	}
}

function setRandomSectionStyle(style) {
	if (!selected_section) return;
	
	let random_color, random_range;

	switch (style) {
		case "color":
			random_range = document.getElementById("random_color_range").value;
			random_color = getRandomRGBColor(random_range);
			selected_section.style.color = random_color;
			document.getElementById("color").value = rgb2hex(random_color);
			break;
		case "backgroundColor":
			random_range = document.getElementById("random_color_range").value;
			random_color = getRandomRGBColor(random_range);
			selected_section.style.backgroundColor = random_color;
			document.getElementById("background_color").value = rgb2hex(random_color);
			break;
		case "randomGradientColors":
			random_range = document.getElementById("random_color_range").value;
			random_color = getRandomRGBColor(random_range);
			document.getElementById("gradient_color1").value = rgb2hex(random_color);
			random_color = getRandomRGBColor(random_range);
			document.getElementById("gradient_color2").value = rgb2hex(random_color);
			random_color = getRandomRGBColor(random_range);
			document.getElementById("gradient_color3").value = rgb2hex(random_color);
			random_color = getRandomRGBColor(random_range);
			document.getElementById("gradient_color4").value = rgb2hex(random_color);
			break;
		case "borderColor":
			random_color = getRandomRGBColor("any");
			selected_section.style.borderColor = random_color;
			document.getElementById("border_color").value = rgb2hex(random_color);
			break;
		case "textShadow":
			random_color = getRandomRGBColor("any");
			text_shadow_color = document.getElementById("text_shadow_color");
			text_shadow_color.value = rgb2hex(random_color);
			text_shadow_color.onchange();
			break;
		case "boxShadow":
			random_color = getRandomRGBColor("any");
			let box_shadow_color = document.getElementById("box_shadow_color");
			box_shadow_color.value = rgb2hex(random_color);
			box_shadow_color.onchange();
			break;
	}	
	
}


function setSameSectionStyle(type) {
	if (!selected_section) return;
	
	switch (type) {
		case "backgroundColorSameAsWrapper":
			let element = document.getElementById("background_color");
			element.value = document.getElementById("wrapper_background_color").value;
			element.onchange();
			break;
		case "backgroundColorSameAsLastSection":
			if (last_selected_section) {
				selected_section.style.backgroundColor = last_selected_section.style.backgroundColor;
			}
			break;
		case "textColorSameAsLastSection":
			if (last_selected_section) {
				let text_color = document.getElementById("color");
				text_color.value = rgb2hex(last_selected_section.style.color);
				text_color.onchange();
			}
			break;
		case "backgroundGradientsSameColor":
			document.getElementById("gradient_color2").value = document.getElementById("gradient_color1").value;
			document.getElementById("gradient_color3").value = document.getElementById("gradient_color1").value;
			document.getElementById("gradient_color4").value = document.getElementById("gradient_color1").value;
			break;
	}
	
}


function removeSectionStyle(style) {

	if (!selected_section) return;
	
	switch (style) {
		case "backgroundColor":
			document.getElementById("background_color").value = "#000001";
			selected_section.style.backgroundColor = "";
			break;
		case "border":
			selected_section.style.borderWidth = "0";
			selected_section.style.borderStyle = "solid";
			selected_section.style.borderColor = "rgb(255,255,255)";
			document.getElementById("border_width").value = "0";
			document.getElementById("border_style").value = "solid";
			document.getElementById("border_color").value = "#FFFFFF";
			break;
		case "borderRadius":
			selected_section.style.borderTopLeftRadius = "0";
			selected_section.style.borderTopRightRadius = "0";
			selected_section.style.borderBottomLeftRadius = "0";
			selected_section.style.borderBottomRightRadius = "0";
			document.getElementById("border_radius1").value = "0";
			document.getElementById("border_radius2").value = "0";
			document.getElementById("border_radius3").value =  "0";
			document.getElementById("border_radius4").value =  "0";
			break;
		case "transform":
			document.getElementById("transform_type").value = "skew";
			document.getElementById("transform_degree1").value = "0";
			document.getElementById("transform_degree2").value = "0";
			document.getElementById("transform_degree2").style.visibility = "visible";
			selected_section.style.transform = "skew(0deg, 0deg)";
			break;
		case "textShadow":
			selected_section.style.textShadow = "0px 0px 0px #000000";
			document.getElementById("text_shadow_count").value = "0";
			document.getElementById("text_shadow_h").value = "0";
			document.getElementById("text_shadow_y").value = "0";
			document.getElementById("text_shadow_blur").value = "0";
			document.getElementById("text_shadow_color").value = "#000000";;
			break;
		case "boxShadow":
			selected_section.style.filter = "none";
			selected_section.style.boxShadow = "0px 0px 0px 0px #000000";
			document.getElementById("box_shadow_h").value = "0";
			document.getElementById("box_shadow_y").value = "0";
			document.getElementById("box_shadow_blur").value = "0";
			document.getElementById("box_shadow_spread").value = "0";
			document.getElementById("box_shadow_color").value = "#000000";
			document.getElementById("box_shadow_inset").checked = false;
			break;
		case "clipPath":
			document.getElementById("clip_path").value = "";
			break;
			
	}	
	
}

function setSectionClass(value) {
	if (!selected_section) return;
	
	switch (value) {
		case "clipText":
			selected_section.classList.add("clip_text");
			break;
		case "showSectionSide":
			selected_section.classList.remove("show_left");
			selected_section.classList.remove("show_right");
			selected_section.classList.remove("show_top");
			selected_section.classList.remove("show_bottom");
			let show_side = document.getElementById("show_section_side").value;
			if (show_side != "show_all") selected_section.classList.add(show_side);
			break;
	}
}


function removeSectionClass(value) {
	if (!selected_section) return;
	
	switch (value) {
		case "clipText":
			selected_section.classList.remove("clip_text");
			break;
	}
	
}





function styleBorderRadiusPreset(top_left, top_right, bottom_left, bottom_right) {
		document.getElementById("border_radius1").value = top_left;
		document.getElementById("border_radius2").value = top_right;
		document.getElementById("border_radius3").value = bottom_left;
		document.getElementById("border_radius4").value = bottom_right;
		selected_section.style.borderTopLeftRadius = top_left + "px";
		selected_section.style.borderTopRightRadius = top_right + "px";
		selected_section.style.borderBottomLeftRadius = bottom_left + "px";
		selected_section.style.borderBottomRightRadius = bottom_right + "px";
}
function styleBorderWidthPreset(width) {
	document.getElementById("border_width").value = width;
	selected_section.style.borderWidth = width + "px";
}


function styleSwitchTextBackgroundColors() {
	let text_color = document.getElementById("color");
	let background_color = document.getElementById("background_color");
	let temp = text_color.value;
	text_color.value = background_color.value;
	background_color.value = temp;
	text_color.onchange();
	background_color.onchange();
}


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
	} else if (colorable_style == "column") {
		colorable_element.style.columnRuleColor = color;
	} else if (colorable_style == "color") {
		colorable_element.style.color = color;
	} else if (colorable_style == "textshadow") {
		document.getElementById("text_shadow_color").onchange();
	} else if (colorable_style == "boxshadow") {
		document.getElementById("box_shadow_color").onchange();
	}
}







async function uploadImage(element) {
	
	if (!(selected_section)) return;
	
	image_key = "image-" + new Date().getTime();
	const image_file = element.files[0];


	const reader = new FileReader();
	reader.addEventListener("load", async function () {

		let image = document.createElement("img");
		image.src = reader.result // file reader result;
		image.onload = async function (e) {
			let max_resize_width = localStorage.getItem("max_upload_width");
			let max_resize_height = localStorage.getItem("max_upload_height");
			let width = image.width;
			let height = image.height;
			let canvas = document.createElement("canvas");
			let context = canvas.getContext("2d");
			context.drawImage(image, 0, 0);
			if (width > height) {
				if (width > max_resize_width) {
					height *= max_resize_width / width;
					width = max_resize_width;
				}
			} else {
				if (height > max_resize_height) {
					width *= max_resize_height / height;
					height = max_resize_height;
				}
			}
			canvas.width = width;
			canvas.height = height;
			context.drawImage(image, 0, 0, width, height);
			let data_url = canvas.toDataURL(image_file.type);
			let arr = data_url.split(',');
			let mime = arr[0].match(/:(.*?);/)[1];
			let bstr = atob(arr[1]);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			let resized_blob = new Blob([u8arr], { type: mime });
			await idbPutItem("dezynor_images", {image_key:image_key, value:resized_blob});
			selected_section.dataset.image_key = image_key;
			document.getElementById("upload_image").value = "";
			styleBackgroundImage();
		}

	}, false);
	if (image_file) {
		reader.readAsDataURL(image_file);
	}
}



function setGradientDirection() {
	if (document.getElementById("gradient_type").value == "linear-gradient") {
		document.getElementById("gradient_direction").value = "to bottom";
	} else {
		document.getElementById("gradient_direction").value = "ellipse";
	}
}


function styleTable() {
	if (!selected_section) return;
	if (selected_section.querySelector("table")) {
		if (!confirm("The selected box already contains a table,\ndo you want to regenerate the table?")) return;
	}
	
	let table_columns = parseInt(document.getElementById("table_columns").value);
	let table_rows = parseInt(document.getElementById("table_rows").value);
	let table_header = document.getElementById("table_header").checked;
	let table_footer = document.getElementById("table_footer").checked;
	let table_caption = document.getElementById("table_caption").checked;
	
	let border_width = parseInt(document.getElementById("table_border_width").value);
	let border_style = document.getElementById("table_border_style").value;
	let border_color = document.getElementById("table_border_color").value;
	let cell_style = "border:" + border_width + "px " + border_style + " " + border_color + ";";

	let caption = "";
	if (table_caption) {
		caption = "<caption>Caption</caption>";
	}
	
	let thead = "";
	if (table_header) {
		thead = "<thead><tr>";
		for (col = 0; col < table_columns; col++) {
			thead = thead + "<th style='" + cell_style + "'>&nbsp;</th>";
		}
		thead = thead + "</tr></thead>";
	}

	let tfoot = "";
	if (table_footer) {
		tfoot = "<tfoot><tr>";
		for (col = 0; col < table_columns; col++) {
			tfoot = tfoot + "<td style='" + cell_style + "'>&nbsp;</td>";
		}
		tfoot = tfoot + "</tr></tfoot>";
	}

	let table = "";
	for (row = 0;row < table_rows; row++) {
		table = table + "<tr>";
		for (col = 0; col < table_columns; col++) {
			table = table + "<td style='" + cell_style + "'>&nbsp;</td>";
		}
		table = table + "</tr>";
	}
	table = "<table>" + caption + thead + "<tbody>" + table + "</tbody>" + tfoot + "</table>";
	selected_section.innerHTML = table;
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
	section.style.columnRuleColor = "rgb(255,255,255)";
	section.style.columnRuleWidth = "1";
	section.style.columnRuleStyle = "solid";
	section.style.transform = "skew(0deg, 0deg)";
	section.style.transformOrigin = "center center";
	section.style.clipPath = "";
}

function loadSectionDimensions() {
	document.getElementById("top").value = selected_section.style.top.replace("px", "");
	document.getElementById("left").value = selected_section.style.left.replace("px", "");
	document.getElementById("width").value = selected_section.style.width.replace("px", "");
	document.getElementById("height").value = selected_section.style.height.replace("px", "");
}

function loadSectionStyles() {
	document.getElementById("container_section").checked = selected_section.dataset.contained_sections ? true : false;
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

	document.getElementById("top").value = selected_section.style.top.replace("px", "");
	document.getElementById("left").value = selected_section.style.left.replace("px", "");
	document.getElementById("width").value = selected_section.style.width.replace("px", "");
	document.getElementById("height").value = selected_section.style.height.replace("px", "");
	document.getElementById("z_index").value = selected_section.style.zIndex;
	document.getElementById("padding_top").value = selected_section.style.paddingTop.replace("px", "");
	document.getElementById("padding_right").value = selected_section.style.paddingRight.replace("px", "");
	document.getElementById("padding_bottom").value = selected_section.style.paddingBottom.replace("px", "");
	document.getElementById("padding_left").value = selected_section.style.paddingLeft.replace("px", "");
	
	// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients
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

		document.getElementById("gradient_alpha1").checked = (hex1.length == 9) ? false : true;
		document.getElementById("gradient_alpha2").checked = (hex2.length == 9) ? false : true;
		document.getElementById("gradient_alpha3").checked = (hex3.length == 9) ? false : true;
		document.getElementById("gradient_alpha4").checked = (hex4.length == 9) ? false : true;

	} else {
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
	document.getElementById("column_rule_width").value = selected_section.style.columnRuleWidth.replace("px", "");
	document.getElementById("column_rule_style").value = selected_section.style.columnRuleStyle;
	document.getElementById("column_rule_color").value = rgb2hex(selected_section.style.columnRuleColor);
	
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



			
/* -------------- SHORTCUTS ---------------------- */


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


document.onkeydown = function(e){
	let key = e.which || e.keyCode;
	
	if (
			(e.ctrlKey && e.shiftKey) 
		|| 	(e.ctrlKey && e.altKey) 
		|| 	(e.shiftKey && e.altKey) 
		|| 	(e.altKey && (key >= 96 && key <= 111)) // numpad and operators
		|| 	(key >= 112 && key <= 123) // function keys
		|| 	(e.ctrlKey && key == keyCode.HOME) 
		|| 	(e.ctrlKey && key == keyCode.END) 
		|| 	(e.ctrlKey && key == keyCode.KEY_W) 
		|| 	(e.ctrlKey && key == keyCode.KEY_R) 
		|| 	(e.ctrlKey && key == keyCode.KEY_L) 
		|| 	(e.ctrlKey && key == keyCode.KEY_E) 
		|| 	(e.ctrlKey && key == keyCode.KEY_J) 
		|| 	(e.ctrlKey && key == keyCode.KEY_9) 
		|| 	(e.ctrlKey && key == keyCode.KEY_0) 
		|| 	(e.altKey && key == keyCode.KEY_1) 
		|| 	(e.altKey && key == keyCode.KEY_2) 

	) 
	{
		e.preventDefault();
	}

}

let next_focused_section = 0;

document.onkeyup = function(e) {
	let key = e.which || e.keyCode;
	//console.log(key);

	if (key == keyCode.F1) {
		dashPanelToggle();
	} else if (key == keyCode.F2) {
		if (document.querySelectorAll("section")[next_focused_section]) {
			let section = document.querySelectorAll("section")[next_focused_section];
			let section_number = section.id.replace("section", "");
			selectSection(section_number);
			next_focused_section++;
		} else {
			next_focused_section = 0;
		}
	} else if (key == keyCode.F3) {
		let z_index_element = document.getElementById("z_index");
		let new_z_index = parseInt(z_index_element.value) - 1;
		if (new_z_index >= 0) {
			z_index_element.value = new_z_index;
			z_index_element.onchange();
		}
	} else if (key == keyCode.F4) {
		let z_index_element = document.getElementById("z_index");
		z_index_element.value = parseInt(z_index_element.value) + 1;
		z_index_element.onchange();
	} else if (key == keyCode.F9) {
		saveDezyn();
	} else if (e.ctrlKey && key == keyCode.COMMA) {
		styleDirection("rtl");
	} else if (e.ctrlKey && key == keyCode.PERIOD) {
		styleDirection("ltr");
	} else if (e.ctrlKey && key == keyCode.KEY_R) {
		//styleTextAlign('right');
	} else if (e.ctrlKey && key == keyCode.KEY_L) {
		//styleTextAlign('left');
	} else if (e.ctrlKey && key == keyCode.KEY_E) {
		//styleTextAlign('center');
	} else if (e.ctrlKey && key == keyCode.KEY_J) {
		//styleTextAlign('justify');
	} else if (e.ctrlKey && e.shiftKey && key == keyCode.CLOSE_BRACKET) {
		element = document.getElementById("line_height");
		element.value = parseInt(element.value) + parseInt(localStorage.getItem("line_height_change"));
		element.onchange();
	} else if (e.ctrlKey && e.shiftKey && key == keyCode.OPEN_BRACKET) {
		element = document.getElementById("line_height");
		element.value = parseInt(element.value) - parseInt(localStorage.getItem("line_height_change"));
		element.onchange();
	} else if (e.ctrlKey && key == keyCode.OPEN_BRACKET) {
		let element = document.getElementById("font_size");
		element.value = parseInt(element.value) - parseInt(localStorage.getItem("font_size_change"));
		element.onchange();
	} else if (e.ctrlKey && key == keyCode.CLOSE_BRACKET) {
		let element = document.getElementById("font_size");
		element.value = parseInt(element.value) + parseInt(localStorage.getItem("font_size_change"));
		element.onchange();
	} else if (e.ctrlKey && key == keyCode.KEY_9) {
		let element = document.getElementById("word_spacing");
		element.value = parseInt(element.value) - parseInt(localStorage.getItem("word_spacing_change"));
		element.onchange();
	} else if (e.ctrlKey && key == keyCode.KEY_0) {
		let element = document.getElementById("word_spacing");
		element.value = parseInt(element.value) + parseInt(localStorage.getItem("word_spacing_change"));
		element.onchange();


	} else if (e.altKey && key == keyCode.KEY_2) {
		duplicateSection();
	} else if (e.altKey && key == keyCode.KEY_1) {
		addSection();
	} else if (e.altKey && key == keyCode.DELETE) {
		removeSection();
	} else if (e.altKey && key == keyCode.SUBTRACT) {
		resizeSection('fullWidth');
	} else if (e.altKey && key == keyCode.ADD) {
		resizeSection('fullHeight');
	} else if (e.altKey && key == keyCode.ENTER) {
		styleAlignHCenter();
	} else if (e.altKey && key == keyCode.DIVIDE) {
	} else if (e.altKey && key == keyCode.MULTIPLY) {
	} else if (e.altKey && key == keyCode.DECIMAL) {
		styleAddImageURL();
	} else if (e.altKey && key == keyCode.NUMPAD_0) {
		if (!(selected_section)) return;
		document.getElementById('upload_image').click();
	} else if (e.altKey && key == keyCode.NUMPAD_1) {
	} else if (e.altKey && key == keyCode.NUMPAD_2) {
		shiftSection('down');
	} else if (e.altKey && key == keyCode.NUMPAD_3) {
	} else if (e.altKey && key == keyCode.NUMPAD_4) {
		shiftSection('left');
	} else if (e.altKey && key == keyCode.NUMPAD_5) {
	} else if (e.altKey && key == keyCode.NUMPAD_6) {
		shiftSection('right');
	} else if (e.altKey && key == keyCode.NUMPAD_7) {
		styleRotateLeft();
	} else if (e.altKey && key == keyCode.NUMPAD_8) {
		shiftSection('up');
	} else if (e.altKey && key == keyCode.NUMPAD_9) {
		styleRotateRight();
	} else if (e.altKey && key == keyCode.UP_ARROW) {
		let section_top = parseInt(selected_section.style.top.replace("px", ""));
		let section_bottom = section_top + parseInt(selected_section.style.height.replace("px", ""));
		let wrapper_top = parseInt(document.getElementById("wrapper").style.top.replace("px", ""));
		let wrapper_bottom = parseInt(document.getElementById("wrapper").style.height.replace("px", ""));
		if (section_top == wrapper_top) {
			styleAlignVBottom();
		} else if (section_bottom == wrapper_bottom) {
			styleAlignVCenter();
		} else {
			styleAlignVTop();
		}
	} else if (e.altKey && key == keyCode.DOWN_ARROW) {
		let section_top = parseInt(selected_section.style.top.replace("px", ""));
		let section_bottom = section_top + parseInt(selected_section.style.height.replace("px", ""));
		let wrapper_top = parseInt(document.getElementById("wrapper").style.top.replace("px", ""));
		let wrapper_bottom = parseInt(document.getElementById("wrapper").style.height.replace("px", ""));
		if (section_bottom == wrapper_bottom) {
			styleAlignVTop();
		} else if (section_top == wrapper_top) {
			styleAlignVCenter();
		} else {
			styleAlignVBottom();
		}
	} else if (e.altKey && key == keyCode.RIGHT_ARROW) {
		let section_left = parseInt(selected_section.style.left.replace("px", ""));
		let section_right = section_left + parseInt(selected_section.style.width.replace("px", ""));
		let wrapper_left = parseInt(document.getElementById("wrapper").style.left.replace("px", ""));
		let wrapper_right = parseInt(document.getElementById("wrapper").style.width.replace("px", ""));
		if (section_right == wrapper_right) {
			styleAlignHLeft();
		} else if (section_left == wrapper_left) {
			styleAlignHCenter();
		} else {
			styleAlignHRight();
		}
	} else if (e.altKey && key == keyCode.LEFT_ARROW) {
		let section_left = parseInt(selected_section.style.left.replace("px", ""));
		let section_right = section_left + parseInt(selected_section.style.width.replace("px", ""));
		let wrapper_left = parseInt(document.getElementById("wrapper").style.left.replace("px", ""));
		let wrapper_right = parseInt(document.getElementById("wrapper").style.width.replace("px", ""));
		if (section_left == wrapper_left) {
			styleAlignHRight();
		} else if (section_right == wrapper_right) {
			styleAlignHCenter();
		} else {
			styleAlignHLeft();
		}
	}
	
};


function getRandomRGBColor(random_range) {
	let min, max;
	if (random_range == "any") {
		min = 1;
		max = 255;
	} else if (random_range == "light") {
		min = 180;
		max = 255;
	} else if (random_range == "medium") {
		min = 100;
		max = 180;
	} else if (random_range == "dark") {
		min = 1;
		max = 100;
	}
	let r = Math.floor(Math.random() * (max - min) + min);
	let g = Math.floor(Math.random() * (max - min) + min);
	let b = Math.floor(Math.random() * (max - min) + min);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
