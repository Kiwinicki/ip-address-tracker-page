(() => {
	const map = L.map('map').setView([0, 0], 1);

	const tilesURL = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
	const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	L.tileLayer(tilesURL, { attribution }).addTo(map);
})();
