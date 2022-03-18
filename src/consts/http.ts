/** @format */

import axios from "axios";

const countries = axios.create({
	baseURL: "https://restcountries.com/v3/",
});

const weather = axios.create({
	baseURL: "http://api.weatherstack.com/current",
	params: {
		access_key: "9cfe09f6522f28c80de18d51c2880bf4",
	},
});

export default { countries, weather };
