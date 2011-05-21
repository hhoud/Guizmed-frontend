var oTable;
var giRedraw = false;

$(document).ready(function() {
	/**
	 * Get the list of patients from the backend
	 */
	callWebservice("","/patienten/indexAdmin",function(data){
		var pats = $.parseJSON(data);
		//Render the list of patients
		var result = TrimPath.processDOMTemplate("pats_template", pats);
		var rows = "";
		$(result).find('tbody').each(function(){
			rows += $(this).html();
		});
		$('#p_lookup').html(rows);
		/* Init the table */
		$('#example').dataTable( );
	});

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