
	function filterData(data_filter){
		//console.log("Month:" + month);
		d3.selectAll("#vis_container .svg").remove();
		d3.selectAll("#vis_container .svg_linechart").remove();
		d3.selectAll("#vis_container .legend").remove();
		d3.selectAll("#vis .svg").remove();
		//d3.selectAll("div.school").remove();
		var data_group = data_filter.map(function(d){return {
							location : d.location,
							total : +d.villages+d.grampanchayat+d.clusters,
							villages : +d.villages,
							grampanchayat : +d.grampanchayat,
							clusters : d.clusters
						};
					});
		data_group = data_group.filter(function(d){return (d.total != 0 && d.total != null); });

		var data_shg = data_filter.map(function(d){return {
						location : d.location,
						total : d.shgs	
					};
				});
		data_shg = data_shg.filter(function(d){return (d.total != 0 && d.total != null); });

		var data_members = data_filter.map(function(d){return {
							location : d.location,
							total : +d.totalmembers,
							active : +d.activemembers,
							inactive : +d.inactivemembers
						};
					});
		data_members = data_members.filter(function(d){ return (d.total != 0 && d.total != null); });

		var data_saving = data_filter.map(function(d){return{
							location : d.location,
							total : +d.total_saving,
							avg_saving : +d.avg_saving_member
						};	
					});
		data_saving = data_saving.filter(function(d){return (d.total != 0 && d.total !=null);});

		var data_fd = data_filter.map(function(d){ return {
						location : d.location,
						total : +d.total_fd+d.groups_fd_total+d.cluster_fd_total,
						fd_amount_members : +d.total_fd,
						fd_amount_groups : +d.groups_fd_total,
						fd_amount_clusters : +d.cluster_fd_total,
						fd_members : +d.num_fd,
						fd_clusters : +d.cluster_fd_num,
						fd_groups : +d.groups_fd_num
					};
				});
		data_fd = data_fd.filter(function(d){return (d.total != 0 && d.total != null); });

		var data_linked = data_filter.map(function(d){ return{
							location : d.location,
							total : +d.repeat_loan_total_amount,
							number_bank : +d.num_groups_repeat_loans_banks,
							number_sps : +d.num_groups_repeat_loans_sps,
							number_psds : +d.num_groups_repeat_loans_psds,
							group_link_sps : +d.num_group_link_sps,
							group_link_psds : +d.num_group_link_psds	
					};
				});
		data_linked = data_linked.filter(function(d){ return (d.total != 0 && d.total != null); }); 

				//var color = d3.scale.category20();

		renderPieChart(data_group,"Villages, Grampanchayats and Clusters",1);
		renderPieChart(data_shg,"SHG",2);
		renderPieChart(data_members,"Members",3);
		renderPieChart(data_saving,"Savings",4);
		renderPieChart(data_fd,"Fixed Deposits",5);
		renderPieChart(data_linked,"Repeat Loans",6);

		var legendSVG = d3.select("#vis_container").append("svg")
						.attr("class","legend")
						.attr("height",100)
						.attr("width",1200);

	    var legend = legendSVG.selectAll("g.rect")
				        .data(data_filter)
				        .enter()
				        .append("g")
				        	.attr("class","rect");

		legend.append("rect")
    		.attr("width",20)
    		.attr("height",18)
        	.attr("transform",function(d,i){return "translate(" + ((i+1)*80)+ ",20)";})
    		.style("fill",function(d){return color(d.location);})
    		.on("click",function(d){
    			clickMarkMain(d)
    		});

		legend.append("text")
			.attr("class","text")
			.attr("y",14)
			.attr("transform",function(d,i){return "translate(" + ((i+1)*80)+ ",45)";})
			.text(function(d){return d.location;});
	}

	function renderPieChart(data_subset,label,label_num){

		var data = data_subset;

		var labelr = radius + 280;

		var pie = d3.layout.pie()
					.sort(null)
					.startAngle(1.1*Math.PI)
					.endAngle(3.1*Math.PI)
					.value(function(d){ return d.total});

		var arc = d3.svg.arc()
					.innerRadius(radius - 100)
					.outerRadius(radius - 50);

		var arcOver = d3.svg.arc()
						.innerRadius(radius - 95)
						.outerRadius(radius - 45);

		var tip = d3.tip()
				  .attr('class', 'd3-tip')
				  .offset([-10, 0])
				  .html(function(d) {
				  	if(label == "Villages, Grampanchayats and Clusters"){
					    return "<strong>Villages:</strong> <span style='color:red'>"+d.data.villages+
					    "</span><br><strong>Grampanchayats:</strong> <span style='color:red'>"+d.data.grampanchayat+
					    "</span><br><strong>Clusters:</strong> <span style='color:red'>"+d.data.clusters+"</span>";
					}
					else if(label == "Members"){
						return "<strong>Active Members:</strong> <span style='color:red'>"+d.data.active+
						"</span><br><strong>Inactive Members:</strong> <span style='color:red'>"+d.data.inactive+"</span>";
					}
					else if(label == "Savings"){
						return "<strong>Average Member Saving:</strong> <span style='color:red'>"+d.data.avg_saving+"</span>";
					}
					else if(label == "Fixed Deposits"){
						return "<strong>Total Member FD:</strong> <span style='color:red'>"+d.data.fd_amount_members+
					    "</span><br><strong>Total Group FD:</strong> <span style='color:red'>"+d.data.fd_amount_groups+
					    "</span><br><strong>Total Cluster FD:</strong> <span style='color:red'>"+d.data.fd_amount_clusters+"</span>";
					}
					else if(label == "Repeat Loans"){
						return "<strong># Repeat Loans - Bank:</strong> <span style='color:red'>"+d.data.number_bank+
					    "</span><br><strong># Repeat Loans - SPS:</strong> <span style='color:red'>"+d.data.number_sps+
					    "</span><br><strong># Repeat Loans - PSDS:</strong> <span style='color:red'>"+d.data.number_psds+"</span>";
					}
					else{
						console.log("Label : " +label);
						//document.getElementByClassName("d3-tip").style.display = "none";
					}
				  });

		var svg = d3.select("#vis_container").append("svg")
					.attr("width",pie_width)
					.attr("height",pie_height)
					.attr("class","svg");

		
		center_group = svg.append("svg:g")
		  					.attr("class", "center_group")
		  					.attr("transform", "translate(" + (pie_height/2) + "," + (pie_width/2) + ")");

		var label_group = svg.append("svg:g")
							  .attr("class", "label_group")
							  .attr("transform", "translate(" + (pie_height/2) + "," + (pie_width/2) + ")");

		// "TOTAL" LABEL
		var totalLabel = center_group.append("svg:text")
						  .attr("class", "label")
						  .attr("y",-120)
						  .attr("text-anchor", "middle")
						  .style("font-weight","bold") // text-align: right
						  .text(label);
		var centerLabel = center_group.append("svg:text")
						  .attr("class","label_center")
						  .attr("y",-10)
						  .attr("text-anchor", "middle")
						  .style("font-weight","bold") // text-align: right
						  .text("Total");
		var centerText = center_group.append("svg:text")
						  .attr("class","center_text")
						  .attr("y",5)
						  .attr("text-anchor", "middle")
						  .text(function(d){ return d3.sum(data,function(j){ return j.total;})});	

		svg.call(tip);

		

		var arcs = svg.selectAll("g.arc")
						  .data(pie(data))
						  .enter()
						  	.append("g")
						  	.attr("class", "arc")
						  	.attr("transform", "translate(" + (radius) + "," + (radius) + ")")
						  	.on("mouseover", function(d) {
				                d3.select(this).select("path").transition()
				                    .duration(200)
				                    .attr("d", arcOver)

				                centerLabel.text(d3.select(this).datum().data.location)
				                	.attr("y",-10);

				                centerText.text(d3.select(this).datum().data.total)
				                	.attr("y",5);
				                if(label != "SHG"){
				                	tip.show(d,label);	
				                }
				                
				            })
				            //.on("mouseover", tip.show)
				            .on("mouseout", function(d) {
				                d3.select(this).select("path").transition()
				                    .duration(200)
				                    .attr("d", arc)

				                centerLabel.text("Total")
				                	.attr("y",-10);

				                centerText.text(function(d){ return d3.sum(data,function(j){ return j.total;})})
				                	.attr("y",5);
				                tip.hide();
				            });
		//Draw arc paths
		arcs.append("path")
		    .attr("fill", function(d) {return color(d.data.location);})
		    .attr("d", arc)
		    .transition().delay(200).duration(1000)
		    .attrTween('d', function(d) {
			   var i = d3.interpolate(d.startAngle, d.endAngle);
			   return function(t) {
			       d.endAngle = i(t);
			     return arc(d);
			   }
            });

	    
	}

	function clickMarkMain(data_new){

		d3.selectAll("#textContent").remove();
		console.log(data_new);

		var textSVG = d3.select("#vis_container").append("svg")
						.attr("id","textContent")
						.attr("height",700)
						.attr("width",350);

	    textSVG.append("text")
	    	.attr("class","textTitle")
	    	.attr("x",20)
	    	.attr("y",20)
	    	.text("Location : " + data_new.location);
	    	//.style("font-weight","bold")
	    	//.style("font-size","25px");
	    textSVG.append("text")
	    	.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",45)
	    	.text("--Area Data--");
	    	//.style("font-weight","bold")
	    	//.style("font-size","20px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",65)
	    	.text("Villages : " +data_new.villages);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",80)
	    	.text("Grampanchayats : "+data_new.grampanchayat);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",95)
	    	.text("Clusters : " +data_new.clusters);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",110)
	    	.text("SHG : " +data_new.shgs);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",140)
	    	.text("--Member Data--");
	    	//.style("font-weight","bold")
	    	//.style("font-size","20px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",160)
	    	.text("Active Members : "+data_new.activemembers);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",175)
	    	.text("Inactive Members : " +data_new.inactivemembers);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",205)
	    	.text("--Savings Data--");
	    	//.style("font-weight","bold")
	    	//.style("font-size","20px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",225)
	    	.text("Total Savings : "+data_new.total_saving);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",240)
	    	.text("Average Member Saving : "+data_new.avg_saving_member);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",270)
	    	.text("--Fixed Deposits Data--");
	    	//.style("font-weight","bold")
	    	//.style("font-size","20px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",290)
	    	.text("Number of Groups : "+data_new.num_fd_groups);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",305)
	    	.text("Number of Members : "+data_new.num_fd);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",335)
	    	.text("--Groups linked to SPS/PSDS--");
	    	//.style("font-weight","bold")
	    	//.style("font-size","20px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",355)
	    	.text("Groups linked to SPS : "+data_new.num_groups_repeat_loans_sps);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",370)
	    	.text("Groups linked to PSDS : "+data_new.num_group_link_psds);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",385)
	    	.text("% of groups linked to SPS : "+data_new.per_group_link_sps);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",400)
	    	.text("% of groups linked to PSDS : " +data_new.per_group_link_psds);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",430)
	    	.text("--Repeat Loans & Account Detail--");
	    	//.style("font-weight","bold")
	    	//.style("font-size","20px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",450)
	    	.text("From Banks : "+data_new.num_groups_repeat_loans_banks);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",465)
	    	.text("From SPS : " +data_new.num_groups_repeat_loans_sps);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",480)
	    	.text("From PSDS : " +data_new.num_groups_repeat_loans_psds);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",495)
	    	.text("Total Amount : " +data_new.repeat_loan_total_amount);
	    	//.style("font-size","15px");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",510)
	    	.text("Total Accounts Opened : " +data_new.accounts_open_total);
	    	//.style("font-size","15px");


		/*textData
    		.attr("x",20)
    		.attr("y",18)
        	.text(function(){
        		textContent = "Location:" +data_new.location+
        						  "<br/>Area Data"+	
        						  "<br/>Villages:"+data_new.villages+
        						  "<br/>Grampanchayats:"+data_new.grampanchayat+
        						  "<br/>Clusters:"+data_new.clusters+
        						  "<br/>SHG:"+data_new.shgs+
        						  "<br/>Member Data"+
        						  "<br/>Active Members:"+data_new.activemembers+
        						  "<br/>Inactive Members:"+data_new.inactivemembers+
        						  "<br/>Savings Data"+
        						  "<br/>Total Savings:"+data_new.total_saving+
        						  "<br/>Average Member Saving:"+data_new.avg_saving_member+
        						  "<br/>Fixed Deposits Data"+
        						  "<br/>Number of Groups:"+data_new.num_fd_groups+
        						  "<br/>Number of Members:"+data_new.num_fd+
        						  "<br/>Groups linked to SPS/PSDS"+
        						  "<br/>Groups linked to SPS:"+data_new.num_groups_repeat_loans_sps+
        						  "<br/>Groups linked to PSDS:"+data_new.num_group_link_psds+
        						  "<br/>% of groups linked to SPS:"+data_new.per_group_link_sps+
        						  "<br/>% of groups linked to PSDS:"+data_new.per_group_link_psds+
        						  "<br/>Repeat Loans & Account Detail"+
        						  "<br/>From Banks:"+data_new.num_groups_repeat_loans_banks+
        						  "<br/>From SPS:"+data_new.num_groups_repeat_loans_sps+
        						  "<br/>From PSDS:"+data_new.num_groups_repeat_loans_psds+
        						  "<br/>Total Amount:"+data_new.repeat_loan_total_amount+
        						  "<br/>Total Accounts Opened:"+data_new.accounts_open_total;

        		return textContent;
        		});
                /*.attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("fill", "red");*/

		//textContent = "<b>Location:</b> "+data_new.location;
			//"<br/><b>Appointment Time:</b> "+d.appointment+
			//"<br/><b>Start Time:</b> "+d.start+
			//"<br/><b>End Time:</b> "+d.end;
		//document.getElementById("textContent").innerHTML=textContent;

		// Also set the highlighting class.
		/*d3.selectAll(".wait").classed("selected",false);
		d3.selectAll(".meet").classed("selected",false);
		var clicked_elem = d3.select(this);
		clicked_elem.classed("selected",true);*/
	}

	/*function textUpdate(){
        			textContent = "Location:" +data_new.location+
        						  "<br/>Area Data"+	
        						  "<br/>Villages:"+data_new.villages+
        						  "<br/>Grampanchayats:"+data_new.grampanchayat+
        						  "<br/>Clusters:"+data_new.clusters+
        						  "<br/>SHG:"+data_new.shgs+
        						  "<br/>Member Data"+
        						  "<br/>Active Members:"+data_new.activemembers+
        						  "<br/>Inactive Members:"+data_new.inactivemembers+
        						  "<br/>Savings Data"+
        						  "<br/>Total Savings:"+data_new.total_saving+
        						  "<br/>Average Member Saving:"+data_new.avg_saving_member+
        						  "<br/>Fixed Deposits Data"+
        						  "<br/>Number of Groups:"+data_new.num_fd_groups+
        						  "<br/>Number of Members:"+data_new.num_fd+
        						  "<br/>Groups linked to SPS/PSDS"+
        						  "<br/>Groups linked to SPS:"+data_new.num_groups_repeat_loans_sps+
        						  "<br/>Groups linked to PSDS:"+data_new.num_group_link_psds+
        						  "<br/>% of groups linked to SPS:"+data_new.per_group_link_sps+
        						  "<br/>% of groups linked to PSDS:"+data_new.per_group_link_psds+
        						  "<br/>Repeat Loans & Account Detail"+
        						  "<br/>From Banks:"+data_new.num_groups_repeat_loans_banks+
        						  "<br/>From SPS:"+data_new.num_groups_repeat_loans_sps+
        						  "<br/>From PSDS:"+data_new.num_groups_repeat_loans_psds+
        						  "<br/>Total Amount:"+data_new.repeat_loan_total_amount+
        						  "<br/>Total Accounts Opened:"+data_new.accounts_open_total;

        			return textContent;
        		} */

	