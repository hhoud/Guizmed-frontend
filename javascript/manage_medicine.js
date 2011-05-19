var oTable;
var giRedraw = false;

$(document).ready(function() {

	var receptor_template = Tempo.prepare('neuro_list');
	var kilist;
	
	/**
	 * Get the list of ki-values
	 */
	callWebservice("","/ki",function(data){
		kilist = $.parseJSON(data);
		
		//Get the list of receptors and show it in the form
		callWebservice("","/receptoren",function(data){
			var receptors = $.parseJSON(data);
			for(var i in receptors.receptors){
				receptors.receptors[i]["ki_list"] = kilist.ki;
				receptors.receptors[i]["field_name"] = receptors.receptors[i].name.replace(' ','_').toLowerCase();
			}
			receptor_template.notify(function(event){
				if(event.type == TempoEvent.Types.RENDER_COMPLETE)
					$('.ki_id').hide();
			}).render(receptors.receptors);
		});
	});
	
	/* Init the table */
	oTable = $('#example').dataTable( );

	$("#manage_page").hover(
		function () {
		$("#manage_page").addClass("active_link");
		$("#systemlogs_page").removeClass("active_link");
		$("#tools_page").removeClass("active_link");
		
		$("#sub_manage").show();
		$("#sub_logs").hide();
		$("#sub_tools").hide();
	
	});//hover
	
	
	$("#systemlogs_page").hover(
		function () {
		
		$("#systemlogs_page").addClass("active_link");
		$("#manage_page").removeClass("active_link");
		$("#tools_page").removeClass("active_link");
		
		$("#sub_logs").show();
		$("#sub_manage").hide();
		$("#sub_tools").hide();
		
	});//hover
	
	$("#tools_page").hover(
		function () {
			
		$("#tools_page").addClass("active_link");
			$("#systemlogs_page").removeClass("active_link");
		$("#manage_page").removeClass("active_link");

		$("#sub_logs").hide();
		$("#sub_manage").hide();
		$("#sub_tools").show();
	});//hover

	
} );
