window.onload = function() {
	loadSelectFolders();
	loadSelectFonts();
	loadSelectStyles();
	loadDezyn();
	setRandomWrapperBackgroundColor();
	showSectionPanel('box_section');

	if (localStorage.getItem("automatically_save") == "true") {
		setInterval(function () {
			saveDezyn("no");
		}, parseInt(localStorage.getItem("automatically_save_after")) * 1000);
	}
	
}

let design_id = generateDeisgnId();
let design_object;
let selected_section;
let saved_range;
let selected_element;
let selected_content_element;
let last_selected_section;
let last_selected_element;
let next_focused_section = 0;
let prev_focused_section = 0;
let revert_states = [];
let short_style_rules = ["padding", "borderRadius"];
let block_elements = ["p", "div", "section", "caption", "main", "article", "header", "footer", "h1", "h2", "h3", "h4", "h5", "h6", "th", "td", "li"];
let move;
let resize_bottom_right;
let resize_top_right;
let resize_top_left;
let resize_bottom_left;
let resize_center_right;
let resize_center_left;
let resize_center_top;
let resize_center_bottom;


function saveCurrentState() {
	revert_states.push(document.getElementById("cover").innerHTML);
}

function revertToLastState() {
	if (revert_states.length > 0) {
		document.getElementById("cover").innerHTML = revert_states.pop();
		//showMessage("Reverted to last state", "Orange");
		if (revert_states.length > 50) revert_states = revert_states.slice(revert_states.length-50);
	}
	let all_sections = document.querySelectorAll("#wrapper section");
	if (all_sections.length > 0) {
		selectSection(all_sections[0].id.replace("section", ""));
		selectSection(all_sections[all_sections.length-1].id.replace("section", ""));
	}
	unselectSections();
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
	let wrapper = document.getElementById("wrapper");
	section_number = getNewSectionNumber();
	let section_id = "section" + section_number;
	let section = document.createElement("section");
	let section_text = document.createTextNode(" ");
	section.appendChild(section_text);
	section.setAttribute("id", section_id);
	section.setAttribute("onclick", "selectSection('" + section_number + "');");
	section.setAttribute("onpaste", "pasteText(event);");
	section.setAttribute("contenteditable", "true");
	wrapper.appendChild(section);
	document.getElementById(section_id).style.zIndex = section_number;
	section.style.width = (parseInt(wrapper.style.width) * 0.7) + "px";
	section.style.height = (parseInt(wrapper.style.height) * 0.5) + "px";
	selectSection(section_number);
	setSectionDefaultStyles();
	section.innerHTML = "<div>&nbsp;</div>";
	document.getElementById(section_id).focus();
	loadFormValues(section)
	alignSection('pageTopLeft');
	setTimeout(function() { 
		alignSection('pageCenterCenter');
	}, 100);	
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

	unselectSections();
	let new_selected_id = "section" + counter;
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
	reAlignSectionHandles();
	showHandles();
	loadFormValues(selected_section);
	
	selectElement();
}

function selectSectionNextPrev(direction) {

	let first_section, last_section;
	let all_sections = document.querySelectorAll("#wrapper section");
	if (all_sections.length > 0) {
		first_section = all_sections[0];
		last_section = all_sections[all_sections.length-1];
	} else {
		return;		
	}

	if (direction == "next") {
		
		for (i = 0; i < all_sections.length; i++) {
			if (all_sections[i] == selected_section) {
				next_focused_section = all_sections[i+1];
				break;
			}
		}
		
		if (next_focused_section) {
			selectSection(next_focused_section.id.replace("section", ""));
		} else {
			selectSection(first_section.id.replace("section", ""));
		}
		
	} else if (direction == "prev") {
		
		for (i = 0; i < all_sections.length; i++) {
			if (all_sections[i] == selected_section) {
				prev_focused_section = all_sections[i-1];
				break;
			}
		}
		
		if (prev_focused_section) {
			selectSection(prev_focused_section.id.replace("section", ""));
		} else {
			selectSection(last_section.id.replace("section", ""));
		}
	}
}

function orderSectionUpDown(direction) {
	let z_index = document.getElementById("z_index");
	if (direction == "up") {
		z_index.value = parseInt(z_index.value) + 1;
	} else {
		if (z_index.value > 0) z_index.value = parseInt(z_index.value) - 1;
	}
	z_index.onchange();
}

function selectElement() {

	if (document.activeElement.localName == "input") return;

	last_selected_element = selected_element;

	let selection = window.getSelection();

	// selected_content_element
	selected_content_element = null;
	if (selection.toString().length > 0) {
		saved_range = selection.getRangeAt(0);
		selected_content_element = document.createElement("span");
		for (i = 0; i < selection.rangeCount; i++) {
			selected_content_element.appendChild(selection.getRangeAt(i).cloneContents());
		}
	}

	// selected_element
	if (!selection.anchorNode || document.activeElement.localName == "input") return;
	if (!selection.anchorNode.data) {
		selected_element = selection.anchorNode;
	} else {
		selected_element = selection.anchorNode.parentNode;
	}

	let reached_element = false;
	while (!reached_element) {
		if (valueInArray(selected_element.localName, block_elements)) {
			reached_element = true;
			break;
		}
		if (!reached_element && selected_element.parentNode) {
			selected_element = selected_element.parentNode;
		}
	}

	if (last_selected_element != selected_element) loadFormValues(selected_element);
}

function duplicateSection() {
	
	if (!(selected_section)) return;
	
	saveCurrentState();
	
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
	
	saveCurrentState();
	
	if (confirm("Do you really want to delete this box?")) {
		selected_section.remove();
		hideHandles();
		selected_section = null;
	}
}

function removeContainerSection() {
	if (!(selected_section)) return;
	
	saveCurrentState();
	
	if (confirm("Do you really want to delete this and all the contained boxes?")) {

		let dimensions = getSectionDimensions(selected_section);
		let top = dimensions.top
		let bottom = dimensions.bottom
		let left = dimensions.left
		let right = dimensions.right
		
		let sections_list = "";
		let all_sections = document.querySelectorAll("section");
		for (i = 0; i < all_sections.length; i++) {
			let this_section = all_sections[i];
			if (this_section !== selected_section) {
				let section_width = parseInt(this_section.style.width.replace("px", ""));
				let section_height = parseInt(this_section.style.height.replace("px", ""));
				let section_top = parseInt(this_section.style.top.replace("px", ""));
				let section_left = parseInt(this_section.style.left.replace("px", ""));
				let section_bottom = parseInt(this_section.style.top.replace("px", "")) + section_height;
				let section_right = parseInt(this_section.style.left.replace("px", "")) + section_width;
				if ((section_top > top && section_bottom < bottom)    &&   (section_left > left && section_right < right)) {
					this_section.remove();
				}
			}
		}	

		selected_section.remove();
		hideHandles();

		selected_section = null;

	}

}

function copySection() {
	let copied_section = selected_section.outerHTML;
	if (selected_section.dataset.contained_sections) {
		let contained_sections = selected_section.dataset.contained_sections.trim().split(" ");
		for (i = 0; i < contained_sections.length; i++) {
			let section_id = contained_sections[i];
			copied_section = copied_section + "|" + document.getElementById(section_id).outerHTML;
		}
	}
	localStorage.setItem("copied_section", copied_section);
}

