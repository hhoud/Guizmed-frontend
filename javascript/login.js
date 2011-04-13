$(document).ready(function(){
	$(".button").click(function(){
		processForm($(this));
	});
	
	/**
	 * Convert dialog div into dialog and hide it
	 */
	$('#dialog').dialog({
		autoOpen: false,
		width: 'auto',
		buttons: {
			"Ok": function() { 
				$(this).dialog("close"); 
			} 
		}
	});
});