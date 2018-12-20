console.log(visitor);
const allDateCo = visitor.session.sessionStart.toLocaleString().split(" ")[0]
const date = allDateCo.split("/");
//var donne = {
//		browser: visitor.browser.name,
//		resolution: visitor.device.screen.resolution,
//		continent: visitor.geo.continentName,
//		pays: visitor.geo.countryName,
//		OS: visitor.os.name + visitor.os.version,
//		conexion: date[2] + "-" + date[1] + "-" + date[0]
//}
var donne = {
		browser: visitor.browser.name,
		resolution: visitor.device.screen.resolution,
		continent: visitor.geo.continentName,
		pays: visitor.geo.countryName,
		os: visitor.os.name + visitor.os.version,
		date: date[2] + "-" + date[1] + "-" + date[0]
}
console.log(donne);
$.ajax({
//    url: "http://localhost:8080/Exemple_servlet/sendInf",
	url: "http://localhost:8080/Exemple_servlet/ws/Exemple/Bonjour9",
    contentType: "application/json",
    data: JSON.stringify(donne), 
//    data: donne, 
    type: "POST"
}).done(function(rep) {
	var donne = gestionData(rep);
	graphPays(donne.continent, "chartdiv");
	graphPays(donne.browser, "chartdiv2");
	graphPays(donne.pays, "chartdiv3");
	graphPays(donne.os, "chartdiv4");
	graphPays(donne.resolution, "chartdiv5");
	graphPays(donne.date, "chartdiv6");
	$('#myPage').css({display: 'block'});
}).fail(function(error){
    console.log(error)
});

function gestionData(userInf){
	var donnees = {
			continent:{
				data:[]
			},
			browser:{
				data:[]
			},
			pays:{
				data:[]
			},
			resolution:{
				data:[]
			},
			date:{
				data:[]
			},
			os:{
				data:[]
			}
	};
	
	var notExist;
	
	function makeDonne(name){
		var notExist = true;
		var donneToMake = donnees[name];
		for(let inf of donneToMake.data){
			if(inf.country === userInf[i][name]){
				inf.visits++;
				notExist = false;
			}
		}
		if(notExist)
			donneToMake.data.push({country: userInf[i][name],visits:1});
	}
	
	for(var i = 0; i < userInf.length; i++){
		 makeDonne("continent");
		 makeDonne("browser");
		 makeDonne("resolution");
		 makeDonne("pays");
		 makeDonne("os");
		 makeDonne("date");
	}
	return donnees;
}
function graphPays(continents, div){
	am4core.useTheme(am4themes_animated);
	// Themes end

	var chart = am4core.create(div, am4charts.XYChart);
	chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
	
	var nbmCo = 0;
	
	for(let continent of continents.data){
		nbmCo = nbmCo > continent.visits ? nbmCo : continent.visits;
	}
	nbmCo += 11;
	
	if(nbmCo % 10 !== 0){
		nbmCo += 10 - (nbmCo % 10);
	}

	chart.data = continents.data;
	
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.dataFields.category = "country";
	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.min = 0;
	valueAxis.max = nbmCo;
	valueAxis.strictMinMax = true;
	valueAxis.renderer.minGridDistance = 30;
	
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.categoryX = "country";
	series.dataFields.valueY = "visits";
	series.columns.template.tooltipText = "{valueY.value}";
	series.columns.template.tooltipY = 0;
	series.columns.template.strokeOpacity = 0;
		// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
	series.columns.template.adapter.add("fill", (fill, target) => {
	  return chart.colors.getIndex(target.dataItem.index);
	});
}