async function pasteSection() {

	saveCurrentState();

	let copied_sections = localStorage.getItem("copied_section").split("|");
	let first_section_number;
	for (i = 0; i < copied_sections.length; i++) {
		let copied_section_string = copied_sections[i];
		let html = new DOMParser().parseFromString(copied_section_string, "text/html");
		let sections = html.body.querySelectorAll("section");
		let copied_section = sections[0];
		section_number = getNewSectionNumber();
		let section_id = "section" + section_number;
		let section = copied_section;
		section.setAttribute("id", section_id);
		section.setAttribute("onclick", "selectSection('" + section_number + "');");
		section.setAttribute("onpaste", "pasteText(event);");
		let contained_sections = copied_section_string.match(/\bdata-contained_sections=(['"])(.*?)\1/gi);
		if (contained_sections) {
			section.dataset.contained_sections = " ";
		}
		document.getElementById("wrapper").appendChild(section);
		document.getElementById(section_id).style.zIndex = section_number;
		if (i == 0) first_section_number = section_number;
	}

	updateContainerSections();
	selectSection(first_section_number);
	reAlignSectionHandles();

}


function unselectSections() {
	let all_sections = document.querySelectorAll("section");
	for (i = 0; i < all_sections.length; i++) {
		all_sections[i].style.outline = "1px dashed gray";
	}

	hideHandles();
}




function toggleEditableSection() {
	if (!selected_section) return;
	
	if (document.getElementById("editable_section").checked) {
		selected_section.setAttribute("contenteditable", true);
	} else {
		selected_section.removeAttribute("contenteditable");
	}
}

function toggleInnerStyles() {
	if (!selected_section) return;
	
	if (document.getElementById("inner_styles").value == "Inner") {
		selected_section.dataset.inner_styles = "1";
	} else {
		delete selected_section.dataset.inner_styles;
	}
}

function toggleOverflowSection() {
	if (!selected_section) return;
	
	if (document.getElementById("overflow_section").checked) {
		selected_section.style.overflow = "visible";
	} else {
		selected_section.style.overflow = "hidden";
	}
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
	data = data.replace(/\s/g, " "); // hard space

	//let paste_result = localStorage.getItem("paste_result");
	let paste_result = document.getElementById("paste_result").value;
	if (paste_result == "plain") {
		let text = (e.originalEvent || e).clipboardData.getData('text/plain');
		document.execCommand("insertHTML", false, text); 
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

	saveCurrentState();

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

	saveCurrentState();

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
		case "pageTopLeft":
			selected_section.style.left = document.getElementById("wrapper").style.left;
			selected_section.style.top = document.getElementById("wrapper").style.top;
			break;
		case "pageCenterCenter":
			let new_left = (parseInt(document.getElementById("wrapper").style.width.replace("px", "")) / 2)   -   (parseInt(selected_section.style.width.replace("px", "")) / 2);
			selected_section.style.left = parseInt(new_left) + "px";
			let new_top = (parseInt(document.getElementById("wrapper").style.height.replace("px", "")) / 2)   -   (parseInt(selected_section.style.height.replace("px", "")) / 2);
			selected_section.style.top = parseInt(new_top) + "px";
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


function rotateRight() {
	document.getElementById("transform_type").value = "rotate";
	let element = document.getElementById("transform_degree1");
	element.onchange();
	let transform = selected_section.style.transform;
	let transform_degree = transform.split(", ");
	let new_rotate = parseInt(transform_degree[0].replace("rotate(", "").replace("deg)", "")) +  parseInt(localStorage.getItem("rotate_offset"));
	element.value = new_rotate;
	element.onchange();
}

function rotateLeft() {
	document.getElementById("transform_type").value = "rotate";
	let element = document.getElementById("transform_degree1");
	element.onchange();
	let transform = selected_section.style.transform;
	let transform_degree = transform.split(", ");
	let new_rotate = parseInt(transform_degree[0].replace("rotate(", "").replace("deg)", "")) -  parseInt(localStorage.getItem("rotate_offset"));
	element.value = new_rotate;
	element.onchange();
}


function setLayout(layout) {
	
	if (!selected_section) return;
	
	saveCurrentState();
	
	let border_width = document.getElementById("layout_border_width").value;
	let border_style = document.getElementById("layout_border_style").value;
	let border_color = document.getElementById("layout_border_color").value;
	let gap = document.getElementById("layout_gap").value;
	
	selected_section.style.padding = "0";
	selected_section.innerHTML = layout;
	
	selected_section.dataset.inner_styles = "1";
	let all_tables = selected_section.querySelectorAll("table");
	for (t = 0; t < all_tables.length; t++) {
		let table = all_tables[t];
		if (!table.style.height) table.style.height = "100%";
		table.style.borderSpacing = gap + "px";
		if (layout_gap == 0) {
			table.style.borderCollapse = "Collapse";
		} else {
			table.style.borderCollapse = "Separate";
		}

	}
	
	let all_tds = selected_section.querySelectorAll("table td");
	for (i = 0; i < all_tds.length; i++) {
		all_tds[i].style.border = border_width + "px " + border_style + " " + border_color;
	}

}



function togglePreview(element) {
	if (element.innerText == "👁 Preview off") {
		preview("on");
		element.innerText = "👁 Preview on";
	} else if (element.innerText == "👁 Preview on") {
		preview("off");
		element.innerText = "👁 Preview off";
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
function toggleDashPanel() {
	if (dash_panel_toggle) {
		document.getElementById("icons_bar").style.display = "none";
		document.getElementById("options_bar").style.display = "none";
		document.getElementById("dash_panel_wrapper").style.right = "-500px";
		document.getElementById("dash_panel_toggle").innerHTML = "◄";
		dash_panel_toggle = false;
		preview("on");
		hidePopupPanel();
	} else {
		document.getElementById("icons_bar").style.display = "block";
		document.getElementById("options_bar").style.display = "block";
		document.getElementById("dash_panel_wrapper").style.right = "44px";
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

	saveCurrentState();
	
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
	
}

function duplicateLinearTwoSided() {
	if (!selected_section) return;
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
}


function setZIndex(element) {
	if (parseInt(element.value) < 0) return;
	selected_section.style.zIndex = element.value;
}


async function saveDezyn(show_message = "yes") {

	let modified = new Date().getTime();
	let folder = document.getElementById("select_folders").value;
	localStorage.setItem("current_folder", folder);
	let data = document.getElementById("cover").innerHTML;

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
	let data = document.getElementById("cover").innerHTML;
	let object = {
		created:new Date().getTime(),
		modified:new Date().getTime(),
		folder:folder,
		data:data,
		keywords:""
	}	
	idbPutItem("dezynor_designs", {design_key:new_design_id, value:object});
	alert("Duplicated design successfully...");
	
	window.location.href = "design.html?key=" + new_design_id;
}

async function exportDezyn() {

	showMessage("Exporting... please wait for the file to be downloaded", "Chocolate");

	let zip_items = new JSZip();
	// design
	let data = document.getElementById("cover").innerHTML;
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
		
		
}

async function deleteDezyn() {
	if (confirm("Do you really want to delete this design?")) {
		await idbRemoveItem("dezynor_designs", design_id);
		showMessage("Deleted successfully", "Red");
		document.getElementById("cover").innerHTML = "";
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
			document.getElementById("cover").innerHTML = data;
			design_id = current_design_key;
			loadWrapperFormValues();
			let all_sections = document.querySelectorAll("section");
			if (all_sections.length > 0) {
				let first_section_number = all_sections[0].id.replace("section", "");
				addHandles();
				selectSection(first_section_number);
			}
			document.getElementById("select_folders").value = object.folder;
			
		}).then(function() { // add fresh object URLs of images

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
			let all_tds = document.querySelectorAll("section td");
			for (i = 0; i < all_tds.length; i++) {
				let td = all_tds[i];
				let image_key = td.dataset.image_key;
				if (image_key && image_key != "") {
					idbGetItem("dezynor_images", image_key).then(function(result) {
						if (result && td) td.style.backgroundImage = "url(" + URL.createObjectURL(result) + ")";
					});
				}
			}
		});

	} else {
		document.getElementById("wrapper").dataset.last_section = "1";
		setWrapperDefaultStyles();
		addHandles();
		addSection();
	}
}

function applyStyle() {

	if (!selected_section || (selected_section.dataset.inner_styles && selected_element.localName == "section")) return;

	let selected_styles = document.getElementById("select_styles").value.split(";");
	if (selected_styles.length == 0) return;

	saveCurrentState();

	selectElement();

	if (selected_section.dataset.inner_styles) {
		setElementDefaultStyles();
	} else {
		setSectionDefaultStyles();
	}

	for (i = 0; i < selected_styles.length; i++) {
		let style = selected_styles[i].split(":");
		let rule_name = style[0];
		let rule_code = style[1];
		let new_rule_name = "";
		let rule_name_parts = rule_name.split("-");
		for (k = 0; k < rule_name_parts.length; k++) {
			if (k == 0) {
				new_rule_name = rule_name_parts[k];
			} else {
				let temp = rule_name_parts[k];
				let first_letter = temp.substring(0, 1).toUpperCase();
				let rest_of_name = temp.substring(1, temp.length);
				let full_part = first_letter + rest_of_name;
				new_rule_name = new_rule_name + full_part;
			}
		}
		new_rule_name = new_rule_name.trim();
		
		if (new_rule_name.length == 0) continue;

		let is_short_rule = false;
		for (s = 0; s < short_style_rules.length; s++) {
			if (new_rule_name == short_style_rules[s]) is_short_rule = true;
		}
		if (!is_short_rule) rule_code = rule_code.replaceAll("px", "");

		setStyle(new_rule_name, null, rule_code, false);
	}
	
	loadFormValues(selected_element);
}


async function loadSelectFolders() {
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
}


async function loadSelectStyles() {
	let styles = await idbGetAllItems("dezynor_styles");
	let styles_options = "";
	for (i = 0; i < styles.length; i++) {
		let record_object = styles[i];
		let style_key = record_object.style_key;
		let style_object = record_object.value;
		let style_name = style_object.style_name;
		let style_code = style_object.style_code;
		styles_options = styles_options + "<option value='" + style_code + "'>" + style_name + "</option>";
	}
	document.getElementById("select_styles").innerHTML = styles_options;
}



/* -------------- FORMATTING ---------------------- */


let colorable_element = "";
let colorable_control = "";
let colorable_style = "";


function setWrapperDefaultStyles() {
	let wrapper = document.getElementById("wrapper");
	let width = localStorage.getItem("page_width")
	let height = localStorage.getItem("page_height");
	wrapper.style.top = "0";
	wrapper.style.left = "0";
	wrapper.style.width = width + "px";
	wrapper.style.height = height + "px";
	wrapper.style.overflow = "visible";
	setRandomWrapperBackgroundColor();
	document.getElementById("wrapper_width").value = width;
	document.getElementById("wrapper_height").value = height;
}


function setWrapperStyle(style, element) {
	
	let value = element.value;
	let wrapper = document.getElementById("wrapper");
	
	switch(style) {
		case "width":
			wrapper.style.width = value + "px";
			break;
		case "height":
			wrapper.style.height = value + "px";
			break;
		case "backgroundColor":
			wrapper.style.backgroundColor = value;
			break;
		case "overflow":
			wrapper.style.overflow = element.checked ? "visible" : "hidden";
			break;
	}
	
}

function setRandomWrapperBackgroundColor() {
	let random_color = getRandomRGBColor(document.getElementById("wrapper_random_range").value);
	document.getElementById("wrapper").style.backgroundColor = random_color;
	document.getElementById("wrapper_background_color").value = rgb2hex(random_color);
}

function loadWrapperFormValues() {
	let wrapper = document.getElementById("wrapper");
	document.getElementById("wrapper_width").value = wrapper.style.width.replace("px", "");
	document.getElementById("wrapper_height").value = wrapper.style.height.replace("px", "");

	document.getElementById("wrapper_background_color").value = rgb2hex(wrapper.style.backgroundColor);
}

function setStyle(style, element, value, save_state = true) {
	
	if (!selected_section) return;
	
	if (save_state) saveCurrentState();

	if (element && !value) value = element.value;

	let selected = selected_element;
	if (!selected || !selected_section.dataset.inner_styles) {
		selected = selected_section;
	}
	
	if (selected_content_element && selected_section.dataset.inner_styles) {
		selected = selected_content_element;
	}
	
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
		case "padding":
			selected.style.padding = value;
			break;
		case "paddingTop":
			selected.style.paddingTop = value + "px";
			break;
		case "paddingRight":
			selected.style.paddingRight = value + "px";
			break;
		case "paddingBottom":
			selected.style.paddingBottom = value + "px";
			break;
		case "paddingLeft":
			selected.style.paddingLeft = value + "px";
			break;
		case "marginTop":
			if (selected.localName == "section") break;
			selected.style.marginTop = value + "px";
			break;
		case "marginRight":
			if (selected.localName == "section") break;
			selected.style.marginRight = value + "px";
			break;
		case "marginBottom":
			if (selected.localName == "section") break;
			selected.style.marginBottom = value + "px";
			break;
		case "marginLeft":
			if (selected.localName == "section") break;
			selected.style.marginLeft = value + "px";
			break;
		case "direction":
			selected.style.direction = value;
			break;
		case "ul":
			if (selected.localName != "section") {
				selected.outerHTML = "<ul><li>" + selected.innerText + "</li></ul>";
			}
			break;
		case "ol":
			if (selected.localName != "section") {
				selected.outerHTML = "<ol><li>" + selected.innerText + "</li></ol>";
			}
			break;
		case "fontFamily":
			selected.style.fontFamily = value;
			break;
		case "fontSize":
			selected.style.fontSize = value + "px";
			break;
		case "color":
			selected.style.color = value;
			break;
		case "backgroundColor":
			selected.style.backgroundColor = value;
			break;
		case "wordSpacing":
			selected.style.wordSpacing = value + "px";
			break;
		case "letterSpacing":
			selected.style.letterSpacing = value + "px";
			break;
		case "textIndent":
			selected.style.textIndent = value + "px";
			break;
		case "lineHeight":
			selected.style.lineHeight = value + "px";
			break;
		case "textAlign":
			selected.style.textAlign = value;
			break;
		case "opacity":
			selected.style.opacity = value;
			break;
		case "borderCombined":
			let border_width = document.getElementById("border_width").value;
			let border_style = document.getElementById("border_style").value;
			let border_color = document.getElementById("border_color").value;
			selected.style.border = border_width + "px " + border_style  + " " + border_color;
			break;
		case "borderWidth":
			selected.style.borderWidth = value + "px";
			break;
		case "borderStyle":
			selected.style.borderStyle = value;
			break;
		case "borderColor":
			selected.style.borderColor = value;
			break;
		case "borderRadius":
			selected.style.borderRadius = value;
			break;
		case "borderTopLeftRadius":
			selected.style.borderTopLeftRadius = value + "px";
			break;
		case "borderTopRightRadius":
			selected.style.borderTopRightRadius = value + "px";
			break;
		case "borderBottomLeftRadius":
			selected.style.borderBottomLeftRadius = value + "px";
			break;
		case "borderBottomRightRadius":
			selected.style.borderBottomRightRadius = value + "px";
			break;
		case "columnCombined":
			let column_count = document.getElementById("column_count").value;
			let column_gap = document.getElementById("column_gap").value;
			let column_rule_width = document.getElementById("column_rule_width").value;
			let column_rule_style = document.getElementById("column_rule_style").value;
			let column_rule_color = document.getElementById("column_rule_color").value;
			selected.style.columnCount = column_count;
			selected.style.columnGap = column_gap + "px";
			selected.style.columnRuleWidth = column_rule_width + "px";
			selected.style.columnRuleStyle = column_rule_style;
			selected.style.columnRuleColor = column_rule_color;
			break;
		case "columnCount":
			selected.style.columnCount = value;
			break;
		case "columnGap":
			selected.style.columnGap = value + "px";
			break;
		case "columnRuleWidth":
			selected.style.columnRuleWidth = value + "px";
			break;
		case "columnRuleStyle":
			selected.style.columnRuleStyle = value;
			break;
		case "columnRuleColor":
			selected.style.columnRuleColor = value;
			break;
		case "clipPath":
			selected.style.clipPath = value;
			break;
		case "clipPathStyle":
			value = element.querySelector('span').getAttribute('style');
			value = value.replace("clip-path:", "");
			selected.style.clipPath = value;
			document.getElementById("clip_path").value = value;
			break;
		case "transform":
			let transform_type = document.getElementById("transform_type").value;
			let transform_degree1 = document.getElementById("transform_degree1").value;
			let transform_degree2 = document.getElementById("transform_degree2").value;
			if (transform_type == "rotate") {
				selected.style.transform = "rotate(" + transform_degree1 + "deg)";
				document.getElementById("transform_degree2").style.display = "none";
			} else if (transform_type == "skew") {
				document.getElementById("transform_degree2").style.display = "inline";
				selected.style.transform = "skew(" + transform_degree1 + "deg, " + transform_degree2 + "deg)";
			} else if (transform_type == "scale") {
				selected.style.transform = "scale(" + transform_degree1 + ", " + transform_degree2 + ")";
			}
			break;
		case "backgroundImage":
			if (!selected.dataset.image_key) break;
			idbGetItem("dezynor_images", selected.dataset.image_key).then(function(result) {
				if (!result) {
					console.log("Image not found");
					return;
				}				
				let image = URL.createObjectURL(result);
				selected.style.backgroundImage = "url(" + image + ")";
				selected.style.backgroundSize = document.getElementById("background_size").value;
				selected.style.backgroundRepeat = document.getElementById("background_image_repeat").checked ? "repeat" : "no-repeat";
				selected.style.backgroundPositionX = document.getElementById("background_position_x").value;
				selected.style.backgroundPositionY = document.getElementById("background_position_y").value;
			});
			break;
		case "backgroundGradientCombined":
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
			selected.style.backgroundImage = gradient_type + "(" + gradient_direction + ", " + color1 + ", " + color2 + ", " + color3 + ", " + color4 + ")";
			break;
		case "backgroundImageURL":
			let image_url = prompt("Provide an image URL");
			if (!image_url || image_url.trim().length == 0) break;
			selected.style.backgroundImage = "url(" + image_url + ")";
			selected.style.backgroundSize = document.getElementById("background_size").value;
			selected.style.backgroundRepeat = document.getElementById("background_image_repeat").checked ? "repeat" : "no-repeat";
			selected.style.backgroundPositionX = document.getElementById("background_position_x").value;
			selected.style.backgroundPositionY = document.getElementById("background_position_y").value;
			break;
		case "backgroundRepeat": 
			if (element.checked) {
				selected.style.backgroundRepeat = "repeat";
				selected.style.backgroundSize = "auto";
				document.getElementById("background_size").value = "auto";
			} else {
				selected.style.backgroundRepeat = "no-repeat";
			}
			break;
		case "backgroundSize": 
			selected.style.backgroundSize = value;
			break;
		case "backgroundPositionX": 
			selected.style.backgroundPositionX = value;
			break;
		case "backgroundPositionY": 
			selected.style.backgroundPositionY = value;
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
			selected.style.textShadow = text_shadow;
			break;
		case "boxShadow":
			let h = document.getElementById("box_shadow_h").value;
			let y = document.getElementById("box_shadow_y").value;
			let blur = document.getElementById("box_shadow_blur").value;
			let spread = document.getElementById("box_shadow_spread").value;
			let color = document.getElementById("box_shadow_color").value;
			let inset = document.getElementById("box_shadow_inset").checked ? "inset " : "";
			
			if (selected.dataset.image_key && inset.length == 0) {
				selected.style.filter = "drop-shadow(" + h + "px " + y + "px " + blur + "px " + color + ")";
				selected.style.boxShadow = "none";
			} else {
				selected.style.boxShadow = inset + h + "px " + y + "px " + blur + "px " + spread + "px " + color;
				selected.style.filter = "none";
			}
			break;

	}
	
	if (selected_content_element && selected_section.dataset.inner_styles) {
	    let selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(saved_range);
		saved_range.deleteContents();
		saved_range.insertNode(selected);
	}
}

function setRandomStyle(style) {
	
	if (!selected_section) return;
	
	saveCurrentState();

	let selected = selected_element;
	if (!selected || !selected_section.dataset.inner_styles) {
		selected = selected_section;
	}

	if (selected_content_element && selected_section.dataset.inner_styles) {
		selected = selected_content_element;
	}
		
	let random_color, random_range;

	switch (style) {
		case "color":
			random_range = document.getElementById("random_color_range").value;
			random_color = getRandomRGBColor(random_range);
			selected.style.color = random_color;
			document.getElementById("color").value = rgb2hex(random_color);
			break;
		case "backgroundColor":
			random_range = document.getElementById("random_color_range").value;
			random_color = getRandomRGBColor(random_range);
			selected.style.backgroundColor = random_color;
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
			selected.style.borderColor = random_color;
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

	if (selected_content_element && selected_section.dataset.inner_styles) {
	    let selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(saved_range);
		saved_range.deleteContents();
		saved_range.insertNode(selected);
	}	
}



function removeStyle(style) {

	if (!selected_section) return;
	
	saveCurrentState();
	
	let selected = selected_element;
	if (!selected || !selected_section.dataset.inner_styles) {
		selected = selected_section;
	}
	
	switch (style) {
		case "backgroundColor":
			document.getElementById("background_color").value = "#000001";
			selected.style.backgroundColor = "";
			break;
		case "border":
			selected.style.borderWidth = "0";
			selected.style.borderStyle = "solid";
			selected.style.borderColor = "rgb(255,255,255)";
			document.getElementById("border_width").value = "0";
			document.getElementById("border_style").value = "solid";
			document.getElementById("border_color").value = "#FFFFFF";
			break;
		case "borderRadius":
			selected.style.borderTopLeftRadius = "0";
			selected.style.borderTopRightRadius = "0";
			selected.style.borderBottomLeftRadius = "0";
			selected.style.borderBottomRightRadius = "0";
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
			selected.style.transform = "skew(0deg, 0deg)";
			break;
		case "textShadow":
			selected.style.textShadow = "0px 0px 0px #000000";
			document.getElementById("text_shadow_count").value = "0";
			document.getElementById("text_shadow_h").value = "0";
			document.getElementById("text_shadow_y").value = "0";
			document.getElementById("text_shadow_blur").value = "0";
			document.getElementById("text_shadow_color").value = "#000000";
			break;
		case "boxShadow":
			selected.style.filter = "none";
			selected.style.boxShadow = "0px 0px 0px 0px #000000";
			document.getElementById("box_shadow_h").value = "0";
			document.getElementById("box_shadow_y").value = "0";
			document.getElementById("box_shadow_blur").value = "0";
			document.getElementById("box_shadow_spread").value = "0";
			document.getElementById("box_shadow_color").value = "#000000";
			document.getElementById("box_shadow_inset").checked = false;
			break;
		case "backgroundImage":
			selected.style.backgroundImage = "";
			delete selected.dataset.image_key;
		case "clipPath":
			selected.style.clipPath = "";
			document.getElementById("clip_path").value = "";
			break;
			
	}	
	
}

function setSectionClass(value) {
	if (!selected_section) return;
	
	let selected = selected_element;
	if (!selected || !selected_section.dataset.inner_styles) {
		selected = selected_section;
	}
	
	switch (value) {
		case "clipText":
			selected.classList.add("clip_text");
			break;
		case "showSectionSide":
			selected.classList.remove("show_left");
			selected.classList.remove("show_right");
			selected.classList.remove("show_top");
			selected.classList.remove("show_bottom");
			let show_side = document.getElementById("show_section_side").value;
			if (show_side != "show_all") selected.classList.add(show_side);
			break;
	}
}


function removeSectionClass(value) {
	if (!selected_section) return;

	let selected = selected_element;
	if (!selected || !selected_section.dataset.inner_styles) {
		selected = selected_section;
	}

	switch (value) {
		case "clipText":
			selected.classList.remove("clip_text");
			break;
	}
	
}


function setBorderRadiusPreset(top_left, top_right, bottom_left, bottom_right) {
	if (!selected_section) return;
	saveCurrentState();

	let selected = selected_element;
	if (!selected || !selected_section.dataset.inner_styles) {
		selected = selected_section;
	}

	document.getElementById("border_radius1").value = top_left;
	document.getElementById("border_radius2").value = top_right;
	document.getElementById("border_radius3").value = bottom_left;
	document.getElementById("border_radius4").value = bottom_right;
	selected.style.borderTopLeftRadius = top_left + "px";
	selected.style.borderTopRightRadius = top_right + "px";
	selected.style.borderBottomLeftRadius = bottom_left + "px";
	selected.style.borderBottomRightRadius = bottom_right + "px";
}

function setBorderWidthPreset(width) {
	if (!selected_section) return;

	let selected = selected_element;
	if (!selected || !selected_section.dataset.inner_styles) {
		selected = selected_section;
	}

	saveCurrentState();
	document.getElementById("border_width").value = width;
	selected.style.borderWidth = width + "px";
}


function switchTextBackgroundColors() {
	let text_color = document.getElementById("color");
	let background_color = document.getElementById("background_color");
	let temp = text_color.value;
	text_color.value = background_color.value;
	background_color.value = temp;
	text_color.onchange();
	background_color.onchange();
}

function setColorableWrapper(control_id, color_style) {
	colorable_control = document.getElementById(control_id);
	colorable_element = document.getElementById("wrapper");
	colorable_style = color_style;
}

function setColorableElement(control_id, color_style) {
	if (!selected_section) return;
	
	colorable_control = document.getElementById(control_id);
	
	if (selected_content_element && selected_section.dataset.inner_styles) {
		colorable_element = selected_content_element;
	} else if (selected_section.dataset.inner_styles) {
		colorable_element = selected_element;
	} else if (!selected_section.dataset.inner_styles) {
		colorable_element = selected_section;
	}
	colorable_style = color_style;
}

function useColorPallette(color) {
	colorable_control.value = color;
	console.log(colorable_element);
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
	
	if (selected_content_element && selected_section.dataset.inner_styles) {
	    let selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(saved_range);
		saved_range.deleteContents();
		saved_range.insertNode(colorable_element);
	}	
	
}







async function uploadImage(element) {
	
	if (!(selected_section)) return;
	
	let selected = selected_element;
	if (!selected || (selected && selected.localName != "td") || !selected_section.dataset.inner_styles) {
		selected = selected_section;
	}

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
			let arr = data_url.split(",");
			let mime = arr[0].match(/:(.*?);/)[1];
			let bstr = atob(arr[1]);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			let resized_blob = new Blob([u8arr], { type: mime });
			await idbPutItem("dezynor_images", {image_key:image_key, value:resized_blob});
			selected.dataset.image_key = image_key;
			document.getElementById("upload_image").value = "";
			setStyle("backgroundImage");
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


function setTable() {
	if (!selected_section) return;
	if (selected_section.querySelector("table")) {
		if (!confirm("The selected box already contains a table,\ndo you want to regenerate the table?")) return;
	}
	
	selected_section.dataset.inner_styles = "1";
	
	let table_columns = parseInt(document.getElementById("table_columns").value);
	let table_rows = parseInt(document.getElementById("table_rows").value);
	let table_caption = document.getElementById("table_caption").checked;
	
	let border_width = parseInt(document.getElementById("table_border_width").value);
	let border_style = document.getElementById("table_border_style").value;
	let border_color = document.getElementById("table_border_color").value;
	let border = "border:" + border_width + "px " + border_style + " " + border_color + ";";
	
	let border_spacing = document.getElementById("table_border_spacing").value;
	
	let padding_top = document.getElementById("table_cell_padding_top").value;
	let padding_bottom = document.getElementById("table_cell_padding_bottom").value;
	let padding_left = document.getElementById("table_cell_padding_left").value;
	let padding_right = document.getElementById("table_cell_padding_right").value;
	let padding = "padding:" + padding_top + "px " + padding_right + "px " + padding_bottom + "px " + padding_left + "px;"; 
	let cell_style = border + padding;

	let caption = "";
	if (table_caption) {
		caption = "<caption>Caption</caption>";
	}

	let table = "";
	for (row = 0;row < table_rows; row++) {
		table = table + "<tr>";
		for (col = 0; col < table_columns; col++) {
			table = table + "<td style='" + cell_style + "'>&nbsp;</td>";
		}
		table = table + "</tr>";
	}
	let table_style = "";
	if (caption.length == 0) {
		table_style = "height:99%;";
	}
	if (border_spacing > 0) {
		table_style = table_style + "border-collapse:separate;border-spacing:" + border_spacing + "px;";
	}
	table_style = " style='" + table_style + "'";
	
	table = "<table" + table_style +  ">" + caption + "<tbody>" + table + "</tbody>" + "</table>";
	selected_section.innerHTML = table;
}

function getTableColumnPosition() {
	if (!selected_element || selected_element.localName != "td") return;
	let tr = selected_element.parentNode;
	let all_td = tr.querySelectorAll("td");
	for (i = 0; i < all_td.length; i++) {
		if (all_td[i] == selected_element) {
			return i
		}
	}	
}

function getTableRowPosition() {
	if (!selected_element || selected_element.localName != "td") return;
	let table = selected_element.parentNode.parentNode;
	let all_tr = table.querySelectorAll("tr");	let tr = selected_element.parentNode;
	for (k = 0; k < all_tr.length; k++) {
		all_tr_td = all_tr[k].querySelectorAll("td");
		for (s = 0; s < all_tr_td.length; s++) {
			if (all_tr_td[s] == selected_element) {
				return k;
			}
		}
	}	
}

function modifyTable(location) {
	if (!selected_element || selected_element.localName != "td") return;

	saveCurrentState();

	let table = selected_element.parentNode.parentNode;
	let all_tr = table.querySelectorAll("tr");
	let tr = selected_element.parentNode;
	let position = getTableColumnPosition();
	let all_tr_td;
	
	let table_modify = document.getElementById("table_modify").value;
	
	if (table_modify.indexOf("Insert row") > -1) {
		let cloned_tr = tr.cloneNode(true);
		let all_td = cloned_tr.querySelectorAll("td");
		for (i = 0; i < all_td.length; i++) {
			all_td[i].innerHTML = "&nbsp;";
		}
		if (table_modify == "Insert row before") {
			tr.before(cloned_tr);
		} if (table_modify == "Insert row after") {
			tr.after(cloned_tr);
		}
	} else if (table_modify.indexOf("Insert column") > -1) {
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				if (s == position) {
					let cloned_td = all_tr_td[s].cloneNode(true);
					cloned_td.innerHTML = "&nbsp;";
					if (table_modify == "Insert column before") {
						all_tr_td[s].before(cloned_td);
					} else if (table_modify == "Insert column after") {
						all_tr_td[s].after(cloned_td);
					}
				}
			}
		}
	} else if (table_modify == "Delete row") {
		tr.remove();
	} else if (table_modify == "Delete column") {
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				if (s == position) {
					all_tr_td[s].remove();
				}
			}
		}
	}
}

function setTableStyle(style, element, value) {

	if (!selected_element || selected_element.localName != "td") return;
	
	saveCurrentState();

	if (element && !value) value = element.value;

	let table = selected_element.parentNode.parentNode.parentNode;
	let tr = selected_element.parentNode;
	let all_table_td = selected_section.querySelectorAll("table td");

	switch (style) {
		case "borderCombined":
			let table_border_width = document.getElementById("table_border_width").value;
			let table_border_style = document.getElementById("table_border_style").value;
			let table_border_color = document.getElementById("table_border_color").value;
			for (i = 0; i < all_table_td.length; i++) {
				all_table_td[i].style.border = table_border_width + "px " + table_border_style + " " + table_border_color;
			}
			break;
		case "paddingCombined":
			let padding_top = document.getElementById("table_cell_padding_top").value;
			let padding_bottom = document.getElementById("table_cell_padding_bottom").value;
			let padding_left = document.getElementById("table_cell_padding_left").value;
			let padding_right = document.getElementById("table_cell_padding_right").value;
			for (i = 0; i < all_table_td.length; i++) {
				all_table_td[i].style.padding = padding_top + "px " + padding_right + "px " + padding_bottom + "px " + padding_left + "px";
			}
			break;
		case "borderSpacing":
			let border_spacing = document.getElementById("table_border_spacing").value;
			table.style.borderSpacing = border_spacing + "px";
			if (border_spacing == 0) {
				table.style.borderCollapse = "collapse";
			} else {
				table.style.borderCollapse = "separate";
			}
			break;
	}
	
}

function repeatTableStyle() {
	
	if (!selected_element || selected_element.localName != "td" || !selected_element.getAttribute("style")) return;
	
	saveCurrentState();
	
	let repeat_table_style = document.getElementById("repeat_table_style").value;
	
	let style = selected_element.getAttribute("style");
	let table = selected_element.parentNode.parentNode.parentNode;
	let all_tr = table.querySelectorAll("tr");
	let all_tr_td;
	let tr = selected_element.parentNode;
	
	let position = getTableColumnPosition();

	if (repeat_table_style == "To row") {
		let all_td = tr.querySelectorAll("td");
		for (i = 0; i < all_td.length; i++) {
			all_td[i].setAttribute("style", style);
		}
	} else if (repeat_table_style == "To column") {
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				if (s == position) {
					all_tr_td[s].setAttribute("style", style);
				}
			}
		}
	} else  if (repeat_table_style == "To table") {
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				all_tr_td[s].setAttribute("style", style);
			}
		}
	} else  if (repeat_table_style == "From last cell") {
		setToLastElementStyle();
	}
}




