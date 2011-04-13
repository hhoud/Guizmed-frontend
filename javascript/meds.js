$(document).ready(function(){
	
	$(".filterinput").keyup(function () {
		filterList($(this), $('#m_lookup'));
	});
	
	var meds = [{"med_id":"flup",
	"med_name":"Flupentixol"},
	{"med_id":"pimo",
	"med_name":"Pimozide"},
	{"med_id":"quet",
	"med_name":"Quetiapine"}];

	Tempo.prepare("m_lookup").render(meds);

	var med_info = new Array();
	med_info["flup"] = {"hoofdklasse":"Thioxanthenen",
            "gen_naam":"Flupentixol",
            "specialiteit":"FLUANXOL",
            "type":"Klassiek: FGA",
            "mag_type":"Comprimé (0.5mg - 1mg - 3mg)",
            "dop_d1":"++ (Ki 1-10)",
            "dop_d2":"+++ (Ki 0.1-1)",
            "dop_d3":"++ Ki(1-10)",
            "dop_d4":"?",
            "dop_d5":"",
            "hist_h1":"+ (Ki 10-100)",
            "musc_ach":"+ (Ki 10-100)",
            "alfa1":"+ Ki(10-100)",
            "alfa2":"+/- Ki(100-1000)",
            "sero_5ht2a":"++ Ki(1-10)",
            "sero_5ht2c":"",
            "bioavailability":"40-50",
            "prot_bind":"99",
            "t_max_h":"3-8",
            "hlf":"26-36",
            "ddd":"8-10",
            "metabolisatie":"?",
            "cyp450_act":"",
            "cyp450_inh":"CYPD2D6 (w)/"
            };
	med_info["pimo"] = {"hoofdklasse":"Difenylbutylpiperidines",
            "gen_naam":"Pimozide",
            "specialiteit":"ORAP",
            "type":"Klassiek: FGA",
            "mag_type":"Comp (1mg - 4mg)",
            "dop_d1":"",
            "dop_d2":"",
            "dop_d3":"",
            "dop_d4":"",
            "dop_d5":"",
            "hist_h1":"",
            "musc_ach":"",
            "alfa1":"",
            "alfa2":"",
            "sero_5ht2a":"",
            "sero_5ht2c":"",
            "bioavailability":"15-50",
            "prot_bind":"97",
            "t_max_h":"6-8",
            "hlf":"29-55",
            "ddd":"2-4",
            "metabolisatie":"CYPD1A2 (w)/ CYPD3A4(p)/",
            "cyp450_act":"",
            "cyp450_inh":"CYPD2D6 (p)/ CYPD3A4/ P-gp (p)/"
            };
	med_info["quet"] = {"hoofdklasse":"Dibenzothiazepine",
            "gen_naam":"Quetiapine",
            "specialiteit":"SEROQUEL",
            "type":"Atypisch: SGA",
            "mag_type":"",
            "dop_d1":"+/- (Ki 100-1000)",
            "dop_d2":"+/- (Ki 100-1000)",
            "dop_d3":"+/- (Ki 100-1000)",
            "dop_d4":"--- (Ki >100.000)",
            "dop_d5":"",
            "hist_h1":"+ (Ki 10-100)",
            "musc_ach":"+/- (Ki 100-1000)",
            "alfa1":"++ (Ki 1-10)",
            "alfa2":"+ (Ki 10-100)",
            "sero_5ht2a":"",
            "sero_5ht2c":"",
            "bioavailability":"73",
            "prot_bind":"83",
            "t_max_h":"0.5-3",
            "hlf":"6-7",
            "ddd":"400",
            "metabolisatie":"CYPD3A4 (p)/ CYPD2D6 (w)/ P-gp/",
            "cyp450_act":"",
            "cyp450_inh":"CYPD1A2 (w)/ CYPD2D6 (w)/ CYPD3A4 (w)/ CYPD2C9 (w)/ "
            };
	
	$(".m_item").click(function(){
		updateHistory(true)
		//Hide the lookup page
		$("#lookup").hide();
		//Render the page with all the info
		Tempo.prepare("info").notify(function(event){
			if(event.type == TempoEvent.Types.RENDER_COMPLETE){
				$("#m_info tr td").each(function(){
					if($(this).text() == "")
						$(this).parents("tr").hide();
				});
			}
		}).render(med_info[$(this).find("span").attr("id")]);
		//Show the info page of the medicine
		$("#info").show();
	});
});