$(document).ready(function(){
	$('#unlockField').dontType();
	
	$(".button").click(function(){
		processForm($(this), function(data){
			//get the token out of the data if the login was successful
			var data = $.parseJSON(data);
			//save the token in a cookie for 2 hours and set a timeout timer for 20 minutes.
			createCookie("tk",data.token, 2*60);
			createCookie("to","timeout",20);
			//redirect to the main page
			window.location = "main.html";
		});
	});
	
	$('#unlock_submit').bind('click',function(e){
		var unlockcode = $(document.getElementById('unlockField')).val();
		//TODO: Process the form and allow through to main.html
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
	
	//Check the querystring for unlock vs login
	if($.QueryString("p")=="ul"){
		hidePages();
		$("unlock").show();
	}
});