function setTableVerticalAlignment() {
	if (!selected_element || selected_element.localName != "td") return;
	
	let table = selected_element.parentNode.parentNode.parentNode;
	let tr = selected_element.parentNode;
	
	let align_element = document.getElementById("table_align_vertical").value;
	let align_type = document.getElementById("table_align_type_vertical").value;
	
	let position = getTableColumnPosition();

	let all_tr, all_tr_td, all_td;
	
	if (align_element == "cell") {
		selected_element.style.verticalAlign = align_type;
	} else if (align_element == "row") {
		all_td = tr.querySelectorAll("td");
		for (i = 0; i < all_td.length; i++) {
			all_td[i].style.verticalAlign = align_type;
		}
	} else if (align_element == "column") {
		all_tr = table.querySelectorAll("tr");
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				if (s == position) {
					all_tr_td[s].style.verticalAlign = align_type;
				}
			}
		}
	} else if (align_element == "table") {
		all_tr = table.querySelectorAll("tr");
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				all_tr_td[s].style.verticalAlign = align_type;
			}
		}
	}
}

function setTableHorizontalAlignment() {
	if (!selected_element || selected_element.localName != "td") return;
	
	let table = selected_element.parentNode.parentNode.parentNode;
	let tr = selected_element.parentNode;
	
	let align_element = document.getElementById("table_align_horizontal").value;
	let align_type = document.getElementById("table_align_type_horizontal").value;
	
	let position = getTableColumnPosition();

	let all_tr, all_tr_td, all_td;
	
	if (align_element == "cell") {
		selected_element.style.textAlign = align_type;
	} else if (align_element == "row") {
		all_td = tr.querySelectorAll("td");
		for (i = 0; i < all_td.length; i++) {
			all_td[i].style.textAlign = align_type;
		}
	} else if (align_element == "column") {
		all_tr = table.querySelectorAll("tr");
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				if (s == position) {
					all_tr_td[s].style.textAlign = align_type;
				}
			}
		}
	} else if (align_element == "table") {
		all_tr = table.querySelectorAll("tr");
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				all_tr_td[s].style.textAlign = align_type;
			}
		}
	}
}



