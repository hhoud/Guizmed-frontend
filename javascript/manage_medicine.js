var oTable;
var giRedraw = false;

$(document).ready(function() {
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
			
			var result = TrimPath.processDOMTemplate("neuro_template", receptors);
			$("#neuro_list").html(result);
		});
	});
	
	/**
	 * Get the list of enzymes
	 */
	callWebservice("","/enzym",function(data){
		var enzymes = $.parseJSON(data);
		var result = TrimPath.processDOMTemplate("enz_template", enzymes);
		$("#meta_enzymes").html(result);
		$("#act_enzymes").html(result);
		$("#inh_enzymes").html(result);
	});
	
	/**
	 * Get the list of magister forms
	 */
	callWebservice("","/medmagister",function(data){
		var mags = $.parseJSON(data);
		var result = TrimPath.processDOMTemplate("magister_template", mags);
		$("#med_magister_form_id").html(result);
	});
	
	/**
	 * Get the list of med types
	 */
	callWebservice("","/medtypes",function(data){
		var types = $.parseJSON(data);
		var result = TrimPath.processDOMTemplate("type1_template", types.types);
		$("#med_subtype1_id").html(result);
		var result2 = TrimPath.processDOMTemplate("type2_template", types.types);
		$("#med_subtype2_id").html(result2);
	});
	
	/**
	 * Get the list of bnf values
	 */
	callWebservice("","/bnfpercentage",function(data){
		var bnfs = $.parseJSON(data);
		var result = TrimPath.processDOMTemplate("bnf_template", bnfs);
		$("#bnf_list").html(result);
	});
	
	/**
	 * Get the list of medicines
	 */
	callWebservice("","/medicijnbeheer/indexAdmin",function(data){
		var meds = $.parseJSON(data);
		//Render the list of meds
		var result = TrimPath.processDOMTemplate("meds_template", meds);
		var rows = "";
		$(result).find('tbody').each(function(){
			rows += $(this).html();
		});
		$("#m_list").html(rows);
		/* Init the table */
		$('#example').dataTable( );
	});
	
	/**
	 * Process the form of the med
	 */
	$('#btn_add_medicine').click(function(){
		processForm($(this),function(data){
			if(!data && data != "ERROR"){
				var result = $.parseJSON(data);
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
