function monthDataOutstanding(dropdown_value){
	alert("IN MOTNH DATA OUTSTANDING");
	var month;
	if(dropdown_value == "All"){
		month=7;
	}
	else{
		month = dropdown_value;
	}

	tipDetailed = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-5, 50])
	  .html(function(d) {
	    return "<strong>Amount:</strong> <span style='color:red'>" + d.total + "</span>";
	  });
	var monthdata_filter_new = month_data.filter(function(d){return d.month == month;});

	d3.selectAll("div.loans").remove();
	d3.selectAll("#loan_container .svg_linechart").remove();
	d3.selectAll("#loan_container .svg").remove();
	d3.selectAll("#loan_container #monthDistribution").remove();
	d3.selectAll("#loan_container #loans_number").remove();
	d3.selectAll("#loan_container_new .svg_new").remove();
	d3.selectAll("#loan_container_new #monthDistribution").remove();
	d3.selectAll("#loan_container_new #loans_number").remove();
	var bankloan_amt_grps = monthdata_filter_new.map(function(d){return {
						location : d.location,
						total : +d.outstanding_bank_1_amount+d.outstanding_bank_2_amount+d.outstanding_bank_3_amount,
						amount : [+d.outstanding_bank_1_amount,+d.outstanding_bank_2_amount,+d.outstanding_bank_3_amount],
						loan : [{member:+d.outstanding_bank_1_loans,group:+d.outstanding_bank_1_groups},{member:+d.outstanding_bank_2_loans,group:+d.outstanding_bank_2_groups},{member:+d.outstanding_bank_3_loans,group:+d.outstanding_bank_3_groups}]
					};
				});
	//bankloan_amt_grps = bankloan_amt_grps.filter(function(d){return (d.total != 0 && d.total != null); });
	var bridgeloan_amt_grps = monthdata_filter_new.map(function(d){return {
						location : d.location,
						total : +d.outstanding_bridge_1_amount+d.outstanding_bridge_2_amount+d.outstanding_bridge_3_amount,
						amount : [+d.outstanding_bridge_1_amount,+d.outstanding_bridge_2_amount,+d.outstanding_bridge_3_amount],
						loan : [{member:+d.outstanding_bridge_1_loans,group:+d.outstanding_bridge_1_groups},{member:+d.outstanding_bridge_2_loans,group:+d.outstanding_bridge_2_groups},{member:+d.outstanding_bridge_3_loans,group:+d.outstanding_bridge_3_groups}]
					};
				});
	//bridgeloan_amt_grps = bridgeloan_amt_grps.filter(function(d){return (d.total != 0 && d.total != null); });
	var specialloan_amt_grps = monthdata_filter_new.map(function(d){return {
						location : d.location,
						total : +d.outstanding_special_loan_1_amount+d.outstanding_special_loan_2_amount+d.outstanding_special_loan_3_amount,
						amount : [+d.outstanding_special_loan_1_amount,+d.outstanding_special_loan_2_amount,+d.outstanding_special_loan_3_amount],
						loan : [{member:+d.outstanding_special_loan_1_loans,group:+d.outstanding_special_loan_1_groups},{member:+d.outstanding_special_loan_2_loans,group:+d.outstanding_special_loan_2_groups},{member:+d.outstanding_special_loan_1_loans,group:+d.outstanding_special_loan_3_groups}]
					};
				});
	//specialloan_amt_grps = specialloan_amt_grps.filter(function(d){return (d.total != 0 && d.total != null); });
	var bankloan_amt_member = monthdata_filter_new.map(function(d){return {
						location : d.location,
						total : +d.outstanding_member_bank_1_amount+d.outstanding_member_bank_2_amount+d.outstanding_member_bank_3_amount,
						amount : [+d.outstanding_member_bank_1_amount,+d.outstanding_member_bank_2_amount,+d.outstanding_member_bank_3_amount],
						loan : [{member:+d.outstanding_member_bank_1_loans,group:+d.outstanding_member_bank_1_groups},{member:+d.outstanding_member_bank_2_loans,group:+d.outstanding_member_bank_2_groups},{member:+d.outstanding_member_bank_3_loans,group:+d.outstanding_member_bank_3_groups}]
					};
				});
	//bankloan_amt_member = bankloan_amt_member.filter(function(d){return (d.total != 0 && d.total != null); });
	var specialloan_amt_member = monthdata_filter_new.map(function(d){return {
						location : d.location,
						total : +d.outstanding_member_special_loan_1_amount+d.outstanding_member_special_loan_2_amount+d.outstanding_member_special_loan_3_amount,
						amount : [+d.outstanding_member_special_loan_1_amount,+d.outstanding_member_special_loan_2_amount,+d.outstanding_member_special_loan_3_amount],
						loan : [{member:+d.outstanding_member_special_loan_1_loans,group:+d.outstanding_member_special_loan_1_groups},{member:+d.outstanding_member_special_loan_2_loans,group:+d.outstanding_member_special_loan_2_groups},{member:+d.outstanding_member_special_loan_3_loans,group:+d.outstanding_member_special_loan_3_groups}]
					};
				});

	/*var legendSVG = d3.select("#vis").append("svg")
						.attr("class","legend")
						.attr("height",50)
						.attr("width",700);

    var legend = legendSVG.selectAll("g.rect")
				        .data(monthdata_filter_new)
				        .enter()
				        .append("g")
			        	.attr("class","rect");

	legend.append("rect")
			.attr("class","rect_legend")
    		.attr("width",20)
    		.attr("height",15)
        	.attr("transform",function(d,i){return "translate(" + ((i+1)*60)+ ",15)";})
    		.style("fill",function(d){return color(d.location);})
    		.on("click",function(d){
    			clickMarkMainNew(d)
    			console.log(d);
    		});

		legend.append("text")
			.attr("class","text")
			.attr("y",14)
			.attr("transform",function(d,i){return "translate(" + ((i+1)*60)+ ",30)";})
			.text(function(d){return d.location;});*/

	drawLegend("month");

	monthDataRenderGroup(bankloan_amt_grps,"Bank Loan to Groups");
	monthDataRenderGroup(bridgeloan_amt_grps,"Bridge Loan to Groups");
	monthDataRenderGroup(specialloan_amt_grps,"Special Loan to Groups");
	monthDataRenderMember(bankloan_amt_member,"Bank Loan to Members");
	monthDataRenderMember(specialloan_amt_member,"Special Loan to Members");
}

