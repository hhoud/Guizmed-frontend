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
	
	$('#success').dialog({
		autoOpen: false,
		width: 'auto',
		buttons: {
			"Ok": function() {
				$(this).dialog("close");
			}
		}
	});
	
	/**
	 * Get the list of nonpsychos from the backend
	 */
	renderNonPsys();
	function renderNonPsys(){
		callWebservice("","/nonPsycho",function(data){
			if(!data || data == "ERROR")
				$('#error_dialog').dialog('open');
			else{
				var nonpsys = $.parseJSON(data);
				var result = TrimPath.processDOMTemplate("nonpsy_template", nonpsys);
				var rows = "";
				$(result).find('tbody').each(function(){
					rows += $(this).html();
				});
				$("#np_lookup").html(rows);
				/* Init the table */
				$('#example').dataTable( );
			}
		});
	}
	
	$('.valCheckStringAdmin').focusout(function() {
  		validateStringAdmin($(this));
	});
	
	/**
	 * Add the new nonpsycho to the database
	 */
	$('#btnRegister').click(function(){
		processForm($(this),function(data){
			if(!data || data == "ERROR"){
				$('#error_dialog').dialog('open');
			}else{
				$('#success').dialog('open');
				renderNonPsys();
				//empty the form
				$('#register_nonpsy').find(':input').val("");
			}
		});
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