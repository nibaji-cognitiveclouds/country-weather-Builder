/** @format */

import React from "react";
import { Button, TextInput, View } from "react-native";

const Home = (props: any) => {
	const [term, setTerm] = React.useState("");

	return (
		<View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
			<TextInput
				placeholder="Enter country name"
				placeholderTextColor={"grey"}
				onChangeText={(text) => setTerm(text)}
				style={{
					borderWidth: 0.5,
					borderColor: "grey",
					padding: 10,
					borderRadius: 10,
					width: "80%",
				}}
			/>
			<Button
				disabled={!term}
				title="Submit"
				onPress={() => {
					props.navigation.navigate("Country", {
						country: term,
					});
				}}
			/>
		</View>
	);
};

export default Home;
