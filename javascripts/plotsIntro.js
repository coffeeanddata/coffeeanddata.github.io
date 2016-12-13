// data provided: https://www.kaggle.com/mylesoneill/world-university-rankings
//dataScrub is a case by case function
dataScrub = function(d, i){
	var rankFilter = 100,
		keyWordArray = ["University of California", "University", "Swiss Federal Institute of Technology in Zurich", "Massachusetts Institute of Technology", "California Institute of Technology"],
		replaceArray = ["UC", "Univ", "ETH Zurich", "MIT", "Cal Tech"];
	d.institution_backup = d.institution;
	for(i = 0; i < keyWordArray.length; i++){
		d.institution = d.institution.replace(keyWordArray[i], replaceArray[i]);
	}
	d.institution          = d.institution.replace("California Institdute of Technology", "Cal Tech");
	d.world_rank_rev       = rankFilter - +d.world_rank + 1
	d.world_rank           = +d.world_rank
	d.national_rank        = +d.national_rank
	d.quality_of_education = +d.quality_of_education
	d.alumni_employment    = +d.alumni_employment
	d.score                = +d.score
	d.year 				   = +d.year
	d.publications         = +d.publications
	d.country             = d.country.replace("United Kingdom", "UK")
	return d;
}

d3.csv("getData/world-university-ranking/cwurData_filtered.csv", dataScrub ,function(data){
	//filtering data by USA instititions only
	USAdata = data.filter(function(x) {	 return x.country == "USA" & x.year == "2015"; }).slice(0, 25);


	//canvas(id, width, height)
	var barPlot = canvas("barPlot", 600, 600, "#secondary_plots");	
	barPlot.updateMargin("bottom", .25);
	barPlot.barPlot(USAdata, "institution", "score"); //barPlot(data, x, y)

	barPlot.createTips("world_rank"); //tooltip data variable
	var fillColor = function(d) { return "#728c3f"; } //static color 
	barPlot.colorBy("institution", fillColor); // colorBy( fill by variable, fill scale)
	barPlot.updateDesc("", "Score", "Top 25 Internationally Ranked USA Institution") //updateDesc(x label, yLabel, TItle)
	barPlot.rotateText("x", -60, "end", -2, -7); //rotateText(axis to rate, by degrees, text append at, move text horizontal by , move text veritcal by)

	// Horizontal bar plot
	var data2015 = data.filter(function(x) { return x.year == "2015"; }).slice(0, 25);
	var horizontalBarPlot = canvas("HorizontalbarPlot", 600, 600, "#main_plots");	
	horizontalBarPlot.updateMargin("right", .17);
	horizontalBarPlot.updateMargin("left", .20);
	horizontalBarPlot.barPlot(data2015, "score", "institution");

	horizontalBarPlot.createTips("country");
	var colorArray1 = ["#1F77B4", "#D62728", "#9467BD", "#FF7F0E", "#2CA02C", "#8C564B", "#FF6666", "#F8CA40"];
	var countryScale = d3.scaleOrdinal().range(colorArray1);
	horizontalBarPlot.colorBy("country", countryScale, true);
	horizontalBarPlot.updateDesc("Score", "", "Top 25 World Ranked Institution ");
	addExtraText(horizontalBarPlot);

	// grouped bar plot
	dataUC = data.filter(function(x) { return x.institution.indexOf("UC") >= 0; }).slice(0, 30);

	
	
	var canvasUC = canvas("groupBarPlot", 600, 600, "#secondary_plots");	
	canvasUC.barPlot(dataUC, "institution", "world_rank_rev", "year"); 
	
	canvasUC.colorBy("year", countryScale, true);
	canvasUC.createTips("year");
	canvasUC.updateDesc("", "World Ranking", "University of California World Ranking (Higher is Better)");
	canvasUC.rotateText("x", -60, "end", -2, -7); //rotateText(axis to rate, by degrees, text append at, move text horizontal by , move text veritcal by)
	addExtraText(canvasUC);


	
	// Scatterplot example
	var getTopEmployment = data.filter(function(x) {return x.alumni_employment < 100; });
	var SP = canvas("scatterPlot", 600, 600, "#main_plots");
	SP.updateMargin("left", .10);
	SP.updateMargin("right", .17);
	SP.scatterPlot(getTopEmployment, "world_rank", "alumni_employment");
	SP.updateDesc("World Ranking", "Alumini Employment Ranking", "Alumni Employment Ranking Impact on World Ranking");
	SP.colorBy("country", countryScale, true);
	SP.createTips("year"); 
	addExtraText(SP);
	

	// Horizontal Stacked Barplot
	var canvasUC_H_stacked = canvas("HorizontalStackedBar",600 , 600, "#secondary_plots");	
	canvasUC_H_stacked.barPlot(dataUC, "world_rank_rev", "institution","year", true); 
	canvasUC_H_stacked.colorBy("year", countryScale, true); 
	canvasUC_H_stacked.createTips("year"); 
	canvasUC_H_stacked.updateDesc( "World Ranking","" ,"University of California World Ranking (Higher is Better)");
	addExtraText(canvasUC_H_stacked);
	

	// Horizontal Stacked Barplot
	var barChartUpdate = canvas("stackedandGrouped", 600, 600, "#secondary_plots");	
	barChartUpdate.barPlot(dataUC, "institution", "publications","year", true); 
	barChartUpdate.barChartTransition(); 
	barChartUpdate.colorBy("year", countryScale, true); 
	barChartUpdate.createTips("year"); 
	barChartUpdate.updateDesc("", "Number of Publications" ,"Number of Publication per University of California"); 
	barChartUpdate.rotateText("x", -60, "end", -2, -7);  //rotateText(axis to rate, by degrees, text append at, move text horizontal by , move text veritcal by)




var parseTime = d3.timeParse("%Y%m%d");
setupType = function(d){
	d.date = parseTime(d.date);
	return d;
};



d3.csv("getData/tempData.csv", setupType, function(data){
	
	var timeSeriesPlot = canvas("timeSeriesPlot", 1220, 500, "#main_plots");	
	timeSeriesPlot.timeSeries(data, 'date', 'Amount', 'City');
	timeSeriesPlot.updateMargin("left", .1);
	timeSeriesPlot.updateMargin("right", .17);
	var colorArray1 = ["#1F77B4", "#D62728", "#9467BD"],
	CitiesColor = d3.scaleOrdinal().range(colorArray1);

	timeSeriesPlot.colorBy("City", CitiesColor, true);
	timeSeriesPlot.updateDesc("Date", "Temperature, ºF", "Multi-Series Line Chart");
	
 });

});


