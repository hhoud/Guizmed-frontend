$(document).ready(function(){
	var m_info;
	/**
	 * Show more info about the chosen medicine.
	 * @param m_id is the id of the medicine that has been chosen. 
	 */
	function showInfo(m_id){
		//Hide the lookup page
		$("#lookup").hide();
		//Retrieve med info
		callWebservice("","/medicijnbeheer/show/med_form_id/"+m_id,function(data){
			m_info = $.parseJSON(data);
			//Render the page with all the info
			Tempo.prepare("info").notify(function(event){
				if(event.type == TempoEvent.Types.RENDER_COMPLETE){
					$("#m_info tr td").each(function(){
						if($(this).text() == "")
							$(this).parents("tr").hide();
					});
				}
			}).render(m_info.medicine);
			//Show the info page of the medicine
			$("#info").show();
		});
	};
	
	//Check the querystring for a medicine_id or patient_id
	var m_id = $.QueryString("m_id");
	if(m_id)
		showInfo(m_id);
	
	$(".filterinput").keyup(function () {
		filterList($(this), $('#m_lookup'));
	});
	
	/**
	 * Get the list of meds from the backend
	 */
	callWebservice("","/medicijnbeheer",function(data){
		var meds = $.parseJSON(data);
		//Render the list of patients
		Tempo.prepare("m_lookup").render(meds.allMedicines);
	});
	
	$(".m_item").live('click',function(){
		//get the id of the medicine
		var m_id = $(this).find('span').attr('id');
		showInfo(m_id);
	});
	
	$('#add_to_presc').click(function(){
		var p_id = $.QueryString("p_id");
		window.location = 'patients.html?p_id='+p_id+'m_id='+$('#med_id').attr('name');
	});
	
	$('#sub_info').live('click',function(){
		$("#info").hide();
		var sub_id = $(this).attr('name');
		var sub_med;
		$(m_info.medicine[0].submeds).each(function(){
			if($(this)[0].med_form == sub_id){
				sub_med = $(this)[0];
				return false;
			}
		});
		
		//Render the page with all the info
		Tempo.prepare("submed_info").notify(function(event){
			if(event.type == TempoEvent.Types.RENDER_COMPLETE){
				$("#submed_info table tr td").each(function(){
					if($(this).text() == "")
						$(this).parents("tr").hide();
				});
			}
		}).render(sub_med);
		//Show the info page of the submedicine
		$("#submed_info").show();
	});
});