(async () => {
	// create map and set initial position
	const map = L.map('map').setView([0, 0], 5);

	// set zoom control on bottom left corner
	map.zoomControl.setPosition('bottomleft');

	const tilesURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	// add attribution
	L.tileLayer(tilesURL, { attribution }).addTo(map);

	const input = document.querySelector('#ip-input');
	const searchBtn = document.querySelector('#search-btn');
	const apiKey = 'at_eJiYbhl3LXhXmJAL2UwrcQrDlk3Bd';
	const regexIp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

	const ipField = document.querySelector('#ip');
	const locationField = document.querySelector('#location');
	const timezoneField = document.querySelector('#timezone');
	const ispField = document.querySelector('#isp');

	searchBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		if (regexIp.test(input.value)) {
			try {
				const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${input.value}`);
				if (response.status === 200) {
					const json = await response.json();
					console.log(json);

					ipField.innerHTML = json.ip;
					locationField.innerHTML = `${json.location.region}, ${json.location.country}`;
					timezoneField.innerHTML = `UTC ${json.location.timezone}`;
					ispField.innerHTML = json.isp;
				} else {
					return Promise.reject(`HTTP error: ${response.status}`);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('invalid ip address');
		}
	});
})();
