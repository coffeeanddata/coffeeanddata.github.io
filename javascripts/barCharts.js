// data provided: https://www.kaggle.com/mylesoneill/world-university-rankings
//dataScrub is a case by case function
dataScrub = function(d, i){
		var rankFilter = 100;
		if((+d.world_rank <= rankFilter)){
		d.world_rank_rev       = rankFilter - +d.world_rank + 1
		d.world_rank = +d.world_rank
		d.national_rank        = +d.national_rank
		d.quality_of_education = +d.quality_of_education
		d.alumni_employment    = +d.alumni_employment
		d.score                = +d.score
		d.year 				   = +d.year
		d.publications        = +d.publications
		return d;
	}
}

d3.csv("getData/world-university-ranking/cwurData.csv", dataScrub ,function(data){
	//filtering data by USA instititions only
	USAdata = data.filter(function(x) {	 return x.country == "USA" & x.year == "2015"; }).slice(0, 30)


	//canvas(id, width, height)
	var barPlot = canvas("barPlot", 800, 650, "#main_content_wrap");	
	barPlot.barPlot(USAdata, "institution", "score"); //barPlot(data, x, y)
	barPlot.createTips("world_rank") //tooltip data variable
	var fillColor = function(d) { return "#728c3f"; } //static color 
	barPlot.colorFeature("instiution", fillColor) // colorFeature( fill by variable, fill scale)
	barPlot.updateDesc("", "Score", "Top 40 Internationally Ranked USA Institution") //updateDesc(x label, yLabel, TItle)
	barPlot.rotateText("x", -90, "end", -1, -.5) //rotateText(axis to rate, by degrees, text append at, move text by , move text by)

	// Horizontal bar plot
	var data2015 = data.filter(function(x) { return x.year == "2015"; }).slice(0, 30)
	var horizontalBarPlot = canvas("HorizontalbarPlot", 800, 650, "#main_content_wrap");	
	horizontalBarPlot.barPlot(data2015, "score", "institution");
	horizontalBarPlot.createTips("country")
	var countryScale = d3.scaleOrdinal().range(["#1F77B4", "#D62728", "#9467BD", "#FF7F0E", "#2CA02C", "#8C564B", "#FF6666", "#F8CA40"]);
	horizontalBarPlot.colorFeature("country", countryScale)
	horizontalBarPlot.updateDesc("Score", "", "Top 30 World Ranked Institution ")

	// grouped bar plot
	dataUC = data.filter(function(x) { return x.institution.indexOf("University of California") >= 0; }).slice(0, 30)
	var canvasUC = canvas("groupBarPlot", 800, 650, "#main_content_wrap");	
	canvasUC.barPlot(dataUC, "institution", "world_rank_rev", "year"); 
	canvasUC.colorFeature("year", countryScale)
	canvasUC.createTips("year")
	canvasUC.updateDesc("", "World Ranking", "University of California World Ranking (Higher is Better)")
	canvasUC.rotateText("x", -90, "end", -1, -.5) //rotateText(axis to rate, by degrees, text append at, move text by , move text by)


	// Horizontal Stacked Barplot
	var canvasUC_H_stacked = canvas("HorizontalStackedBar",800 , 650, "#main_content_wrap");	
	canvasUC_H_stacked.barPlot(dataUC, "world_rank_rev", "institution","year", true); 
	canvasUC_H_stacked.colorFeature("year", countryScale)
	canvasUC_H_stacked.createTips("year")
	canvasUC_H_stacked.updateDesc( "World Ranking","" ,"University of California World Ranking (Higher is Better)")
	

	// Horizontal Stacked Barplot
	var barChartUpdate = canvas("stackedandGrouped", 800, 650, "#main_content_wrap");	
	barChartUpdate.barPlot(dataUC, "institution", "publications","year", true); 
	barChartUpdate.barChartTransition()
	barChartUpdate.colorFeature("year", countryScale)
	barChartUpdate.createTips("year")
	barChartUpdate.updateDesc("", "Number of Publications" ,"Number of Publication per University of California")
	barChartUpdate.rotateText("x", -90, "end", -1, -.5) //rotateText(axis to rate, by degrees, text append at, move text by , move text by)

	getButton = document.getElementsByClassName("stackedandGrouped_updateButton")
	getButton[1].click()


	var HbarChartUpdate = canvas("HorizontalstackedandGrouped", 800, 650, "#main_content_wrap");	
	HbarChartUpdate.barPlot(dataUC, "publications", "institution", "year", true); 
	HbarChartUpdate.barChartTransition()
	HbarChartUpdate.colorFeature("year", countryScale)
	HbarChartUpdate.createTips("year")
	HbarChartUpdate.updateDesc("Number of Publications", "" ,"Number of Publication per University of California")
})
