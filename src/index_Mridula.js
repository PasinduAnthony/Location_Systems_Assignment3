document.addEventListener("DOMContentLoaded", async function () {
    // Function to get the user's IP address
    async function getUserIP() {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    }

    // Function to get geolocation based on IP address
    async function getGeoLocation(ip) {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        return {
            lat: data.latitude,
            lon: data.longitude
        };
    }

    // Get the user's location and set the map view
    const ip = await getUserIP();
    const location = await getGeoLocation(ip);

    // IMPORTING LAYERS FROM GEOSERVER and OSM
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
        layers: 'webmap:Forest_clearing_NZGD2000_NZGTM',
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

    var mangroveLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
        layers: 'webmap:nz-mangrove-polygons-topo-150k',
        format: 'image/png',
        transparent: true,
    });

    var naturalForestLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
        layers: 'webmap:AKL_LandUse_NaturalForest',
        format: 'image/png',
        transparent: true,
        CQL_FILTER: 'year=2012',
    });

    var indigenousForestLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
        layers: 'webmap:AKL_Indegenous_Forest',
        format: 'image/png',
        transparent: true,
    });

    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Creating layer groups to have several "groups" to choose from in layer selection.
    const osmlayerGroup = L.layerGroup([osm]);
    const openTopoMapGroup = L.layerGroup([openTopoMap]);

    // Initialize the map
    var map = L.map('map', {
        layers: [osm, wmsLayer]
    }).setView([location.lat, location.lon], 14);

    var baseLayers = {
        'OSM': osmlayerGroup,
        'openTopoMap': openTopoMapGroup,
    };

    const overlays = {
        'Exotic forest': exoticLayer,
        'Native forest': nativeLayer,
        'Mangrove': mangroveLayer,
        'Forest cover': wmsLayer,
        'Natural Forest': naturalForestLayer,
        'Indigenous Forest': indigenousForestLayer,
    };

    // Add marker for Riverhead Forest
    var riverheadForestCoords = [-36.7124211, 174.5737027];
    var riverheadForestMarker = L.marker(riverheadForestCoords).addTo(map);
    riverheadForestMarker.bindPopup(
        '<b>Riverhead Forest</b><br>' +
        'Riverhead Forest is a former state-owned forest to the north-west of Auckland, New Zealand. ' +
        'Originally a kauri-dense native forest, the area was logged and the soil dug for kauri gum during the Colonial Era of New Zealand. ' +
        'In the 1920s, the area was designated as a state forest where Pinus radiata was grown. ' +
        'The forest is known for its recreational pursuits, including paintball, horse trekking, and hunting. ' +
        'Most of the forest has now been returned to iwi ownership through the Treaty settlement process.<br>' +
        '<a href="https://www.nzgeo.com/stories/riverhead-an-urban-forest/" target="_blank">Riverhead Forest Link</a>'
    );

    // Add marker for Woodhill Forest
    var woodhillForestCoords = [-36.7469527, 174.3863889];
    var woodhillForestMarker = L.marker(woodhillForestCoords).addTo(map);
    woodhillForestMarker.bindPopup(
        '<b>Te Ngahere o Woodhill (Woodhill Forest)</b><br>' +
        'Woodhill Forest is a commercial exotic (pine) forest located to the northwest of Auckland, New Zealand. ' +
        'The forest covers approximately 12,500 hectares of the Te Korowai-o-Te-Tonga Peninsula, from Muriwai in the south to South Head in the north. ' +
        'The forest is a popular location for a number of recreational activities, including horse riding, 4WD and trail biking, mountain biking, paintball, tree climbing adventures (confidence and team building), orienteering, and filming; all require the purchase of a permit. ' +
        'Walking or dog walking is no longer supported by the owners. ' +
        'Woodhill Forest is a sand-based pine forest, providing all-weather trails and recreation.<br>' +
        '<a href="https://www.woodhillforest.co.nz/" target="_blank">Woodhill Forest Link</a>'
    );

    // Add marker for Community Forest
    var communityForestCoords = [-43.090988, 172.451828];
    var communityForestMarker = L.marker(communityForestCoords).addTo(map);
    communityForestMarker.bindPopup(
        '<b>Community Forest</b><br>' +
        'Community forestry is an evolving branch of forestry whereby the local community plays a significant role in forest management and land use decision making by themselves in the facilitating support of government as well as change agents. ' +
        'It involves the participation and collaboration of various stakeholders including community, government, and non-governmental organisations (NGOs).<br>' +
        '<a href="https://www.forestandbird.org.nz/our-community" target="_blank">Community Forest Link</a>'
    );

    // Add marker for Akatarawa Forest
    var akatarawaForestCoords = [-41.034975, 175.0317408];
    var akatarawaForestMarker = L.marker(akatarawaForestCoords).addTo(map);
    akatarawaForestMarker.bindPopup(
        '<b>Akatarawa Forest</b><br>' +
        'Akatarawa Forest is a regional park in the Upper Hutt within the Wellington Region at the southern tip of the North Island of New Zealand. ' +
        'It encompasses 15,000 hectares of native and plantation forest. ' +
        'It includes the headwaters of the Maungakotukutuku Stream, Akatarawa River West, and the Whakatīkei River.<br>' +
        '<a href="https://www.gw.govt.nz/parks/akatarawa-forest/" target="_blank">Akatarawa Forest Link</a>'
    );

    // Add marker for Kohimarama Forest
    var kohimaramaForestCoords = [-36.779264, 174.4261796];
    var kohimaramaForestMarker = L.marker(kohimaramaForestCoords).addTo(map);
    kohimaramaForestMarker.bindPopup(
        '<b>Kohimarama Forest</b><br>' +
        'Kohimarama Forest is a remnant forest that has become disconnected from its cultural history and wider ecological landscape. ' +
        'It has, however, never been cleared for pasture or poisoned by pesticides. ' +
        'As a result, the forest retains the memory of what the environment used to be; a mature ecosystem with complex relationships that do not exist in younger forests.<br>' +
        '<a href="https://www.kohiforest.com/" target="_blank">Kohimarama Forest Link</a>'
    );

    // Search bar
    L.Control.geocoder({
        geocoder: new L.Control.Geocoder.Nominatim({
            geocodingQueryParams: {
                "viewbox": "165.75,-47.31,179.36,-33.87",
                "bounded": 1
            }
        })
    }).addTo(map);

    var layerControl = L.control.layers(baseLayers, overlays).addTo(map);

    var yearLabel = document.getElementById("slider-label-year");
    var slider = document.getElementById("year-slider");
    slider.addEventListener("input", function () {
        var year = slider.value;
        yearLabel.textContent = year;
        wmsLayer.setParams({
            CQL_FILTER: 'destock_yr=' + year
        });
    });

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
        naturalForestLayer.setParams({
            CQL_FILTER: 'year=' + year
        });
    });

    // Add event listener for natural forest layer click
    map.on('click', function (e) {
        var clickLatLng = e.latlng;
        var url = getFeatureInfoUrl(map, naturalForestLayer, clickLatLng, {
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
                        .openOn(map);
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
                    .openOn(map);
            });
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

// Function to fetch the IP address
function fetchIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip').textContent = 'Your IP Address: ' + data.ip;
            fetchLocation(data.ip);
        })
        .catch(error => console.error('Error fetching IP:', error));
}

// Function to fetch the location using IP address
function fetchLocation(ip) {
    fetch(`http://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                document.getElementById('location').textContent = `Your Location:  ${data.regionName}, ${data.country}`;
                //document.getElementById('location').textContent = `Your Location: ${data.city}, ${data.regionName}, ${data.country}`;
            } else {
                console.error('Error fetching location:', data.message);
            }
        })
        .catch(error => console.error('Error fetching location:', error));
}

// Call the function to fetch IP and location
fetchIP();
