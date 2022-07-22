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
