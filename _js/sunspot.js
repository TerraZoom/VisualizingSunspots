  // set dimensions and margins of the graph
  var margin = {top:10, right:10, bottom:10, left:10},
      width = 460 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      innerRadius = 80,
      outerRadius = Math.min(width,height)/2; // the outerRadius goes from the middle of the SVG area to the border

  //append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + width/2 + "," + ( height/2+100 ) + ")"); // add 100 on y translation because upper bars are longer

        d3.csv("http://atlas.local/cc/Proj6/data/sunspots/sunspots_2014.csv", function(data) {
          // xscale
           var x = d3.scaleBand()
               .range([0, Math.TWO_PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
               .align(0)                  // This does nothing ?
               .domain( data.map(function(d) { return d.Year + d.Month + d.Day; }) ); // The domain of the X axis is the days.

           // yscale
           var y = d3.scaleRadial()
               .range([innerRadius, outerRadius])   // Domain will be define later.
               .domain([0, 1000]); // Domain of Y is from 0 to the max seen in the data

           // Add bars
           svg.append("g")
             .selectAll("path")
             .data(data)
             .enter()
             .append("path")
               .attr("fill", "#69b3a2")
               .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                   .innerRadius(innerRadius)
                   .outerRadius(function(d) { return y(d['SSN']); })
                   .startAngle(function(d) { return x(d.Year + d.Month . d.Day); })
                   .endAngle(function(d) { return x(d.Year + d.Month . d.Day) + x.bandwidth(); })
                   .padAngle(0.01)
                   .padRadius(innerRadius))

         });
