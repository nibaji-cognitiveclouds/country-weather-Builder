/** @format */

import axios, { AxiosInstance } from "axios";

export const countries: AxiosInstance = axios.create({
	baseURL: "https://restcountries.com/v2/name",
});

export const weather: AxiosInstance = axios.create({
	baseURL: "http://api.weatherstack.com/",
});
