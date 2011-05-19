var oTable;
var giRedraw = false;

$(document).ready(function() {
	var p_lookup_template = Tempo.prepare("p_lookup");
	
	/**
	 * Get the list of patients from the backend
	 */
	callWebservice("","/patienten/showadmin",function(data){
		var users = $.parseJSON(data);
		//Render the list of users
		u_lookup_template.render(users.users);
		/* Init the table */
		//$('#example').dataTable( );
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