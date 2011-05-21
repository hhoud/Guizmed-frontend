$(document).ready(function(){
	var n_lookup_template = Tempo.prepare("notif_list");
	var n_info_template = Tempo.prepare("notif_info");
	var u_id = readCookie("uid");
	var n_id;
	var inout;
	$('#leftbutton').hide();
	
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
	
	$('#accept_dialog').dialog({
		resizable: false,
		autoOpen: false,
		width: 'auto',
		modal: true,
		buttons: {
			"Toestaan": function() {
				var data = {
						"notif_id":n_id,
						"accepted":true
				}
				//save the confirmation
				callWebservice(data,"/notifications/accept",function(data){
					var result = $.parseJSON(data);
					//close the dialog
					$( this ).dialog( "close" );
					//send back to the main screen
					hidePages();
					$("#notif_lookup").show();
				});
			},
			"Weigeren": function() {
				var data = {
						"notif_id":n_id,
						"accepted":false
				}
				//save the confirmation
				callWebservice(data,"/notifications/accept",function(data){
					var result = $.parseJSON(data);
					//close the dialog
					$( this ).dialog( "close" );
					//send back to the main screen
					hidePages();
					$("#notif_lookup").show();
				});
			}
		}
	});
	
	$('.n_item').live('click',function(){
		hidePages();
		//get the id of the notification
		n_id = $(this).find('span').attr('id');
		inout = ($(this).hasClass('in'))?"in":"out";
		//Retrieve notification info
		callWebservice("","/notifications/shownot/notification_id/"+n_id+"/userId/"+u_id,function(data){
			n_info = $.parseJSON(data);
			//Render the page with all the info
			n_info_template.notify(function(event){
				if(event.type == TempoEvent.Types.RENDER_COMPLETE){
					if(inout == "in" && $('#notif_checked').text() == "1"){
						$('#btn_accept_notif').show();
					};
				}
			}).render(n_info.notification);
		});
		$('#notif_info').show();
		$('#leftbutton').show();
	});
	
	$('#btn_notifications').click(function(){
		hidePages();
		callWebservice("","/notifications/show/uId/"+u_id,function(data){
			var notifs = $.parseJSON(data);
			//Render the list of patients
			n_lookup_template.render(notifs.notifications);
		});
		$('#notif_lookup').show();
		$('#leftbutton').show();
	});
	
	$('#btn_logout').click(function(){
		$('#dialog_confirm').dialog('open');
	});
	
	$('#btn_accept_notif').click(function(){
		$("#accept_dialog").dialog('open');
	});
});