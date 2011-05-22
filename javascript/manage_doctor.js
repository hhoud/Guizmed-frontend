var oTable;
var giRedraw = false;

$(document).ready(function() {
	var item_id;
	
	renderUsers();
	/**
	 * Get the list of users from the backend and render it
	 */
	function renderUsers(){
		callWebservice("","/users",function(data){
			var users = $.parseJSON(data);
			//Render the list of users
			var result = TrimPath.processDOMTemplate("users_template", users);
			var rows = "";
			$(result).find('tbody').each(function(){
				rows += $(this).html();
			});
			$("#u_lookup").html(rows);
			/* Init the table */
			$('#example').dataTable( );
		});
	}
	
	/**
	 * Convert dialog div into dialog and hide it
	 * This dialog is a confirmation dialog to delete a user(doctor)
	 */
	$('#del_dialog').dialog({
		autoOpen: false,
		width: 'auto',
		buttons: {
			"Yes": function() {
				callWebservice("", "/users/delete/user_id/"+item_id, function(data){
					if(data != "ERROR"){
						var users = $.parseJSON(data);
						renderUsers();
					}
				});
				$(this).dialog("close");
			},
			Cancel: function(){
				$(this).dialog("close");
			}
		}
	});
	$('#error').dialog({
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
	
	function showInfo(item_id){
		$('#doctor_list').hide();
		callWebservice("","/users/show/user_id/"+item_id,function(data){
			var user_info = $.parseJSON(data);
			var result = TrimPath.processDOMTemplate("user_template", user_info);
			$('#doctor_info').html(result);
			$('#doctor_info').show();
		});
	}
	
	/**
	 * Get more information about a user when clicked on one
	 */
	$('.u_item').live('click',function(){
		//get the id of the clicked user
		item_id = $(this).attr('name');
		showInfo(item_id);
	});
	
	/**
	 * Delete a user when delete button is clicked
	 */
	$('.del_item').live('click',function(){
		item_id = $(this).attr('name');
		$('#del_name').text($(this).parents('tr').find('td:first').text() + " " + $(this).parents('tr').find('td:nth-child(2)').text()); 
		$('#del_dialog').dialog('open');
	});
	
	$('#btnRegister').click(function(e){
		processForm($(this),function(data){
			if(data == "ERROR"){
				$('#error').dialog('open');
			}else{
				var result = $.parseJSON(data);
				$('#success').dialog('open');
				renderUsers();
				//empty the form
				$('#register_doctor').find(':input').val("");
			}
		});
		e.preventDefault();
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
});