function setTableDirection() {
	if (!selected_element || selected_element.localName != "td") return;
	
	let table = selected_element.parentNode.parentNode.parentNode;
	let tr = selected_element.parentNode;
	
	let direction_element = document.getElementById("table_direction").value;
	let direction_type = document.getElementById("table_direction_type").value;
	
	let position = getTableColumnPosition();

	let all_tr, all_tr_td, all_td;
	
	if (direction_element == "cell") {
		selected_element.style.direction = direction_type;
	} else if (direction_element == "row") {
		all_td = tr.querySelectorAll("td");
		for (i = 0; i < all_td.length; i++) {
			all_td[i].style.direction = direction_type;
		}
	} else if (direction_element == "column") {
		all_tr = table.querySelectorAll("tr");
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				if (s == position) {
					all_tr_td[s].style.direction = direction_type;
				}
			}
		}
	} else if (direction_element == "table") {
		all_tr = table.querySelectorAll("tr");
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				all_tr_td[s].style.direction = direction_type;
			}
		}
	}
}

function mergeTableCells() {
	if (!selected_element || selected_element.localName != "td") return;

	saveCurrentState();

	let table = selected_element.parentNode.parentNode;
	let all_tr = table.querySelectorAll("tr");
	let tr = selected_element.parentNode;
	let column_position = getTableColumnPosition();
	let row_position = getTableRowPosition();
	let all_tr_td;
	
	let merge_cells = parseInt(document.getElementById("table_merge_cells").value);
	let merge_direction = document.getElementById("table_merge_direction").value;
	
	if (merge_direction == "to right") {
		let all_td = tr.querySelectorAll("td");
		for (i = 0; i < all_td.length; i++) {
			if (i == column_position && column_position != all_td.length-1) {
				all_td[i].setAttribute("colspan", merge_cells);
			} else if (i > column_position && i < (column_position + merge_cells)) {
				all_td[i].remove();
			}
		}
	} else if (merge_direction == "to bottom") {
		for (k = 0; k < all_tr.length; k++){
			all_tr_td = all_tr[k].querySelectorAll("td");
			for (s = 0; s < all_tr_td.length; s++) {
				if (s == column_position && k == row_position && row_position != all_tr.length-1) {
					all_tr_td[s].setAttribute("rowspan", merge_cells);
				} else if (s == column_position && k > row_position && k < (row_position + merge_cells)) {
					all_tr_td[s].remove();
				}
			}
		}
	}

	
}


