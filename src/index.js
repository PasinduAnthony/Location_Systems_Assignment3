document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([-36.848450, 174.762192], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
        layers: 'webmap:Forest_clearing_NZGD200_NZGTM',
        format: 'image/png',
        transparent: true,
        CQL_FILTER: 'destock_yr=2021',
    }).addTo(map);

    var yearLabel = document.getElementById("slider-label-year");
    var slider = document.getElementById("year-slider");

    slider.addEventListener("input", function() {
        var year = slider.value;
        yearLabel.textContent = year;
        wmsLayer.setParams({
            CQL_FILTER: 'destock_yr=' + year
        });
    });
});
