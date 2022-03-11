/** @format */

import React from "react";
import {
	ActivityIndicator,
	Alert,
	Button,
	Image,
	Modal,
	Text,
	View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { countries, weather } from "../consts/http";

const Country = (props: any) => {
	const [data, setdata] = React.useState<{}[]>([]);
	const [weatherData, setWeatherData] = React.useState<{}>({});
	const [isLoading, setIsLoading] = React.useState(false);
	const [showModal, setShowModal] = React.useState(false);

	React.useEffect(() => {
		setIsLoading(true);
		countries
			.get(`/${props.route.params.country}/`)
			.then((res) => {
				setdata(res?.data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	function getWeather(capital: string) {
		setIsLoading(true);
		const key = "9cfe09f6522f28c80de18d51c2880bf4";
		const params = { access_key: key, query: capital };
		weather
			.get(`current`, { params })
			.then((res: any) => {
				setWeatherData(res?.data);
				setShowModal(true);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<View style={{ padding: 10 }}>
			<Modal
				transparent
				visible={showModal}
				animationType="slide"
				onRequestClose={() => {
					setShowModal(false);
				}}
			>
				<View
					style={{
						margin: 20,
						padding: 20,
						top: "30%",
						backgroundColor: "white",
						height: "20%",
						justifyContent: "space-around",
						elevation: 5,
						borderRadius: 10,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-around",
						}}
					>
						<View>
							<Text>Temperature : {weatherData?.current?.temperature} C</Text>
							<Text>Wind Speed : {weatherData?.current?.wind_speed} km/hr</Text>
							<Text>Precipitaion : {weatherData?.current?.precip} %</Text>
						</View>
						<Image
							source={{ uri: weatherData?.current?.weather_icons[0] }}
							style={{ height: 30, width: 30 }}
						/>
					</View>
					<Button title="OK" onPress={() => setShowModal(false)} />
				</View>
			</Modal>
			{isLoading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<View
							style={{
								backgroundColor: "rgba(0,0,0,0.1)",
								margin: 5,
								padding: 10,
								borderRadius: 10,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<View>
									<Text>Name : {item?.name}</Text>
									<Text>Capital : {item?.capital}</Text>
									<Text>Population : {item?.population}</Text>
									<Text>Latitude : {item?.latlng?.[0]}</Text>
									<Text>Longitude : {item?.latlng?.[1]}</Text>
								</View>
								<Image
									source={{ uri: item.flags?.png }}
									height={30}
									// width={30}
									style={{ height: 30, width: 30 }}
								/>
							</View>
							<Button
								title="Capital Weather"
								onPress={() => getWeather(item?.capital)}
							/>
						</View>
					)}
				/>
			)}
		</View>
	);
};

export default Country;
