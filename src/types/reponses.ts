/** @format */

export type CountriesResponse = {
	name: {
		official: string;
	};
	capital: string[];
	latlng: number[];
	population: number;
	flags: string[];
};

export type WeatherResponse = {
	location: {
		name: string;
	};
	current: {
		temperature: number;
		weather_icons: string[];
		wind_speed: number;
		precip: number;
	};
};
