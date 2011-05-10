/**
 * CONFIG
 * */
var host = "http://www.guizmed.com.localhost/backend_dev.php";

/**
 * Create a cookie that stays alive for 20 minutes.
 * @param name key of the key-value pair
 * @param value value of the key-value pair
 */
function createCookie(name,value, minutes) {
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
}

/**
 * Read a cookie, here used for the token
 * @param name = name of the key-value
 * @return the key-value pair in the cookie
 */
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function callWebservice(data, path, callback){
	//find the token
	var tk = readCookie("tk");
	//update the timeout cookie
	if(tk)createCookie("to","timeout", 20);
	data["token"] = tk;
	$.ajax({
        type: "POST",
        url: host + path,
        data: data,
        success: callback
    });
}

/**
 * Hide all the 'subpages' in a page
 */
function hidePages(){
	$('#content').children('div').hide();
}

/**
 * Check if there's a token, if not the user is not logged in and should be redirected.
 * @return true or false depending if logged in.
 */
function checkLoggedIn(){
	//find the token
	var tk = readCookie("tk");
	if(tk)return true;
	else return false;
}

/**
 * Check if the application is in timeout, if so, show the unlock page
 * @return true or false depending on the timeout
 */
function checkTimeout(){
	//find the timeout
	var to = readCookie("to");
	if(to)return true;
	else return false;
}

/**
 * Get all the input fields of a form and send them through to the function taking care of the ajax call.
 * @param $btn	The submit button that has been clicked
 */
function processForm($btn, callback){
	// get all the inputs into an array.
	var $form = $btn.parents("form");
    var $inputs = $form.find(':input');

    // get an associative array of just the values.
    var data = {};
    $inputs.each(function() {
    	if($(this).attr('type')=="radio"){
    		if($(this).is(':checked'))
    			data[this.name] = $(this).val();
    	}else{
    		data[this.name] = $(this).val();
    	}
    });

    //the form should have the path as name attribute
    var path = $form.attr("name");

    //send the data to the database and if successful, show the new patient's page.
    callWebservice(data, path, callback);
    
    /*switch(path){
		case "login":
			//redirect to the main page if successful
		    if(($inputs[0].value == "test") && ($inputs[0].value == "test")){
		    	//show main page
		    	window.location = "main.html";
		    }else{
		    	//show error
		    	$('#dialog').dialog('open');
		    }
		    break;
    }*/
}

/**
 * Filter a list of data after each keypress.
 */
function filterList($input, $list){
    var filter = $input.val(), count = 0;
    $list.find("li").each(function () {
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).hide();
        } else {
            $(this).show();
            count++;
        }
    });
}
$(document).ready(function(){
	/*var path = ""+window.location;
	if(!checkLoggedIn() && path.indexOf("index.html") == -1){
		window.location = "index.html";
	}else if(checkLoggedIn() && !checkTimeout()){
		window.location = "index.html?p=ul";
	}*/
	
	if($(".button")){
		$(".button").each(function(){
			$(this).button();
		});
	}
	/**
	 * If a user presses enter, send it to the next input or if it's the last one, to the submit button.
	 */
	$("form :input").keyup(function(event){
		if(event.keyCode == 13){
			$el = $(":input:eq(" + $(":input").index(this) + 1 + ")");
			if($el.is("input"))
				$el.focus();
			else
				$(this).parents('form').find('.button').click();
		}
	});
	
	/**
	 * Return one page
	 * */
	$(".btn_back").click(function(){
		history.back();
	});
});

