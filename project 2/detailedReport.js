function detailedReportMain(region){
	d3.selectAll("#vis_container .svg").remove();
		d3.selectAll("#vis_container .svg_linechart").remove();
		d3.selectAll("#vis_container .legend").remove();
		d3.selectAll("#vis .svg").remove();
	//d3.selectAll("svg").remove();
	d3.selectAll(".d3-tip").remove();


	var reportData = data.filter(function(d){return d.location == region;});

	var reportdata_group = reportData.map(function(d){return {
							total : +d.villages+d.grampanchayat+d.clusters,
							month : +d.month
						};
					});
		reportdata_group = reportdata_group.filter(function(d){return (d.total != 0 && d.total != null); });

		var reportdata_shg = reportData.map(function(d){return {
						total : d.shgs,
						month : +d.month	
					};
				});
		reportdata_shg = reportdata_shg.filter(function(d){return (d.total != 0 && d.total != null); });

		var reportdata_members = reportData.map(function(d){return {
							total : +d.totalmembers,
							month : +d.month
						};
					});
		reportdata_members = reportdata_members.filter(function(d){ return (d.total != 0 && d.total != null); });

		var reportdata_saving = reportData.map(function(d){return{
							total : +d.total_saving,
							month : +d.month
						};	
					});
		reportdata_saving = reportdata_saving.filter(function(d){return (d.total != 0 && d.total !=null);});

		var reportdata_fd = reportData.map(function(d){ return {
						total : +d.total_fd+d.groups_fd_total+d.cluster_fd_total,
						month : +d.month
					};
				});
		reportdata_fd = reportdata_fd.filter(function(d){return (d.total != 0 && d.total != null); });

		var reportdata_linked = reportData.map(function(d){ return{
							total : +d.repeat_loan_total_amount,
							month : +d.month	
					};
				});
		reportdata_linked = reportdata_linked.filter(function(d){ return (d.total != 0 && d.total != null); });

		renderlineChart(reportdata_group,"Villages, Grampanchayats and Clusters",1);
		renderlineChart(reportdata_shg,"SHG",2);
		renderlineChart(reportdata_members,"Members",3);
		renderlineChart(reportdata_saving,"Savings",4);
		renderlineChart(reportdata_fd,"Fixed Deposits",5);
		renderlineChart(reportdata_linked,"Repeat Loans",6);

		

}

function renderlineChart(reportdata_new,label,number){	
		
	var svg = d3.select("#vis_container").append("svg")
					.attr("width",pie_width)
					.attr("height",pie_height+50)
					.attr("class","svg")
					.attr("transform","translate(0,"+margin.left+")")
						.append("g")
					  	.attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");
						
	svg.append("svg:text")
		.attr("class", "label")
		.attr("x",(pie_width/2)-35)
		.attr("y",-10)
		.attr("text-anchor", "middle")
		.style("font-weight","bold")
		.style("font","black") // text-align: right
		.text(label);


	var tipDetailed = d3.tip()
		  .attr('class', 'd3-tip')
		  .offset([-10, 0])
		  .html(function(d) {
		    return "<strong>"+label+":</strong> <span style='color:red'>" + d.total + "</span>";
		  });

	var x = d3.scale.ordinal()
				.domain(reportdata_new.map(function(d){return d.month;}))
				.rangeRoundBands([0,width],0.1);

	var y = d3.scale.linear()
				//.domain([d3.min(reportdata_new,function(d){return d.total;}),d3.max(reportdata_new,function(d){return d.total;})])
				.domain([0,d3.max(reportdata_new,function(d){return d.total;})])
				.range([height,0]);

	// Define the axes
	var	xAxis = d3.svg.axis().scale(x)
		.orient("bottom").tickFormat(function(s){
		switch (s)
           {
		   case 4:
             return "April";
		   case 5:
			return "May";
           case 6:
			return "June";
		   case 7:
			return "July";
           default:
             return "";
			}
		});

	var	yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(5).tickFormat(function(s){
			if(label == "Savings" || label == "Fixed Deposits" || label == "Repeat Loans"){
				return s/1000000;
			}
			else{
				return s;
			}
		});
	svg.call(tipDetailed);

	svg.selectAll("rect")
		.data(reportdata_new)
		.enter()
		.append("rect")
		.attr("class","rect")
		.attr("x", function(d){ return x(d.month);})
		.attr("y",function(d){ return y(d.total);})
		.attr("width",x.rangeBand()-10)
    	.attr("height",function(d){
    		return height - y(d.total);})
        //.attr("transform",function(d,i){return "translate("+(i+1)*30+",0)";})
    	.style("fill",function(d){return colorMonth(d.month);})
    		.on("mouseover",function(d){
    			//console.log("inside hover");
    			tipDetailed.show(d,label);
    		})
    		.on("mouseout",function(d){
    			tipDetailed.hide();
    		});

	svg.append("g")
		.attr("class","x-axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
			.selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });

	svg.append("g")
		.attr("class","y-axis")
		.attr("transform","translate(0,0)")
		.call(yAxis);

	if(label == "Savings" || label == "Fixed Deposits" || label == "Repeat Loans"){
		svg.append("text")
			.attr("transform","rotate(-90)")
			.attr("x", -(pie_width/2))
			.attr("y",margin.right-5)
			.style("font","black")
			.text("Million");
	}

	svg.append("text")
		.attr("x",(width-10)/2)
		.attr("y",height-5)
		.style("font","black")
		.text("Month");


}