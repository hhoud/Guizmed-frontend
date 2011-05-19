var oTable;
var giRedraw = false;

$(document).ready(function() {
	var u_lookup_template = Tempo.prepare("u_lookup");
	var u_info_template = Tempo.prepare("u_info");
	var item_id;
	
	/**
	 * Get the list of users from the backend
	 */
	callWebservice("","/users",function(data){
		var users = $.parseJSON(data);
		//Render the list of users
		u_lookup_template.render(users.users);
		/* Init the table */
		//$('#u_info').dataTable( );
	});
	
	$('#test_clear').click(function(){
		u_lookup_template.clear();
	});
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
					var users = $.parseJSON(data);
					//Reload the doctor list
					u_lookup_template.clear();
					u_lookup_template.render(users.users);
					/* Init the table */
					//oTable = $('#u_info').dataTable( );
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
			u_info_template.render(user_info.user);
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
				var user = $.parseJSON(data);
				$('#success').dialog('open');
				showInfo(user.user.id);
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