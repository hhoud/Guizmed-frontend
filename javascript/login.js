$(document).ready(function(){
	$('#unlockField').dontType();
	$('#pin').dontType();
	//$('#unlockF').dontType();
	
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
	
	$('#error_dialog').dialog({
		autoOpen: false,
		width: 'auto',
		buttons: {
			"Ok": function() {
				$(this).dialog("close");
			}
		}
	});
	
	/**
	 * Process the login form
	 */
	$("#btn_login").click(function(){
		processForm($(this), function(data){
			if(!data || data == "ERROR"){
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
						//if the registration is not complete, show the first login screen.
						if(data.message.unlock == "false"){
							hidePages();
							$('#first_login').show();
						}else{
							//else redirect to the main page
							window.location = "main.html";
						}
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
	
	$('#unlock_submit').bind('click',function(e){
		var unlockcode = $(document.getElementById('unlockField')).val();
		processForm($(this),function(data){
			//if successful unlock, send through to main
			if(data == "ERROR" || !data){
				$('#dialog').dialog('open');
				//TODO: clear the dontType unlock screen
			}else{
				var check = $.parseJSON(data);
				if(check.message.login)
					window.location = "main.html";
				else
					$('#dialog').dialog('open');
			}
		});
		e.preventDefault();
	});
	
	//Check the querystring for unlock vs login
	if($.QueryString("p")=="ul"){
		hidePages();
		$('#unlock').show();
	}
	
	$('#btn_register').click(function(){
		//check if conf and new password are the same
		if($('#new_pass').val() == $('#conf_pass').val()){
			processForm($(this),function(data){
				if(!data || data == "ERROR"){
					$('#error_dialog').dialog('open');
					//TODO: clear the dontType unlock screen
				}else{
					window.location = "main.html";
				}
			});
		}
	});
});