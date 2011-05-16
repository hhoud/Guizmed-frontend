$(document).ready(function(){
	$('#unlockField').dontType();
	$('#pin').dontType();
	//$('#unlockF').dontType();
	
	$(".button").click(function(){
		processForm($(this), function(data){
			//get the token out of the data if the login was successful
			var data = $.parseJSON(data);
			//save the token in a cookie for 2 hours and set a timeout timer for 20 minutes.
			createCookie("tk",data.token, 2*60);
			createCookie("uid",data.user_id, 2*60);
			createCookie("to","timeout",20);
			//redirect to the main page
			window.location = "main.html";
		});
	});
	
	$('#unlock_submit').bind('click',function(e){
		var unlockcode = $(document.getElementById('unlockField')).val();
		processForm($(this),function(){
			//if successful unlock, send through to main
			window.location = "main.html";
		}); 
		e.preventDefault();
	});

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
	
	//Check the querystring for unlock vs login
	if($.QueryString("p")=="ul"){
		hidePages();
		$("unlock").show();
	}
	
	$('#btn_first_login').click(function(){
		hidePages();
		$('#first_login').show();
	});
	
	$('#btn_register').click(function(){
		//check if conf and new password are the same
		if($('#new_pass').val() == $('#conf_pass').val()){
			processForm($(this),function(){
				//if successful registration, send through to main.html
				window.location = "main.html";
			});
		}
	});
});