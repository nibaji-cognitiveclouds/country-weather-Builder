/** @format */

import axios from "axios";

const countries = axios.create({
	baseURL: "https://restcountries.com/v3/",
});

export default countries;