function setSelectionPlain() {
	let selection = window.getSelection();
	let selected_text = selection.toString();
	if (selected_text.length > 0) {
		
		saveCurrentState();
		
		let text_node = document.createTextNode(selected_text);
		let range = selection.getRangeAt(0);
		range.deleteContents();
		range.insertNode(text_node);
	}
}


function setElementDefaultStyles() {
	if (selected_element && selected_element.localName != "section") {
		
		saveCurrentState();
		
		selected_element.removeAttribute("style");
		selected_element.outerHTML = "<div>" + selected_element.textContent + "</div>"
	}
}

function setToLastElementStyle() {
	
	if (
		!selected_element || 
		!last_selected_element || 
		selected_element.localName == "section" || 
		last_selected_element.localName == "section" ||
		!last_selected_element.getAttribute("style")
	) {
		return;
	}
	
	selected_element.setAttribute("style", last_selected_element.getAttribute("style"));
}

function setSectionDefaultStyles() {
	if (!selected_section) return;
	
	saveCurrentState();
	
	selected_section.style.outline = "1px dashed gray";
	selected_section.style.direction = "ltr";
	selected_section.style.fontFamily = localStorage.getItem("default_font");
	selected_section.style.fontSize = "25px";
	selected_section.style.color = "rgb(0,0,0)";
	selected_section.style.lineHeight = "35px";
	selected_section.style.textAlign = "center";
	selected_section.style.backgroundColor = "";
	selected_section.style.wordSpacing = "0px";
	selected_section.style.letterSpacing = "0px";
	selected_section.style.textIndent = "0px";
	selected_section.style.textShadow = "0px 0px 0px #000000";
	selected_section.style.padding = "20px 0 0 0";
	selected_section.style.margin = "0";
	selected_section.style.backgroundImage = "linear-gradient(to top, #FFFFFF00, #FFFFFF00, #FFFFFF00, #FFFFFF00)"; // 00 at the end for alpha
	selected_section.style.backgroundPositionX = "center";
	selected_section.style.backgroundPositionY = "center";
	selected_section.style.opacity = "1";
	selected_section.style.backgroundSize = "100% 100%";
	selected_section.style.backgroundRepeat = "no-repeat";
	selected_section.style.borderWidth = "0";
	selected_section.style.borderStyle = "solid";
	selected_section.style.borderColor = "rgb(100,100,100)";
	selected_section.style.borderTopLeftRadius = "0px";
	selected_section.style.borderTopRightRadius = "0px";
	selected_section.style.borderBottomLeftRadius = "0px";
	selected_section.style.borderBottomRightRadius = "0px";
	selected_section.style.boxShadow = "0px 0px 0px 0px #000000";
	selected_section.style.filter = "none";
	selected_section.style.columnCount = "1";
	selected_section.style.columnGap = "10px";
	selected_section.style.columnFill = "auto";
	selected_section.style.columnRuleColor = "rgb(100,100,100)";
	selected_section.style.columnRuleWidth = "1px";
	selected_section.style.columnRuleStyle = "solid";
	selected_section.style.orphans = "1";
	selected_section.style.transform = "skew(0deg, 0deg)";
	selected_section.style.transformOrigin = "center center";
	selected_section.style.clipPath = "";
	selected_section.style.overflow = "visible";
}

