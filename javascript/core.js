/**
 * CONFIG
 * */
var host = "/backend_dev.php";

function isEmail(s){
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/; 
	return emailPattern.test(s); 
} 



/**
 * 
 * @param {Object} s
 */
function isDate(s)
{   
  // make sure it is in the expected format
  if (s.search(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/) != 0) {
  	return false;
  }else{
  	return true;
  }
}
  
  
/**
 * 
 * @param {Object} data
 */
function activateValid(data){
        data.addClass("valid");
        data.removeClass("notvalid");
}

/**
 * 
 * @param {Object} data
 */
function activateNotValid(data){
    data.addClass("notvalid");
    data.removeClass("valid");
}


/**
 * 
 * @param {Object} data
 */
function activateValidAdmin(data){
        data.addClass("valid");
        data.removeClass("notvalid");
}

/**
 * 
 * @param {Object} data
 */
function activateNotValidAdmin(data){
    data.addClass("notvalid");
    data.removeClass("valid");
}

/**
 * 
 * @param {Object} data
 */
function validateString(data){
    if(data.val().length<=3){
        activateNotValid(data.parent());
		return false;
	}else{
		activateValid(data.parent());
		return true;
	}
}

function validateInputEmpty(data){
	if(data.val().split(' ').join('') == ""){
        activateNotValid(data.parent());
		return false;
	}else{
		activateValid(data.parent());
		return true;
	}
}

function validateStringAdmin(data){
	 if(data.val().length<=3){
        activateNotValidAdmin(data);
		return false;
	}else{
		activateValidAdmin(data);
		return true;
	}
}

/**
 * 
 * @param {Object} data
 */
function validateEmailAdmin(data){
	if(isEmail(data.val())){
		activateValid(data);
		return true;
	}else{
		activateNotValid(data);
		return false;
	}
}

/**
 * 
 * @param {Object} data
 */
function validateDate(data){
	if(isDate(data.val())){
		activateValid(data.parent());
		return true;
	}else{
		activateNotValid(data.parent());
		return false;
	}
}


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
	if(tk)createCookie("to","timeout", 5);
	if(data)
		data["token"] = tk;
	else
		data = {"token":tk};
	data["user_id"] = readCookie("uid");
	$.ajax({
        type: "POST",
        url: host + path,
        data: data,
        success: callback,
        error: function(msg){
			console.log(msg.responseText);
			callback("ERROR");
		}
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
    var $selects = $form.find('select');
    var validCheckAmount = 0;

    // get an associative array of just the values.
    var data = {};
    if($form.attr('name') == "/medicijnbeheer/create"){
	    data["bnf_percentage_id"] = new Array();
	    data["bnf_value"] = new Array();
	    data["chem_bonding_id"] = new Array();
	    data["med_ki_val_id"] = new Array();
    }
    
    $inputs.each(function() {
    		if ($(this).hasClass("valCheckString")) {
				if (!validateString($(this))) {
						validCheckAmount ++;
				}
			}else if($(this).hasClass("valCheckDate")){
				if (!validateDate($(this))) {
						validCheckAmount ++;
				}
			}else if($(this).hasClass("valCheckEmpty")){
				if (!validateInputEmpty($(this))) {
						validCheckAmount ++;
				}
			}else if($(this).hasClass("valCheckEmailAdmin")){
				if (!validateEmailAdmin($(this))) {
						validCheckAmount ++;
				}
			}else if($(this).hasClass("valCheckStringAdmin")){
				if (!validateStringAdmin($(this))) {
						validCheckAmount ++;
				}
			}
			
    		if($(this).attr('type')=="radio"){
    			if($(this).is(':checked'))
    				data[this.name] = $(this).val();
    		}else if($(this).attr('name').indexOf("bnf_") > -1){
    			data.bnf_percentage_id.push($(this).attr('id'));
    			data.bnf_value.push($(this).val());
    		}else if($(this).attr('class')!="no_process"){
    			data[this.name] = $(this).val();
    		}
    });
    
    //check the select boxes for their values
    $selects.each(function(){
    	//the med form has to be treated a little different
    	if(this.name.indexOf("neuro_") > -1){
    		data.chem_bonding_id.push($(this).attr('id'));
    		data.med_ki_val_id.push($(this).find('option:selected').val());
    	}else{
    		data[this.name] = $(this).find('option:selected').val();
    	}
    });
    
    if(validCheckAmount == 0){
	    //the form should have the path as name attribute
	    var path = $form.attr("name");
	    //send the data to the database and if successful, show the new patient's page.
	    callWebservice(data, path, callback);
    }else{
    	callback(false);
    }
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
	var path = ""+window.location;
	if(!checkLoggedIn() && path.indexOf("admin")>-1 && path.indexOf("index.html") == -1){
		window.location = "index.html";
	}else if(!checkLoggedIn() && path.indexOf("index.html") == -1){
		window.location = "index.html";
	}else if(checkLoggedIn() && !checkTimeout() && path.indexOf("index.html") == -1 && path.indexOf("admin")<0){
		window.location = "index.html?p=ul";
	}
	
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
		if($('#lookup').is(':hidden')){
			hidePages();
			$('#lookup').show();
		}else{
			window.location="main.html";
		}
	});
});

