$(document).ready(function(){
	
	$(".filterinput").keyup(function () {
		filterList($(this), $('#m_lookup'));
	});

	Tempo.prepare("r_lookup").render(meds);
	
	$(".r_item").click(function(){
		updateHistory(true)
		//Hide the lookup page
		$("#lookup").hide();
		//Render the page with all the info
		Tempo.prepare("info").render(med_info[$(this).find("span").attr("id")]);
		//Show the info page of the medicine
		$("#info").show();
	});
});