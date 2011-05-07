$(document).ready(function(){
	//$('#content').hide();
	//$('#unlock').show();
	$('#unlockField').dontType();
	
	$(".button").click(function(){
		processForm($(this));
	});
	
	$('#unlock_submit').bind('click',function(e){
		var unlockcode = $(document.getElementById('unlockField')).val();
			
		alert(' Unlock code: ' + password ); 
		e.preventDefault();
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