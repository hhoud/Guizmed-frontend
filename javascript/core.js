/**
 * CONFIG
 * */
var host = "http://guizmedkit.henryhoudmont.be/webservices";

function callWebservice(data, path, callback){
	$.ajax({
        type: "POST",
        url: host + path,
        data: data,
        success: callback
    });
}

/**
 * This function will update the url to be able to go back n-times.
 */
function updateHistory(up){
	var url = ""+window.location;
	var split = url.split("#");
	var nr = split[1];
	url = split[0];
	if(!up && !nr) window.location = "main.html";
	else{
		if(!up && nr){
			if(nr > 1)nr = "#" + (parseInt(nr)-1);
			else nr = "";
		}
		else if(up){
			if(nr)
				nr = "#" + (parseInt(nr)+1);
			else
				nr = "#1";
		}
		window.location = url + nr;
	}
}

/**
 * Get all the input fields of a form and send them through to the function taking care of the ajax call.
 * @param $btn	The submit button that has been clicked
 */
function processForm($btn){
	// get all the inputs into an array.
	var $form = $btn.parents("form");
    var $inputs = $form.find(':input');

    // get an associative array of just the values.
    var data = {};
    $inputs.each(function() {
        data[this.name] = $(this).val();
    });

    //the form should have the path as name attribute
    var path = $form.attr("name");

    switch(path){
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
		updateHistory(false);
	});
});

