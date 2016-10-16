console.log('This would be the main JS file.');


addExtraText = function(plotObj){
	var getPlot =  plotObj.plot,
		outline = plotObj.outline;

	var getTemporaryGroupText = getPlot.append("g")
		.attr("class", "temporaryText")
		.attr("transform", "translate(" + (outline.leftMargin + outline.width - 50) + "," +  (outline.topMargin - 30) + ")");		

	var getTemporaryText =  getTemporaryGroupText
		.selectAll("text.temporaryText").data([1]);
	getTemporaryText.selectAll("text.temporatyText").data([1]);
	getTemporaryText
		.enter().append("text")
	.merge(getTemporaryText)
		.text("Click on Legend for Filter")
		.style("font-size", "11px")
		.style("font-weight", "bold")
}
