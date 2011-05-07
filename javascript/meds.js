$(document).ready(function(){
	/**
	 * Show more info about the chosen medicine.
	 * @param m_id is the id of the medicine that has been chosen. 
	 */
	function showInfo(m_id){
		updateHistory(true)
		//Hide the lookup page
		$("#lookup").hide();
		//Retrieve med info
		callWebservice("","/medicijnbeheer/show/med_form_id/"+m_id,function(data){
			var m_info = $.parseJSON(data);
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
	
	//Check the querystring for a medicine_id
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
});