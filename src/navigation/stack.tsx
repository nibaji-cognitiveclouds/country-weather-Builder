/** @format */

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Country from "../Screens/Country";
import Home from "../Screens/Home";

const StackNav = () => {
	const Stack = createStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Country" component={Country} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default StackNav;
