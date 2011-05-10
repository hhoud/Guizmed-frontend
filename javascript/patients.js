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
		//Hide the other pages
		$("#lookup").hide();
		//retrieve patient info
		var p_id = $(this).find('span').attr('id');
		callWebservice("","/patienten/show/patient_id/"+p_id,function(data){
			var p_info = $.parseJSON(data);
			//check if the prescription was stopped and if it still has effect on the body
			//create medicines in the p_info object
			//TODO check Hlf effect on the body in the back-end
			p_info.patient[0].prescriptions.push({"id":"new","med":{"name":"Nieuw..."}});
			p_info.patient[0]["non_psycho"] = {"id":"new","name":"Nieuw..."};
			
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
	
	$('.presc').live('click',function(){
		if($(this).attr('name').indexOf("new") == -1){
			hidePages();
			//get the prescription id
			var pr_id = $(this).attr('name');
			
			//get info about the prescription
			callWebservice("","/voorschriften/show/ad_presc_id/"+pr_id,function(data){
				var pr_info = $.parseJSON(data);
				
				//Render the page with all the info
				Tempo.prepare("presc_info").notify(function(event){
					if(event.type == TempoEvent.Types.RENDER_COMPLETE){
						$("#presc_info table tr td").each(function(){
							if($(this).text() == "")
								$(this).parents("tr").hide();
						});
					}
				}).render(pr_info.prescription);
				//Show the info page of the patient
				$('#presc_info').show();
			});
		}
	});
	
	//Navigate to the forms to add a prescription or a non-psychofarmacum
	$('a[name="new"]').live('click',function(){
		hidePages();
		var type = $(this).attr('class');
		if(type.indexOf("presc") != -1)
			$('#presc_add').show();
		else if(type.indexOf("npsy") != -1)
			$('#npsy_add').show();
	});
	
	$('#btn_presc_add').click(function(){
		processForm($(this),function(data){
			hidePages();
	    	$('#p_info').show();
		});
	});
	
	//if there's a patient_id, show the add_prescription for this patient
	var p_id = $.QueryString("p_id");
	if(p_id){
		hidePages();
		$('#presc_add').show();
		//TODO: get the name of the medicine for which the m_id is in the url and show it
		//$('#presc_add input[name="medFormId"]').attr('placeholder') = ;
		var m_id = $.QueryString("m_id");
		$('#presc_add input[name="medFormId"]').attr('value',m_id);
	}
	
	$('#presc_s_med').click(function(){
		window.location = 'meds.html?p_id='+$('#accordion').find('table').attr('id');
	});
});