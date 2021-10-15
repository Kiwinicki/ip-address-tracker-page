(() => {
	// create map and set initial position
	const map = L.map('map').setView([0, 0], 5);

	// set zoom control on bottom left corner
	map.zoomControl.setPosition('bottomleft');

	const tilesURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	// add attribution
	L.tileLayer(tilesURL, { attribution }).addTo(map);
})();