function loadSectionDimensions() {
	document.getElementById("top").value = selected_section.style.top.replace("px", "");
	document.getElementById("left").value = selected_section.style.left.replace("px", "");
	document.getElementById("width").value = selected_section.style.width.replace("px", "");
	document.getElementById("height").value = selected_section.style.height.replace("px", "");
}

function loadFormValues(element) {

	loadDefaultFormValues();

	if (!selected_section) return;
	if (!selected_section.dataset.inner_styles || !element.getAttribute("style")) element = selected_section;

	document.getElementById("container_section").checked = selected_section.dataset.contained_sections ? true : false;
	document.getElementById("inner_styles").value = selected_section.dataset.inner_styles ? "Inner" : "Box";
	if (selected_section.style.overflow == "visible") {
		document.getElementById("overflow_section").checked = true;
	} else {
		document.getElementById("overflow_section").checked = false;
	}
	if (selected_section.getAttribute("contenteditable")) {
		document.getElementById("editable_section").checked = true;
	} else {
		document.getElementById("editable_section").checked = false;
	}
	
	
	if (element.style.fontFamily) document.getElementById("font_family").value = element.style.fontFamily.toString().replace('"', "").replace('"', "");
	if (element.style.fontSize) document.getElementById("font_size").value = element.style.fontSize.replace("px", "");
	if (element.style.color) document.getElementById("color").value = rgb2hex(element.style.color);
	if (element.style.backgroundColor == "") {
		document.getElementById("background_color").value = "#000001";
	} else {
		document.getElementById("background_color").value = rgb2hex(element.style.backgroundColor);
	}
	if (element.style.wordSpacing) document.getElementById("word_spacing").value = element.style.wordSpacing.replace("px", "");
	if (element.style.letterSpacing) document.getElementById("letter_spacing").value = element.style.letterSpacing.replace("px", "");
	if (element.style.textIndent) document.getElementById("text_indent").value = element.style.textIndent.replace("px", "");
	if (element.style.lineHeight) document.getElementById("line_height").value = element.style.lineHeight.replace("px", "");
	let text_shadow = element.style.textShadow;
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
			element.style.textShadow = "";		
		} else {
			document.getElementById("text_shadow_count").value = text_shadow_count;
		}
	}

	if (element.style.top) document.getElementById("top").value = element.style.top.replace("px", "");
	if (element.style.left) document.getElementById("left").value = element.style.left.replace("px", "");
	if (element.style.width) document.getElementById("width").value = element.style.width.replace("px", "").replace("%", "");
	if (element.style.height) document.getElementById("height").value = element.style.height.replace("px", "").replace("%", "");
	if (element.style.zIndex) document.getElementById("z_index").value = element.style.zIndex;
	if (element.style.paddingTop) document.getElementById("padding_top").value = element.style.paddingTop.replace("px", "");
	if (element.style.paddingRight) document.getElementById("padding_right").value = element.style.paddingRight.replace("px", "");
	if (element.style.paddingBottom) document.getElementById("padding_bottom").value = element.style.paddingBottom.replace("px", "");
	if (element.style.paddingLeft) document.getElementById("padding_left").value = element.style.paddingLeft.replace("px", "");

	if (element.style.marginTop) document.getElementById("margin_top").value = element.style.marginTop.replace("px", "");
	if (element.style.marginRight) document.getElementById("margin_right").value = element.style.marginRight.replace("px", "");
	if (element.style.marginBottom) document.getElementById("margin_bottom").value = element.style.marginBottom.replace("px", "");
	if (element.style.marginLeft) document.getElementById("margin_left").value = element.style.marginLeft.replace("px", "");

	if (element.style.paddingTop) document.getElementById("table_cell_padding_top").value = element.style.paddingTop.replace("px", "");
	if (element.style.paddingRight) document.getElementById("table_cell_padding_right").value = element.style.paddingRight.replace("px", "");
	if (element.style.paddingBottom) document.getElementById("table_cell_padding_bottom").value = element.style.paddingBottom.replace("px", "");
	if (element.style.paddingLeft) document.getElementById("table_cell_padding_left").value = element.style.paddingLeft.replace("px", "");
	
	let background_image = element.style.backgroundImage;

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
	}
	
	if (element.style.backgroundSize) document.getElementById("background_size").value = element.style.backgroundSize;
	if (element.style.backgroundPositionX) document.getElementById("background_position_x").value = element.style.backgroundPositionX;
	if (element.style.backgroundPositionY) document.getElementById("background_position_y").value = element.style.backgroundPositionY;
	if (element.style.backgroundRepeat) document.getElementById("background_image_repeat").checked = (element.style.backgroundRepeat == "repeat") ? true : false;
	if (element.style.opacity) document.getElementById("opacity").value = element.style.opacity;
	if (element.style.borderWidth) document.getElementById("border_width").value = element.style.borderWidth.replace("px", "");
	if (element.style.borderStyle) document.getElementById("border_style").value = element.style.borderStyle;
	if (element.style.borderColor) document.getElementById("border_color").value = rgb2hex(element.style.borderColor);

	if (element.style.borderWidth) document.getElementById("table_border_width").value = element.style.borderWidth.replace("px", "");
	if (element.style.borderStyle) document.getElementById("table_border_style").value = element.style.borderStyle;
	if (element.style.borderColor) document.getElementById("table_border_color").value = rgb2hex(element.style.borderColor);

	if (element.style.borderTopLeftRadius) document.getElementById("border_radius1").value = element.style.borderTopLeftRadius.replace("px", "");
	if (element.style.borderTopRightRadius) document.getElementById("border_radius2").value = element.style.borderTopRightRadius.replace("px", "");
	if (element.style.borderBottomLeftRadius) document.getElementById("border_radius3").value = element.style.borderBottomLeftRadius.replace("px", "");
	if (element.style.borderBottomRightRadius) document.getElementById("border_radius4").value = element.style.borderBottomRightRadius.replace("px", "");
	let filter_drop_shadow = element.style.filter;
	if (filter_drop_shadow) {
		let box_shadow = element.style.boxShadow;
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
	}
	if (element.style.columnCount) document.getElementById("column_count").value = element.style.columnCount;
	if (element.style.columnGap) document.getElementById("column_gap").value = element.style.columnGap.replace("px", "");
	if (element.style.columnRuleWidth) document.getElementById("column_rule_width").value = element.style.columnRuleWidth.replace("px", "");
	if (element.style.columnRuleStyle) document.getElementById("column_rule_style").value = element.style.columnRuleStyle;
	if (element.style.columnRuleColor) document.getElementById("column_rule_color").value = rgb2hex(element.style.columnRuleColor);
	
	let transform = element.style.transform;
	if (transform) {
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
	}

	if (element.style.clipPath) document.getElementById("clip_path").value = element.style.clipPath;
}




