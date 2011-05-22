$(document).ready(function(){
	/**
	 * Convert dialog div into dialog and hide it
	 */
	$('#dialog').dialog({
		autoOpen: false,
		width: 'auto',
		modal: true,
		buttons: {
			"Ok": function() { 
				$(this).dialog("close"); 
			} 
		}
	});
	
	/**
	 * Process the login form
	 */
	$(".button").click(function(){
		processForm($(this), function(data){
			if(!data){
				//show error message
				$('#dialog').dialog('open');
			}else{
				//get the token out of the data if the login was successful
				var data = $.parseJSON(data);
				if(!data.error && data != "ERROR"){
					var token = data.message.inlog;
					if(token != "Failed"){
						//save the token in a cookie for 2 hours and set a timeout timer for 20 minutes.
						createCookie("tk",token, 2*60);
						createCookie("uid",data.message.userId, 2*60);
						createCookie("to","timeout",5);
						window.location = "manage_doctor.html";
					}else{
						//show error message
						$('#dialog').dialog('open');
					}
				}else{
					$('#dialog').dialog('open');
				}
			}
		});
	});
});