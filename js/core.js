$(document).ready(function(){
	
	function login(){
		//Get the username and password from the fields in the form
		var user = $('#username').html();
		var pass = $('#pass').html();
		
		//Gather the credentials in an object
		var data = ({uname: user, pass: pass});
		
		//Send the credentials to the web-service.
		var path = "/login"
		callWebservice(data, path, loginSuccess);
		
	}
	
	function callWebservice(data, path, callback){
		$.ajax({
	        type: "POST",
	        url: "http://guizmed.henryhoudmont.be/webservices" + path,
	        data: data,
	        success: callback
	    });
	}
	
	function loginSuccess(data){
		//if(success){
			//save the token somewhere (session variable)
			
			//Send through to the home screen
			
		//}
	}
});