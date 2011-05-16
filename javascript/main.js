$(document).ready(function(){
	var n_lookup_template = Tempo.prepare("notif_lookup");
	var n_info_template = Tempo.prepare("info");
	var u_id = readCookie("uid");
	
	//convert the dialog div into a dialog box and hide it
	$('#dialog_confirm').dialog({
		resizable: false,
		autoOpen: false,
		width: 'auto',
		modal: true,
		buttons: {
			"Ok": function() {
				//remove the token and timeout cookies
				eraseCookie("tk");
				eraseCookie("to");
				//close the dialog
				$( this ).dialog( "close" );
				//send back to the login screen
				window.location = 'index.html';
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
	
	$('.n_item').live('click',function(){
		hidePages();
		//get the id of the notification
		var n_id = $(this).find('span').attr('id');
		//Retrieve notification info
		
		callWebservice("","/notifications/shownot/notification_id/"+n_id,function(data){
			n_info = $.parseJSON(data);
			//Render the page with all the info
			n_info_template.render(n_info.notification);
		});
		$('#notif_info').show();
	});
	
	$('#btn_notifications').click(function(){
		hidePages();
		callWebservice("","/notifications/show/uId/"+u_id,function(data){
			var notifs = $.parseJSON(data);
			//Render the list of patients
			n_lookup_template.render(notifs.notifications);
		});
		$('#notif_lookup').show();
	});
	
	$('#btn_logout').click(function(){
		$('#dialog_confirm').dialog('open');
	});
});