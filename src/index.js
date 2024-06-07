document.addEventListener("DOMContentLoaded", function () {
    // IMPORTING LAYERS FROM GEOSERVER and OSM 
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var wmsLayer = L.tileLayer.wms('http://10.2.252.170:8080/geoserver/Group4/wms', {
        layers: 'Group4:lucas-nz-forest-clearing-2008-2022-v022',
        format: 'image/png',
        transparent: true,
        CQL_FILTER: 'destock_yr=2018',
    });

    var indigenous = L.tileLayer.wms('http://10.2.252.170:8080/geoserver/Group4/wms', {
        layers: 'Group4:AKL_LandCover_IndigenousForest',
        format: 'image/png',
        transparent: true,
        CQL_FILTER: 'year=2018',
    });

   

    var exoticLayer = L.tileLayer.wms('http://10.2.252.170:8080/geoserver/Group4/wms', {
        layers: 'Group4:nz-exotic-polygons-topo-150k',
        format: 'image/png',
        transparent: true,
    });

    var nativeLayer = L.tileLayer.wms('http://10.2.252.170:8080/geoserver/Group4/wms', {
        layers: 'Group4:nz-native-polygons-topo-150k',
        format: 'image/png',
        transparent: true,
    });

    var mangroveLayer = L.tileLayer.wms('http://10.2.252.170:8080/geoserver/Group4/wms', {
        layers: 'Group4:nz-mangrove-polygons-topo-150k',
        format: 'image/png',
        transparent: true,
    });

    var naturalForestLayer = L.tileLayer.wms('http://10.2.252.170:8080/geoserver/Group4/wms', {
        layers: 'Group4:AKL_LandUse_NaturalForest',
        format: 'image/png',
        transparent: true,
        // CQL_FILTER: 'year=2012',
    });

    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Creating layer groups to have several "groups" to choose from in layer selection.
    // Reality only single layer choosing, but have not found a better solution.
    


    // Add marker for Riverhead Forest
    var riverheadForestCoords = [-36.7124211, 174.5737027];
    var riverheadForestMarker = L.marker(riverheadForestCoords);
    riverheadForestMarker.bindPopup(
        '<b>Riverhead Forest</b><br>' +
        'Riverhead Forest is a former state-owned forest to the north-west of Auckland, New Zealand. ' +
        'Originally a kauri-dense native forest, the area was logged and the soil dug for kauri gum during the Colonial Era of New Zealand. ' +
        'In the 1920s, the area was designated as a state forest where Pinus radiata was grown. ' +
        'The forest is known for its recreational pursuits, including paintball, horse trekking, and hunting. ' +
        'Most of the forest has now been returned to iwi ownership through the Treaty settlement process.<br>' +
        '<a href="https://www.nzgeo.com/stories/riverhead-an-urban-forest/" target="_blank">Riverhead Forest Link</a>'
    );

    // Add marker for Waipoua Forest
    var waipouaForestCoords = [-35.667710, 173.620190];
    var waipouaForestMarker = L.marker(waipouaForestCoords);
    waipouaForestMarker.bindPopup(
        '<b>Waipoua Forest</b><br>' +
        'Waipoua, and the adjoining forests of Mataraua and Waima, make up the largest remaining tract of native forest in Northland.<br>' +
        '<a href="https://www.newzealand.com/us/waipoua-forest/#:~:text=Of%20all%20New%20Zealand\'s%20kauri,coast%2C%20just%20north%20of%20Dargaville." target="_blank">Waipoua Forest Link</a>'
    );


    // Add marker for Woodhill Forest
    var woodhillForestCoords = [-36.7469527, 174.3863889];
    var woodhillForestMarker = L.marker(woodhillForestCoords);
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
    var communityForestMarker = L.marker(communityForestCoords);
    communityForestMarker.bindPopup(
        '<b>Community Forest</b><br>' +
        'Community forestry is an evolving branch of forestry whereby the local community plays a significant role in forest management and land use decision making by themselves in the facilitating support of government as well as change agents. ' +
        'It involves the participation and collaboration of various stakeholders including community, government, and non-governmental organisations (NGOs).<br>' +
        '<a href="https://www.forestandbird.org.nz/our-community" target="_blank">Community Forest Link</a>'
    );

    // Add marker for Akatarawa Forest
    var akatarawaForestCoords = [-41.034975, 175.0317408];
    var akatarawaForestMarker = L.marker(akatarawaForestCoords);
    akatarawaForestMarker.bindPopup(
        '<b>Akatarawa Forest</b><br>' +
        'Akatarawa Forest is a regional park in the Upper Hutt within the Wellington Region at the southern tip of the North Island of New Zealand. ' +
        'It encompasses 15,000 hectares of native and plantation forest. ' +
        'It includes the headwaters of the Maungakotukutuku Stream, Akatarawa River West, and the Whakatīkei River.<br>' +
        '<a href="https://www.gw.govt.nz/parks/akatarawa-forest/" target="_blank">Akatarawa Forest Link</a>'
    );

    // Add marker for Kohimarama Forest
    var kohimaramaForestCoords = [-36.779264, 174.4261796];
    var kohimaramaForestMarker = L.marker(kohimaramaForestCoords);
    kohimaramaForestMarker.bindPopup(
        '<b>Kohimarama Forest</b><br>' +
        'Kohimarama Forest is a remnant forest that has become disconnected from its cultural history and wider ecological landscape. ' +
        'It has, however, never been cleared for pasture or poisoned by pesticides. ' +
        'As a result, the forest retains the memory of what the environment used to be; a mature ecosystem with complex relationships that do not exist in younger forests.<br>' +
        '<a href="https://www.kohiforest.com/" target="_blank">Kohimarama Forest Link</a>'
    );

    const osmlayerGroup = L.layerGroup([osm]);
    const openTopoMapGroup = L.layerGroup([openTopoMap]);
    const forest_markers = L.layerGroup([waipouaForestMarker, kohimaramaForestMarker, akatarawaForestMarker, communityForestMarker, woodhillForestCoords])

    var map = L.map('map', {
        layers: [osm, wmsLayer]
    }).setView([-36.848450, 174.762192], 10);

    var baseLayers = {
        'OSM': osmlayerGroup,
        'openTopoMap': openTopoMapGroup,
        'forest markers': forest_markers
    };

    const overlays = {
        'Exotic forest': exoticLayer,
        'Mangrove': mangroveLayer,
        'Native forest': nativeLayer,
        'Forest cover': wmsLayer,
        'Natural Forest': naturalForestLayer,
        'indigenous': indigenous,
    };



    L.Control.geocoder({
    geocoder: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
            "viewbox": "165.75,-47.31,179.36,-33.87",
            "bounded": 1
        }
    })}).addTo(map);



    var layerControl = L.control.layers(baseLayers, overlays).addTo(map);

    var yearLabel = document.getElementById("slider-label");
    var slider = document.getElementById("slider-year");
    var selectedYear = document.getElementById("selectedYear");

    
