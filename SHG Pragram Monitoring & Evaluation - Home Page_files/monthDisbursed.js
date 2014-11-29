function monthDataDisbursed(dropdown_value){

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

	d3.selectAll("svg").remove();
	var bankloan_amt_grps = monthdata_filter.map(function(d){return {
						location : d.location,
						total : +d.bank_1_amount+d.bank_2_amount+d.bank_3_amount,
						amount : [+d.bank_1_amount,+d.bank_2_amount,+d.bank_3_amount],
						loan : [{member:+d.bank_1_loans,group:+d.bank_1_groups},{member:+d.bank_2_loans,group:+d.bank_2_groups},{member:+d.bank_3_loans,group:+d.bank_3_groups}]
					};
				});
	//bankloan_amt_grps = bankloan_amt_grps.filter(function(d){return (d.total != 0 && d.total != null); });
	var bridgeloan_amt_grps = monthdata_filter.map(function(d){return {
						location : d.location,
						total : +d.bridge_1_amount+d.bridge_2_amount+d.bridge_3_amount,
						amount : [+d.bridge_1_amount,+d.bridge_2_amount,+d.bridge_3_amount],
						loan : [{member:+d.bridge_1_loans,group:+d.bridge_1_groups},{member:+d.bridge_2_loans,group:+d.bridge_2_groups},{member:+d.bridge_3_loans,group:+d.bridge_3_groups}]
					};
				});
	//bridgeloan_amt_grps = bridgeloan_amt_grps.filter(function(d){return (d.total != 0 && d.total != null); });
	var specialloan_amt_grps = monthdata_filter.map(function(d){return {
						location : d.location,
						total : +d.special_loan_1_amount+d.special_loan_2_amount+d.special_loan_3_amount,
						amount : [+d.special_loan_1_amount,+d.special_loan_2_amount,+d.special_loan_3_amount],
						loan : [{member:+d.special_loan_1_loans,group:+d.special_loan_1_groups},{member:+d.special_loan_2_loans,group:+d.special_loan_2_groups},{member:+d.special_loan_1_loans,group:+d.special_loan_3_groups}]
					};
				});
	//specialloan_amt_grps = specialloan_amt_grps.filter(function(d){return (d.total != 0 && d.total != null); });
	var bankloan_amt_member = monthdata_filter.map(function(d){return {
						location : d.location,
						total : +d.member_bank_1_amount+d.member_bank_2_amount+d.member_bank_3_amount,
						amount : [+d.member_bank_1_amount,+d.member_bank_2_amount,+d.member_bank_3_amount],
						loan : [{member:+d.member_bank_1_loans,group:+d.member_bank_1_groups},{member:+d.member_bank_2_loans,group:+d.member_bank_2_groups},{member:+d.member_bank_3_loans,group:+d.member_bank_3_groups}]
					};
				});
	//bankloan_amt_member = bankloan_amt_member.filter(function(d){return (d.total != 0 && d.total != null); });
	var specialloan_amt_member = monthdata_filter.map(function(d){return {
						location : d.location,
						total : +d.member_special_loan_1_amount+d.member_special_loan_2_amount+d.member_special_loan_3_amount,
						amount : [+d.member_special_loan_1_amount,+d.member_special_loan_2_amount,+d.member_special_loan_3_amount],
						loan : [{member:+d.member_special_loan_1_loans,group:+d.member_special_loan_1_groups},{member:+d.member_special_loan_2_loans,group:+d.member_special_loan_2_groups},{member:+d.member_special_loan_3_loans,group:+d.member_special_loan_3_groups}]
					};
				});
	/*var legendSVG = d3.select("#vis").append("svg")
						.attr("class","legend")
						.attr("height",50)
						.attr("width",700);

    var legend = legendSVG.selectAll("g.rect")
				        .data(monthdata_filter)
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
    			clickMarkMain(d)
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

function monthDataRenderGroup(loan_data_group,label){

	var meanValueGroup = ss.mean(loan_data_group.map(function(d){ return d.total;}));
	var svg = d3.select("#vis_container").append("svg")
					.attr("width",svg_width)
					.attr("height",svg_height)
					.attr("class","svg")
					.append("g");

	svg.append("svg:text")
		.attr("class", "label")
		.attr("x",(svg_width/2))
		.attr("y",15)
		.attr("text-anchor", "middle")
		.style("font-weight","bold")
		.style("font","black") // text-align: right
		.text(label);
						//.attr("transform","translate(20,0)");
	var y = d3.scale.ordinal()
				.domain(loan_data_group.map(function(d){return d.location;}))
				.rangeRoundBands([25,height],0.1);

	var x = d3.scale.linear()
				//.domain([d3.min(reportdata_new,function(d){return d.total;}),d3.max(reportdata_new,function(d){return d.total;})])
				.domain([d3.min(loan_data_group,function(d){return +d.total;}),d3.max(loan_data_group,function(d){return +d.total;})])
				.range([0,width-10]);

	var	xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(10).tickFormat(function(s){
			return s/1000000;
		});

	var	yAxis = d3.svg.axis().scale(y)
		.orient("left");
	
	svg.call(tipDetailed);

	svg.selectAll("rect")
		.data(loan_data_group)
		.enter()
		.append("rect")
		.attr("class","rect")
		//.attr("x", function(d){ return x(d.total);})
		.attr("y",function(d){ return y(d.location);})
		.attr("height",y.rangeBand())
    	.attr("width",function(d){
    		return x(+d.total);})
        .attr("transform",function(d,i){return "translate(60,0)";})
    	.style("fill",function(d){return color(d.location);})
    		.on("mouseover",function(d){
    			//console.log("inside hover");
    			tipDetailed.show(d,label);
    		})
    		.on("mouseout",function(d){
    			tipDetailed.hide();
    		})
    		.on("click",function(d){
    			//alert("clicked region");
    			clickMark(d,"groupdata");
    		});
		
		svg.append("g")
		.attr("class","x-axis")
		.attr("transform", "translate(60," + (height) + ")")
		.call(xAxis)
			.selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-75)" 
                })

            .style("font-size","10px");

		svg.append("g")
			.attr("class","y-axis")
			.attr("transform","translate(60,0)")
			.call(yAxis)
				.selectAll("text")
				.style("text-anchor", "end")
	            .style("font-size","10px");

	    svg.append("line")
	    	.attr("class","meanLine")
	    	.attr("transform","translate(60,0)")
	    	.attr("x1",function(d){ return x(meanValueGroup);})
	    	.attr("x2", function(d){ return x(meanValueGroup);})
	    	.attr("y1",25)
	    	.attr("y2",height)
	    	.style("stroke","red")
	    	.style("stroke-dasharray","4,3")
	    	.style("stroke-width","2");

	    svg.append("text")
			.attr("x",width)
			.attr("y",height-5)
			.style("font","black")
			.text("Million");

}

function monthDataRenderMember(loan_data_member,label){
	
	var meanValueMonth = ss.mean(loan_data_member.map(function(d){ return d.total;}));
	var svg_new = d3.select("#vis_container_new").append("svg")
					.attr("width",svg_width)
					.attr("height",svg_height)
					.attr("class","svg_new")
					.append("g");

	svg_new.append("svg:text")
		.attr("class", "label")
		.attr("x",(svg_width/2))
		.attr("y",15)
		.attr("text-anchor", "middle")
		.style("font-weight","bold")
		.style("font","black") // text-align: right
		.text(label);
	  				
	var y = d3.scale.ordinal()
				.domain(loan_data_member.map(function(d){return d.location;}))
				.rangeRoundBands([25,height],0.1);

	var x = d3.scale.linear()
				.domain([0,d3.max(loan_data_member,function(d){return d.total;})])
				.range([0,width-10]);

	var	xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(10).tickFormat(function(s){
			return s/1000000;
		});

	var	yAxis = d3.svg.axis().scale(y)
		.orient("left");

	svg_new.call(tipDetailed);

	svg_new.selectAll("rect")
		.data(loan_data_member)
		.enter()
		.append("rect")
		.attr("class","rect")
		.attr("y",function(d){ return y(d.location);})
		.attr("height",y.rangeBand())
    	.attr("width",function(d){
    		return x(+d.total);})
        .attr("transform",function(d,i){return "translate(60,0)";})
    	.style("fill",function(d){return color(d.location);})
    	.on("mouseover",function(d){
    			tipDetailed.show(d,label);
    		})
    		.on("mouseout",function(d){
    			tipDetailed.hide();
    		})
    		.on("click",function(d){
    			clickMark(d,"memberdata");
    		});

    svg_new.append("g")
		.attr("class","x-axis")
		.attr("transform", "translate(60," + (height) + ")")
		.call(xAxis)
			.selectAll("text")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-75)" 
                })

            .style("font-size","10px");

	svg_new.append("g")
		.attr("class","y-axis")
		.attr("transform","translate(60,0)")
		.call(yAxis)
			.selectAll("text")
			.style("text-anchor", "end")
            .style("font-size","10px");

    svg_new.append("line")
	    	.attr("class","meanLine")
	    	.attr("transform","translate(60,0)")
	    	.attr("x1",function(d){ return x(meanValueMonth);})
	    	.attr("x2", function(d){ return x(meanValueMonth);})
	    	.attr("y1",25)
	    	.attr("y2",height)
	    	.style("stroke","red")
	    	.style("stroke-dasharray","4,3")
	    	.style("stroke-width","2");

	svg_new.append("text")
		.attr("x",width)
		.attr("y",height-5)
		.style("font","black")
		.text("Million");

}

function clickMarkMonth(data_new){

		d3.selectAll("#textContent").remove();
		d3.selectAll("#textContentMember").remove();
		d3.selectAll("#monthDistribution").remove();		
		d3.selectAll("#loans_number").remove();

		var textSVG = d3.select("#vis_container").append("svg")
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
	    	.text("Bank Loan : " +(data_new.bank_1_amount+data_new.bank_2_amount+data_new.bank_3_amount));
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",80)
	    	.text("Bridge Loan : "+(data_new.bridge_1_amount+data_new.bridge_2_amount+data_new.bridge_3_amount));
	    textSVG.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",95)
	    	.text("Special Loan : " +(data_new.special_loan_1_amount+data_new.special_loan_2_amount+data_new.special_loan_3_amount));
	    
	    var textSVGMember = d3.select("#vis_container_new").append("svg")
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
	    	.text("Bank Loan : " +(data_new.member_bank_1_amount+data_new.member_bank_2_amount+data_new.member_bank_3_amount));
	    textSVGMember.append("text")
	    	.attr("class","text")
	    	.attr("x",20)
	    	.attr("y",80)
	    	.text("Bridge Loan : "+(data_new.member_special_loan_1_amount+data_new.member_special_loan_2_amount+data_new.member_special_loan_3_amount));

	}

	function clickMark(data_rect,label){
		d3.selectAll("#textContent").remove();
		d3.selectAll("#textContentMember").remove();
		d3.selectAll("#monthDistribution").remove();
		d3.selectAll("#loans_number").remove();

		console.log(label);

		var xClick = d3.scale.linear()
				//.domain([d3.min(reportdata_new,function(d){return d.total;}),d3.max(reportdata_new,function(d){return d.total;})])
				.domain([0,d3.max(data_rect.amount,function(d){return d;})])
				.range([0,40]); 

		var x = d3.scale.ordinal()
					.domain([">150K","149k-50k","<49k"])
					.rangeRoundBands([20,260],0.1);

		var xAxisMonth = d3.svg.axis().scale(x)
							.orient("bottom").ticks(3);
		if (label == "groupdata"){
			var circle = d3.select("#vis_container").append("svg");
			var svg_rect = d3.select("#vis_container").append("svg");
		}
		else{
			var circle = d3.select("#vis_container_new").append("svg");
			var svg_rect = d3.select("#vis_container_new").append("svg");
		}
		circle.attr("id","monthDistribution")
			.attr("height",200)
			.attr("width",280);
		circle.append("svg:text")
			.attr("class", "label")
			//.attr("y",15)
			.attr("text-anchor", "middle")
			.attr("transform","translate(140,20)")
			.style("font-weight","bold") // text-align: right
			.text("Amount Distribution");

		var amount_circle = circle.selectAll("g.amount_circle").data(data_rect.amount,function(d){ return d;});

		//amount_circle.exit().remove();

		amount_circle.enter().append("g")
			.append("circle")
			.attr("class","amount_circle")
			.attr("cx", function(d,i){return 60+ (i*80);})
			.attr("cy",75)
			.attr("r",function(d){
				return xClick((d));})
			.style("fill",function(d){ return monthColor(data_rect.amount.indexOf(d));})
			.style("opacity","1");

		amount_circle.attr("r", function(d){ return xClick((d));});

		amount_circle.append("text")
			.attr("class","text")
			.attr("dx",function(d,i){ return 50+(i*60);})
			.attr("dy",135)
			.text(function(d){ return d;});

		circle.append("g")
		.attr("class","x-axis")
		.attr("transform","translate(0,150)")
		.call(xAxisMonth)
			.selectAll("text")
			.style("text-anchor", "middle")
            .style("font-size","10px");

        svg_rect.attr("id","loans_number")
			.attr("height",svg_height)
			.attr("width",svg_width+80);

		svg_rect.append("svg:text")
			.attr("class", "label")
			//.attr("y",15)
			.attr("text-anchor", "middle")
			.attr("transform","translate(120,20)")
			.style("font-weight","bold") // text-align: right
			.text("Groups & Members");

        var col1 = d3.max(data_rect.loan.map(function(d){return d.group;}),function(d){ return d;});
		var col2 = d3.max(data_rect.loan.map(function(d){return d.member;}),function(d){return d;});


		var xRect = d3.scale.ordinal()
					.domain([">150K","149k-50k","<49k"])
					.rangeRoundBands([30,svg_width-20],0.1);

		var xRectAxis = d3.svg.axis().scale(xRect)
							.orient("bottom").ticks(3);

        var yRect = d3.scale.linear()
        				.domain([0,Math.max(col1,col2)])
        				.range([height,30]);

        var yRectAxis = d3.svg.axis().scale(yRect)
        					.orient("left").ticks(10);

        var loans_rect = svg_rect.selectAll("rect")
        					.data(data_rect.loan)
        					.enter();

        loans_rect.append("rect")
        	.attr("class","loans_rect")
        	.transition().delay(100).duration(500)
        	.attr("height", function(d,i){ return (height - yRect(d.member));})
        	.attr("width",20)
        	.attr("x",function(d,i){ return 35+(i*50);})
        	.attr("y",function(d,i){ return yRect(d.member);})
        	.style("fill","blue");

        loans_rect.append("rect")
        	.attr("class","loans_rect")
        	.transition().delay(100).duration(500)
        	.attr("height", function(d,i){ return (height - yRect(d.group));})
        	.attr("width",20)
        	.attr("x",function(d,i){ return (i*50)+55;})
        	.attr("y",function(d){ return yRect(d.group);})
        	.style("fill","red");	

	    svg_rect.append("g")
			.attr("class","y-axis")
			.attr("transform","translate(30,0)")
			.call(yRectAxis)
				.selectAll("text")
				//.style("text-anchor", "middle")
	            .style("font-size","10px");

	    svg_rect.append("g")
			.attr("class","x-axis")
			.attr("transform","translate(0,"+(height+3)+")")
			.call(xRectAxis)
				.selectAll("text")
				.style("text-anchor", "middle")
	            .style("font-size","10px");

	    svg_rect.append("rect")
	    	.attr("class","legend")
    		.attr("width",20)
    		.attr("height",15)
        	.attr("transform","translate(200,15)")
        	.style("fill","red");

        svg_rect.append("text")
			.attr("class","text")
			.attr("transform","translate(222,25)")
			.style("font-size","15px")
			.text("Group");
    		

		svg_rect.append("rect")
	    	.attr("class","legend")
    		.attr("width",20)
    		.attr("height",15)
        	.attr("transform","translate(200,35)")
    		.style("fill","blue");   

    	svg_rect.append("text")
			.attr("class","text")
			.attr("transform","translate(222,45)")
			.style("font-size","15px")
			.text("Member");

        //loans_rect.append("rect")
	}

function drawLegend(from_page){
	var legendSVG = d3.select("#vis").append("svg")
						.attr("class","legend")
						.attr("height",50)
						.attr("width",700);

    var legend = legendSVG.selectAll("g.rect")
				        .data(monthdata_filter)
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
    			if(from_page == "month"){
    				clickMarkMonth(d)
    			}
    			else{
    				clickMarkMain(d.location);
    			}
    		});

	legend.append("text")
		.attr("class","text")
		.attr("y",14)
		.attr("transform",function(d,i){return "translate(" + ((i+1)*60)+ ",30)";})
		.text(function(d){return d.location;});
	}

	
