/** @format */

import React from "react";
import { View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import countries from "../consts/http";
import { HomeStyle } from "../styles/home";
import { ListsStyle } from "../styles/lists";
import { CountriesResponse } from "../types/reponses";
import { ListParams } from "../types/routes";

type Props = {
	route: {
		params: ListParams;
	};
};

const List: React.FC<Props> = (props) => {
	const { text } = props?.route?.params;

	const [countryData, setCountryData] = React.useState<CountriesResponse[]>([]);

	React.useEffect(() => {
		countries.get(`/name/${text}`).then((response) => {
			setCountryData(response.data);
		});
	}, []);

	return (
		<View style={HomeStyle.page}>
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
