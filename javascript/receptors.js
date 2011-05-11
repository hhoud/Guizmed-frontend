$(document).ready(function(){
	var r_info_template = Tempo.prepare("info");
	/**
	 * Show more info about the chosen medicine.
	 * @param r_id is the id of the medicine that has been chosen. 
	 */
	function showInfo(r_id){
		//Hide the lookup page
		$("#lookup").hide();
		//Retrieve med info
		callWebservice("","/receptoren/show/med_chem_bonding_id/"+r_id,function(data){
			var r_info = $.parseJSON(data);
			//Render the page with all the info
			r_info_template.notify(function(event){
				if(event.type == TempoEvent.Types.RENDER_COMPLETE){
					$("#r_info tr td").each(function(){
						if($(this).text() == "")
							$(this).parents("tr").hide();
					});
				}
			}).render(r_info.receptor);
			//Show the info page of the medicine
			$("#info").show();
		});
	};
	
	$(".filterinput").keyup(function () {
		filterList($(this), $('#r_lookup'));
	});

	/**
	 * Get the list of meds from the backend
	 */
	callWebservice("","/receptoren",function(data){
		var rec = $.parseJSON(data);
		//Render the list of patients
		Tempo.prepare("r_lookup").render(rec.receptors);
	});
	
	$(".r_item").live('click',function(){
		//get the id of the receptor
		var r_id = $(this).find('span').attr('id');
		showInfo(r_id);
	});
});