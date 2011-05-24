var oTable;
var giRedraw = false;

$(document).ready(function() {
	/**
	 * Convert the dialog div into a dialog
	 */
	$('#error_dialog').dialog({
		autoOpen: false,
		width: 'auto',
		buttons: {
			"Ok": function() {
				$(this).dialog("close");
			}
		}
	});
	
	/**
	 * Get the list of patients from the backend
	 */
	callWebservice("","/patienten/indexAdmin",function(data){
		if(!data || data == "ERROR")
			$('#error_dialog').dialog('open');
		else{
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
		}
	});

	$('#btn_logout').click(function(){
		eraseCookie("ad");
		eraseCookie("tk");
		eraseCookie("td");
		window.location = "index.html";
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