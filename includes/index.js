
if (localStorage.getItem("page_width") === null) localStorage.setItem("page_width", "1000");
if (localStorage.getItem("page_height") === null) localStorage.setItem("page_height", "500");
if (localStorage.getItem("copied_section") === null) localStorage.setItem("copied_section", "");
if (localStorage.getItem("show_background_images") === null) localStorage.setItem("show_background_images", "true");
if (localStorage.getItem("duplicate_offset_x") === null) localStorage.setItem("duplicate_offset_x", "10");
if (localStorage.getItem("duplicate_offset_y") === null) localStorage.setItem("duplicate_offset_y", "0");
if (localStorage.getItem("resize_offset") === null) localStorage.setItem("resize_offset", "10");
if (localStorage.getItem("move_offset") === null) localStorage.setItem("move_offset", "2");
if (localStorage.getItem("rotate_offset") === null) localStorage.setItem("rotate_offset", "1");
if (localStorage.getItem("font_size_change") === null) localStorage.setItem("font_size_change", "3");
if (localStorage.getItem("line_height_change") === null) localStorage.setItem("line_height_change", "3");
if (localStorage.getItem("word_spacing_change") === null) localStorage.setItem("word_spacing_change", "1");
if (localStorage.getItem("max_upload_width") === null) localStorage.setItem("max_upload_width", "1280");
if (localStorage.getItem("max_upload_height") === null) localStorage.setItem("max_upload_height", "1280");
if (localStorage.getItem("current_folder") === null) localStorage.setItem("current_folder", "default");
if (localStorage.getItem("default_font") === null) localStorage.setItem("default_font", "Noto Naskh Arabic");
if (localStorage.getItem("paste_result") === null) localStorage.setItem("paste_result", "plain");
if (localStorage.getItem("show_multiple_dash_panels") === null) localStorage.setItem("show_multiple_dash_panels", "false");
if (localStorage.getItem("automatically_save") === null) localStorage.setItem("automatically_save", "false");
if (localStorage.getItem("automatically_save_after") === null) localStorage.setItem("automatically_save_after", "30");
if (localStorage.getItem("last_designs_saved") === null) localStorage.setItem("last_designs_saved", JSON.stringify([""]));
if (localStorage.getItem("stats_total_designs") === null) localStorage.setItem("stats_total_designs", "0");
if (localStorage.getItem("stats_total_images") === null) localStorage.setItem("stats_total_images", "0");
if (localStorage.getItem("stats_total_fonts") === null) localStorage.setItem("stats_total_fonts", "0");
if (localStorage.getItem("stats_total_styles") === null) localStorage.setItem("stats_total_styles", "0");
if (localStorage.getItem("stats_total_folders") === null) localStorage.setItem("stats_total_folders", "0");


window.onload = async function() {

	await delay(500);

	let all_fonts = await idbGetItem("dezynor_settings", "fonts");
	document.querySelector("#count_stats #total_fonts").innerHTML = "Fonts <span>" + all_fonts.length + "</span>";

	let all_folders = await idbGetItem("dezynor_settings", "folders");
	document.querySelector("#count_stats #total_folders").innerHTML = "Folders <span>" + all_folders.length + "</span>";

	let all_styles = await idbGetAllItems("dezynor_styles");
	document.querySelector("#count_stats #total_styles").innerHTML = "Styles <span>" + all_styles.length + "</span>";
	
	await delay(200);
	let all_designs = await idbGetAllItems("dezynor_designs");
	document.querySelector("#count_stats #total_designs").innerHTML = "Designs <span>" + all_designs.length + "</span>";

	await delay(200);
	let all_images = await idbGetAllItems("dezynor_images");
	document.querySelector("#count_stats #total_images").innerHTML = "Images <span>" + all_images.length + "</span>";
}



