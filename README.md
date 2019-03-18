# Visualizing Data with Leaflet

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

