const API_KEY = 'pk.eyJ1Ijoib2htYXJyIiwiYSI6ImNqc3JwNGsycDA4ZW00M28xNXp6dTJxeGEifQ.AyDBifqvXtzRSXV1PwRioA' //mapbox API Key

// Store our API endpoint inside queryUrl
var queryUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2019-07-29%2000:00:00&endtime=2019-08-05%2023:59:59&minmagnitude=2.5&orderby=magnitude';
var mapBoxAttribution = 'Map data &copy; <a href=\"https://www.openlightMap.org/\">OpenlightMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>';
var mapBoxtileLayerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
var wikiTileUrl = 'https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png'
var tectonicPlatesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json'
var earthQuakeData
var geoData, magnitude, coordinates, long, lat, heatData, colors
var radius = []
// Perform a GET request to the query URL
d3.json(queryUrl, data => 
	{
	createFeatures(data.features);
	geoData = data.features
	magnitude = geoData.map(geoData=>geoData.properties.mag)
	coordinates = geoData.map(geoData=>geoData.geometry.coordinates)
	long = coordinates.map(coordinates=>coordinates[0])
	lat = coordinates.map(coordinates=>coordinates[1])
	colors = magnitude.map(circleColor)

	
	}); // Once we get a response, send the data.features object to the createFeatures function
function circleColor(magnitude){			// returns color - Higher Magnitude = More Red ; Less Magnitude = Yellow
	return	magnitude > 6 ? 'rgb(255, 0, 0)' :
		magnitude > 5 ? '#FF4500' :
		magnitude > 4 ? 'orange' :
		magnitude > 3 ? '#FFDAB9' :
		'yellow';}
function circleOpacity(magnitude){			// returns opacity - Higher Magnitude = Vibrant ; Less Magnitude = Opaque
	return	magnitude > 6 ? 0.6 :
		magnitude > 5 ? 0.5 :
		magnitude > 4 ? 0.4 :
		magnitude > 3 ? 0.3 :
		0.2;}
		
function createFeatures(earthquakeData) {
	var geojsonMarkerOptions	
	function onEachFeature(feature, layer) { 	// Give each feature a popup describing the place and time of the earthquake
		layer.bindPopup(`<h3> ${feature.properties.place} </h3>
				<hr>
				<p> ${new Date(feature.properties.time)}<br> Magnitude: ${feature.properties.mag}</p>
				`);
		//magnitude=feature.properties.mag;		
		// var latlng = L.latLng(lat, long);
		// L.circle((latlng), {
		// 	fillOpacity: .5,
		// 	radius: 20
		// })
	}
	// geoData[0].properties.mag

	var earthquakes = L.geoJSON(earthquakeData, {   // Create a GeoJSON layer containing the features array on the earthquakeData object
		onEachFeature: onEachFeature,           // Run the onEachFeature function once for each piece of data in the array
		pointToLayer: (feature, earthQuakeData) => 
			L.circleMarker(earthQuakeData, {
				radius: (feature.properties.mag**2), 
				fillColor: circleColor(feature.properties.mag), 
				color: circleColor(feature.properties.mag), 
				fillOpacity: circleOpacity(feature.properties.mag), 
				weight: 1 
			})})
	//console.log(earthQuakeData.properties.mag);
	createMap(earthquakes);// Sending our earthquakes layer to the createMap function
	}

function createMap(earthquakes) {
	var noWrap = false;
	var satMap = L.tileLayer(mapBoxtileLayerUrl, 	// Query satellite layer from API
		{ 
		attribution: mapBoxAttribution,
		maxZoom: 6,
		minZoom: 2,
		id: "mapbox.satellite", 
		noWrap: noWrap,
		accessToken: API_KEY
		});

	var darkMap = L.tileLayer(mapBoxtileLayerUrl, 	// Query darkMap Layer from API
		{ 
		attribution: mapBoxAttribution,
		maxZoom: 6,
		minZoom: 2,
		id: "mapbox.dark", 
		noWrap: noWrap,
		accessToken: API_KEY
		});
	
	var lightMap = L.tileLayer(mapBoxtileLayerUrl, 	// Query darkMap Layer from API
	 	{ 
	 	attribution: mapBoxAttribution,
		maxZoom: 6,
		minZoom: 2,
	 	id: "mapbox.light", 
	 	noWrap: noWrap, 
	 	accessToken: API_KEY
		});
	//var wikiMap = L.tileLayer(wikiTileUrl, 	// Query darkMap Layer from API
	//	{ 
		//attribution: mapBoxAttribution,
	//	maxZoom: 6,
	//	minZoom: 2,
		//id: "mapbox.light", 
		//noWrap: noWrap, 
		//accessToken: API_KEY
	//	});
	var streetMap = L.tileLayer(mapBoxtileLayerUrl, 	// Query darkMap Layer from API
		{ 
		attribution: mapBoxAttribution,
		maxZoom: 6,
		minZoom: 2,
		id: "mapbox.streets", 
		noWrap: noWrap, 
		accessToken: API_KEY
		});


	var tectonicLayer = L.layerGroup();	 
	d3.json(tectonicPlatesUrl, function(data) {
		for (var i = 0; i < data.features.length; i++) {
			var faultloc = data.features[i].geometry;
		  	if (faultloc) { 
		    		L.geoJSON(faultloc, {fillOpacity: 0, color: "orange", weight: 1.5}).addTo(tectonicLayer);
		  		};
			};
	      	});

	var baseMaps =					// Define a baseMaps object to hold our base layers (lightMap & darkMap)
		{
		"Satellite Map": satMap,
		"Dark Map": darkMap,
		"Light Map": lightMap,
		"Street Map": streetMap
	//	"Wiki Map": wikiMap
		};

	var overlayMaps = 				// Create overlay object to hold our overlay layer (layer above others)
		{
		'Earthquakes': earthquakes,
		'Tectoninc Plates': tectonicLayer
		};
	
	var myMap = L.map("map", 			// Initial Map to Load lightMap/earthquakes layers
		{
		center: [30.267, -97.743],	// Texas // 2.15=everything; center_of_world: [41.5, 0]
		zoom: 3,			// Catering to Americans mostly
		maxZoom: 6,
		minZoom: 2,
		layers: [satMap, earthquakes]
		});

	L.control.layers(baseMaps, overlayMaps, 	// Create a layer control baseMaps+overLayMaps
		{
		collapsed: false
		}).addTo(myMap);
	}



	/** Notes:
 * 
 *  Javascript Methods
 *  .forEach() ⟶ executes mutation of each array element in place,
 * 	arr.forEach((num, index) => {return arr[index] = num*2;});
 *  .map() ⟶ executes function on each item & returns an array of new elements,
 *  	let doubled = arr.map(num => {return num * 2;});
 * 	let newArr = arr.map((datum, index, array) => [{index:index, datum:datum}]);
 * .filter() ⟶ will .map() on features which pass logic test & returns an array of new elements; 
 * 	let cities = data.filter(val => val.population > 500000000); // cities is new array
 * .reduce() ⟶ performs an operation on a value in each element of the array & returns a single value; i.e. accumulates the sum; 
 * 	let sum = arr.reduce((accumulator, value) => {return accumulator + value;});
 * 
 * 
 *   	if (v % 2 === 0){return v*2;}
 * 		else {return v;}
 * 	// SAME ↕︎
 * 	v%2===0?v*2 : v;
 * 
 * 
 */