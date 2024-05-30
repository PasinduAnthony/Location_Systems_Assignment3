document.addEventListener("DOMContentLoaded", function() {


    // IMPORTING LAYERS FROM GEOSERVER and OSM
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
        layers: 'webmap:Forest_clearing_NZGD200_NZGTM',
        format: 'image/png',
        transparent: true,
        CQL_FILTER: 'destock_yr=2021',
    });

    var exoticLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
        layers: 'webmap:nz-exotic-polygons-topo-150k',
        format: 'image/png',
        transparent: true,
    });

    var nativeLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
        layers: 'webmap:nz-native-polygons-topo-150k',
        format: 'image/png',
        transparent: true,
    });

    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

    // Creating layer groups to have several "groups" to choose from in layer selection.
    // Reality only single layer choosing, but have not found a better solution.
    const osmlayerGroup = L.layerGroup([osm]);
    const openTopoMapGroup = L.layerGroup([openTopoMap]);

    var map = L.map('map', {
        layers: [osm, wmsLayer]}).setView([-36.848450, 174.762192], 14);

    var baseLayers = {
        'OSM': osmlayerGroup,
        'openTopoMap': openTopoMapGroup,
    };

    const overlays = {
        'Exotic forest': exoticLayer,
        'Native forest' : nativeLayer,
        'Forest cover': wmsLayer,
    };

    // Search bar

        L.Control.geocoder({
        geocoder: new L.Control.Geocoder.Nominatim({
            geocodingQueryParams: {
                "viewbox": "165.75,-47.31,179.36,-33.87",
                "bounded": 1
            }
        })}).addTo(map);
    var layerControl = L.control.layers(baseLayers, overlays).addTo(map);
    var yearLabel = document.getElementById("slider-label-year");
    var slider = document.getElementById("year-slider");

    slider.addEventListener("input", function() {
        var year = slider.value;
        yearLabel.textContent = year;
        wmsLayer.setParams({
            CQL_FILTER: 'destock_yr=' + year
        })})});
