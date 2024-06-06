document.addEventListener("DOMContentLoaded", function () {
    // IMPORTING LAYERS FROM GEOSERVER and OSM 
    const osm1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });



    var naturalForestLayer1 = L.tileLayer.wms('http://localhost:8080/geoserver/Group4/wms', {
        layers: 'Group4:AKL_LandUse_NaturalForest',
        format: 'image/png',
        transparent: true,
        CQL_FILTER: 'year=2012',
    });



    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    const osmlayerGroupM = L.layerGroup([osm1]);
    const openTopoMapGroupM = L.layerGroup([openTopoMap]);

    var mapN = L.map('mapNaturalForest', {

        layers: [osm1, naturalForestLayer1]
    }).setView([-36.848451, 174.762191], 10);

    var baseLayers = {
        'OSM': osmlayerGroupM,
        'openTopoMap': openTopoMapGroupM,
    };
    var naturalForestYearLabel = document.getElementById("naturalForest-slider-label-year");
    var naturalForestSlider = document.getElementById("naturalForest-year-slider");

    // Map slider values to years
    var yearMap = {
        0: 2012,
        1: 2016,
        2: 2020
    };

    naturalForestSlider.addEventListener("input", function () {
        var sliderValue = naturalForestSlider.value;
        var year = yearMap[sliderValue];
        naturalForestYearLabel.textContent = year;
        naturalForestLayer1.setParams({
            CQL_FILTER: 'year=' + year
        });
    });

    // Add event listener for natural forest layer click
    mapN.on('click', function (e) {
        var clickLatLng = e.latlng;
        var url = getFeatureInfoUrl(mapN, naturalForestLayer1, clickLatLng, {
            'info_format': 'application/json',
            'propertyName': 'gid,lucid,subid,year'
        });

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.statusText);
                }
            })
            .then(data => {
                if (data.features && data.features.length > 0) {
                    var properties = data.features[0].properties;
                    L.popup()
                        .setLatLng(clickLatLng)
                        .setContent(
                            `<b>Natural Forest</b><br>
                            GID: ${properties.gid}<br>
                            LUCID: ${properties.lucid}<br>
                            SUBID: ${properties.subid}<br>
                            Year: ${properties.year}`
                        )
                        .openOn(mapN);
                }
            })
            .catch(error => {
                console.error('Error fetching feature info:', error);
                L.popup()
                    .setLatLng(clickLatLng)
                    .setContent(
                        `<b>Error fetching feature info</b><br>
                        ${error.message}`
                    )
                    .openOn(mapN);
            });
    });


    function getFeatureInfoUrl(map, layer, latlng, params) {
        var point = map.latLngToContainerPoint(latlng, map.getZoom());
        var size = map.getSize();

        var baseParams = {
            request: 'GetFeatureInfo',
            service: 'WMS',
            srs: 'EPSG:4326',
            styles: '',
            version: '1.1.1',
            format: 'image/png',
            bbox: map.getBounds().toBBoxString(),
            height: size.y,
            width: size.x,
            layers: layer.wmsParams.layers,
            query_layers: layer.wmsParams.layers,
            info_format: 'application/json'
        };

        var extendedParams = Object.assign(baseParams, params);

        extendedParams[extendedParams.version === '1.3.0' ? 'i' : 'x'] = point.x;
        extendedParams[extendedParams.version === '1.3.0' ? 'j' : 'y'] = point.y;

        return layer._url + L.Util.getParamString(extendedParams, layer._url, true);
    }



});


