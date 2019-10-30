<!--⇧⌘V-To Preview-->
<h1 align='center'> Visualizing Earthquakes</h1>

**Visit my [Online Portfolio](https://Ohmarr.github.io)**

<hr>

The [United States Geological Survery (USGS)](https://www.usgs.gov/) maintains datasets for many geological events, including earthquakes, and provides these to the public as a service.  

<p align="center">
  <img width="auto" height="auto" src="https://bloximages.chicago2.vip.townnews.com/azdailysun.com/content/tncms/assets/v3/editorial/f/f9/ff936412-9ad8-52fb-98c3-3d65780d39fe/5b4cb9838a21e.image.png">
</p>

<hr>

_This website utilized data from the above resource, & was built with Node.js, node package manager (npm), bootstrap, & the gulp (JS toolkit) streaming build system_

**The following steps were taken to create this visualization:**  

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

<h4 align=center>The Logo in my navbar & the website icon ('favicons') were also created by me, and cannot be copied or reproduced.</h4>



Technologies: JavaScript, Leaflet.js, d3.js, API Calls, mapbox, geoJson, JSON, jquery, ajax, jpopper, bootstrap
