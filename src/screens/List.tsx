/** @format */

import React from "react";
import { View, Text, Image, Button, Modal } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import http from "../consts/http";
import { HomeStyle } from "../styles/home";
import { ListsStyle } from "../styles/lists";
import { CountriesResponse, WeatherResponse } from "../types/reponses";
import { ListParams } from "../types/routes";

type Props = {
	route: {
		params: ListParams;
	};
};

const List: React.FC<Props> = (props) => {
	const { text } = props?.route?.params;
	const { countries, weather } = http;

	const [countryData, setCountryData] = React.useState<CountriesResponse[]>([]);
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [weatherData, setWeatherdata] = React.useState<WeatherResponse>();

	React.useEffect(() => {
		countries.get(`/name/${text}`).then((response) => {
			setCountryData(response.data);
		});
	}, []);

	function getWeather(capital: string) {
		weather
			.get("", {
				params: {
					query: capital,
				},
			})
			.then((response) => {
				setWeatherdata(response.data);
			});
	}

	return (
		<View style={HomeStyle.page}>
			<Modal visible={showModal} animationType="slide">
				<View style={ListsStyle.modal}>
					<View style={ListsStyle.listItem}>
						<View style={ListsStyle.listProps}>
							<Text style={ListsStyle.listItemPropName}>
								City :{" "}
								<Text style={ListsStyle.listItemPropValue}>
									{weatherData?.location?.name}
								</Text>
							</Text>
							<Text style={ListsStyle.listItemPropName}>
								Temperaure :{" "}
								<Text style={ListsStyle.listItemPropValue}>
									{weatherData?.current?.temperature}
								</Text>
							</Text>
							<Text style={ListsStyle.listItemPropName}>
								Wind Speed :{" "}
								<Text style={ListsStyle.listItemPropValue}>
									{weatherData?.current?.wind_speed}
								</Text>
							</Text>
							<Text style={ListsStyle.listItemPropName}>
								Precipitation :{" "}
								<Text style={ListsStyle.listItemPropValue}>
									{weatherData?.current?.precip}
								</Text>
							</Text>
						</View>
						<Image
							source={{ uri: `${weatherData?.current?.weather_icons?.[0]}` }}
							style={ListsStyle.listImage}
						/>
					</View>
					<Button
						title="Close"
						onPress={() => {
							setShowModal(false);
						}}
					/>
				</View>
			</Modal>
			<FlatList
				data={countryData}
				renderItem={({ item }) => {
					return (
						<View style={ListsStyle.listItem}>
							<View style={ListsStyle.listProps}>
								<Text style={ListsStyle.listItemPropName}>
									Name :{" "}
									<Text style={ListsStyle.listItemPropValue}>
										{item.name.official}
									</Text>
								</Text>
								<Text style={ListsStyle.listItemPropName}>
									Capital :{" "}
									<Text style={ListsStyle.listItemPropValue}>
										{item.capital}
									</Text>
								</Text>
								<Text style={ListsStyle.listItemPropName}>
									Population :{" "}
									<Text style={ListsStyle.listItemPropValue}>
										{item.population}
									</Text>
								</Text>
								<Text style={ListsStyle.listItemPropName}>
									Latitude :{" "}
									<Text style={ListsStyle.listItemPropValue}>
										{item.latlng[0]}
									</Text>
								</Text>
								<Text style={ListsStyle.listItemPropName}>
									Longitude :{" "}
									<Text style={ListsStyle.listItemPropValue}>
										{item.latlng[1]}
									</Text>
								</Text>

								<Button
									title="Capital Weather"
									onPress={() => {
										setShowModal(true);
										getWeather(item.capital[0]);
									}}
								/>
							</View>
							<Image
								source={{ uri: `${item.flags[1]}` }}
								style={ListsStyle.listImage}
							/>
						</View>
					);
				}}
			/>
		</View>
	);
};

export default List;
