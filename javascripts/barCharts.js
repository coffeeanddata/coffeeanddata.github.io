// data provided: https://www.kaggle.com/mylesoneill/world-university-rankings
//dataScrub is a case by case function
dataScrub = function(d, i){
		var rankFilter = 100;
		if((+d.world_rank <= rankFilter)){
			d.institution          = d.institution.replace("University of California,", "UC"); 
			d.institution          = d.institution.replace("University", "Univ"); 
			d.institution          = d.institution.replace("Swiss Federal Institute of Technology in Zurich", "ETH Zurich")
			d.institution          = d.institution.replace("Massachusetts Institute of Technology", "MIT")


			d.world_rank_rev       = rankFilter - +d.world_rank + 1
			d.world_rank           = +d.world_rank
			d.national_rank        = +d.national_rank
			d.quality_of_education = +d.quality_of_education
			d.alumni_employment    = +d.alumni_employment
			d.score                = +d.score
			d.year 				   = +d.year
			d.publications         = +d.publications
			return d;
	}
}

d3.csv("getData/world-university-ranking/cwurData.csv", dataScrub ,function(data){
	//filtering data by USA instititions only
	USAdata = data.filter(function(x) {	 return x.country == "USA" & x.year == "2015"; }).slice(0, 25)


	//canvas(id, width, height)
	var barPlot = canvas("barPlot", 700, 650, "#main_content_wrap");	
	barPlot.updateMargin("bottom", .25)
	barPlot.barPlot(USAdata, "institution", "score"); //barPlot(data, x, y)

	barPlot.createTips("world_rank") //tooltip data variable
	var fillColor = function(d) { return "#728c3f"; } //static color 
	barPlot.colorBy("institution", fillColor) // colorBy( fill by variable, fill scale)
	barPlot.updateDesc("", "Score", "Top 25 Internationally Ranked USA Institution") //updateDesc(x label, yLabel, TItle)
	barPlot.rotateText("x", -60, "end", -2, -7) //rotateText(axis to rate, by degrees, text append at, move text horizontal by , move text veritcal by)

	// Horizontal bar plot
	var data2015 = data.filter(function(x) { return x.year == "2015"; }).slice(0, 25)
	var horizontalBarPlot = canvas("HorizontalbarPlot", 700, 650, "#main_content_wrap");	
	horizontalBarPlot.updateMargin("left", .23)
	horizontalBarPlot.barPlot(data2015, "score", "institution");

	horizontalBarPlot.createTips("country")
	colorArray1 = ["#1F77B4", "#D62728", "#9467BD", "#FF7F0E", "#2CA02C", "#8C564B", "#FF6666", "#F8CA40"]
	var countryScale = d3.scaleOrdinal().range(colorArray1);
	horizontalBarPlot.colorBy("country", countryScale, true)
	horizontalBarPlot.updateDesc("Score", "", "Top 25 World Ranked Institution ")

	// grouped bar plot
	dataUC = data.filter(function(x) { return x.institution.indexOf("UC") >= 0; }).slice(0, 30)
	
	var canvasUC = canvas("groupBarPlot", 700, 650, "#main_content_wrap");	
	canvasUC.barPlot(dataUC, "institution", "world_rank_rev", "year"); 
	canvasUC.colorBy("year", countryScale, true)
	canvasUC.createTips("year")
	canvasUC.updateDesc("", "World Ranking", "University of California World Ranking (Higher is Better)")
	canvasUC.rotateText("x", -60, "end", -2, -7) //rotateText(axis to rate, by degrees, text append at, move text horizontal by , move text veritcal by)


	// Horizontal Stacked Barplot
	var canvasUC_H_stacked = canvas("HorizontalStackedBar",700 , 650, "#main_content_wrap");	
	canvasUC_H_stacked.barPlot(dataUC, "world_rank_rev", "institution","year", true); 
	canvasUC_H_stacked.colorBy("year", countryScale, true)
	canvasUC_H_stacked.createTips("year")
	canvasUC_H_stacked.updateDesc( "World Ranking","" ,"University of California World Ranking (Higher is Better)")
	

	// Horizontal Stacked Barplot
	var barChartUpdate = canvas("stackedandGrouped", 700, 650, "#main_content_wrap");	
	barChartUpdate.barPlot(dataUC, "institution", "publications","year", true); 
	barChartUpdate.barChartTransition()
	barChartUpdate.colorBy("year", countryScale, true)
	barChartUpdate.createTips("year")
	barChartUpdate.updateDesc("", "Number of Publications" ,"Number of Publication per University of California")
	barChartUpdate.rotateText("x", -60, "end", -2, -7) //rotateText(axis to rate, by degrees, text append at, move text horizontal by , move text veritcal by)


	// stacked group
	var HbarChartUpdate = canvas("HorizontalstackedandGrouped", 700, 650, "#main_content_wrap");	
	HbarChartUpdate.barPlot(dataUC, "publications", "institution", "year", true); 
	HbarChartUpdate.barChartTransition()
	HbarChartUpdate.colorBy("year", countryScale, true)
	HbarChartUpdate.createTips("year")
	HbarChartUpdate.updateDesc("Number of Publications", "" ,"Number of Publication per University of California")
})