//    Comparision view 

    var wmsLayer2 = L.tileLayer.wms('https://158740g4.massey.ac.nz:8080/geoserver/Group4/wms', {
        layers: 'Group4:lucas-nz-forest-clearing-2008-2022-v022',
        format: 'image/png',
        transparent: true,
        CQL_FILTER: ''
    }).addTo(map);


    
    L.control.sideBySide(baseLayers, wmsLayer2).addTo(map);

    // Define the event handler function
function updateMap() {
    var year = slider.value;
    yearLabel.textContent = year;
    selectedYear.textContent = year; 
    console.log("Slider value: ", year);
   
    
    wmsLayer.setParams({
        CQL_FILTER: 'destock_yr=' + year
    });


    if (map.hasLayer(indigenous)) {
        indigenous.setParams({
            CQL_FILTER: 'year=' + year
        });
    }

    console.log(year);
}



// Attach the event handler to the slider input event
slider.addEventListener("input", updateMap);

// Attach the event handler to the button click event
document.getElementById('All_years_state').addEventListener('click', function() {
    if (this.style.backgroundColor === 'green') {
        this.style.backgroundColor = 'red';
    } else {
        this.style.backgroundColor = 'green';
    }
    updateMap(); // Call the updateMap function when the button is clicked
});

})



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
