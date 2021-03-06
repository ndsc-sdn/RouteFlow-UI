$(document).ready(function() {
		
		
			// Our ajax data renderer which here retrieves a text file.
  			// it could contact any source and pull data, however.
  			// The options argument isn't used in this renderer.
  	   var ajaxDataRenderer = function(url, plot, options) {
    		var ret = null;
    		$.ajax({
      		// have to use synchronous here, else the function 
      		// will return before the data is fetched
      			async: false,
      			url: url,
      			dataType:"json",
      			success: function(data) {
        			ret = data;
      			}
    		});
			var input = ret.results[0].data;
			var output = ret.results[1].data;
			//console.log(output);
			return [input, output];
		};
		
		// The url for our json data
                //var jsonurl = "../js/jqPlot/examples/jsondata.txt";
		
		var d=new Date();
		var t=Math.round(d.getTime()/1000);
		var minutes=60;
		var hours=minutes*60;
		var days=hours*24;
		var years=days*365;
		var start = t - days;
		var jsonurl = "../webservice/rf_measurement_agg.cgi?start=" + 
				start + "&flie=156.56.5.41_121.rrd";
		
		   var plot1 = $.jqplot('chart1', jsonurl, {
    				title: "Aggregate traffic", 
				dataRenderer: ajaxDataRenderer, axes: {
				  xaxis: { 
              				renderer: $.jqplot.DateAxisRenderer,
					min: start,
					 tickOptions: {
              					angle: -30,
						formatString: '%R'
					}
				   }
				},
			 	seriesDefaults: { showMarker: false },	
				cursor:{ 
        				show: true, 
					zoom:true, 
        				showTooltip:true
      				} 
  		});

		var  s1 = [322];
 
   		var plot3 = $.jqplot('chart3',[s1],{
		 title: "OpenFlow Rules",
		 seriesDefaults: {
               		renderer: $.jqplot.MeterGaugeRenderer,
               		rendererOptions: {
               		min: 100, max: 1000,
               		intervals:[600, 800, 1000],
               intervalColors:['#66cc66', '#E7E658', '#cc6666']
           }
       }
   });
 
  	   $('.button-reset').click(function() { plot1.resetZoom() });
});
