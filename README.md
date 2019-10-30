<!--⇧⌘V-To Preview-->
<h1 align='center'> Visualizing Earthquakes</h1>
<h3 align=center> Visit my [Online Portfolio](https://Ohmarr.github.io) </h3>

<hr>

The [United States Geological Survery (USGS)](https://www.usgs.gov/) maintains datasets for many geological events, including earthquakes from around the globe, and provides these to the public as a service.  

![USGS Logo](https://www.usgs.gov/sites/all/themes/usgs_palladium/logo.png)

Earthquake data from around the globe was used to create a geographic visualization.  The following steps were taken:    
- This website was built with Node.js, node package manager (npm), & the gulp (JavaScript toolkit) streaming build system.
	- Other Technologies include Leaflet.js, d3.js, mapbox, usgs, mapbox, wikimedia, tectonic plates, geoJson, jquery, ajax, jpopper, bootstrap, javascript
 - Earthquake GEOJSON data was retrieved via API call to the USGS' [GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php),
	- Date range is currently set to most recent two weeks. 
	- Data retrieved includes magnitude, location (long/lat coordinates), and time,
 	- [USGS API documentation](https://earthquake.usgs.gov/fdsnws/event/1/)
- Leaflet.js & d3.js were then used to create a map on which to plot data from the previous step.
	- The map is injected (w/ the same JS packages) into our html document after it is rendered.
	- [Leaflet API Documentation](https://leafletjs.com/reference-1.5.0.html)
- Additional Layers are queried & added to the Map from the previous step, via API calls:
	- From the [Mapbox](https://docs.mapbox.com/api/maps/) API, layers were added,
	- geoJSON dataset of [tectonic plates](https://github.com/fraxen/tectonicplates) was queried from user FRaxen on github 
 - Individual earthquakes were plotted based on their location, along with marker size & color being proportional to the magnitude,
 - A pop-up will appear when a marker is clicked,
 - A legend was also included, as well as layer controls for various viewing options.  

<h3 align=center>The Logo in my navbar & the website icon ('favicons') were also created by me, and cannot be copied or reproduced.</h3>