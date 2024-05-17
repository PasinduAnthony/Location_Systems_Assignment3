

const map = L.map('map').setView([-36.848450, 174.762192], 10);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
            layers: 'webmap:Forest_clearing_NZGD200_NZGTM',
            format: 'image/png',
            transparent: true,
            CQL_FILTER: 'destock_yr=2020',
        }).addTo(map);
