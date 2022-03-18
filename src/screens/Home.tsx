/** @format */

import React from "react";
import { View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { HomeStyle } from "../styles/home";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

const Home: React.FC = () => {
	const [text, setText] = React.useState<string>("");

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	return (
		<View style={HomeStyle.page}>
			<TextInput
				placeholder="Enter country"
				placeholderTextColor={"grey"}
				style={HomeStyle.textInput}
				onChangeText={(text) => {
					setText(text);
				}}
			/>

			<Button
				disabled={text?.length == 0}
				title="Search"
				onPress={() => {
					navigation.navigate("List", { text: text });
				}}
			/>
		</View>
	);
};

export default Home;