function loadDefaultFormValues() {
	document.getElementById("font_family").value = localStorage.getItem("default_font");
	document.getElementById("font_size").value = "25";
	document.getElementById("line_height").value = "35";
	document.getElementById("word_spacing").value = "0";
	document.getElementById("letter_spacing").value = "0";
	document.getElementById("text_indent").value = "0";
	document.getElementById("color").value = "#000000";
	document.getElementById("background_color").value = "#000001";
	document.getElementById("text_shadow_count").value = "0";
	document.getElementById("text_shadow_h").value = "0";
	document.getElementById("text_shadow_y").value = "0";
	document.getElementById("text_shadow_blur").value = "0";
	document.getElementById("text_shadow_color").value = "#000000";;

	document.getElementById("padding_top").value = "0";
	document.getElementById("padding_right").value = "0";
	document.getElementById("padding_bottom").value = "0";
	document.getElementById("padding_left").value = "0";
	document.getElementById("margin_top").value = "0";
	document.getElementById("margin_right").value = "0";
	document.getElementById("margin_bottom").value = "0";
	document.getElementById("margin_left").value = "0";
	document.getElementById("gradient_type").value = "linear-gradient";
	document.getElementById("gradient_direction").value = "to top";
	document.getElementById("gradient_color1").value = "#FFFFFF";
	document.getElementById("gradient_color2").value = "#FFFFFF";
	document.getElementById("gradient_color3").value = "#FFFFFF";
	document.getElementById("gradient_color4").value = "#FFFFFF";
	document.getElementById("gradient_alpha1").checked = false;
	document.getElementById("gradient_alpha2").checked = false;
	document.getElementById("gradient_alpha3").checked = false;
	document.getElementById("gradient_alpha4").checked = false;
	document.getElementById("background_size").value = "100% 100%";
	document.getElementById("background_position_x").value = "50%";
	document.getElementById("background_position_y").value = "50%";
	document.getElementById("background_image_repeat").checked = false;
	document.getElementById("opacity").value = "1";
	document.getElementById("border_width").value = "0";
	document.getElementById("border_style").value = "solid";
	document.getElementById("border_color").value = "#707070";
	document.getElementById("border_radius1").value = "0";
	document.getElementById("border_radius2").value = "0";
	document.getElementById("border_radius3").value = "0";
	document.getElementById("border_radius4").value = "0";
	document.getElementById("box_shadow_h").value = "0";
	document.getElementById("box_shadow_y").value = "0";
	document.getElementById("box_shadow_blur").value = "0";
	document.getElementById("box_shadow_spread").value = "0";
	document.getElementById("box_shadow_color").value = "#000000";
	document.getElementById("box_shadow_inset").checked = false;
	document.getElementById("column_count").value = "1";
	document.getElementById("column_gap").value = "10";
	document.getElementById("column_rule_width").value = "1";
	document.getElementById("column_rule_style").value = "solid";
	document.getElementById("column_rule_color").value = "#707070";
	document.getElementById("transform_type").value = "skew";
	document.getElementById("transform_degree1").value = "0";
	document.getElementById("transform_degree2").value = "0";
	document.getElementById("transform_degree2").style.visibility = "visible";
	document.getElementById("clip_path").value = "";
	document.getElementById("layout_gap").value = "10";
	
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
		|| 	(key >= 112 && key <= 122) // function keys
		|| 	(e.ctrlKey && key == keyCode.HOME) 
		|| 	(e.ctrlKey && key == keyCode.END) 
		|| 	(e.ctrlKey && key == keyCode.KEY_W) 
		|| 	(e.ctrlKey && key == keyCode.KEY_R) 
		|| 	(e.ctrlKey && key == keyCode.KEY_L) 
		|| 	(e.ctrlKey && key == keyCode.KEY_E) 
		|| 	(e.ctrlKey && key == keyCode.KEY_J) 
		|| 	(e.ctrlKey && key == keyCode.KEY_9) 
		|| 	(e.ctrlKey && key == keyCode.KEY_0) 
		|| 	(e.ctrlKey && key == keyCode.KEY_Z) 
		|| 	(e.altKey && key == keyCode.KEY_1) 
		|| 	(e.altKey && key == keyCode.KEY_2) 

	) 
	{
		e.preventDefault();
	}

}


