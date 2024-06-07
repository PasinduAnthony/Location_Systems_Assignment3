document.addEventListener("DOMContentLoaded", function () {
    // IMPORTING LAYERS FROM GEOSERVER and OSM 
    const osm1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    var naturalForestLayer1 = L.tileLayer.wms('http://localhost:8080/geoserver/Group4/wms', {
        layers: 'Group4:nz-exotic-polygons-topo-150k',
        format: 'image/png',
        transparent: true,
    });



    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    const osmlayerGroupM = L.layerGroup([osm1]);
    const openTopoMapGroupM = L.layerGroup([openTopoMap]);

     L.map('mapExotic', {

        layers: [osm1, naturalForestLayer1]
    }).setView([-36.848451, 174.762191], 10);

    var baseLayers = {
        'OSM': osmlayerGroupM,
        'openTopoMap': openTopoMapGroupM,
    };
});
