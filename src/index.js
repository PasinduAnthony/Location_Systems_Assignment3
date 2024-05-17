

const map = L.map('map').setView([-36.848450, 174.762192], 5);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/webmap/wms', {
layers: 'webmap:Forest_clearing_NZGD200_NZGTM',
transparent: true,
format: 'image/png'
}).addTo(map);