document.onkeyup = function(e) {
	let key = e.which || e.keyCode;
	//console.log(key);

	if (key == keyCode.F1) {
		
	} else if (key == keyCode.F2) {
		toggleDashPanel();
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
		setStyle('direction', null, 'rtl');
	} else if (e.ctrlKey && key == keyCode.PERIOD) {
		setStyle('direction', null, 'ltr');
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
	
	} else if (e.ctrlKey && key == keyCode.KEY_Z) {
		revertToLastState();
	} else if (e.altKey && key == keyCode.KEY_4) {
		pasteSection();
	} else if (e.altKey && key == keyCode.KEY_3) {
		copySection();
	} else if (e.altKey && key == keyCode.KEY_2) {
		duplicateSection();
	} else if (e.altKey && key == keyCode.KEY_1) {
		addSection();
	} else if (e.shiftKey && e.altKey && key == keyCode.DELETE) {
		removeContainerSection();
	} else if (e.altKey && key == keyCode.DELETE) {
		removeSection();
	} else if (e.altKey && key == keyCode.SUBTRACT) {
		resizeSection('fullWidth');
	} else if (e.altKey && key == keyCode.ADD) {
		resizeSection('fullHeight');
	} else if (e.altKey && key == keyCode.ENTER) {
		alignSection('hCenter');
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
		rotateLeft();
	} else if (e.altKey && key == keyCode.NUMPAD_8) {
		shiftSection('up');
	} else if (e.altKey && key == keyCode.NUMPAD_9) {
		rotateRight();
	} else if (e.altKey && key == keyCode.UP_ARROW) {
		let section_top = parseInt(selected_section.style.top.replace("px", ""));
		let section_bottom = section_top + parseInt(selected_section.style.height.replace("px", ""));
		let wrapper_top = parseInt(document.getElementById("wrapper").style.top.replace("px", ""));
		let wrapper_bottom = parseInt(document.getElementById("wrapper").style.height.replace("px", ""));
		if (section_top == wrapper_top) {
			alignSection('vBottom');
		} else if (section_bottom == wrapper_bottom) {
			alignSection('vCenter');
		} else {
			alignSection('vTop');
		}
	} else if (e.altKey && key == keyCode.DOWN_ARROW) {
		let section_top = parseInt(selected_section.style.top.replace("px", ""));
		let section_bottom = section_top + parseInt(selected_section.style.height.replace("px", ""));
		let wrapper_top = parseInt(document.getElementById("wrapper").style.top.replace("px", ""));
		let wrapper_bottom = parseInt(document.getElementById("wrapper").style.height.replace("px", ""));
		if (section_bottom == wrapper_bottom) {
			alignSection('vTop');
		} else if (section_top == wrapper_top) {
			alignSection('vCenter');
		} else {
			alignSection('vBottom');
		}
	} else if (e.altKey && key == keyCode.RIGHT_ARROW) {
		let section_left = parseInt(selected_section.style.left.replace("px", ""));
		let section_right = section_left + parseInt(selected_section.style.width.replace("px", ""));
		let wrapper_left = parseInt(document.getElementById("wrapper").style.left.replace("px", ""));
		let wrapper_right = parseInt(document.getElementById("wrapper").style.width.replace("px", ""));
		if (section_right == wrapper_right) {
			alignSection('hLeft');
		} else if (section_left == wrapper_left) {
			alignSection('hCenter');
		} else {
			alignSection('hRight');
		}
	} else if (e.altKey && key == keyCode.LEFT_ARROW) {
		let section_left = parseInt(selected_section.style.left.replace("px", ""));
		let section_right = section_left + parseInt(selected_section.style.width.replace("px", ""));
		let wrapper_left = parseInt(document.getElementById("wrapper").style.left.replace("px", ""));
		let wrapper_right = parseInt(document.getElementById("wrapper").style.width.replace("px", ""));
		if (section_left == wrapper_left) {
			alignSection('hRight');
		} else if (section_right == wrapper_right) {
			alignSection('hCenter');
		} else {
			alignSection('hLeft');
		}
	} else if (key == keyCode.DOWN_ARROW || key == keyCode.UP_ARROW || key == keyCode.RIGHT_ARROW || key == keyCode.LEFT_ARROW) {
		selectElement();
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
