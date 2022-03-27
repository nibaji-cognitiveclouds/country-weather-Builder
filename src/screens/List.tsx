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

const List: FC<any> = (props) => {
	const [countryData, setCountryData] = useState<{}[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const [weatherData, setWeatherData] = useState<{}>({});

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
		<SafeAreaView testID="lists">
			<Modal visible={showModal} animationType={"slide"}>
				<View>
					<Image
						source={{ uri: `${weatherData?.current?.weather_icons}` }}
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
							handlPress(item.capital);
						}}
					>
						<View style={{ flexDirection: "row" }}>
							<View>
								<Text>Name : {item.name.common}</Text>
								<Text>Capital : {item.capital}</Text>
								<Text>Population : {item.population}</Text>
								<Text>Latitude : {item.latlng[0]}</Text>
								<Text>Longitude : {item.latlng[1]}</Text>
							</View>
							<View>
								<Image
									source={{ uri: item.flags[1] }}
									width={100}
									height={100}
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
