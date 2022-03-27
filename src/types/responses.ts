/** @format */

export type countriesType = {
	name: {
		common: string;
	};
	capital: string[];
	population: number;
	flags: string[];
	latlng: number[];
};

export type weatherType = {
	current: {
		temperature: number;
		wind_speed: number;
		weather_icons: string[];
		precip: number;
	};
};
