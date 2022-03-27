/** @format */

import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import { Button, SafeAreaView, TextInput } from "react-native";

const Home: FC = () => {
	const [name, setName] = useState<string>("");

	const navigation = useNavigation();

	return (
		<SafeAreaView testID="home">
			<TextInput
				placeholder="Enter country name"
				placeholderTextColor={"grey"}
				onChangeText={(text) => {
					setName(text);
				}}
			/>
			<Button
				disabled={name.length == 0}
				title={"Submit"}
				onPress={() => {
					navigation.navigate("List", { name: name });
				}}
			/>
		</SafeAreaView>
	);
};

export default Home;
