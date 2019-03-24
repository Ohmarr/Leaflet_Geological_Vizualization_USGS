/* # Visualizing Data with Leaflet
 
 The US Geological Survery has hired you to assist in building a new set of tools to visualize earthquake data. Among other things, they provide earthquake data in multiple formats, which is updated every 5 minutes.
 
 1. **Select & Import a dataset**
         Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. 
         When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.
         https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2019-03-07%2000:00:00&endtime=2019-03-14%2023:59:59&minmagnitude=2.5&orderby=magnitude
         - global, 7 days, geoJson, 
 
 2. **Visualize the Data**
 
    Create a map using Leaflet that plots all of the earthquakes from your dataset based on their longitude/latitude coordinates.
         * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.
         * Include popups that provide additional information about the earthquake when a marker is clicked.
         * Create a legend that will provide context for your map data.
         * Your visualization should look something like the map above.
 
 3. **More Data (Optional)**
 
         The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. 
         You will need to pull in a second data set and visualize it along side your original set of data. 
         Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.
         * Plot a second data set on our map.
         * Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.
         * Add layer controls to our map.
 */


// Store our API endpoint inside queryUrl
var queryUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2019-03-07%2000:00:00&endtime=2019-03-14%2023:59:59&minmagnitude=2.5&orderby=magnitude';
var mapBoxAttribution = 'Map data &copy; <a href=\"https://www.openlightMap.org/\">OpenlightMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>';
var mapBoxtileLayerUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
var wikiTileUrl = 'https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png'
var earthQuakeData

/** Omar Notes:
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
function circleColor(magnitude){
	return	magnitude > 6 ? 'rgb(255, 0, 0)' :
		magnitude > 5 ? '#FF4500' :
		magnitude > 4 ? 'orange' :
		magnitude > 3 ? '#FFDAB9' :
		'yellow';}
function circleOpacity(magnitude){
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
	var tectLayer1 = L.tileLayer('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json')	 


	var baseMaps =					// Define a baseMaps object to hold our base layers (lightMap & darkMap)
		{
		"Satellite Map": satMap,
		"Dark Map": darkMap,
		"Light Map": lightMap,
	//	"Wiki Map": wikiMap
		};

	var overlayMaps = 				// Create overlay object to hold our overlay layer (layer above others)
		{
		Earthquakes: earthquakes,
		//Tectonincs: tectLayer1

		};
	
	var myMap = L.map("map", 			// Initial Map to Load lightMap/earthquakes layers
		{
		center: [41.5, 0], // center of world
		zoom: 2.15,        // good zoom to see everything; 
		maxZoom: 6,
		minZoom: 2,
		layers: [satMap, earthquakes]
		});

	L.control.layers(baseMaps, overlayMaps, 	// Create a layer control baseMaps+overLayMaps
		{
		collapsed: false
		}).addTo(myMap);
	}
