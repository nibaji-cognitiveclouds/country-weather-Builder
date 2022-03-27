/** @format */

import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
	FlatList,
	SafeAreaView,
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Modal,
	Button,
} from "react-native";
import { screens } from "../styles/screens";
import { countriesType, weatherType } from "../types/responses";
import { listScreenPropsType } from "../types/screens";

const List: FC<listScreenPropsType> = (props) => {
	const [countryData, setCountryData] = useState<countriesType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const [weatherData, setWeatherData] = useState<weatherType>();

	useEffect(() => {
		getCountryData();
	}, []);

	function getCountryData() {
		setLoading(true);
		axios
			.get(`https://restcountries.com/v3/name/${props.route.params.name}`)
			.then((res) => {
				setCountryData(res.data);
			})
			.catch(() => {
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function handlPress(capital: string) {
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=9cfe09f6522f28c80de18d51c2880bf4&query=${capital}`
			)
			.then((res) => setWeatherData(res.data))
			.catch(() => {
				setError(true);
			})
			.finally(() => {
				!error && setShowModal(true);
			});
	}

	return (
		<SafeAreaView testID="lists" style={screens.container}>
			<Modal visible={showModal} animationType={"slide"}>
				<View style={screens.modal}>
					<Image
						source={{ uri: `${weatherData?.current?.weather_icons[0]}` }}
						style={{ height: 100, width: 100 }}
					/>
					<Text>Temperature : {weatherData?.current?.temperature} C</Text>
					<Text>Wind Speed : {weatherData?.current?.wind_speed}</Text>
					<Text>Precipitation : {weatherData?.current?.precip}</Text>
					<Button
						title={"Ok"}
						onPress={() => {
							setShowModal(false);
						}}
					/>
				</View>
			</Modal>

			<FlatList
				data={countryData}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => {
							handlPress(item?.capital[0]);
						}}
					>
						<View style={screens.item}>
							<View>
								<Text>Name : {item?.name.common}</Text>
								<Text>Capital : {item?.capital}</Text>
								<Text>Population : {item?.population}</Text>
								<Text>Latitude : {item?.latlng[0]}</Text>
								<Text>Longitude : {item?.latlng[1]}</Text>
							</View>
							<View>
								<Image
									source={{ uri: item?.flags[1] }}
									style={{ height: 100, width: 100 }}
								/>
							</View>
						</View>
					</TouchableOpacity>
				)}
				ListEmptyComponent={() => {
					return (
						<View>
							{loading ? (
								<ActivityIndicator color={"blue"} />
							) : !error ? (
								<Text>Nothing found</Text>
							) : (
								<Text>Something went wrong!</Text>
							)}
						</View>
					);
				}}
			/>
		</SafeAreaView>
	);
};

export default List;
