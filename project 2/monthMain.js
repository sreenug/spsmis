function monthmain(dropdown_selection){
		console.log(dropdown_selection);
		d3.selectAll("div.loans").remove();

	if(dropdown_selection == "disbursed"){	
		data_bankloan_groups = month_data.map(function(d){ return {
				location : d.location,
				total : +d.bank_1_amount+d.bank_2_amount+d.bank_3_amount,
				month : +d.month
			}
		});

		data_bridgeloan_groups = month_data.map(function(d){ return {
				location : d.location,
				total : +d.bridge_1_amount+d.bridge_2_amount+d.bridge_3_amount,
				month : +d.month
			}
		});

		data_specialloan_groups = month_data.map(function(d){return {
				location : d.location,
				total : +d.special_loan_1_amount+d.special_loan_2_amount+d.special_loan_3_amount,
				month : +d.month
			};
		});
		//specialloan_amt_grps = specialloan_amt_grps.filter(function(d){return (d.total != 0 && d.total != null); });
		data_bankloan_member = month_data.map(function(d){return {
				location : d.location,
				total : +d.member_bank_1_amount+d.member_bank_2_amount+d.member_bank_3_amount,
				month : +d.month
			};
		});
		//bankloan_amt_member = bankloan_amt_member.filter(function(d){return (d.total != 0 && d.total != null); });
		data_specialloan_member = month_data.map(function(d){return {
				location : d.location,
				total : +d.member_special_loan_1_amount+d.member_special_loan_2_amount+d.member_special_loan_3_amount,
				month : +d.month
			};
		});

	}
	else{
		data_bankloan_groups = month_data.map(function(d){ return {
				location : d.location,
				total : +d.outstanding_bank_1_amount+d.outstanding_bank_2_amount+d.outstanding_bank_3_amount,
				month : +d.month
			}
		});

		data_bridgeloan_groups = month_data.map(function(d){ return {
				location : d.location,
				total : +d.outstanding_bridge_1_amount+d.outstanding_bridge_2_amount+d.outstanding_bridge_3_amount,
				month : +d.month
			}
		});

		data_specialloan_groups = month_data.map(function(d){return {
				location : d.location,
				total : +d.outstanding_special_loan_1_amount+d.outstanding_special_loan_2_amount+d.outstanding_special_loan_3_amount,
				month : +d.month
			};
		});
		//specialloan_amt_grps = specialloan_amt_grps.filter(function(d){return (d.total != 0 && d.total != null); });
		data_bankloan_member = month_data.map(function(d){return {
				location : d.location,
				total : +d.outstanding_member_bank_1_amount+d.outstanding_member_bank_2_amount+d.outstanding_member_bank_3_amount,
				month : +d.month
			};
		});
		//bankloan_amt_member = bankloan_amt_member.filter(function(d){return (d.total != 0 && d.total != null); });
		data_specialloan_member = month_data.map(function(d){return {
				location : d.location,
				total : +d.outstanding_member_special_loan_1_amount+d.outstanding_member_special_loan_2_amount+d.outstanding_member_special_loan_3_amount,
				month : +d.month
			};
		});
	}
	drawLegend("all");
}

function clickMarkLoan(location){
	d3.selectAll(".svg_linechart").remove();
	d3.selectAll("#regiontext").remove();
	data_bankloan_groups_month = data_bankloan_groups.filter(function(d){ return (d.location == location && d.total != 0);});
	data_bridgeloan_groups_month = data_bridgeloan_groups.filter(function(d){ return (d.location == location && d.total != 0);});
	data_specialloan_groups_month = data_specialloan_groups.filter(function(d){ return (d.location == location && d.total != 0);});
	data_bankloan_member_month = data_bankloan_member.filter(function(d){ return (d.location == location && d.total != 0);});
	data_specialloan_member_month = data_specialloan_member.filter(function(d){ return (d.location == location && d.total != 0);});

	console.log(data_bankloan_groups_month);
	console.log(data_bridgeloan_groups_month);
	console.log(data_specialloan_groups_month);
	console.log(data_bankloan_member_month);
	console.log(data_specialloan_member_month);

	/*  var regionSVG = d3.select("#vis").append("svg")
						.attr("id","regiontext")
						.attr("height",50)
						.attr("width",700);
		regionSVG.append("text")
			.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",45)
	    	.text("Region : " + location)
	    	.style("font-size","28px"); */			

	if(data_bankloan_groups_month.length != 0 ){
		monthLineChart(data_bankloan_groups_month,"Bank Loan to Groups");

	}

	if(data_bridgeloan_groups_month.length != 0){
		monthLineChart(data_bridgeloan_groups_month,"Bridge Loan to Groups");

	}

	if(data_specialloan_groups_month.length != 0){
		monthLineChart(data_specialloan_groups_month,"Special Loan to Groups");

	}

	if(data_bankloan_member_month.length != 0){
		monthLineChart(data_bankloan_member_month,"Bank Loan to Members");

	}

	if(data_specialloan_member_month.length != 0){
		monthLineChart(data_specialloan_member_month,"Special Loan to Members"); 

	}
		
}

function monthLineChart(loanData,label){
	var svg = d3.select("#loan_container")
					.append("svg")
					.attr("width",line_width)
					.attr("height",line_height)
					.attr("class","svg_linechart")
					
					//.style("margin-top",-300)
					.attr("transform","translate(0,"+margin.left+")")
						.append("g")
						.attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

	svg.append("svg:text")
		.attr("class", "label")
		.attr("x",(line_height/2)-35)
		.attr("y",-10)
		.attr("text-anchor", "middle")
		.style("font-weight","bold")
		.style("font","black") // text-align: right
		.text(label);

	var yMonth = d3.scale.linear()
					.domain([0,d3.max(loanData,function(d){return d.total;})])
					.range([heightmonth-50,0]);

	var xMonth = d3.scale.ordinal()
					.domain(loanData.map(function(d){return d.month;}))
					.rangeRoundBands([0,widthmonth],0.1);

	var xAxisMonth = d3.svg.axis().scale(xMonth)
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

	var yAxisMonth = d3.svg.axis().scale(yMonth)
						.orient("left").ticks(5).tickFormat(function(s){
							return s/1000000;
						});

	var lineMonth = d3.svg.line()
						.x(function(d){return xMonth(d.month);})
						.y(function(d){return yMonth(d.total);});

	svg.append("path")
		.attr("class","path")
		.attr("d", lineMonth(loanData))
		.attr("transform","translate(0,0)")
		.style("stroke","steelblue")
		.style("stroke-width",2)
		.style("fill","none");

	svg.append("g")
		.attr("class","x-axis")
		.attr("transform", "translate(0," + (heightmonth-50) + ")")
		.call(xAxisMonth)
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
		.call(yAxisMonth);

	svg.append("text")
		.attr("transform","rotate(-90)")
		.attr("x", -(line_width/2))
		.attr("y",margin.right-5)
		.style("font","black")
		.text("Million");

	svg.append("text")
		.attr("x",(widthmonth-10)/2)
		.attr("y",heightmonth-55)
		.style("font","black")
		.text("Month");
}