(async () => {
	const tilesURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	const map = L.map('map').setView([0, 0], 2); // create map and set initial position
	map.zoomControl.setPosition('bottomleft'); // set zoom control on bottom left corner
	L.tileLayer(tilesURL, { attribution }).addTo(map); // add attribution

	const input = document.querySelector('#ip-input');
	const errorText = document.querySelector('#ip-address-error');
	const searchBtn = document.querySelector('#search-btn');

	const apiKey = 'at_eJiYbhl3LXhXmJAL2UwrcQrDlk3Bd';
	const regexIp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

	// get fields for dynamic change from DOM
	const ipField = document.querySelector('#ip');
	const locationField = document.querySelector('#location');
	const timezoneField = document.querySelector('#timezone');
	const ispField = document.querySelector('#isp');

	const showError = (errText) => {
		input.classList.add('form__input--error');
		errorText.innerHTML = errText;
		errorText.style.setProperty('visibility', 'visible');
	};

	const hideError = () => errorText.style.setProperty('visibility', 'hidden');

	const makeAPIrequest = async (apiKey, ip = '') => {
		const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${ip && `&ipAddress=${input.value}`}`);
		if (res.status === 200) {
			return await res.json();
		} else {
			throw new Error(res.status);
		}
	};

	const insertDataToDOM = ({ ip, location, isp }) => {
		ipField.innerHTML = ip;
		locationField.innerHTML = `${location.city}, ${location.region} ${location.postalCode}`;
		timezoneField.innerHTML = `UTC ${location.timezone}`;
		ispField.innerHTML = isp;
	};

	const locationIcon = L.icon({
		iconUrl: './images/icon-location.svg',
		iconSize: [46, 56],
	});

	const addMarker = (lat, lng) => {
		return L.marker([lat, lng], { icon: locationIcon }).addTo(map); // create marker and add it to map
	};

	window.addEventListener('DOMContentLoaded', async () => {
		const json = await makeAPIrequest(apiKey);
		console.log(json);
		insertDataToDOM(json);
		addMarker(json.location.lat, json.location.lng);
		map.flyTo([json.location.lat, json.location.lng], 10);
	});

	searchBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		if (regexIp.test(input.value)) {
			try {
				hideError();
				const json = await makeAPIrequest(apiKey, input.value);
				console.log(json);
				insertDataToDOM(json);
				addMarker(json.location.lat, json.location.lng);
				map.flyTo([json.location.lat, json.location.lng], 13);
			} catch (err) {
				console.log(err);
				showError('Connection error');
			}
		} else {
			showError('Invalid IP address');
		}
	});
})();
