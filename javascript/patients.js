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
	
	$('.datepicker').datepicker({ autoSize: true, dateFormat: 'dd-mm-yy' });
	
	/**
	 * Hide all the 'pages' in patients.html
	 */
	function hidePages(){
		$('#lookup').hide();
		$('#info').hide();
		$('#pat_add').hide();
		$('#info').hide();
		$('#presc_add').hide();
	}
	
	$('.pat_add').click(function(ev){
		hidePages();
		$('#pat_add').show();
		updateHistory(true);
	});
	
	var patients = [{"pat_id":"hhoud",
	"pat_lname":"Houdmont",
	"pat_fname":"Henry"},
	{"pat_id":"ojans",
	"pat_lname":"Janssens",
	"pat_fname":"Olivier"},
	{"pat_id":"wjans",
	"pat_lname":"Janssens",
	"pat_fname":"Willem"}];

	var pat_info = new Array();
	pat_info["hhoud"] = {"personal":{"lname":"Houdmont",
									"fname":"Henry",
									"gender":"M",
									"dob":"09/02/1988",
									"since":"24/04/2005"},
						"meds":[{"med_id":"flup",
								"med_name":"Flupentixol",
								"start":"10/04/2011"},
								{"med_id":"pimo",
								"med_name":"Pimozide",
								"start":"24/03/2011"}],
						"presc":[{"presc_id":"presc1",
								"med_name":"Flupentixol",
								"start":"10/04/2011"},
								{"presc_id":"presc2",
								"med_name":"Pimozide",
								"start":"24/03/2011"},
								{"presc_id":"presc3",
								"med_name":"Quetiapine",
								"start":"5/03/2011"},
								{"presc_id":"new",
								"med_name":"New prescription"}],
						"npsy":[{"npsy_id":"cranj",
								"npsy_name":"Cranberry juice"},
								{"npsy_id":"new",
								"npsy_name":"New non-psychofarmaca"}]};
	pat_info["wjans"] = {"personal":{"lname":"Janssens",
									"fname":"Willem",
									"gender":"M",
									"dob":"20/05/1988",
									"since":"09/11/2001"},
							"meds":[{"med_id":"pimo",
									"med_name":"Pimozide",
									"start":"24/03/2011"}],
							"presc":[{"presc_id":"presc2",
									"med_name":"Pimozide",
									"start":"24/03/2011"},
									{"presc_id":"presc3",
									"med_name":"Quetiapine",
									"start":"5/03/2011"},
									{"presc_id":"new",
									"med_name":"New prescription"}],
							"npsy":[{"npsy_id":"pinej",
									"npsy_name":"Pineapple juice"},
									{"npsy_id":"new",
									"npsy_name":"New non-psychofarmaca"}]};
	pat_info["ojans"] = {"personal":{"lname":"Janssens",
								"fname":"Olivier",
								"gender":"M",
								"dob":"07/11/1989",
								"since":"5/09/1990"},
						"meds":[{"med_id":"quet",
								"med_name":"Quetiapine",
								"start":"5/03/2011"},
								{"med_id":"pimo",
								"med_name":"Pimozide",
								"start":"24/03/2011"}],
						"presc":[{"presc_id":"presc2",
								"med_name":"Pimozide",
								"start":"24/03/2011"},
								{"presc_id":"presc3",
								"med_name":"Quetiapine",
								"start":"5/03/2011"},
								{"presc_id":"new",
								"med_name":"New prescription"}],
						"npsy":[{"npsy_id":"choc",
								"npsy_name":"Chocolate"},
								{"npsy_id":"new",
								"npsy_name":"New non-psychofarmaca"}]};

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
		//Render the page with all the info
		Tempo.prepare("info").notify(function(event){
			if(event.type == TempoEvent.Types.RENDER_COMPLETE){
				//remove the delete icon for the last row (adding a new item)
				$('[name|="new"]').parent('li').find('a:nth-child(2)').hide();
				//activate the accordion
				$('#accordion').accordion({ fillSpace: true, active: 1, collapsible: true });
			}
		}).render(pat_info[$(this).find('span').attr('id')]);
		//Show the info page of the patient
		$("#info").show();
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
	
	$('a[name="new"]').live('click',function(){
		hidePages();
		var type = $(this).attr('class');
		if(type.indexOf("presc") != -1)
			$('#presc_add').show();
		else if(type.indexOf("npsy") != -1)
			$('#npsy_add').show();
	});
});