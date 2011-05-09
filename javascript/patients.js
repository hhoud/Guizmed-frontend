$(document).ready(function(){
	
	/**
	 * Catch all input and filter the list
	 */
	$('.filterinput').keyup(function () {
		filterList($(this), $('#p_lookup'));
	});
	
	/**
	 * Convert dialog div into dialog and hide it
	 */
	$('#dialog').dialog({
		autoOpen: false,
		width: 'auto',
		buttons: {
			"Yes": function() { 
				$(this).dialog("close"); 
			},
			"No": function(){
				$(this).dialog("close");
			}
		}
	});
	
	$('.datepicker').datepicker({ autoSize: true, dateFormat: 'yy-mm-dd' });
	
	$('.pat_add').click(function(ev){
		hidePages();
		$('#pat_add').show();
		updateHistory(true);
	});

	/**
	 * Get the list of patients from the backend
	 */
	callWebservice("","/patienten",function(data){
		var patients = $.parseJSON(data);
		//Render the list of patients
		Tempo.prepare("p_lookup").render(patients.allPatients);
	});
	
	$('.p_item').live('click',function(){
		//update the url for navigation
		updateHistory(true);
		//Hide the other pages
		hidePages();
		//retrieve patient info
		var p_id = $(this).find('span').attr('id');
		callWebservice("","/patienten/show/patient_id/"+p_id,function(data){
			var p_info = $.parseJSON(data);
			//check if the prescription was stopped and if it still has effect on the body
			//Render the page with all the info
			Tempo.prepare("info").notify(function(event){
				if(event.type == TempoEvent.Types.RENDER_COMPLETE){
					//remove the delete icon for the last row (adding a new item)
					$('[name|="new"]').parent('li').find('a:nth-child(2)').hide();
					//activate the accordion
					$('#accordion').accordion({ fillSpace: true, active: 1, collapsible: true });
				}
			}).render(p_info.patient);
			//Show the info page of the patient
			$("#info").show();
		});
	});
	
	//bind the delete function to the icon
	$('.del').live('click',function(){
		//find the text of the item that has to be stopped
		var del = {"stop_item":$(this).parents('li').find('a:first').text()};
		
		//render the dialog
		Tempo.prepare("dialog").notify(function(event){
			if(event.type == TempoEvent.Types.RENDER_COMPLETE){
				//open the dialog when rendered
				$('#dialog').dialog('open');
			}
		}).render(del);
	});
	
	$('#btn_add_patient').click(function(){
		processForm($(this), function(data){
			hidePages();
	    	$('#p_info').show();
		});
	});
	
	$('a[name="new"]').live('click',function(){
		hidePages();
		var type = $(this).attr('class');
		if(type.indexOf("presc") != -1)
			$('#presc_add').show();
		else if(type.indexOf("npsy") != -1)
			$('#npsy_add').show();
	});
});