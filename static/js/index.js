!function(e){var t={};function o(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(r,a,function(t){return e[t]}.bind(null,a));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){const o="pk.eyJ1Ijoib2htYXJyIiwiYSI6ImNqc3JwNGsycDA4ZW00M28xNXp6dTJxeGEifQ.AyDBifqvXtzRSXV1PwRioA";var r,a,n,i='Map data &copy; <a href="https://www.openlightMap.org/">OpenlightMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',p="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",s="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";function c(e){return e>6?"rgb(255, 0, 0)":e>5?"#FF4500":e>4?"orange":e>3?"#FFDAB9":"yellow"}function u(e){return e>6?.6:e>5?.5:e>4?.4:e>3?.3:.2}d3.json("https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2019-07-29%2000:00:00&endtime=2019-08-05%2023:59:59&minmagnitude=2.5&orderby=magnitude",e=>{!function(e){!function(e){var t=L.tileLayer(p,{attribution:i,maxZoom:6,minZoom:2,id:"mapbox.satellite",noWrap:!1,accessToken:o}),r=L.tileLayer(p,{attribution:i,maxZoom:6,minZoom:2,id:"mapbox.dark",noWrap:!1,accessToken:o}),a=L.tileLayer(p,{attribution:i,maxZoom:6,minZoom:2,id:"mapbox.light",noWrap:!1,accessToken:o}),n=L.tileLayer(p,{attribution:i,maxZoom:6,minZoom:2,id:"mapbox.streets",noWrap:!1,accessToken:o}),c=L.layerGroup();d3.json(s,(function(e){for(var t=0;t<e.features.length;t++){var o=e.features[t].geometry;o&&L.geoJSON(o,{fillOpacity:0,color:"orange",weight:1.5}).addTo(c)}}));var u={"Satellite Map":t,"Dark Map":r,"Light Map":a,"Street Map":n},m={Earthquakes:e,"Tectoninc Plates":c},l=L.map("map",{center:[30.267,-97.743],zoom:3,maxZoom:6,minZoom:2,layers:[t,e]});L.control.layers(u,m,{collapsed:!1}).addTo(l)}(L.geoJSON(e,{onEachFeature:function(e,t){t.bindPopup(`<h3> ${e.properties.place} </h3>\n\t\t\t\t<hr>\n\t\t\t\t<p> ${new Date(e.properties.time)}<br> Magnitude: ${e.properties.mag}</p>\n\t\t\t\t`)},pointToLayer:(e,t)=>L.circleMarker(t,{radius:e.properties.mag**2,fillColor:c(e.properties.mag),color:c(e.properties.mag),fillOpacity:u(e.properties.mag),weight:1})}))}(e.features),r=e.features,a=r.map(e=>e.properties.mag),n=r.map(e=>e.geometry.coordinates),n.map(e=>e[0]),n.map(e=>e[1]),a.map(c)})}]);