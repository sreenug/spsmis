function monthlyReport(){
	d3.selectAll(".d3-tip").remove();

	var dataMonth = d3.nest()
					.key(function(d) { return +d.month; })
					.sortKeys(d3.ascending)
					.entries(data);

	var pie = d3.layout.pie()
					.sort(null)
					.startAngle(1.1*Math.PI)
					.endAngle(3.1*Math.PI)
					.value(function(d){ return d.key});

	var svg = d3.select("#vis").append("svg")
					.attr("width",pie_widthMonth-20)
					.attr("height",pie_heightMonth-20)
					.attr("class","svg");
					//.style("margin-left",-300);
	var arc = d3.svg.arc()
					.innerRadius(radiusNew - 75)
					.outerRadius(radiusNew - 25);

	var arcs = svg.selectAll("g.arc")
						  .data(pie(dataMonth))
						  .enter()
						  	.append("g")
						  	.attr("class", "arc")
						  	.attr("transform", "translate(" + (radiusNew) + "," + (radiusNew) + ")")
						  	.on("click", function(d){
						  		clickMarkMonthly(d);
						  	});
		//Draw arc paths
		arcs.append("path")
		    .attr("fill", function(d,i) {return colorMonth(d.data.key);})
		    .attr("d", arc)
		    .transition().delay(200).duration(1000)
		    .attrTween('d', function(d) {
			   var i = d3.interpolate(d.startAngle, d.endAngle);
			   return function(t) {
			       d.endAngle = i(t);
			     return arc(d);
			   }
            });

        arcs.append("text")
		    .attr("transform", function(d) {
		    	return "translate(" + arc.centroid(d) + ")";
		    })
		    .attr("text-anchor", "middle")
		    .text(function(d) {
		    	switch (+d.data.key)
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

}

function clickMarkMonthly(dataMonth_new){
	d3.selectAll(".svg_linechart").remove();

	var monthdata_group = dataMonth_new.data.values.map(function(d){return {
							total : +d.villages+d.grampanchayat+d.clusters,
							location : d.location
						};
					});
		monthdata_group = monthdata_group.filter(function(d){return (d.total != 0 && d.total != null); });

		var monthdata_shg = dataMonth_new.data.values.map(function(d){return {
						total : d.shgs,
						location : d.location	
					};
				});
		monthdata_shg = monthdata_shg.filter(function(d){return (d.total != 0 && d.total != null); });

		var monthdata_members = dataMonth_new.data.values.map(function(d){return {
							total : +d.totalmembers,
							location : d.location
						};
					});
		monthdata_members = monthdata_members.filter(function(d){ return (d.total != 0 && d.total != null); });

		var monthdata_saving = dataMonth_new.data.values.map(function(d){return{
							total : +d.total_saving,
							location : d.location
						};	
					});
		monthdata_saving = monthdata_saving.filter(function(d){return (d.total != 0 && d.total !=null);});

		var monthdata_fd = dataMonth_new.data.values.map(function(d){ return {
						total : +d.total_fd+d.groups_fd_total+d.cluster_fd_total,
						location : d.location
					};
				});
		monthdata_fd = monthdata_fd.filter(function(d){return (d.total != 0 && d.total != null); });

		var monthdata_linked = dataMonth_new.data.values.map(function(d){ return{
							total : +d.repeat_loan_total_amount,
							location : d.location	
					};
				});
		monthdata_linked = monthdata_linked.filter(function(d){ return (d.total != 0 && d.total != null); });

	renderGraph(monthdata_group,"Villages, Grampanchayats and Clusters");
	renderGraph(monthdata_shg,"SHG");
	renderGraph(monthdata_members,"Members");
	renderGraph(monthdata_saving,"Savings");
	renderGraph(monthdata_fd,"Fixed Deposits");
	renderGraph(monthdata_linked,"Repeat Loans");

}

function renderGraph(monthData,label){

var svg_new = d3.select("#vis_container")
					.append("svg")
					.attr("width",pie_width)
					.attr("height",pie_height+50)
					.attr("class","svg_linechart")
					
					//.style("margin-top",-300)
					.attr("transform","translate(0,"+margin.left+")")
						.append("g")
						.attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

svg_new.append("svg:text")
		.attr("class", "label")
		.attr("x",(pie_width/2)-35)
		.attr("y",-10)
		.attr("text-anchor", "middle")
		.style("font-weight","bold")
		.style("font","black") // text-align: right
		.text(label);

var yMonth = d3.scale.linear()
				.domain([0,d3.max(monthData,function(d){return d.total;})])
				.range([height-50,0]);

var xMonth = d3.scale.ordinal()
				.domain(["Udainagar","Kantaphod","Bagli","Barwah","Dewas","Khategaon","Hatpipliya","Maheshwar","Kannod"])
				.rangePoints([0,width],1);

var xAxisMonth = d3.svg.axis().scale(xMonth)
					.orient("bottom").ticks(9);

var yAxisMonth = d3.svg.axis().scale(yMonth)
					.orient("left").ticks(5).tickFormat(function(s){
			if(label == "Savings" || label == "Fixed Deposits" || label == "Repeat Loans"){
				console.log(label);
				return s/1000000;
			}
			else{
				console.log(label)
				return s;
			}
		});

var lineMonth = d3.svg.line()
					.x(function(d){return xMonth(d.location);})
					.y(function(d){return yMonth(d.total);});

	svg_new.append("path")
		.attr("class","path")
		.attr("d", lineMonth(monthData))
		.attr("transform","translate(0,0)")
		.style("stroke","steelblue")
		.style("stroke-width",2)
		.style("fill","none");

	svg_new.append("g")
		.attr("class","x-axis")
		.attr("transform", "translate(0," + (height-50) + ")")
		.call(xAxisMonth)
			.selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });

	svg_new.append("g")
		.attr("class","y-axis")
		.attr("transform","translate(0,0)")
		.call(yAxisMonth);

	if(label == "Savings" || label == "Fixed Deposits" || label == "Repeat Loans"){
		svg_new.append("text")
			.attr("transform","rotate(-90)")
			.attr("x", -(pie_width/2))
			.attr("y",margin.right-5)
			.style("font","black")
			.text("Million");
	}

	svg_new.append("text")
		.attr("x",(width-10)/2)
		.attr("y",height-55)
		.style("font","black")
		.text("Region");


}