function clickMarkMainNew(data_new){

		d3.selectAll("#textContent").remove();
		d3.selectAll("#textContentMember").remove();
		d3.selectAll("#monthDistribution").remove();

		var textSVG = d3.select("#loan_container").append("svg")
						.attr("id","textContent")
						.attr("height",200)
						.attr("width",350);

	    textSVG.append("text")
	    	.attr("class","textTitle")
	    	.attr("x",20)
	    	.attr("y",20)
	    	.text("Location : " + data_new.location);
	    textSVG.append("text")
	    	.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",45)
	    	.text("--Group Data--");
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",65)
	    	.text("Bank Loan : " +(data_new.outstanding_bank_1_amount+data_new.outstanding_bank_2_amount+data_new.outstanding_bank_3_amount));
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",80)
	    	.text("Bridge Loan : "+(data_new.outstanding_bridge_1_amount+data_new.outstanding_bridge_2_amount+data_new.outstanding_bridge_3_amount));
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",95)
	    	.text("Special Loan : " +(data_new.outstanding_special_loan_1_amount+data_new.outstanding_special_loan_2_amount+data_new.outstanding_special_loan_3_amount));
	    
	    var textSVGMember = d3.select("#loan_container_new").append("svg")
								.attr("id","textContentMember")
								.attr("height",200)
								.attr("width",350);

	    textSVGMember.append("text")
	    	.attr("class","textHeader")
	    	.attr("x",20)
	    	.attr("y",45)
	    	.text("--Member Data--");
	    textSVGMember.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",65)
	    	.text("Bank Loan : " +(data_new.outstanding_member_bank_1_amount+data_new.outstanding_member_bank_2_amount+data_new.outstanding_member_bank_3_amount));
	    textSVGMember.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",80)
	    	.text("Bridge Loan : "+(data_new.outstanding_member_special_loan_1_amount+data_new.outstanding_member_special_loan_2_amount+data_new.outstanding_member_special_loan_3_amount));

	}