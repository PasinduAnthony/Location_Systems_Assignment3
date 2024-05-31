import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import { transform } from 'ol/proj'; // Import transform function

document.addEventListener('DOMContentLoaded', function () {
    // Define WMS layer sources
    const wmsSource1 = new TileWMS({
        url: 'http://localhost:8090/geoserver/cite/wms',
        params: {
            'LAYERS': 'cite:albanyline__line',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        },
    });

    const wmsSource2 = new TileWMS({
        url: 'http://localhost:8090/geoserver/cite/wms',
        params: {
            'LAYERS': 'cite:albanypolygon',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        },
    });

    const wmsSource3 = new TileWMS({
        url: 'http://localhost:8090/geoserver/cite/wms',
        params: {
            'LAYERS': 'cite:albanypolygon',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        },
    });

    const wmsSource4 = new TileWMS({
        url: 'http://localhost:8090/geoserver/cite/wms',
        params: {
            'LAYERS': 'cite:albanypolygon',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        },
    });

    const wmsSource5 = new TileWMS({
        url: 'http://localhost:8090/geoserver/cite/wms',
        params: {
            'LAYERS': 'cite:albanypolygon',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        },
    });

    const wmsSource6 = new TileWMS({
        url: 'http://localhost:8090/geoserver/cite/wms',
        params: {
            'LAYERS': 'cite:albanypolygon',
            'FORMAT': 'image/png',
            'TRANSPARENT': true
        },
    });

    // Create WMS tile layers using the sources
    const wmsLayer1 = new TileLayer({
        source: wmsSource1
    });

    const wmsLayer2 = new TileLayer({
        source: wmsSource2
    });

    const wmsLayer3 = new TileLayer({
        source: wmsSource3
    });

    const wmsLayer4 = new TileLayer({
        source: wmsSource4
    });

    const wmsLayer5 = new TileLayer({
        source: wmsSource5
    });

    const wmsLayer6 = new TileLayer({
        source: wmsSource6
    });

    // Define center coordinates in EPSG:4326 (latitude/longitude)
    const lonLatCenter = [172.393, -41.327];

    // Convert center coordinates from EPSG:4326 to EPSG:3857
    const centerCoords = transform(lonLatCenter, 'EPSG:4326', 'EPSG:3857');

    // Create a new OpenLayers map
    const map = new Map({
        target: 'map', // The id of the div containing the map
        layers: [
            new TileLayer({
                source: new OSM() // Add OpenStreetMap as the base layer
            }),
            wmsLayer1,
            wmsLayer2,
            wmsLayer3,
            wmsLayer4,
            wmsLayer5,
            wmsLayer6
        ],
        view: new View({
            center: centerCoords, // Center coordinates in EPSG:3857
            zoom: 5 // Initial zoom level
        })
    });
});
