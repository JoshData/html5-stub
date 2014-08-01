function show_modal_error(title, message) {
	$('#error_modal h4').text(title);
	$('#error_modal p').text(message);
	$('#error_modal').modal({});
}

var is_ajax_loading = false;
function ajax(options) {
	setTimeout("if (is_ajax_loading) $('#ajax_loading_indicator').fadeIn()", 100);
	function hide_loading_indicator() {
		is_ajax_loading = false;
		$('#ajax_loading_indicator').hide();
	}
	var old_success = options.success;
	var old_error = options.error;
	options.success = function(data) {
		hide_loading_indicator();
		if (data.status == "error")
			show_modal_error("Error", data.message);
		else if (old_success)
			old_success(data);
	};
	options.error = function() {
		hide_loading_indicator();
		show_modal_error("Error", "Something went wrong, sorry.")
		if (old_error) old_error();
	};
	is_ajax_loading = true;
	$.ajax(options);
}

